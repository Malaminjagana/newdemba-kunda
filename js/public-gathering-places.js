(function () {
    'use strict';

    const grid = document.querySelector('[data-public-gathering-places]');
    const homeGrid = document.querySelector('[data-public-gathering-places-home]');
    if (!grid && !homeGrid) return;
    const detail = document.createElement('section');
    detail.className = 'collection-detail';
    detail.hidden = true;
    detail.setAttribute('aria-label', 'Public gathering place details');
    document.body.appendChild(detail);

    function escapeHtml(value) {
        return String(value).replace(/[&<>'"]/g, function (character) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character];
        });
    }

    let lastFocusedElement = null;
    let scrollPosition = 0;

    function closeDetail() {
        detail.hidden = true;
        detail.innerHTML = '';
        document.body.classList.remove('collection-modal-open');
        document.body.style.top = '';
        window.scrollTo(0, scrollPosition);
        if (lastFocusedElement) lastFocusedElement.focus();
    }

    function showDetail(place) {
        if (!place) return;
        lastFocusedElement = document.activeElement;
        scrollPosition = window.scrollY;
        detail.hidden = false;
        document.body.classList.add('collection-modal-open');
        document.body.style.top = '-' + scrollPosition + 'px';
        detail.innerHTML = '<div class="collection-sheet" role="dialog" aria-modal="true" aria-labelledby="public-place-detail-title" aria-label="Public Gathering Place Archive"><header class="collection-modal-header"><p class="museum-kicker">Public Gathering Place Archive</p><button type="button" class="collection-detail-close" data-close-public-place aria-label="Close public gathering place details"><i class="fa fa-times" aria-hidden="true"></i></button></header><div class="collection-sheet-scroll"><div class="collection-cover has-fallback" data-cover><div class="collection-cover-fallback"><i class="fa fa-users" aria-hidden="true"></i><span>Historical image coming soon</span></div></div><div class="collection-sheet-content"><h2 id="public-place-detail-title">' + escapeHtml(place.name) + '</h2><p class="collection-compound">Public Gathering Place</p><p class="collection-copy">' + escapeHtml(place.description) + '</p><p class="collection-book-cta">Read more from the book <i class="fa fa-arrow-right" aria-hidden="true"></i></p><a class="collection-map-link" href="village-map.html?location=' + encodeURIComponent(place.mapLocationId) + '">View on village map <i class="fa fa-arrow-right" aria-hidden="true"></i></a></div></div></div>';
        detail.querySelector('[data-close-public-place]').addEventListener('click', closeDetail);
        detail.querySelector('[data-close-public-place]').focus();
    }

    if (grid) {
        grid.innerHTML = window.publicGatheringPlaces.map(function (place) {
            return '<a class="collection-card public-gathering-card" id="public-gathering-place-' + escapeHtml(place.id) + '" href="village-map.html?location=' + encodeURIComponent(place.mapLocationId) + '" data-public-place-id="' + escapeHtml(place.id) + '"><div class="collection-card-image has-fallback"><div class="collection-card-icon"><i class="fa fa-users" aria-hidden="true"></i><span>Historical image coming soon</span></div></div><div class="collection-card-body"><p class="museum-kicker">Public gathering place</p><h2>' + escapeHtml(place.name) + '</h2><p>' + escapeHtml(place.description) + '</p><span class="public-gathering-card-action">Explore place <i class="fa fa-arrow-right" aria-hidden="true"></i></span></div></a>';
        }).join('');
    }

    if (homeGrid) {
        homeGrid.innerHTML = window.publicGatheringPlaces.map(function (place) {
            return '<div class="col-md-6 col-xl-4"><a href="village-map.html?location=' + encodeURIComponent(place.mapLocationId) + '" class="heritage-card" data-public-place-id="' + escapeHtml(place.id) + '" aria-label="View details for ' + escapeHtml(place.name) + '"><span class="collection-home-icon collection-home-image has-fallback"><i class="fa fa-users" aria-hidden="true"></i><span>Historical image coming soon</span></span><div class="heritage-card-label-bar"><span>' + escapeHtml(place.name) + '</span><small>View place history and map</small></div></a></div>';
        }).join('');
    }

    document.querySelectorAll('[data-public-place-id]').forEach(function (card) {
        card.addEventListener('click', function (event) {
            event.preventDefault();
            showDetail(window.publicGatheringPlaces.find(function (place) { return place.id === card.dataset.publicPlaceId; }));
        });
    });
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && !detail.hidden) closeDetail();
    });
    detail.addEventListener('click', function (event) {
        if (event.target === detail) closeDetail();
    });
}());
