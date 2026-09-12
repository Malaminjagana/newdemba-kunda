(function () {
    'use strict';
    const key = document.body.dataset.collection;
    const collection = museumCollections[key];
    const grid = document.querySelector('[data-collection-grid]');
    const detail = document.querySelector('[data-collection-detail]');
    if (!collection || !grid || !detail) return;
    document.body.appendChild(detail);
    const navigationToggle = document.querySelector('.navbar-toggler');
    const navigation = document.getElementById('family-navigation');
    if (navigationToggle && navigation) {
        navigationToggle.addEventListener('click', function () {
            const isOpen = navigation.classList.toggle('is-open');
            navigationToggle.setAttribute('aria-expanded', String(isOpen));
        });
        navigation.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navigation.classList.remove('is-open');
                navigationToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
    function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, function (character) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]; }); }
    let lastFocusedElement = null;
    let scrollPosition = 0;
    function recordFromId(id) { return collection.records.find(function (record) { return record.id === id; }); }
    function imageMarkup(record, loading) {
        if (!record.image) return '';
        return '<img src="' + escapeHtml(record.image) + '" alt="' + escapeHtml(record.imageAlt || record.name + ' historical photograph') + '"' + (loading ? ' loading="' + loading + '"' : '') + ' data-cover-image>';
    }
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
        const coverClass = record.image ? 'collection-cover' : 'collection-cover has-fallback';
        const isPond = key === 'ponds';
        const detailLabel = isPond ? 'Pond Archive' : 'Family Archive';
        const detailAction = isPond ? 'Close pond details' : 'Close family details';
        const location = isPond ? '' : '<p class="collection-neighbourhood">' + escapeHtml(record.neighborhood) + '</p>';
        const compound = isPond ? '' : '<p class="collection-compound">' + escapeHtml(record.compoundNumber) + '</p>';
        const description = record.description ? '<p class="collection-copy">' + escapeHtml(record.description) + '</p>' : '';
        detail.innerHTML = '<div class="collection-sheet" role="dialog" aria-modal="true" aria-labelledby="collection-detail-title" aria-label="' + detailLabel + '"><header class="collection-modal-header"><p class="museum-kicker">' + detailLabel + '</p><button type="button" class="collection-detail-close" data-close-detail aria-label="' + detailAction + '"><i class="fa fa-times" aria-hidden="true"></i></button></header><div class="collection-sheet-scroll"><div class="' + coverClass + '" data-cover>' + imageMarkup(record) + '<div class="collection-cover-fallback"><i class="fa ' + collection.icon + '" aria-hidden="true"></i><span>Historical image coming soon</span></div></div><div class="collection-sheet-content"><h2 id="collection-detail-title">' + escapeHtml(record.name) + '</h2>' + compound + location + description + bookCtaMarkup() + (record.mapLocationId ? '<a class="collection-map-link" href="village-map.html?location=' + encodeURIComponent(record.mapLocationId) + '">View on village map <i class="fa fa-arrow-right" aria-hidden="true"></i></a>' : '') + '<p class="collection-media"><i class="far fa-image" aria-hidden="true"></i> Historical photographs and media for this record are not yet documented.</p></div></div></div>';
        const close = function () { showDetail(); history.replaceState(null, '', window.location.pathname); };
        detail.querySelector('[data-close-detail]').addEventListener('click', close);
        const coverImageElement = detail.querySelector('[data-cover-image]');
        if (coverImageElement) coverImageElement.addEventListener('error', function () { coverImageElement.remove(); detail.querySelector('[data-cover]').classList.add('has-fallback'); });
        detail.querySelector('[data-close-detail]').focus();
        history.replaceState(null, '', '?' + key + '=' + encodeURIComponent(record.id));
    }
    const isPond = key === 'ponds';
    grid.innerHTML = collection.records.map(function (record) { const cardImage = record.image ? imageMarkup(record, 'lazy') : ''; const metadata = isPond ? '' : '<p class="museum-kicker">' + escapeHtml(record.compoundNumber) + '</p><p class="collection-card-neighbourhood">' + escapeHtml(record.neighborhood) + '</p>'; const action = isPond ? 'Explore pond' : 'Explore family'; return '<article class="collection-card"><div class="collection-card-image' + (record.image ? '' : ' has-fallback') + '" data-cover>' + cardImage + '<div class="collection-card-icon"><i class="fa ' + collection.icon + '" aria-hidden="true"></i><span>Historical image coming soon</span></div></div><div class="collection-card-body"><h2>' + escapeHtml(record.name) + '</h2>' + metadata + '<p>' + escapeHtml(record.shortDescription) + '</p><button type="button" data-record-id="' + escapeHtml(record.id) + '">' + action + ' <i class="fa fa-arrow-right" aria-hidden="true"></i></button></div></article>'; }).join('');
    grid.querySelectorAll('.collection-card-image img').forEach(function (image) { image.addEventListener('error', function () { image.remove(); image.closest('.collection-card-image').classList.add('has-fallback'); }); });
    grid.querySelectorAll('[data-record-id]').forEach(function (button) { button.addEventListener('click', function () { showDetail(recordFromId(button.dataset.recordId)); }); });
    document.addEventListener('keydown', function (event) { if (event.key === 'Escape' && !detail.hidden) showDetail(); });
    detail.addEventListener('click', function (event) { if (event.target === detail) showDetail(); });
    showDetail(recordFromId(new URLSearchParams(window.location.search).get(key)));
}());