(function () {
    'use strict';
    function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, function (character) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]; }); }
    function renderCollection(sectionId, key, page) {
        const section = document.getElementById(sectionId);
        const grid = section && section.querySelector('.row.g-4');
        const collection = museumCollections[key];
        if (!grid || !collection) return;
        grid.innerHTML = collection.records.map(function (record) {
            const isFamily = key === 'families';
            const id = isFamily ? record.id : record[0];
            const name = isFamily ? record.name : record[1];
            const summary = isFamily ? record.shortDescription : record[4];
            const image = isFamily ? '<img src="' + escapeHtml(record.heroImage) + '" alt="' + escapeHtml(record.heroAlt) + '" loading="lazy">' : '<i class="fa ' + collection.icon + '" aria-hidden="true"></i>';
            return '<div class="col-md-6 col-xl-4"><a href="' + page + '?' + key + '=' + encodeURIComponent(id) + '" class="heritage-card" aria-label="Read the record for ' + escapeHtml(name) + '"><span class="collection-home-icon' + (isFamily ? ' collection-home-image' : '') + '">' + image + '</span><div class="heritage-card-label-bar"><span>' + escapeHtml(name) + '</span><small>' + escapeHtml(summary) + '</small></div></a></div>';
        }).join('');
        grid.querySelectorAll('.collection-home-image img').forEach(function (image) { image.addEventListener('error', function () { image.closest('.collection-home-image').classList.add('has-fallback'); }); });
    }
    renderCollection('families', 'families', 'families.html');
    renderCollection('farming-places', 'farming', 'farming.html');
    renderCollection('wells', 'wells', 'wells.html');
}());