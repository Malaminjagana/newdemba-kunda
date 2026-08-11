document.addEventListener("DOMContentLoaded", function () {
    const query = new URLSearchParams(window.location.search);
    const forestId = query.get("forest");
    const forest = forestPlaces[forestId];
    const detailContainer = document.getElementById("forest-detail-container");

    if (!forest || !detailContainer) {
        return;
    }

    document.title = `${forest.title} | New Demba Kunda Farming Places`;
    document.querySelector('meta[name="description"]').setAttribute('content', forest.metaDescription);

    const galleryItems = forest.gallery.map((item, index) => {
        return `
            <div class="col-sm-6 col-lg-4 mb-4">
                <button class="forest-gallery-item btn p-0 text-start" data-index="${index}" aria-label="View image: ${item.caption}">
                    <img src="${item.src}" alt="${item.alt}" class="img-fluid rounded shadow-sm" loading="${item.loading}">
                    <div class="mt-2 text-muted">${item.caption}</div>
                </button>
            </div>
        `;
    }).join("");

    const quickInfoItems = forest.quickInfo.map(item => {
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
                        <li class="breadcrumb-item"><a href="index.html#farming-places">Farming Places</a></li>
                        <li class="breadcrumb-item active" aria-current="page">${forest.title}</li>
                    </ol>
                </nav>
                <div class="row align-items-center gy-4">
                    <div class="col-lg-6">
                        <div class="heritage-hero-card p-4 rounded shadow-sm bg-white">
                            <h1 class="display-5 mb-3">${forest.title}</h1>
                            <p class="lead text-muted mb-4">${forest.intro}</p>
                            <p class="text-muted mb-4">${forest.description}</p>
                            <div class="d-flex flex-wrap gap-2">
                                <a href="${forest.donationUrl}" class="btn btn-primary">Donate</a>
                                <a href="index.html#farming-places" class="btn btn-outline-dark">Back to Forests</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="heritage-hero-image rounded overflow-hidden shadow-sm">
                            <img src="${forest.heroImage}" alt="${forest.heroAlt}" class="img-fluid w-100" loading="eager">
                            <div class="heritage-hero-caption p-3 bg-white border-top">${forest.heroCaption}</div>
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
                            <h2>Forest Gallery</h2>
                            <div class="row">${galleryItems}</div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="card border-0 shadow-sm p-4 mb-4">
                            <h3 class="mb-4">Forest Info</h3>
                            <div class="row">${quickInfoItems}</div>
                        </div>
                        <div class="card border-0 shadow-sm p-4 bg-primary text-white">
                            <h3 class="mb-3">Support This Place</h3>
                            <p>Help protect this forest and support farming families working to keep the land healthy.</p>
                            <a href="${forest.donationUrl}" class="btn btn-light mt-3">Donate</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div id="forest-lightbox" class="heritage-lightbox d-none" aria-hidden="true">
            <button type="button" class="heritage-lightbox-close" aria-label="Close gallery">&times;</button>
            <div class="heritage-lightbox-content">
                <button type="button" class="heritage-lightbox-nav heritage-lightbox-prev" aria-label="Previous image">&#10094;</button>
                <div class="heritage-lightbox-image-wrapper">
                    <img id="forest-lightbox-image" src="" alt="" class="img-fluid rounded">
                    <div id="forest-lightbox-caption" class="heritage-lightbox-caption"></div>
                </div>
                <button type="button" class="heritage-lightbox-nav heritage-lightbox-next" aria-label="Next image">&#10095;</button>
            </div>
        </div>
    `;

    const lightbox = document.getElementById("forest-lightbox");
    const lightboxImage = document.getElementById("forest-lightbox-image");
    const lightboxCaption = document.getElementById("forest-lightbox-caption");
    const galleryButtons = document.querySelectorAll(".forest-gallery-item");
    let currentIndex = 0;

    function openLightbox(index) {
        const item = forest.gallery[index];
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
        openLightbox((currentIndex + 1) % forest.gallery.length);
    }

    function showPrev() {
        openLightbox((currentIndex - 1 + forest.gallery.length) % forest.gallery.length);
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
