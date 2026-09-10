(function () {
    'use strict';
    const key = document.body.dataset.collection;
    const collection = museumCollections[key];
    const grid = document.querySelector('[data-collection-grid]');
    const detail = document.querySelector('[data-collection-detail]');
    if (!collection || !grid || !detail) return;
    document.body.appendChild(detail);
    function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, function (character) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]; }); }
    let lastFocusedElement = null;
    let scrollPosition = 0;
    function recordFromId(id) { return collection.records.find(function (record) { return record.id === id; }); }
    function lockPageScroll() {
        scrollPosition = window.scrollY;
        document.body.classList.add('collection-modal-open');
        document.body.style.top = '-' + scrollPosition + 'px';
    }
    function unlockPageScroll() {
        document.body.classList.remove('collection-modal-open');
        document.body.style.top = '';
        window.scrollTo(0, scrollPosition);
    }
    function bookCtaMarkup() {
        return window.HISTORY_BOOK_URL ? '<a class="collection-book-cta" href="' + escapeHtml(window.HISTORY_BOOK_URL) + '" target="_blank" rel="noopener noreferrer">Read more from the book <i class="fa fa-arrow-right" aria-hidden="true"></i></a>' : '<p class="collection-book-cta">Read more from the book <i class="fa fa-arrow-right" aria-hidden="true"></i></p>';
    }
    function showDetail(record) {
        if (!record) { detail.hidden = true; detail.innerHTML = ''; unlockPageScroll(); if (lastFocusedElement) lastFocusedElement.focus(); return; }
        lastFocusedElement = document.activeElement;
        detail.hidden = false;
        lockPageScroll();
        detail.innerHTML = '<div class="collection-sheet" role="dialog" aria-modal="true" aria-labelledby="collection-detail-title" aria-label="Family archive record"><header class="collection-modal-header"><p class="museum-kicker">Family Archive</p><button type="button" class="collection-detail-close" data-close-detail aria-label="Close family details"><i class="fa fa-times" aria-hidden="true"></i></button></header><div class="collection-sheet-scroll"><div class="collection-cover" data-cover><img src="' + escapeHtml(record.heroImage) + '" alt="' + escapeHtml(record.heroAlt) + '" data-cover-image><div class="collection-cover-fallback"><i class="fa ' + collection.icon + '" aria-hidden="true"></i><span>Historical image coming soon</span></div></div><div class="collection-sheet-content"><h2 id="collection-detail-title">' + escapeHtml(record.name) + '</h2><p class="collection-compound">' + escapeHtml(record.compoundNumber) + '</p><p class="collection-neighbourhood">' + escapeHtml(record.neighborhood) + '</p><p class="collection-copy">' + escapeHtml(record.description) + '</p>' + bookCtaMarkup() + (record.mapLocationId ? '<a class="collection-map-link" href="village-map.html?location=' + encodeURIComponent(record.mapLocationId) + '">View on village map <i class="fa fa-arrow-right" aria-hidden="true"></i></a>' : '') + '<p class="collection-media"><i class="far fa-image" aria-hidden="true"></i> Historical photographs and media for this record are not yet documented.</p></div></div></div>';
        const close = function () { showDetail(); history.replaceState(null, '', window.location.pathname); };
        detail.querySelector('[data-close-detail]').addEventListener('click', close);
        detail.querySelector('[data-cover-image]').addEventListener('error', function () { detail.querySelector('[data-cover]').classList.add('has-fallback'); });
        detail.querySelector('[data-close-detail]').focus();
        history.replaceState(null, '', '?' + key + '=' + encodeURIComponent(record.id));
    }
    grid.innerHTML = collection.records.map(function (record) { return '<article class="collection-card"><div class="collection-card-image" data-cover><img src="' + escapeHtml(record.heroImage) + '" alt="' + escapeHtml(record.heroAlt) + '" loading="lazy"><div class="collection-card-icon"><i class="fa ' + collection.icon + '" aria-hidden="true"></i><span>Historical image coming soon</span></div></div><div class="collection-card-body"><h2>' + escapeHtml(record.name) + '</h2><p class="museum-kicker">' + escapeHtml(record.compoundNumber) + '</p><p class="collection-card-neighbourhood">' + escapeHtml(record.neighborhood) + '</p><p>' + escapeHtml(record.shortDescription) + '</p><button type="button" data-record-id="' + escapeHtml(record.id) + '">Explore family <i class="fa fa-arrow-right" aria-hidden="true"></i></button></div></article>'; }).join('');
    grid.querySelectorAll('.collection-card-image img').forEach(function (image) { image.addEventListener('error', function () { image.closest('.collection-card-image').classList.add('has-fallback'); }); });
    grid.querySelectorAll('[data-record-id]').forEach(function (button) { button.addEventListener('click', function () { showDetail(recordFromId(button.dataset.recordId)); }); });
    document.addEventListener('keydown', function (event) { if (event.key === 'Escape' && !detail.hidden) showDetail(); });
    detail.addEventListener('click', function (event) { if (event.target === detail) showDetail(); });
    showDetail(recordFromId(new URLSearchParams(window.location.search).get(key)));
}());