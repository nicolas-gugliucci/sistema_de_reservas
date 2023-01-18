    //---------Sección según scroll--------------
    window.addEventListener("scroll", nav_scroll);
    function nav_scroll(){
        let not_current = current;
        const sections = document.querySelectorAll("section");
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 250) {
                current = section.getAttribute("id"); 
            };
        });
        if(current != not_current){
            const li_inactivo = document?.getElementById(`li_${not_current}`);
            li_inactivo?.removeAttribute("class", "li_activo");
            li_inactivo?.setAttribute("class", "li_inactivo");
        };
        const li_activo = document.getElementById(`li_${current}`);
        li_activo.setAttribute("class", "li_activo");
    }