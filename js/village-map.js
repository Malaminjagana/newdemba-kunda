(function () {
    'use strict';

    const mapElement = document.querySelector('[data-village-map]');
    const mapFallback = document.querySelector('[data-map-fallback]');
    const schematicMap = document.querySelector('[data-schematic-map]');
    const mapStage = document.querySelector('[data-map-stage]');
    const directory = document.querySelector('[data-location-directory]');
    const timeline = document.querySelector('[data-timeline]');
    const panel = document.querySelector('[data-history-panel]');
    const defaultMessage = 'Choose a location or timeline entry to view its connected archive record.';
    const markers = new Map();
    let leafletMap = null;
    let selectedLocationId = null;
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
        document.querySelector('[data-map-zoom-in]').addEventListener('click', function () {
            const point = center();
            zoomSchematic(schematicTransform.scale * 1.25, point.x, point.y);
        });
        document.querySelector('[data-map-zoom-out]').addEventListener('click', function () {
            const point = center();
            zoomSchematic(schematicTransform.scale / 1.25, point.x, point.y);
        });
        mapFallback.addEventListener('wheel', function (event) {
            event.preventDefault();
            zoomSchematic(schematicTransform.scale * (event.deltaY < 0 ? 1.12 : 0.89), event.clientX, event.clientY);
        }, { passive: false });
        mapFallback.addEventListener('pointerdown', function (event) {
            if (event.target.closest('button, a')) return;
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
        }, { passive: true });
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

    function bookMarkup(reference) {
        return '<dl class="history-book-reference"><div><dt>Chapter</dt><dd>' + escapeHtml(reference.chapter) + '</dd></div><div><dt>Page</dt><dd>' + escapeHtml(reference.page) + '</dd></div><div><dt>Section</dt><dd>' + escapeHtml(reference.section) + '</dd></div></dl>';
    }

    function mediaMarkup(media) {
        const mediaTypes = [
            ['historicalImages', 'far fa-image', 'Historical photographs', '[ADD HISTORICAL PHOTO]', 'image'],
            ['currentImages', 'far fa-image', 'Current photographs', '[ADD CURRENT PHOTO]', 'image'],
            ['videos', 'fa fa-play-circle', 'Historical video', '[ADD VIDEO]', 'link'],
            ['audio', 'fa fa-volume-up', 'Audio / oral history', '[ADD AUDIO]', 'link'],
            ['documents', 'fa fa-file-alt', 'Historical documents', '[ADD DOCUMENT OR BOOK PAGE]', 'link']
        ];
        return '<section class="history-media-section"><strong>Media</strong><div class="history-media-grid">' + mediaTypes.map(function (item) {
            const source = media[item[0]] && media[item[0]][0];
            if (!source) return '<div class="history-media-placeholder"><i class="' + item[1] + '" aria-hidden="true"></i><span>' + item[2] + '</span><small>' + item[3] + '</small></div>';
            if (item[4] === 'image') return '<a class="history-media-item" href="' + escapeHtml(source) + '" target="_blank" rel="noopener noreferrer"><img src="' + escapeHtml(source) + '" alt="' + escapeHtml(item[2]) + '"><span>' + item[2] + '</span></a>';
            return '<a class="history-media-item" href="' + escapeHtml(source) + '" target="_blank" rel="noopener noreferrer"><i class="' + item[1] + '" aria-hidden="true"></i><span>' + item[2] + '</span></a>';
        }).join('') + '</div></section>';
    }

    function relatedEventsMarkup(location) {
        const events = eventsFor(location.id);
        if (!events.length) return '<div class="history-fact"><strong>Historical events</strong><span>[ADD CONNECTED TIMELINE EVENTS]</span></div>';
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

    function renderPanel(location) {
        if (!location) {
            panel.classList.add('is-empty');
            panel.innerHTML = '<div class="history-panel-empty"><i class="fa fa-map-marked-alt" aria-hidden="true"></i><p>' + defaultMessage + '</p></div>';
            return;
        }
        panel.classList.remove('is-empty');
        panel.innerHTML = '<button type="button" class="history-panel-close" data-close-panel aria-label="Close location information"><i class="fa fa-times" aria-hidden="true"></i></button><div class="history-panel-heading"><span class="history-panel-kicker"><i class="fa fa-map-marker-alt me-1" aria-hidden="true"></i>' + escapeHtml(location.category) + '</span><h2>' + escapeHtml(location.name) + '</h2></div><div class="history-fact"><strong>About this place</strong><span>' + escapeHtml(location.description) + '</span></div><div class="history-fact"><strong>Historical significance</strong><span>' + escapeHtml(location.historicalSignificance) + '</span></div>' + relatedEventsMarkup(location) + '<div class="history-fact"><strong>People connected to this place</strong><span>' + (location.people.length ? location.people.map(escapeHtml).join(', ') : '[ADD VERIFIED PEOPLE]') + '</span></div><div class="history-fact"><strong>History Book</strong>' + bookMarkup(location.bookReference) + '</div>' + mediaMarkup(location.media) + mapsActionMarkup(location);
        panel.querySelectorAll('[data-event-id]').forEach(function (button) {
            button.addEventListener('click', function () { selectEvent(button.dataset.eventId, true); });
        });
        panel.querySelector('[data-close-panel]').addEventListener('click', function () {
            selectedLocationId = null;
            renderPanel();
            renderDirectory();
            renderSchematicMarkers();
            renderTimeline();
            markers.forEach(function (marker) { marker.getElement().classList.remove('is-active'); });
        });
    }

    function renderDirectory() {
        directory.innerHTML = villageHistoryData.locations.map(function (location) {
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
        markers.forEach(function (marker, locationId) { marker.getElement().classList.toggle('is-active', locationId === location.id); });
        if (leafletMap && markers.has(location.id)) {
            leafletMap.flyTo(location.coordinates, Math.max(leafletMap.getZoom(), villageHistoryData.map.zoom), { duration: 0.6 });
            markers.get(location.id).openPopup();
        }
    }

    function selectLocation(locationId, shouldScroll) {
        const location = locationById(locationId);
        if (!location) return;
        selectedLocationId = locationId;
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
        if (!window.L || !Array.isArray(villageHistoryData.map.center) || !villageHistoryData.map.center.every(Number.isFinite)) {
            showFallback();
            return;
        }
        try {
            leafletMap = L.map(mapElement, { scrollWheelZoom: false }).setView(villageHistoryData.map.center, villageHistoryData.map.zoom);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; ' + villageHistoryData.map.attribution }).addTo(leafletMap);
            villageHistoryData.locations.filter(hasCoordinates).forEach(function (location) {
                const icon = L.divIcon({ className: 'village-map-marker', html: '<i class="fa fa-map-marker-alt" aria-hidden="true"></i>', iconSize: [36, 36], iconAnchor: [18, 36] });
                const marker = L.marker(location.coordinates, { icon: icon, title: location.name }).addTo(leafletMap).bindPopup('<strong>' + escapeHtml(location.name) + '</strong><br>Open its archive record');
                marker.on('click', function () { selectLocation(location.id, false); });
                markers.set(location.id, marker);
            });
        } catch (error) {
            showFallback();
        }
    }

    document.querySelector('[data-show-all-events]').addEventListener('click', function () {
        selectedLocationId = null;
        renderPanel();
        renderDirectory();
        renderSchematicMarkers();
        renderTimeline();
        markers.forEach(function (marker) { marker.getElement().classList.remove('is-active'); });
    });

    renderPanel();
    renderDirectory();
    renderSchematicMarkers();
    renderTimeline();
    initialiseMap();
    initialiseSchematicMapControls();
}());