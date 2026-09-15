(function () {
    'use strict';

    const mapElement = document.querySelector('[data-village-map]');
    const mapFallback = document.querySelector('[data-map-fallback]');
    const schematicMap = document.querySelector('[data-schematic-map]');
    const mapStage = document.querySelector('[data-map-stage]');
    const directory = document.querySelector('[data-location-directory]');
    const timeline = document.querySelector('[data-timeline]');
    const panel = document.querySelector('[data-history-panel]');
    const layerTools = document.querySelector('[data-map-layer-tools]');
    const legend = document.querySelector('[data-map-legend]');
    const searchInput = document.querySelector('[data-map-search]');
    const mapFilters = document.querySelector('[data-map-filters]');
    const defaultMessage = 'Choose a location or timeline entry to view its connected archive record.';
    const markers = new Map();
    const landscapeLayers = [];
    let leafletMap = null;
    let villageOverviewBounds = null;
    let selectedLocationId = null;
    let isPanelMinimized = false;
    let activeMapCategory = 'All';
    let searchTerm = '';
    const filterGroups = {
        Mosques: ['Religion and scholarship', 'Faith & community'], Families: ['Family Compound'], Schools: ['Education', 'Traditional Schools', 'Education / Historical Institution'], Wells: ['Wells', 'Land and water'], 'Public Spaces': ['Public Spaces / Bantaba'], Water: ['Water'], Ponds: ['Ponds / Water Features'], Farmlands: ['Farmlands', 'Agriculture'], Forests: ['Forests'], 'Neighbouring Villages': ['Neighbouring Village', 'Nearest City'], 'Outgrowth Villages': ['Outgrowth Villages'], 'Lost Villages': ['Lost Villages', 'Lost history'], Roads: ['Road'], 'Historic Infrastructure': ['Historic Infrastructure']
    };
    const enabledFilterGroups = new Set(Object.keys(filterGroups));
    let schematicTransform = { scale: 1, x: 0, y: 0 };
    let dragState = null;
    let pinchState = null;

    function clamp(value, minimum, maximum) {
        return Math.min(Math.max(value, minimum), maximum);
    }

    function constrainSchematicTransform() {
        const bounds = mapFallback.getBoundingClientRect();
        const maxX = Math.max(0, bounds.width * (schematicTransform.scale - 1));
        const maxY = Math.max(0, bounds.height * (schematicTransform.scale - 1));
        schematicTransform.x = clamp(schematicTransform.x, -maxX, 0);
        schematicTransform.y = clamp(schematicTransform.y, -maxY, 0);
    }

    function applySchematicTransform() {
        constrainSchematicTransform();
        mapStage.style.transform = 'translate(' + schematicTransform.x + 'px, ' + schematicTransform.y + 'px) scale(' + schematicTransform.scale + ')';
    }

    function zoomSchematic(nextScale, clientX, clientY) {
        const bounds = mapFallback.getBoundingClientRect();
        const scale = clamp(nextScale, 1, 3);
        const localX = clientX - bounds.left;
        const localY = clientY - bounds.top;
        const ratio = scale / schematicTransform.scale;
        schematicTransform.x = localX - (localX - schematicTransform.x) * ratio;
        schematicTransform.y = localY - (localY - schematicTransform.y) * ratio;
        schematicTransform.scale = scale;
        applySchematicTransform();
    }

    function touchDistance(touches) {
        return Math.hypot(touches[1].clientX - touches[0].clientX, touches[1].clientY - touches[0].clientY);
    }

    function touchCenter(touches) {
        return { x: (touches[0].clientX + touches[1].clientX) / 2, y: (touches[0].clientY + touches[1].clientY) / 2 };
    }

    function initialiseSchematicMapControls() {
        const center = function () {
            const bounds = mapFallback.getBoundingClientRect();
            return { x: bounds.left + bounds.width / 2, y: bounds.top + bounds.height / 2 };
        };
        const resetSchematicOverview = function () {
            schematicTransform = { scale: 1, x: 0, y: 0 };
            applySchematicTransform();
        };
        document.querySelector('[data-map-zoom-in]').addEventListener('click', function () {
            if (leafletMap) {
                leafletMap.zoomIn();
                return;
            }
            const point = center();
            zoomSchematic(schematicTransform.scale * 1.25, point.x, point.y);
        });
        document.querySelector('[data-map-zoom-out]').addEventListener('click', function () {
            if (leafletMap) {
                leafletMap.zoomOut();
                return;
            }
            const point = center();
            zoomSchematic(schematicTransform.scale / 1.25, point.x, point.y);
        });
        document.querySelector('[data-map-overview]').addEventListener('click', function () {
            if (leafletMap && villageOverviewBounds) {
                leafletMap.fitBounds(villageOverviewBounds, { padding: [42, 42] });
                return;
            }
            resetSchematicOverview();
        });
        mapFallback.addEventListener('wheel', function (event) {
            event.preventDefault();
            zoomSchematic(schematicTransform.scale * (event.deltaY < 0 ? 1.12 : 0.89), event.clientX, event.clientY);
        }, { passive: false });
        mapFallback.addEventListener('pointerdown', function (event) {
            if (event.target.closest('button, a')) return;
            clearSelection();
            dragState = { x: event.clientX, y: event.clientY, startX: schematicTransform.x, startY: schematicTransform.y };
            mapFallback.setPointerCapture(event.pointerId);
            mapFallback.classList.add('is-panning');
        });
        mapFallback.addEventListener('pointermove', function (event) {
            if (!dragState) return;
            schematicTransform.x = dragState.startX + event.clientX - dragState.x;
            schematicTransform.y = dragState.startY + event.clientY - dragState.y;
            applySchematicTransform();
        });
        function endDrag() {
            dragState = null;
            mapFallback.classList.remove('is-panning');
        }
        mapFallback.addEventListener('pointerup', endDrag);
        mapFallback.addEventListener('pointercancel', endDrag);
        mapFallback.addEventListener('touchstart', function (event) {
            if (event.touches.length !== 2) return;
            const centerPoint = touchCenter(event.touches);
            pinchState = { distance: touchDistance(event.touches), scale: schematicTransform.scale, center: centerPoint };
            dragState = null;
        }, { passive: false });
        mapFallback.addEventListener('touchmove', function (event) {
            if (!pinchState || event.touches.length !== 2) return;
            event.preventDefault();
            const centerPoint = touchCenter(event.touches);
            zoomSchematic(pinchState.scale * touchDistance(event.touches) / pinchState.distance, centerPoint.x, centerPoint.y);
        }, { passive: false });
        mapFallback.addEventListener('touchend', function () { pinchState = null; }, { passive: true });
    }

    function escapeHtml(value) {
        return String(value).replace(/[&<>'"]/g, function (character) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character];
        });
    }

    function hasCoordinates(location) {
        return Array.isArray(location.coordinates) && location.coordinates.length === 2 && location.coordinates.every(Number.isFinite);
    }

    function locationById(locationId) {
        return villageHistoryData.locations.find(function (location) { return location.id === locationId; });
    }

    function eventsFor(locationId) {
        return villageHistoryData.events.filter(function (event) { return event.locationId === locationId; });
    }

    function categoryIcon(category) {
        const icons = { 'Community history': 'fa-users', 'Religion and scholarship': 'fa-mosque', Education: 'fa-school', 'Land and water': 'fa-tint', 'Community life': 'fa-seedling', 'Lost history': 'fa-landmark', Neighbourhoods: 'fa-home', 'Neighbouring Village': 'fa-map-signs', 'Nearest City': 'fa-city', 'Family Compound': 'fa-home', 'Traditional Schools': 'fa-school', 'Education / Historical Institution': 'fa-university', Wells: 'fa-tint', 'Public Spaces / Bantaba': 'fa-users', 'Ponds / Water Features': 'fa-water', Farmlands: 'fa-seedling', Forests: 'fa-tree', 'Historic Infrastructure': 'fa-archway', Water: 'fa-water', Road: 'fa-road', Landscape: 'fa-mountain' };
        return icons[category] || 'fa-map-marker-alt';
    }

    function mapCategoryMarkup() {
        const locationCategories = villageHistoryData.locations.map(function (location) { return location.category; });
        const featureCategories = (villageHistoryData.features || []).map(function (feature) { return feature.category; });
        const categories = ['All'].concat(Array.from(new Set(locationCategories.concat(featureCategories))));
        layerTools.innerHTML = categories.map(function (category) {
            return '<button type="button" class="map-layer-toggle' + (activeMapCategory === category ? ' is-active' : '') + '" data-map-category="' + escapeHtml(category) + '" aria-pressed="' + (activeMapCategory === category) + '"><i class="fa ' + categoryIcon(category) + '" aria-hidden="true"></i><span>' + escapeHtml(category) + '</span></button>';
        }).join('');
        layerTools.querySelectorAll('[data-map-category]').forEach(function (button) {
            button.addEventListener('click', function () {
                activeMapCategory = button.dataset.mapCategory;
                updateMapCategory();
                mapCategoryMarkup();
            });
        });
        legend.innerHTML = (villageHistoryData.legend || []).map(function (item) {
            return '<span><i class="fa ' + categoryIcon(item === 'Well' ? 'Wells' : item === 'Public Space' ? 'Public Spaces / Bantaba' : item === 'Pond' ? 'Ponds / Water Features' : item === 'Farmland' ? 'Farmlands' : item === 'Forest' ? 'Forests' : item) + '" aria-hidden="true"></i>' + escapeHtml(item) + '</span>';
        }).join('');
    }

    function mapFilterMarkup() {
        mapFilters.innerHTML = Object.keys(filterGroups).map(function (name) {
            return '<label><input type="checkbox" data-map-filter="' + escapeHtml(name) + '" ' + (enabledFilterGroups.has(name) ? 'checked' : '') + '><span>' + escapeHtml(name) + '</span></label>';
        }).join('');
        mapFilters.querySelectorAll('[data-map-filter]').forEach(function (input) {
            input.addEventListener('change', function () {
                if (input.checked) enabledFilterGroups.add(input.dataset.mapFilter);
                else enabledFilterGroups.delete(input.dataset.mapFilter);
                updateMapCategory();
                renderDirectory();
            });
        });
    }

    function matchesActiveCategory(category) {
        return activeMapCategory === 'All' || category === activeMapCategory;
    }

    function matchesEnabledFilters(category) {
        return Object.keys(filterGroups).some(function (name) {
            return enabledFilterGroups.has(name) && filterGroups[name].indexOf(category) >= 0;
        }) || !Object.keys(filterGroups).some(function (name) { return filterGroups[name].indexOf(category) >= 0; });
    }

    function matchesSearch(location) {
        if (!searchTerm) return true;
        return [location.name, location.category, location.description, location.historicalSignificance].filter(Boolean).join(' ').toLowerCase().indexOf(searchTerm) >= 0;
    }

    function updateMapCategory() {
        markers.forEach(function (marker, locationId) {
            const location = locationById(locationId);
            if (!location) return;
            if (matchesActiveCategory(location.category) && matchesEnabledFilters(location.category) && matchesSearch(location)) marker.addTo(leafletMap);
            else marker.remove();
        });
        landscapeLayers.forEach(function (entry) {
            if ((activeMapCategory === 'All' || entry.category === activeMapCategory || (entry.category === 'Landscape' && activeMapCategory === 'Neighbourhoods')) && matchesEnabledFilters(entry.category) && (!searchTerm || entry.label.toLowerCase().indexOf(searchTerm) >= 0)) entry.layer.addTo(leafletMap);
            else entry.layer.remove();
        });
    }

    function bookMarkup(reference) {
        if (reference.source) return '<p class="mb-0">' + escapeHtml(reference.source) + '</p>';
        return '<dl class="history-book-reference"><div><dt>Chapter</dt><dd>' + escapeHtml(reference.chapter) + '</dd></div><div><dt>Page</dt><dd>' + escapeHtml(reference.page) + '</dd></div><div><dt>Section</dt><dd>' + escapeHtml(reference.section) + '</dd></div></dl>';
    }

    function mediaMarkup(media) {
        const mediaTypes = [
            ['historicalImages', 'far fa-image', 'Historical photographs', 'Photographs not yet documented', 'image'],
            ['currentImages', 'far fa-image', 'Current photographs', 'Photographs not yet documented', 'image'],
            ['videos', 'fa fa-play-circle', 'Historical video', 'Video archive coming soon', 'link'],
            ['audio', 'fa fa-volume-up', 'Audio / oral history', 'Audio archive coming soon', 'link'],
            ['documents', 'fa fa-file-alt', 'Historical documents', 'Document scan not yet available', 'link']
        ];
        return '<section class="history-media-section"><strong>Media</strong><div class="history-media-grid">' + mediaTypes.map(function (item) {
            const sources = media[item[0]] || [];
            if (!sources.length) return '<div class="history-media-placeholder"><i class="' + item[1] + '" aria-hidden="true"></i><span>' + item[2] + '</span><small>' + item[3] + '</small></div>';
            if (item[4] === 'image') return sources.map(function (source) { return '<a class="history-media-item" href="' + escapeHtml(source) + '" target="_blank" rel="noopener noreferrer"><img src="' + escapeHtml(source) + '" alt="' + escapeHtml(item[2]) + '"><span>' + item[2] + '</span></a>'; }).join('');
            const source = sources[0];
            return '<a class="history-media-item" href="' + escapeHtml(source) + '" target="_blank" rel="noopener noreferrer"><i class="' + item[1] + '" aria-hidden="true"></i><span>' + item[2] + '</span></a>';
        }).join('') + '</div></section>';
    }

    function relatedEventsMarkup(location) {
        const events = eventsFor(location.id);
        if (!events.length) return '<div class="history-fact"><strong>Historical events</strong><span>Information not yet documented.</span></div>';
        return '<div class="history-fact"><strong>Historical events</strong>' + events.map(function (event) {
            return '<button type="button" class="history-event-link" data-event-id="' + escapeHtml(event.id) + '">' + escapeHtml(event.year) + ' - ' + escapeHtml(event.title) + '</button>';
        }).join('') + '</div>';
    }

    function mapsActionMarkup(location) {
        if (!hasCoordinates(location)) {
            return '<div class="history-actions"><span class="btn btn-outline-secondary" aria-disabled="true"><i class="fa fa-map-marker-alt me-2" aria-hidden="true"></i>Explore This Place Today <small>(add verified coordinates)</small></span></div>';
        }
        const coordinates = location.coordinates.join(',');
        const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(coordinates);
        const streetViewUrl = 'https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=' + encodeURIComponent(coordinates);
        return '<div class="history-actions"><a class="btn btn-primary" href="' + mapsUrl + '" target="_blank" rel="noopener noreferrer"><i class="fa fa-map-marker-alt me-2" aria-hidden="true"></i>Explore This Place Today</a><a class="btn btn-outline-dark" href="' + streetViewUrl + '" target="_blank" rel="noopener noreferrer"><i class="fa fa-street-view me-2" aria-hidden="true"></i>Try Street View</a></div>';
    }

    function clearSelection() {
        selectedLocationId = null;
        isPanelMinimized = false;
        renderPanel();
        renderDirectory();
        renderSchematicMarkers();
        renderTimeline();
        markers.forEach(function (marker) {
            const markerElement = marker.getElement();
            if (markerElement) markerElement.classList.remove('is-active');
        });
    }

    function renderPanel(location) {
        if (!location) {
            panel.classList.remove('is-minimized');
            panel.classList.add('is-empty');
            panel.innerHTML = '<div class="history-panel-empty"><i class="fa fa-map-marked-alt" aria-hidden="true"></i><p>' + defaultMessage + '</p></div>';
            return;
        }
        panel.classList.remove('is-empty');
        panel.classList.toggle('is-minimized', isPanelMinimized);
        const archiveLinks = (location.storyIds || []).map(function (storyId) { return '<a class="history-event-link" href="museum.html?story=' + encodeURIComponent(storyId) + '">Read connected archive story</a>'; }).join('');
        const familyLink = location.familyId ? '<a class="history-event-link" href="families.html?families=' + encodeURIComponent(location.familyId) + '">View family <i class="fa fa-arrow-right" aria-hidden="true"></i></a>' : '';
        const relatedLinks = (location.relatedLocationIds || []).map(function (locationId) {
            const relatedLocation = locationById(locationId);
            return relatedLocation ? '<button type="button" class="history-event-link" data-related-location-id="' + escapeHtml(relatedLocation.id) + '">' + escapeHtml(relatedLocation.name) + ' <i class="fa fa-arrow-right" aria-hidden="true"></i></button>' : '';
        }).join('');
        panel.innerHTML = '<div class="history-panel-controls"><button type="button" class="history-panel-minimize" data-minimize-panel aria-label="' + (isPanelMinimized ? 'Expand location information' : 'Minimize location information') + '" title="' + (isPanelMinimized ? 'Expand' : 'Minimize') + '"><i class="fa ' + (isPanelMinimized ? 'fa-expand-alt' : 'fa-minus') + '" aria-hidden="true"></i></button><button type="button" class="history-panel-close" data-close-panel aria-label="Close location information" title="Close"><i class="fa fa-times" aria-hidden="true"></i></button></div><div class="history-panel-heading"><span class="history-panel-kicker"><i class="fa fa-map-marker-alt me-1" aria-hidden="true"></i>' + escapeHtml(location.category) + '</span><h2>' + escapeHtml(location.name) + '</h2></div><div class="history-panel-body"><div class="history-fact"><strong>About this place</strong><span>' + escapeHtml(location.description) + '</span></div><div class="history-fact"><strong>Historical significance</strong><span>' + escapeHtml(location.historicalSignificance) + '</span></div>' + relatedEventsMarkup(location) + '<div class="history-fact"><strong>People connected to this place</strong><span>' + (location.people.length ? location.people.map(escapeHtml).join(', ') : 'Information not yet documented.') + '</span></div>' + (location.neighborhood ? '<div class="history-fact"><strong>Neighbourhood</strong><span>' + escapeHtml(location.neighborhood) + '</span></div>' : '') + (relatedLinks ? '<div class="history-fact"><strong>Connected places</strong>' + relatedLinks + '</div>' : '') + familyLink + '<div class="history-fact"><strong>Archive stories</strong>' + archiveLinks + '</div><div class="history-fact"><strong>History Book</strong>' + bookMarkup(location.bookReference) + '</div>' + mediaMarkup(location.media || {}) + mapsActionMarkup(location) + '</div>';
        panel.querySelectorAll('[data-event-id]').forEach(function (button) {
            button.addEventListener('click', function () { selectEvent(button.dataset.eventId, true); });
        });
        panel.querySelectorAll('[data-related-location-id]').forEach(function (button) {
            button.addEventListener('click', function () {
                activeMapCategory = 'All';
                enabledFilterGroups.clear();
                Object.keys(filterGroups).forEach(function (name) { enabledFilterGroups.add(name); });
                mapCategoryMarkup();
                mapFilterMarkup();
                updateMapCategory();
                selectLocation(button.dataset.relatedLocationId, false);
            });
        });
        panel.querySelector('[data-minimize-panel]').addEventListener('click', function () {
            isPanelMinimized = !isPanelMinimized;
            renderPanel(location);
        });
        panel.querySelector('[data-close-panel]').addEventListener('click', clearSelection);
    }

    function renderDirectory() {
        directory.innerHTML = villageHistoryData.locations.filter(function (location) { return matchesEnabledFilters(location.category) && matchesSearch(location); }).map(function (location) {
            return '<button type="button" data-location-id="' + escapeHtml(location.id) + '" class="' + (location.id === selectedLocationId ? 'is-active' : '') + '"><i class="fa fa-map-marker-alt me-1" aria-hidden="true"></i>' + escapeHtml(location.name) + '</button>';
        }).join('');
        directory.querySelectorAll('[data-location-id]').forEach(function (button) {
            button.addEventListener('click', function () { selectLocation(button.dataset.locationId, true); });
        });
    }

    function renderSchematicMarkers() {
        schematicMap.innerHTML = villageHistoryData.locations.map(function (location) {
            const position = location.mapPosition || [50, 50];
            const active = location.id === selectedLocationId ? ' is-active' : '';
            return '<button type="button" class="heritage-map-marker' + active + '" data-location-id="' + escapeHtml(location.id) + '" style="left:' + position[0] + '%;top:' + position[1] + '%" aria-label="Explore ' + escapeHtml(location.name) + '"><i class="fa ' + escapeHtml(location.markerIcon || 'fa-map-marker-alt') + '" aria-hidden="true"></i><span>' + escapeHtml(location.name) + '</span></button>';
        }).join('');
        schematicMap.querySelectorAll('[data-location-id]').forEach(function (button) {
            button.addEventListener('click', function () { selectLocation(button.dataset.locationId, false); });
        });
    }

    function renderTimeline() {
        timeline.innerHTML = villageHistoryData.events.map(function (event) {
            const location = locationById(event.locationId);
            const active = event.locationId === selectedLocationId ? ' is-active' : '';
            return '<button type="button" class="timeline-event' + active + '" data-event-id="' + escapeHtml(event.id) + '"><span class="timeline-dot" aria-hidden="true"></span><span class="timeline-year">' + escapeHtml(event.year) + '</span><span class="timeline-event-content"><strong>' + escapeHtml(event.title) + '</strong><small>' + escapeHtml(location ? location.name : '[LOCATION NOT FOUND]') + '</small></span></button>';
        }).join('') || '<p class="text-muted py-4">[ADD VERIFIED TIMELINE EVENTS]</p>';
        timeline.querySelectorAll('[data-event-id]').forEach(function (button) {
            button.addEventListener('click', function () { selectEvent(button.dataset.eventId, true); });
        });
    }

    function focusMarker(location) {
        markers.forEach(function (marker, locationId) {
            const markerElement = marker.getElement();
            if (markerElement) markerElement.classList.toggle('is-active', locationId === location.id);
        });
        if (leafletMap && markers.has(location.id)) {
            leafletMap.flyTo(markers.get(location.id).getLatLng(), Math.max(leafletMap.getZoom(), 3), { duration: 0.6 });
        }
    }

    function selectLocation(locationId, shouldScroll) {
        const location = locationById(locationId);
        if (!location) return;
        selectedLocationId = locationId;
        isPanelMinimized = false;
        renderPanel(location);
        renderDirectory();
        renderSchematicMarkers();
        renderTimeline();
        focusMarker(location);
        const activeEvent = timeline.querySelector('.is-active');
        if (activeEvent) activeEvent.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        if (shouldScroll && window.innerWidth < 992) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function selectEvent(eventId, shouldScroll) {
        const event = villageHistoryData.events.find(function (entry) { return entry.id === eventId; });
        if (event) selectLocation(event.locationId, shouldScroll);
    }

    function showFallback() {
        mapFallback.hidden = false;
        mapElement.hidden = true;
    }

    function initialiseMap() {
        if (!window.L) {
            showFallback();
            return;
        }
        try {
            const hasVerifiedMapCenter = Array.isArray(villageHistoryData.map.center) && villageHistoryData.map.center.every(Number.isFinite);
            const schematicBounds = L.latLngBounds([[0, 0], [100, 100]]);
            villageOverviewBounds = hasVerifiedMapCenter ? null : schematicBounds;
            leafletMap = L.map(mapElement, {
                crs: hasVerifiedMapCenter ? L.CRS.EPSG3857 : L.CRS.Simple,
                zoomControl: false,
                scrollWheelZoom: true,
                touchZoom: true,
                dragging: true,
                keyboard: true,
                zoomSnap: 0.25,
                zoomDelta: 0.5,
                minZoom: hasVerifiedMapCenter ? 12 : 1,
                maxZoom: hasVerifiedMapCenter ? 19 : 6,
                maxBounds: hasVerifiedMapCenter ? undefined : schematicBounds.pad(0.25),
                maxBoundsViscosity: 1
            });
            if (hasVerifiedMapCenter) {
                leafletMap.setView(villageHistoryData.map.center, villageHistoryData.map.zoom);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; ' + villageHistoryData.map.attribution }).addTo(leafletMap);
            } else {
                mapElement.classList.add('is-schematic-map');
                leafletMap.fitBounds(schematicBounds, { padding: [42, 42] });
            }
            (villageHistoryData.features || []).forEach(function (feature) {
                let layer;
                if (feature.type === 'line') {
                    layer = L.polyline(feature.points.map(function (point) { return [100 - point[1], point[0]]; }), { color: feature.category === 'Road' ? '#84663c' : '#2f6f86', weight: feature.category === 'Road' ? 3 : 5, opacity: .8, dashArray: feature.category === 'Road' ? '8 8' : null, interactive: false });
                } else {
                    const southWest = [100 - feature.bounds[1][1], feature.bounds[0][0]];
                    const northEast = [100 - feature.bounds[0][1], feature.bounds[1][0]];
                    layer = L.rectangle([southWest, northEast], { color: feature.category === 'Water' ? '#4d8ca3' : '#60764c', weight: 1, fillColor: feature.category === 'Water' ? '#86bdd0' : '#a8bd8c', fillOpacity: .16, interactive: false });
                }
                layer.bindTooltip(escapeHtml(feature.label) + ' (illustrative)', { sticky: true });
                layer.addTo(leafletMap);
                landscapeLayers.push({ category: feature.category, label: feature.label, layer: layer });
            });
            villageHistoryData.locations.filter(function (location) { return hasVerifiedMapCenter ? hasCoordinates(location) : Array.isArray(location.mapPosition); }).forEach(function (location) {
                const position = hasVerifiedMapCenter ? location.coordinates : [100 - location.mapPosition[1], location.mapPosition[0]];
                const isIllustrative = location.positionType === 'illustrative';
                const isFamilyCompound = location.category === 'Family Compound';
                const isLostVillage = location.category === 'Lost Villages';
                const isOutgrowthVillage = location.category === 'Outgrowth Villages';
                const icon = L.divIcon({ className: 'village-map-marker' + (isIllustrative ? ' is-illustrative' : '') + (isFamilyCompound ? ' is-family-compound' : '') + (isLostVillage ? ' is-lost-village' : '') + (isOutgrowthVillage ? ' is-outgrowth-village' : ''), html: '<i class="fa ' + escapeHtml(location.markerIcon || categoryIcon(location.category)) + '" aria-hidden="true"></i><span>' + escapeHtml(location.name) + '</span>', iconSize: isIllustrative ? [30, 30] : [150, 42], iconAnchor: isIllustrative ? [15, 15] : [18, 36] });
                const marker = L.marker(position, { icon: icon, title: location.name }).addTo(leafletMap);
                marker.on('click', function () { selectLocation(location.id, false); });
                const markerElement = marker.getElement();
                markerElement.setAttribute('role', 'button');
                markerElement.setAttribute('aria-label', 'Open ' + location.name);
                markerElement.setAttribute('tabindex', '0');
                markerElement.addEventListener('keydown', function (event) {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        marker.fire('click');
                    }
                });
                markers.set(location.id, marker);
            });
            leafletMap.on('click', function () { clearSelection(); });
            updateMapCategory();
        } catch (error) {
            showFallback();
        }
    }

    document.querySelector('[data-show-all-events]').addEventListener('click', function () {
        clearSelection();
    });
    mapElement.addEventListener('click', function (event) {
        if (!event.target.closest('.leaflet-marker-icon, button, a, input, summary, label')) clearSelection();
    });

    renderPanel();
    renderDirectory();
    renderSchematicMarkers();
    renderTimeline();
    mapCategoryMarkup();
    mapFilterMarkup();
    searchInput.addEventListener('input', function () {
        searchTerm = searchInput.value.trim().toLowerCase();
        updateMapCategory();
        renderDirectory();
    });
    initialiseMap();
    const requestedLocationId = new URLSearchParams(window.location.search).get('location');
    if (requestedLocationId) selectLocation(requestedLocationId, false);
    initialiseSchematicMapControls();
}());