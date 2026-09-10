(function () {
    'use strict';
    const grid = document.querySelector('[data-story-grid]');
    const detail = document.querySelector('[data-story-detail]');
    const filters = document.querySelector('[data-story-filters]');
    const count = document.querySelector('[data-story-count]');
    const search = document.querySelector('[data-story-search]');
    let activeCategory = 'All';
    function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, function (character) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]; }); }
    function filteredStories() { const term = search.value.trim().toLowerCase(); return historyStories.filter(function (story) { const matchesCategory = activeCategory === 'All' || story.category === activeCategory; const searchable = [story.title, story.teaser, story.description, story.category].concat(story.people, story.places).join(' ').toLowerCase(); return matchesCategory && searchable.indexOf(term) !== -1; }); }
    function renderDetail(story) {
        if (!story) { detail.hidden = true; detail.innerHTML = ''; return; }
        detail.hidden = false;
        detail.innerHTML = '<button class="museum-detail-close" type="button" data-close-story aria-label="Close story detail"><i class="fa fa-times" aria-hidden="true"></i></button><p class="museum-kicker">' + escapeHtml(story.category) + '</p><h2 id="story-detail-title">' + escapeHtml(story.title) + '</h2><p class="museum-period">' + escapeHtml(story.period) + '</p><p class="museum-detail-copy">' + escapeHtml(story.description) + '</p><div class="museum-detail-meta"><div><strong>Related people</strong><span>' + (story.people.length ? story.people.map(escapeHtml).join(', ') : 'Information not yet documented.') + '</span></div><div><strong>Related places</strong><span>' + (story.places.length ? story.places.map(escapeHtml).join(', ') : 'Information not yet documented.') + '</span></div><div><strong>Source</strong><span>' + escapeHtml(story.source) + '</span></div></div><div class="museum-media-note"><i class="far fa-image" aria-hidden="true"></i><span>Historical photographs, video and audio are not yet documented for this record.</span></div>' + (HISTORY_BOOK_URL ? '<a class="btn btn-primary" href="' + escapeHtml(HISTORY_BOOK_URL) + '" target="_blank" rel="noopener noreferrer">Read the history book <i class="fa fa-external-link-alt ms-2" aria-hidden="true"></i></a>' : '<p class="museum-book-note">The original history book link has not yet been configured.</p>');
        detail.querySelector('[data-close-story]').addEventListener('click', function () { renderDetail(); });
        detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    function renderStories() {
        const stories = filteredStories(); count.textContent = stories.length + ' record' + (stories.length === 1 ? '' : 's');
        grid.innerHTML = stories.map(function (story) { return '<article class="museum-story-card"><div class="museum-story-card-top"><p class="museum-kicker">' + escapeHtml(story.category) + '</p><p class="museum-period">' + escapeHtml(story.period) + '</p></div><h2>' + escapeHtml(story.title) + '</h2><p>' + escapeHtml(story.teaser) + '</p><div class="museum-story-card-footer"><span>' + escapeHtml(story.source) + '</span><button type="button" data-story-id="' + escapeHtml(story.id) + '">Read the full story <i class="fa fa-arrow-right" aria-hidden="true"></i></button></div></article>'; }).join('') || '<p class="museum-empty">No archival records match this search.</p>';
        grid.querySelectorAll('[data-story-id]').forEach(function (button) { button.addEventListener('click', function () { renderDetail(historyStories.find(function (story) { return story.id === button.dataset.storyId; })); }); });
    }
    filters.addEventListener('click', function (event) { const button = event.target.closest('[data-category]'); if (!button) return; activeCategory = button.dataset.category; filters.querySelectorAll('button').forEach(function (item) { item.classList.toggle('is-active', item === button); item.setAttribute('aria-pressed', item === button ? 'true' : 'false'); }); renderStories(); });
    search.addEventListener('input', renderStories);
    renderStories();
    const requestedStoryId = new URLSearchParams(window.location.search).get('story');
    if (requestedStoryId) renderDetail(historyStories.find(function (story) { return story.id === requestedStoryId; }));
}());