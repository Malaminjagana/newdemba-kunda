(function () {
    'use strict';
    function escapeHtml(value) { return String(value).replace(/[&<>'"]/g, function (character) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]; }); }
    function renderCollection(sectionId, key, page) {
        const section = document.getElementById(sectionId);
        const grid = section && section.querySelector('.row.g-4');
        const collection = museumCollections[key];
        if (!grid || !collection) return;
        grid.innerHTML = collection.records.map(function (record) {
            const isLegacyRecord = Array.isArray(record);
            const isFamily = key === 'families';
            const isPond = key === 'ponds';
            const id = isLegacyRecord ? record[0] : record.id;
            const name = isLegacyRecord ? record[1] : record.name;
            const summary = isLegacyRecord ? record[4] : record.shortDescription;
            const image = !isLegacyRecord && record.image ? '<img src="' + escapeHtml(record.image) + '" alt="' + escapeHtml(record.imageAlt || record.name + ' historical photograph') + '" loading="lazy">' : '<i class="fa ' + collection.icon + '" aria-hidden="true"></i><span>Historical image coming soon</span>';
            return '<div class="col-md-6 col-xl-4"><a href="' + page + '?' + key + '=' + encodeURIComponent(id) + '" class="heritage-card" aria-label="Read the record for ' + escapeHtml(name) + '"><span class="collection-home-icon' + (isFamily || isPond ? ' collection-home-image' + (record.image ? '' : ' has-fallback') : '') + '">' + image + '</span><div class="heritage-card-label-bar"><span>' + escapeHtml(name) + '</span><small>' + escapeHtml(summary) + '</small></div></a></div>';
        }).join('');
        grid.querySelectorAll('.collection-home-image img').forEach(function (image) { image.addEventListener('error', function () { image.remove(); image.closest('.collection-home-image').classList.add('has-fallback'); }); });
    }
    renderCollection('families', 'families', 'families.html');
    renderCollection('farming-places', 'farming', 'farming.html');
    renderCollection('wells', 'wells', 'wells.html');
    renderCollection('ponds', 'ponds', 'ponds.html');
}());