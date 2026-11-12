(function () {
    "use strict";

    var navbar = document.querySelector(".ndk-navbar");
    if (!navbar) {
        return;
    }

    var menuToggle = navbar.querySelector(".ndk-menu-toggle");
    var dropdownToggles = Array.prototype.slice.call(navbar.querySelectorAll(".ndk-dropdown-toggle"));
    var backdrop;

    function closeDropdowns(except) {
        dropdownToggles.forEach(function (toggle) {
            var dropdown = toggle.closest(".ndk-nav-dropdown");
            var menu = dropdown && dropdown.querySelector(".ndk-dropdown-menu");
            if (!dropdown || dropdown === except) {
                return;
            }
            dropdown.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
            if (menu) {
                menu.hidden = true;
            }
        });
    }

    function closeMenu(returnFocus) {
        navbar.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
        closeDropdowns();
        if (backdrop) {
            backdrop.remove();
            backdrop = null;
        }
        if (returnFocus) {
            menuToggle.focus();
        }
    }

    function openMenu() {
        navbar.classList.add("is-open");
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation menu");
        backdrop = document.createElement("button");
        backdrop.type = "button";
        backdrop.className = "ndk-nav-backdrop";
        backdrop.setAttribute("aria-label", "Close navigation menu");
        backdrop.addEventListener("click", function () {
            closeMenu(true);
        });
        document.body.appendChild(backdrop);
        navbar.querySelector(".ndk-nav-link").focus();
    }

    menuToggle.addEventListener("click", function () {
        if (navbar.classList.contains("is-open")) {
            closeMenu(false);
        } else {
            openMenu();
        }
    });

    dropdownToggles.forEach(function (toggle) {
        toggle.addEventListener("click", function () {
            var dropdown = toggle.closest(".ndk-nav-dropdown");
            var menu = dropdown && dropdown.querySelector(".ndk-dropdown-menu");
            if (!dropdown || !menu) {
                return;
            }
            var shouldOpen = !dropdown.classList.contains("is-open");
            closeDropdowns(dropdown);
            dropdown.classList.toggle("is-open", shouldOpen);
            toggle.setAttribute("aria-expanded", String(shouldOpen));
            menu.hidden = !shouldOpen;
        });
    });

    navbar.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            closeMenu(false);
        });
    });

    document.addEventListener("click", function (event) {
        if (!navbar.contains(event.target)) {
            closeDropdowns();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            if (navbar.classList.contains("is-open")) {
                closeMenu(true);
            } else {
                var openToggle = navbar.querySelector(".ndk-nav-dropdown.is-open .ndk-dropdown-toggle");
                closeDropdowns();
                if (openToggle) {
                    openToggle.focus();
                }
            }
            return;
        }

        if (event.key === "Tab" && navbar.classList.contains("is-open")) {
            var focusable = Array.prototype.slice.call(navbar.querySelectorAll("a[href], button:not([disabled])"))
                .filter(function (element) {
                    return element.getClientRects().length > 0;
                });
            var first = focusable[0];
            var last = focusable[focusable.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 1050 && backdrop) {
            backdrop.remove();
            backdrop = null;
            navbar.classList.remove("is-open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            closeDropdowns();
        }
    });
})();
