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
