/*===== 1. EMBEDDED PORTFOLIO JSON DATA =====*/
const portfolioData = {
    "skills": [
        { "name": "HTML5", "percentage": "95%", "icon": "bx bxl-html5" },
        { "name": "CSS3", "percentage": "85%", "icon": "bx bxl-css3" },
        { "name": "JavaScript", "percentage": "75%", "icon": "bx bxl-javascript" },
        { "name": "Java", "percentage": "80%", "icon": "bx bxl-java" },
        { "name": "C Programming", "percentage": "85%", "icon": "bx bx-code-alt" },
        { "name": "Git & GitHub", "percentage": "90%", "icon": "bx bxl-git" }
    ],
    "projects": [
        {
            "title": "Created Portfolio",
            "category": "web",
            "tag": "Web Development",
            "description": "Inside are my personal and prefessional information .",
            "image": "image/portfolio.webp",
            "github": "https://github.com/mehedihasan-sw-7",
            "demo": "#"
        },
        {
            "title": "SQL Database Normalization",
            "category": "db",
            "tag": "Database Architecture",
            "description": "Designed a relational database schema by extracting attributes from transactional records, structuring standard SQL tables, and applying normalization rules.",
            "image": "image/project.jpg",
            "github": "https://github.com/mehedihasan-sw-7",
            "demo": "#"
        },
        {
            "title": "Intelligent Data Classifier",
            "category": "ai",
            "tag": "Artificial Intelligence",
            "description": "An ongoing machine learning module exploring predictive algorithms, data preprocessing techniques, and classification model evaluation.",
            "image": "image/project.jpg",
            "github": "https://github.com/mehedihasan-sw-7",
            "demo": "#"
        }
    ]
};

/*===== 2. MENU SHOW / HIDE =====*/ 
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle', 'nav-menu')

const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    navLink.forEach(n => n.classList.remove('active-link'))
    this.classList.add('active-link')
    
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*===== 3. ACTIVE LINK ON SCROLL =====*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== 4. DARK / LIGHT THEME TOGGLE =====*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

if (themeButton) {
    themeButton.addEventListener('click', () => {
        document.body.classList.toggle(darkTheme)
        themeButton.classList.toggle(iconTheme)
        localStorage.setItem('selected-theme', getCurrentTheme())
        localStorage.setItem('selected-icon', getCurrentIcon())
    })
}

/*===== 5. DYNAMIC TYPING ANIMATION =====*/
const words = ["Software Engineer", "AI & ML Enthusiast", "Web Developer", "Problem Solver"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typeTarget = document.getElementById("typewriter-text");

function typeEffect() {
    if (!typeTarget) return;
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typeTarget.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeTarget.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 1500; // Pause at end of word
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 400; // Pause before new word
    }

    setTimeout(typeEffect, typeSpeed);
}
document.addEventListener("DOMContentLoaded", typeEffect);

/*===== 6. SCROLL REVEAL ANIMATIONS (FIXED & SMOOTH) =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '40px',
    duration: 1200,
    delay: 100,
    reset: false // Prevents glitching when scrolling back up
});

sr.reveal('.home__data, .about__img, .education__card', {}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .about__info-grid', {delay: 200}); 
sr.reveal('.home__social-icon', { interval: 100}); 
sr.reveal('.contact__input, .contact__button', {interval: 100});

/*===== 7. RENDER SKILLS & PROJECTS FROM EMBEDDED JSON =====*/
function renderPortfolioData() {
    // Render Skills
    const skillsContainer = document.getElementById('skills-container');
    if (skillsContainer && portfolioData.skills) {
        let skillsHTML = `
            <div>
                <h2 class="skills__subtitle">Technical Proficiencies</h2>
                <p class="skills__text">Here is an overview of my programming languages, tools, and technical competencies.</p>
        `;
        
        portfolioData.skills.forEach(skill => {
            skillsHTML += `
                <div class="skills__data">
                    <div class="skills__names">
                        <i class='${skill.icon} skills__icon'></i>
                        <span class="skills__name">${skill.name}</span>
                    </div>
                    <div class="skills__bar" style="width: ${skill.percentage};"></div>
                    <div><span class="skills__percentage">${skill.percentage}</span></div>
                </div>
            `;
        });

        skillsHTML += `</div><div><img src="image/skill.avif" alt="Skills illustration" class="skills__img"></div>`;
        skillsContainer.innerHTML = skillsHTML;
        
        sr.reveal('.skills__subtitle, .skills__text, .skills__data', {interval: 100});
        sr.reveal('.skills__img', {delay: 200});
    }

    // Render Projects
    const workContainer = document.getElementById('work-container');
    if (workContainer && portfolioData.projects) {
        workContainer.innerHTML = '';
        
        portfolioData.projects.forEach(project => {
            workContainer.innerHTML += `
                <div class="work__card" data-category="${project.category}">
                    <div class="work__img">
                        <img src="${project.image}" alt="${project.title}">
                    </div>
                    <div class="work__data">
                        <span class="work__tag">${project.tag}</span>
                        <h3 class="work__title">${project.title}</h3>
                        <p class="work__desc">${project.description}</p>
                        <div class="work__links">
                            <a href="${project.github}" target="_blank" class="work__link"><i class='bx bxl-github'></i> Code</a>
                            ${project.demo !== '#' ? `<a href="${project.demo}" target="_blank" class="work__link"><i class='bx bx-link-external'></i> Live Demo</a>` : ''}
                        </div>
                    </div>
                </div>
            `;
        });
        
        sr.reveal('.work__card', {interval: 150});
        initProjectFilters();
    }
}

/*===== 8. PROJECT CATEGORY FILTERING =====*/
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.work__item');
    const projectCards = document.querySelectorAll('.work__card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active-work'));
            button.classList.add('active-work');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                    setTimeout(() => { card.style.opacity = '1'; }, 50);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => { card.style.display = 'none'; }, 200);
                }
            });
        });
    });
}

// Execute rendering when DOM loads
document.addEventListener('DOMContentLoaded', renderPortfolioData);