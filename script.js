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
   DEFILEMENT AUTOMATIQUE - NOS ICÔNES
========================================================= */
document.addEventListener("DOMContentLoaded", function(){

    const pioneerGrid = document.querySelector(".pioneer-grid");

    if(!pioneerGrid) return;

    let position = 0;
    let lastTime = null;
    const speed = 35;

    function animatePioneers(timestamp){

        if(lastTime === null){
            lastTime = timestamp;
        }

        const elapsed = timestamp - lastTime;
        lastTime = timestamp;

        position += speed * elapsed / 1000;

        const firstCard = pioneerGrid.querySelector(".pioneer-card");

        if(firstCard){
            const cardWidth = firstCard.offsetWidth + 12;

            if(position >= cardWidth){
                pioneerGrid.appendChild(firstCard);
                position -= cardWidth;
            }

            pioneerGrid.scrollLeft = position;
        }

        requestAnimationFrame(animatePioneers);
    }

    requestAnimationFrame(animatePioneers);

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

    requestAnimationFrame(animateProjects);

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






