document.addEventListener("DOMContentLoaded", function () {
    const query = new URLSearchParams(window.location.search);
    const wellId = query.get("well");
    const well = wellPlaces[wellId];
    const detailContainer = document.getElementById("well-detail-container");

    if (!well || !detailContainer) {
        return;
    }

    document.title = `${well.title} | New Demba Kunda Wells`;
    document.querySelector('meta[name="description"]').setAttribute('content', well.metaDescription);

    const galleryItems = well.gallery.map((item, index) => {
        return `
            <div class="col-sm-6 col-lg-4 mb-4">
                <button class="well-gallery-item btn p-0 text-start" data-index="${index}" aria-label="View image: ${item.caption}">
                    <img src="${item.src}" alt="${item.alt}" class="img-fluid rounded shadow-sm" loading="${item.loading}">
                    <div class="mt-2 text-muted">${item.caption}</div>
                </button>
            </div>
        `;
    }).join("");

    const quickInfoItems = well.quickInfo.map(item => {
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
                        <li class="breadcrumb-item"><a href="index.html#wells">Wells</a></li>
                        <li class="breadcrumb-item active" aria-current="page">${well.title}</li>
                    </ol>
                </nav>
                <div class="row align-items-center gy-4">
                    <div class="col-lg-6">
                        <div class="heritage-hero-card p-4 rounded shadow-sm bg-white">
                            <h1 class="display-5 mb-3">${well.title}</h1>
                            <p class="lead text-muted mb-4">${well.intro}</p>
                            <p class="text-muted mb-4">${well.description}</p>
                            <div class="d-flex flex-wrap gap-2">
                                <a href="${well.donationUrl}" class="btn btn-primary">Donate</a>
                                <a href="index.html#wells" class="btn btn-outline-dark">Back to Wells</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="heritage-hero-image rounded overflow-hidden shadow-sm">
                            <img src="${well.heroImage}" alt="${well.heroAlt}" class="img-fluid w-100" loading="eager">
                            <div class="heritage-hero-caption p-3 bg-white border-top">${well.heroCaption}</div>
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
                            <h2>Well Gallery</h2>
                            <div class="row">${galleryItems}</div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="card border-0 shadow-sm p-4 mb-4">
                            <h3 class="mb-4">Well Info</h3>
                            <div class="row">${quickInfoItems}</div>
                        </div>
                        <div class="card border-0 shadow-sm p-4 bg-primary text-white">
                            <h3 class="mb-3">Support This Well</h3>
                            <p>Help maintain this water source and keep the village wells running safely.</p>
                            <a href="${well.donationUrl}" class="btn btn-light mt-3">Donate</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div id="well-lightbox" class="heritage-lightbox d-none" aria-hidden="true">
            <button type="button" class="heritage-lightbox-close" aria-label="Close gallery">&times;</button>
            <div class="heritage-lightbox-content">
                <button type="button" class="heritage-lightbox-nav heritage-lightbox-prev" aria-label="Previous image">&#10094;</button>
                <div class="heritage-lightbox-image-wrapper">
                    <img id="well-lightbox-image" src="" alt="" class="img-fluid rounded">
                    <div id="well-lightbox-caption" class="heritage-lightbox-caption"></div>
                </div>
                <button type="button" class="heritage-lightbox-nav heritage-lightbox-next" aria-label="Next image">&#10095;</button>
            </div>
        </div>
    `;

    const lightbox = document.getElementById("well-lightbox");
    const lightboxImage = document.getElementById("well-lightbox-image");
    const lightboxCaption = document.getElementById("well-lightbox-caption");
    const galleryButtons = document.querySelectorAll(".well-gallery-item");
    let currentIndex = 0;

    function openLightbox(index) {
        const item = well.gallery[index];
        currentIndex = index;
        lightboxImage.src = item.src;
        lightboxImage.alt = item.alt;
        lightboxCaption.textContent = item.caption;
        lightbox.classList.remove("d-none");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        lightbox.classList.add("d-none");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    function showNext() {
        openLightbox((currentIndex + 1) % well.gallery.length);
    }

    function showPrev() {
        openLightbox((currentIndex - 1 + well.gallery.length) % well.gallery.length);
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
