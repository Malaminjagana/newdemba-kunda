document.addEventListener("DOMContentLoaded", function () {
    const query = new URLSearchParams(window.location.search);
    const familyId = query.get("family");
    const family = familyPlaces[familyId];
    const detailContainer = document.getElementById("family-detail-container");

    if (!family || !detailContainer) {
        return;
    }

    document.title = `${family.title} | New Demba Kunda Families`;
    document.querySelector('meta[name="description"]').setAttribute('content', family.metaDescription);

    const galleryItems = family.gallery.map((item, index) => {
        return `
            <div class="col-sm-6 col-lg-4 mb-4">
                <button class="family-gallery-item" data-index="${index}" aria-label="Open family image: ${item.caption}">
                    <img src="${item.src}" alt="${item.alt}" class="img-fluid rounded shadow-sm" loading="${item.loading}">
                    <div class="family-gallery-caption mt-2 text-muted">${item.caption}</div>
                </button>
            </div>
        `;
    }).join("");

    const quickInfoItems = family.quickInfo.map(item => {
        return `
            <div class="col-12 col-sm-6 col-lg-4 mb-3">
                <div class="heritage-quick-info p-3 rounded bg-light">
                    <strong>${item.label}</strong>
                    <div>${item.value}</div>
                </div>
            </div>
        `;
    }).join("");

    detailContainer.innerHTML = `
        <section class="container-fluid heritage-detail-hero py-5">
            <div class="container">
                <nav aria-label="Breadcrumb">
                    <ol class="breadcrumb bg-transparent p-0 mb-3">
                        <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                        <li class="breadcrumb-item"><a href="index.html#families">Families</a></li>
                        <li class="breadcrumb-item active" aria-current="page">${family.title}</li>
                    </ol>
                </nav>
                <div class="row align-items-center gy-4">
                    <div class="col-lg-6">
                        <div class="heritage-hero-card p-4 rounded shadow-sm bg-white">
                            <span class="badge bg-primary mb-3">${family.category}</span>
                            <h1 class="display-5 mb-3">${family.title}</h1>
                            <p class="lead text-muted mb-4">${family.intro}</p>
                            <div class="d-flex flex-wrap gap-2">
                                <a href="${family.donationUrl}" class="btn btn-primary">Donate</a>
                                <a href="index.html#families" class="btn btn-outline-dark">Back to Families</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="heritage-hero-image rounded overflow-hidden shadow-sm">
                            <img src="${family.heroImage}" alt="${family.heroAlt}" class="img-fluid w-100" loading="eager">
                            <div class="heritage-hero-caption p-3 bg-white border-top">${family.heroCaption}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="container-fluid heritage-detail-content py-5">
            <div class="container">
                <div class="row g-4">
                    <div class="col-lg-8">
                        <div class="card border-0 shadow-sm p-4 mb-4">
                            <h2>About This Family</h2>
                            <p class="text-muted">${family.description}</p>
                        </div>
                        <div class="card border-0 shadow-sm p-4 mb-4">
                            <h2>Family Values</h2>
                            <p class="text-muted">${family.importance}</p>
                        </div>
                        <div class="card border-0 shadow-sm p-4 mb-4">
                            <h2>Gallery</h2>
                            <div class="row">${galleryItems}</div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="card border-0 shadow-sm p-4 mb-4">
                            <h3 class="mb-4">Family Info</h3>
                            <div class="row">${quickInfoItems}</div>
                        </div>
                        <div class="card border-0 shadow-sm p-4 bg-primary text-white">
                            <h3 class="mb-3">Support This Family</h3>
                            <p>Donations help secure a better future for this family and the wider village community.</p>
                            <a href="${family.donationUrl}" class="btn btn-light mt-3">Donate</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div id="family-lightbox" class="heritage-lightbox d-none" aria-hidden="true">
            <button type="button" class="heritage-lightbox-close" aria-label="Close gallery"></button>
            <div class="heritage-lightbox-content">
                <button type="button" class="heritage-lightbox-nav heritage-lightbox-prev" aria-label="Previous image">&#10094;</button>
                <div class="heritage-lightbox-image-wrapper">
                    <img id="family-lightbox-image" src="" alt="" class="img-fluid">
                    <div id="family-lightbox-caption" class="heritage-lightbox-caption"></div>
                </div>
                <button type="button" class="heritage-lightbox-nav heritage-lightbox-next" aria-label="Next image">&#10095;</button>
            </div>
        </div>
    `;

    const lightbox = document.getElementById("family-lightbox");
    const lightboxImage = document.getElementById("family-lightbox-image");
    const lightboxCaption = document.getElementById("family-lightbox-caption");
    const galleryButtons = document.querySelectorAll(".family-gallery-item");
    let currentIndex = 0;

    function openLightbox(index) {
        const item = family.gallery[index];
        currentIndex = index;
        lightboxImage.src = item.src;
        lightboxImage.alt = item.alt;
        lightboxCaption.textContent = item.caption;
        lightbox.classList.remove("d-none");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
        galleryButtons.forEach(button => button.setAttribute("tabindex", "-1"));
    }

    function closeLightbox() {
        lightbox.classList.add("d-none");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        galleryButtons.forEach(button => button.removeAttribute("tabindex"));
    }

    function showNext() {
        const next = (currentIndex + 1) % family.gallery.length;
        openLightbox(next);
    }

    function showPrev() {
        const prev = (currentIndex - 1 + family.gallery.length) % family.gallery.length;
        openLightbox(prev);
    }

    galleryButtons.forEach(button => {
        button.addEventListener("click", () => openLightbox(parseInt(button.dataset.index, 10)));
    });

    document.querySelector(".heritage-lightbox-close").addEventListener("click", closeLightbox);
    document.querySelector(".heritage-lightbox-next").addEventListener("click", showNext);
    document.querySelector(".heritage-lightbox-prev").addEventListener("click", showPrev);

    document.addEventListener("keydown", function (event) {
        if (lightbox.classList.contains("d-none")) return;
        if (event.key === "Escape") closeLightbox();
        if (event.key === "ArrowRight") showNext();
        if (event.key === "ArrowLeft") showPrev();
    });

    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) closeLightbox();
    });
});