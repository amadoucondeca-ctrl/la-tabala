document.addEventListener("DOMContentLoaded", function(){

    const menuButton = document.getElementById("mobileMenu");
    const nav = document.getElementById("mainNav");

    if(menuButton){
        menuButton.addEventListener("click", function(){
            nav.classList.toggle("open");
        });
    }

    document.querySelectorAll(".main-nav a").forEach(function(link){
        link.addEventListener("click", function(){
            nav.classList.remove("open");
        });
    });


    /* ================================================
       VIDEO
    ================================================= */

    const videoButton = document.getElementById("videoButton");
    const videoModal = document.getElementById("videoModal");
    const closeVideo = document.getElementById("closeVideo");

    if(videoButton && videoModal){
        videoButton.addEventListener("click", function(){
            videoModal.classList.add("show");
        });
    }

    if(closeVideo && videoModal){
        closeVideo.addEventListener("click", function(){
            videoModal.classList.remove("show");
        });
    }

    if(videoModal){
        videoModal.addEventListener("click", function(e){
            if(e.target === videoModal){
                videoModal.classList.remove("show");
            }
        });
    }


    /* ================================================
       ACTIVE MENU
    ================================================= */

    const sections = document.querySelectorAll("section[id]");
    const menuLinks = document.querySelectorAll(".main-nav a");

    window.addEventListener("scroll", function(){

        let current = "";

        sections.forEach(function(section){

            const sectionTop = section.offsetTop - 120;

            if(window.scrollY >= sectionTop){
                current = section.getAttribute("id");
            }

        });

        menuLinks.forEach(function(link){

            link.classList.remove("active");

            if(link.getAttribute("href") === "#" + current){
                link.classList.add("active");
            }

        });

    });

});

/* =========================================================
   NOS ICÔNES — CARROUSEL 5 PHOTOS / 4 CARTES
========================================================= */
document.addEventListener("DOMContentLoaded", function () {

    const icones = [
        {
            file: "icone/ABD.png",
            name: "Abdoulaye Bobo Diallo",
            function: "Chirurgien urologue",
            prize: "Le Grand Prix de l’ONG LA TABALA 2023"
        },
        {
            file: "icone/AK.png",
            name: "Dr. Kaba Abdoulaye",
            function: "Président de l’ONG LA TABALA",
            prize: "Président de l’ONG LA TABALA"
        },
        {
            file: "icone/FFM.png",
            name: "Lieutenant-Colonel Fofana Fodé Momo",
            function: "Biologiste",
            prize: "Distinction de l’ONG LA TABALA"
        },
        {
            file: "icone/HB.png",
            name: "Dr Houdy Bah",
            function: "Professionnelle de santé",
            prize: "Honorée par LA TABALA — message aux Guinéens en Pular"
        },
        {
            file: "icone/MFD.png",
            name: "Lieutenant-Colonel Fodé Momo",
            function: "Biologiste",
            prize: "Le Grand Prix de l’ONG LA TABALA 2023 — 8ᵉ édition"
        },
        {
            file: "icone/DR Moussa DIOUBATE.jpeg",
            name: "Dr Moussa DIOUBATE",
            function: "Spécialiste en médecine sociale et management de la Santé",
            prize: "Icône de l’ONG LA TABALA"
        }
    ];

    const cards = [0, 1, 2, 3].map(function (i) {
        return {
            image: document.getElementById("iconeImage" + i),
            name: document.getElementById("iconeName" + i),
            tag: document.getElementById("iconeTag" + i),
            prize: document.getElementById("iconePrize" + i)
        };
    });

    const dots = document.querySelectorAll("#iconeDots .dot");

    if (cards.some(function (card) {
        return !card.image || !card.name || !card.tag || !card.prize;
    })) {
        return;
    }

    let currentIndex = 0;

    function afficherIcone(card, data) {
        card.image.src = data.file;
        card.image.alt = data.name;
        card.name.textContent = data.name;
        card.tag.textContent = data.function;
        card.prize.textContent = data.prize;
    }

    function afficherPaire() {

        cards.forEach(function (card, position) {

            const index = (currentIndex + position) % icones.length;

            afficherIcone(
                card,
                icones[index]
            );
        });

        dots.forEach(function (dot, index) {
            dot.classList.toggle(
                "active",
                index === currentIndex
            );
        });
    }

    /* Précharger les 5 images avant le premier affichage */
    const prechargement = icones.map(function (icone) {
        return new Promise(function (resolve) {
            const image = new Image();

            image.onload = resolve;
            image.onerror = resolve;
            image.src = icone.file;
        });
    });

    Promise.all(prechargement).then(function () {

        afficherPaire();

        setInterval(function () {

            currentIndex =
                (currentIndex + 1) % icones.length;

            afficherPaire();

        }, 4500);

    });

    dots.forEach(function (dot) {

        dot.addEventListener("click", function () {

            const index = parseInt(
                dot.getAttribute("data-icone-slide"),
                10
            );

            if (isNaN(index)) return;

            currentIndex = index;
            afficherPaire();

        });

    });

});

/* =========================================================
   DEFILEMENT AUTOMATIQUE - NOS PROJETS
========================================================= */
document.addEventListener("DOMContentLoaded", function(){

    const projectList = document.querySelector(".project-list");

    if(!projectList) return;

    let position = 0;
    let lastTime = null;
    const speed = 35;

    function animateProjects(timestamp){

        if(lastTime === null){
            lastTime = timestamp;
        }

        const elapsed = timestamp - lastTime;
        lastTime = timestamp;

        position += speed * elapsed / 1000;

        const firstCard = projectList.querySelector(".project-card");

        if(firstCard){
            const cardWidth = firstCard.offsetWidth + 12;

            if(position >= cardWidth){
                projectList.appendChild(firstCard);
                position -= cardWidth;
            }

            projectList.scrollLeft = position;
        }

        requestAnimationFrame(animateProjects);
    }

    /* Attendre le chargement complet avant de mesurer les cartes */
    window.addEventListener("load", function () {

        requestAnimationFrame(function () {
            requestAnimationFrame(animateProjects);
        });

    });

});

/* =========================================================
   DEFILEMENT AUTOMATIQUE - ACTUALITES
========================================================= */
document.addEventListener("DOMContentLoaded", function(){

    const newsGrid = document.querySelector(".news-grid");

    if(!newsGrid) return;

    let position = 0;
    let lastTime = null;
    const speed = 35;

    function animateNews(timestamp){

        if(lastTime === null){
            lastTime = timestamp;
        }

        const elapsed = timestamp - lastTime;
        lastTime = timestamp;

        position += speed * elapsed / 1000;

        const firstCard = newsGrid.querySelector(".news-card");

        if(firstCard){
            const cardWidth = firstCard.offsetWidth + 12;

            if(position >= cardWidth){
                newsGrid.appendChild(firstCard);
                position -= cardWidth;
            }

            newsGrid.scrollLeft = position;
        }

        requestAnimationFrame(animateNews);
    }

    requestAnimationFrame(animateNews);

});






/* =========================================================
   HERO - CARROUSEL 6 IMAGES - VERSION STABLE
========================================================= */
document.addEventListener("DOMContentLoaded", function(){

    const heroPhoto = document.querySelector(".hero-photo");

    if(!heroPhoto) return;

    const heroImages = [
        "images/hero/hero-infrastructure.jpg",
        "images/hero/hero-sante-communautaire.jpg",
        "images/hero/hero-soins-enfant.jpg",
        "images/hero/hero-sante-1.jpg",
        "images/hero/hero-agriculture.jpg",
        "images/hero/hero-education.jpg"
    ];

    let currentImage = 0;
    let isAnimating = false;

    const slide = document.createElement("div");
    slide.className = "hero-slide";

    heroPhoto.appendChild(slide);

    function showNext(){

        if(isAnimating) return;

        isAnimating = true;

        const nextImage =
            (currentImage + 1) % heroImages.length;

        /* Nouvelle image placée à droite */
        slide.classList.remove("active");

        slide.style.transition = "none";

        slide.style.transform = "translateX(100%)";

        slide.style.backgroundImage =
            'url("' + heroImages[nextImage] + '")';

        /* Force le navigateur à prendre en compte la position */
        void slide.offsetWidth;

        /* Animation droite -> gauche */
        slide.style.transition =
            "transform 1.4s cubic-bezier(.65,0,.35,1)";

        requestAnimationFrame(function(){

            slide.classList.add("active");

        });

        /* Une fois l'image arrivée */
        setTimeout(function(){

            heroPhoto.style.setProperty(
                "background-image",
                'url("' + heroImages[nextImage] + '")',
                "important"
            );

            slide.classList.remove("active");

            slide.style.transition = "none";
            slide.style.transform = "translateX(100%)";

            currentImage = nextImage;

            isAnimating = false;

        }, 1450);
    }

    /* Première transition après 7 secondes */
    setInterval(showNext, 7000);

});

/* =========================================================
   HERO - CARROUSEL 6 IMAGES - DOUBLE COUCHE
========================================================= */
document.addEventListener("DOMContentLoaded", function(){

    const heroPhoto = document.querySelector(".hero-photo");

    if(!heroPhoto) return;

    const heroImages = [
        "images/hero/hero-infrastructure.jpg",
        "images/hero/hero-sante-communautaire.jpg",
        "images/hero/hero-soins-enfant.jpg",
        "images/hero/hero-sante-1.jpg",
        "images/hero/hero-agriculture.jpg",
        "images/hero/hero-education.jpg"
    ];

    let currentImage = 0;
    let nextImage = 1;
    let activeLayer = 0;

    heroPhoto.style.setProperty(
        "background-image",
        "none",
        "important"
    );

    const layer1 = document.createElement("div");
    const layer2 = document.createElement("div");

    layer1.className = "hero-slide hero-layer-1 active";
    layer2.className = "hero-slide hero-layer-2";

    layer1.style.backgroundImage =
        'url("' + heroImages[0] + '")';

    layer2.style.backgroundImage =
        'url("' + heroImages[1] + '")';

    heroPhoto.appendChild(layer1);
    heroPhoto.appendChild(layer2);

    function changeImage(){

        const currentLayer =
            activeLayer === 0 ? layer1 : layer2;

        const incomingLayer =
            activeLayer === 0 ? layer2 : layer1;

        nextImage =
            (currentImage + 1) % heroImages.length;

        incomingLayer.style.backgroundImage =
            'url("' + heroImages[nextImage] + '")';

        incomingLayer.classList.remove("active");
        incomingLayer.classList.add("entering");

        void incomingLayer.offsetWidth;

        incomingLayer.classList.add("active");

        currentLayer.classList.remove("active");

        setTimeout(function(){

            incomingLayer.classList.remove("entering");

            currentImage = nextImage;
            activeLayer = activeLayer === 0 ? 1 : 0;

        }, 1500);
    }

    /* Chaque photo reste visible environ 7 secondes */
    setInterval(changeImage, 7000);

});

/* =========================================================
   MENU - OUVERTURE / FERMETURE DE QUI SOMMES-NOUS ?
========================================================= */
document.addEventListener("DOMContentLoaded", function(){

    const ongSection = document.querySelector("#ong");
    const ongLink = document.querySelector('a[href="#ong"]');

    if(!ongSection || !ongLink) return;

    ongSection.style.display = "none";

    ongLink.addEventListener("click", function(event){

        event.preventDefault();

        if(ongSection.style.display === "none"){
            ongSection.style.display = "block";

            setTimeout(function(){
                ongSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }, 50);

        }else{
            ongSection.style.display = "none";
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }

    });

    const otherLinks = document.querySelectorAll(
        'a:not([href="#ong"])'
    );

    otherLinks.forEach(function(link){

        link.addEventListener("click", function(){

            ongSection.style.display = "none";

        });

    });

});

/* =========================================================
   MENU - OUVERTURE / FERMETURE DE NOS ACTIONS
========================================================= */
document.addEventListener("DOMContentLoaded", function(){

    const actionsSection = document.querySelector("#actions");
    const actionsLink = document.querySelector('a[href="#actions"]');

    if(!actionsSection || !actionsLink) return;

    actionsSection.style.display = "none";

    actionsLink.addEventListener("click", function(event){

        event.preventDefault();

        if(actionsSection.style.display === "none"){

            actionsSection.style.display = "block";

            setTimeout(function(){
                actionsSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }, 50);

        }else{

            actionsSection.style.display = "none";

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }

    });

    const otherLinks = document.querySelectorAll(
        'a:not([href="#actions"])'
    );

    otherLinks.forEach(function(link){

        link.addEventListener("click", function(){

            actionsSection.style.display = "none";

        });

    });

});

/* =========================================================
   NOS OBJECTIFS - APPARITION AU DEFILEMENT
========================================================= */
document.addEventListener("DOMContentLoaded", function(){

    const objectifCards = document.querySelectorAll(".objectif-card");

    if(!objectifCards.length) return;

    const objectifObserver = new IntersectionObserver(
        function(entries){

            entries.forEach(function(entry){

                if(entry.isIntersecting){

                    entry.target.classList.add("objectif-visible");

                }

            });

        },
        {
            threshold:0.15
        }
    );

    objectifCards.forEach(function(card){

        objectifObserver.observe(card);

    });

});






/* =========================================================
   LA TABALA - CARROUSEL VIDEO "DECOUVREZ NOS ACTIVITES"
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const video = document.querySelector("#video video");

    if (!video) {
        console.warn("Lecteur vidéo #video introuvable.");
        return;
    }

    const videoList = [
        {
            src: "video/Abdoulaye KABA president de L'ONG tabala parle de sa satisfaction de deroulement du forum.mp4",
            title: "Satisfaction du Président de l’ONG LA TABALA après le forum"
        },
        {
            src: "video/allocution de president de AN.mp4",
            title: "Allocution du Président de l’Assemblée Nationale"
        },
        {
            src: "video/Cérémonie des icones.mp4",
            title: "Cérémonie des icônes de l’ONG LA TABALA"
        },
        {
            src: "video/Dr HOUDY BAH HONORÉ PAR LA TABALA _ SON MESSAGE AUX GUINÉENS, EN PULAR 🎙️.mp4",
            title: "Dr Houdy Bah honoré par l’ONG LA TABALA"
        },
        {
            src: "video/l'un des meilleur praticiens hospitaliers du pays distincqués par L'ONG tabala 2023..mp4",
            title: "Distinction d’un des meilleurs praticiens hospitaliers du pays"
        },
        {
            src: "video/LE Grand prix de L'ONG tabala 2023,ABDOULAYE BOBO DIALLO professor à l'Universite gamal Abdel Nasser.mp4",
            title: "Grand Prix de l’ONG LA TABALA 2023"
        },
        {
            src: "video/presentation_tabala.mp4",
            title: "Présentation de l’ONG LA TABALA"
        },
        {
            src: "video/Prix du meilleur médecin en Guinée (organisé par L'ONG TABALA).mp4",
            title: "Prix du meilleur médecin en Guinée"
        },
        {
            src: "video/DR DIABATE video.mp4",
            title: "Dr Diabaté — ONG LA TABALA"
        }
    ];

    let currentIndex = 0;
    let changingVideo = false;

    /* Encodage correct des noms de fichiers */
    function getVideoUrl(src) {
        return src.split("/").map(function (part) {
            return encodeURIComponent(part);
        }).join("/");
    }

    /* Création de la zone titre */
    let carouselTitle = document.querySelector("#video .video-carousel-title");

    if (!carouselTitle) {
        carouselTitle = document.createElement("div");
        carouselTitle.className = "video-carousel-title";
        video.parentElement.insertBefore(carouselTitle, video);
    }

    /* Création des boutons */
    let controls = document.querySelector("#video .video-carousel-controls");

    if (!controls) {
        controls = document.createElement("div");
        controls.className = "video-carousel-controls";

        controls.innerHTML = `
            <button type="button" class="video-carousel-btn video-prev" aria-label="Vidéo précédente">
                ←
            </button>

            <span class="video-carousel-counter"></span>

            <button type="button" class="video-carousel-btn video-next" aria-label="Vidéo suivante">
                →
            </button>
        `;

        video.parentElement.appendChild(controls);
    }

    const previousButton = controls.querySelector(".video-prev");
    const nextButton = controls.querySelector(".video-next");
    const counter = controls.querySelector(".video-carousel-counter");

    function updateVideo(index, autoPlay = true) {

        if (changingVideo) return;

        changingVideo = true;
        currentIndex = (index + videoList.length) % videoList.length;

        const item = videoList[currentIndex];

        carouselTitle.textContent = item.title;
        counter.textContent = (currentIndex + 1) + " / " + videoList.length;

        video.pause();
        video.src = getVideoUrl(item.src);
        video.load();

        if (autoPlay) {
            video.play().catch(function () {
                /* Le navigateur peut bloquer l'autoplay */
            });
        }

        setTimeout(function () {
            changingVideo = false;
        }, 250);
    }

    previousButton.addEventListener("click", function () {
        updateVideo(currentIndex - 1);
    });

    nextButton.addEventListener("click", function () {
        updateVideo(currentIndex + 1);
    });

    /* Passage automatique à la vidéo suivante */
    video.addEventListener("ended", function () {
        updateVideo(currentIndex + 1);
    });

    /* Démarrage */
    video.controls = true;
    video.muted = true;
    video.playsInline = true;

    updateVideo(0, true);

    /* =====================================================
       LIEN AVEC LES CARTES "NOS ICÔNES"
       Les 4 premières cartes correspondent aux vidéos
       3, 4, 5 et 8.
       ===================================================== */

    const iconCards = document.querySelectorAll("#icones .pioneer-card");

    const iconVideoMap = [2, 3, 4, 7];

    iconCards.forEach(function (card, index) {

        card.style.cursor = "pointer";

        card.addEventListener("click", function () {

            if (typeof iconVideoMap[index] !== "number") return;

            updateVideo(iconVideoMap[index]);

            const videoSection = document.querySelector("#video");

            if (videoSection) {
                videoSection.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
        });
    });

});



/* ===== TRAITEMENT ISOLE VIDEO 2 - FORMAT PORTRAIT ===== */
(function () {
    const video = document.getElementById("tabalaVideo");
    const cover = document.getElementById("video");

    if (!video || !cover) return;

    const VIDEO2 = "allocution de president de AN.mp4";

    function isVideo2() {
        const source = video.currentSrc || video.src || "";
        let decoded = source;

        try {
            decoded = decodeURIComponent(source);
        } catch (e) {}

        return decoded.indexOf(VIDEO2) !== -1;
    }

    function updateVideo2Style() {
        let backdrop = cover.querySelector(".video2-backdrop");

        if (isVideo2()) {
            cover.classList.add("video2-portrait");

            if (!backdrop) {
                backdrop = document.createElement("video");
                backdrop.className = "video2-backdrop";
                backdrop.muted = true;
                backdrop.loop = true;
                backdrop.autoplay = true;
                backdrop.playsInline = true;
                backdrop.setAttribute("aria-hidden", "true");
                cover.insertBefore(backdrop, cover.firstChild);
            }

            const source = video.currentSrc || video.src;

            if (source && backdrop.src !== source) {
                backdrop.src = source;
                backdrop.load();
                backdrop.play().catch(() => {});
            }
        } else {
            cover.classList.remove("video2-portrait");

            if (backdrop) {
                backdrop.pause();
                backdrop.remove();
            }
        }
    }

    video.addEventListener("loadedmetadata", updateVideo2Style);
    video.addEventListener("loadeddata", updateVideo2Style);
    video.addEventListener("emptied", updateVideo2Style);
    video.addEventListener("loadstart", updateVideo2Style);

    updateVideo2Style();
})();








