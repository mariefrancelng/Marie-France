document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const nav = document.querySelector('nav');
    const navbar = document.querySelector('.navbar');
    const navItems = document.querySelectorAll('.nav_item');
    
    // Gestion des boutons aboutme
    const buttons = document.querySelectorAll('.content_btn');
    const contents = document.querySelectorAll('.tab_content');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            buttons.forEach(btn => btn.classList.remove('active'));
            contents.forEach(content => content.classList.remove('active'));
            
            this.classList.add('active');
            
            const contentId = this.id.replace('_btn', '_content');
            document.getElementById(contentId).classList.add('active');
        });
    });

    // Gestion des boutons compétences
    const skillButtons = document.querySelectorAll('.skill_category');
    const skillContents = document.querySelectorAll('.skills_tab_content');

    skillButtons.forEach(button => {
        button.addEventListener('click', function() {
            skillButtons.forEach(btn => btn.classList.remove('active'));
            skillContents.forEach(content => content.classList.remove('active'));
            
            this.classList.add('active');
            
            const contentId = this.id.replace('_category', '_content');
            document.getElementById(contentId).classList.add('active');
        });
    });

    // Gestion des boutons projets
    const projectModal = document.querySelectorAll('.project_modal');

    projectModal.forEach(trigger => {
        trigger.addEventListener('click', function() {

            const modalId = this.getAttribute('data-target');
            const modal = document.getElementById(modalId);

            modal.classList.add('show');
        });
    });

    const closeButtons = document.querySelectorAll('.close-modal');
    
    closeButtons.forEach(button => {
      button.addEventListener('click', function() {
      
        this.closest('.modal').classList.remove('show');
      });
    });

    window.addEventListener('click', function(event) {
      if (event.target.classList.contains('modal') && event.target.classList.contains('show')) {
        event.target.classList.remove('show');
      }
    });
    
    // Ici la gestion du défilement
    function handleScroll() {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
            navbar.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
            navbar.classList.remove('scrolled');
        }
    }

    // Ici le défilement
    window.addEventListener('scroll', handleScroll);
    
    // ici liens de navigation
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            window.scrollTo({
                top: target.offsetTop - 100,
                behavior: 'smooth'
            });
        });
    });
    
    // Exécution initiale de handleScroll
    handleScroll();
});