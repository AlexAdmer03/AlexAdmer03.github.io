
// dynamisk navbar
document.addEventListener('DOMContentLoaded', () => {
    const adaptiveElements = document.querySelectorAll('.adaptive-element');
    const navbar = document.querySelector('.navbar');

    function updateElements() {
        const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);

        // Update adaptive elements
        adaptiveElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementScrollPercentage = (rect.top + rect.height / 2) / window.innerHeight;
            const shadowIntensity = Math.min(Math.max(elementScrollPercentage, 0), 1);

            const topShadow = `0 -10px 20px rgba(157, 78, 221, ${0.3 * (1 - shadowIntensity)})`;
            const bottomShadow = `0 10px 20px rgba(14, 6, 33, ${0.3 * shadowIntensity})`;

            element.style.boxShadow = `${topShadow}, ${bottomShadow}`;
        });

        // Update navbar
        navbar.style.backgroundColor = window.scrollY > 50 ? 'rgba(14, 6, 33, 1)' : 'rgba(14, 6, 33, 0.95)';
    }

    window.addEventListener('scroll', updateElements);
    window.addEventListener('resize', updateElements);
    updateElements();
});

//Skills boxes phone
document.addEventListener('DOMContentLoaded', function() {
    const skills = document.querySelectorAll('.skill');
    const isMobile = window.innerWidth <= 768;

    skills.forEach(skill => {
        skill.addEventListener('click', function() {
            if (isMobile) {
                this.classList.toggle('expanded');
            }
        });
    });
});

//project carousell
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.carousel-track');
    const cards = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-button.next');
    const prevButton = document.querySelector('.carousel-button.prev');

    let cardIndex = 0;

    const cardWidth = cards[0].getBoundingClientRect().width;
    const setCardPosition = (card, index) => {
        card.style.left = cardWidth * index + 'px';
    };

    cards.forEach(setCardPosition);

    const moveToCard = (track, currentIndex, targetIndex) => {
        track.style.transform = 'translateX(-' + cardWidth * targetIndex + 'px)';
        cardIndex = targetIndex;
    };

    nextButton.addEventListener('click', () => {
        if (cardIndex < cards.length - 1) {
            moveToCard(track, cardIndex, cardIndex + 1);
        }
    });

    prevButton.addEventListener('click', () => {
        if (cardIndex > 0) {
            moveToCard(track, cardIndex, cardIndex - 1);
        }
    });
});

//DIALOG BOX
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card:not(.coming-soon)');
    const dialog = document.getElementById('projectDialog');
    const closeButton = dialog.querySelector('.close-button');
    const imageContainer = dialog.querySelector('.dialog-image-container');
    const prevButton = dialog.querySelector('.dialog-image-prev');
    const nextButton = dialog.querySelector('.dialog-image-next');

    let currentImageIndex = 0;

    // Projektdata (ersätt med din egen projektinformation)
    const projectData = {
        1: {
            title: "Stiftelseansokan 2.0",
            images: ["/img/1 (6).png", "/img/1 (7).png", "/img/1 (8).png", "/img/1 (1).png", "/img/1 (3).png" ,"/img/1 (5).png", "/img/1 (4).png"],
            description: "Stiftelseansökan.se är en ombyggd webbportal för hantering av stiftelser och stipendieansökningar. Projektet moderniserade plattformen genom migrering till Azure och implementering av en ny responsiv design. En central del var utvecklingen av en robust SQL-databas med database first-approach, vilket säkerställde en stabil grund för datahantering. Användningen av Entity Framework effektiviserade dataåtkomsten och ökade säkerheten. Det nya administrativa gränssnittet, byggt på MVC-arkitektur, möjliggör smidig CRUD-funktionalitet direkt mot databasen. Detta resulterade i en mer effektiv, säker och användarvänlig plattform för hantering av stiftelseinformation och ansökningsprocesser.",
            technologies: ["MVC", "SCSS", "JavaScript", "SQL-Databases", "Azure AD"],
            link: "https://stiftelseansokan20.se/"
        },
        
        2: {
            title: "FIXXO",
            images: ["/img/2 (1).png", "/img/2 (2).png", "/img/2 (3).png", "/img/2 (4).png", "/img/2 (5).png"],
            description: "Fixxo är en modern e-handelsplattform för kläder och accessoarer. Projektet omfattar utvecklingen av en responsiv hemsida och en kontaktsida, med fokus på en ren design och användarvänlighet. Sidan använder flexbox och CSS-grid för layouten, och inkluderar funktioner som produktgalleri, kampanjerbjudanden och ett interaktivt kontaktformulär. Tekniskt sett integrerar projektet API:er för produktdata och formulärhantering, samt använder SCSS för effektiv stilning och JavaScript för dynamisk funktionalitet. Målet är att skapa en attraktiv och funktionell e-handelsupplevelse som lockar kunder med sitt moderna gränssnitt och smidiga köpprocess.",
            technologies: ["HTML", "SCSS", "JavaScript"],
            link: "https://github.com/AlexAdmer03/FIXXO-Assignment"
        },
        3: {
            title: "IOT-Unit control panel",
            images: ["/img/3 (1).png", "/img/3 (2).png", "/img/3 (3).png"],
            description: "SmartIotUnit är en smart hem-applikation som integrerar IoT-enheter med molntjänster. Appen erbjuder en användarvänlig gränssnitt för att styra smarta enheter som Dyson-fläktar, visar väderinformation och aktuell tid. Den använder Azure IoT Hub för enhetshantering och kommunikation. Utvecklad i Visual Studio med fokus på multiplattformsstöd, kombinerar projektet modern UI-design med kraftfull bakomliggande funktionalitet för att ge användare en smidig upplevelse av sitt smarta hem.",
            technologies: ["C#", "WPF", "Azure IoT Hub", ".NET"],
            link: "https://github.com/AlexAdmer03/SmartIotUnit"
        },
        4: {
            title: "Bilsimulator",
            images: ["/img/4 (1).png", "/img/4 (2).png", "/img/4 (4).png"],
            description: "Bilsimulator är en C#-konsolapplikation som demonstrerar omfattande mjukvarutestning. Projektet använder en enkel bilkörningssimulering för att visa hur olika teststrategier kan tillämpas. Med fokus på enhetstestning, kodkvalitet och utvecklingsprinciper illustrerar projektet bästa praxis inom testdriven utveckling och fungerar som ett läromedel för utvecklare.",
            technologies: ["C#", "MSTest"],
            link: "https://github.com/AlexAdmer03/DrivingSimulator"
        },
        5: {
            title: "AlexAdmér Portfolio",
            images: ["/img/5 (1).png", "/img/5 (2).png", "/img/5 (3).png", "/img/5 (4).png", "/img/5 (5).png", "/img/5 (6).png"],
            description: "Detta är min personliga portfolio där jag har använt mig av Visual Studio Code som utvecklingsmiljö för att skapa sidan med HTML, SCSS och JavaScript. Projektet är publicerat via GitHub Pages för att enkelt kunna visas och delas online.",
            technologies: ["HTML", "SCSS", "JavaScript"],
            link: "https://github.com/AlexAdmer03/AlexAdmer03.github.io"
        }
        // Lägg till fler projekt här
    };

    function updateDialogContent(project) {
        document.getElementById('dialogTitle').textContent = project.title;
        document.getElementById('dialogDescription').textContent = project.description;
        
        imageContainer.innerHTML = '';
        project.images.forEach(imageSrc => {
            const img = document.createElement('img');
            img.src = imageSrc;
            img.alt = project.title;
            imageContainer.appendChild(img);
        });
        
        const techContainer = document.getElementById('dialogTechnologies');
        techContainer.innerHTML = '';
        project.technologies.forEach(tech => {
            const span = document.createElement('span');
            span.textContent = tech;
            techContainer.appendChild(span);
        });

        document.getElementById('dialogLink').href = project.link;
        
        currentImageIndex = 0;
        updateImageCarousel();
        updateCarouselButtons();
    }

    function updateImageCarousel() {
        imageContainer.style.transform = `translateX(-${currentImageIndex * 100}%)`;
    }

    function updateCarouselButtons() {
        prevButton.style.display = currentImageIndex === 0 ? 'none' : 'block';
        nextButton.style.display = currentImageIndex === imageContainer.children.length - 1 ? 'none' : 'block';
    }

    projectCards.forEach(card => {
        const button = card.querySelector('.project-link');
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const projectId = card.getAttribute('data-project-id');
            const project = projectData[projectId];
            updateDialogContent(project);
            dialog.style.display = 'block';
        });
    });

    closeButton.addEventListener('click', () => {
        dialog.style.display = 'none';
    });

    prevButton.addEventListener('click', () => {
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateImageCarousel();
            updateCarouselButtons();
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentImageIndex < imageContainer.children.length - 1) {
            currentImageIndex++;
            updateImageCarousel();
            updateCarouselButtons();
        }
    });

    window.addEventListener('click', (event) => {
        if (event.target === dialog) {
            dialog.style.display = 'none';
        }
    });

    console.log('Project carousel script has loaded and executed.');
});

//PROJECT SECTION PHONE SCROLL
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel-container');
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('touchend', () => {
        isDown = false;
    });

    carousel.addEventListener('touchmove', (e) => {
        if(!isDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2; // Scroll-hastighet
        carousel.scrollLeft = scrollLeft - walk;
    });

    // Funktion för att kontrollera om enheten är mobil
    function isMobile() {
        return window.innerWidth <= 768; // Justera detta värde efter behov
    }

    // Funktion för att uppdatera karusellens beteende baserat på skärmstorlek
    function updateCarouselBehavior() {
        const carouselTrack = document.querySelector('.carousel-track');
        const carouselButtons = document.querySelectorAll('.carousel-button');
        
        if (isMobile()) {
            carouselTrack.style.transform = 'none';
            carouselButtons.forEach(button => button.style.display = 'none');
        } else {
            carouselTrack.style.transform = '';
            carouselButtons.forEach(button => button.style.display = '');
        }
    }

    // Kör funktionen vid sidladdning och vid ändring av fönsterstorlek
    updateCarouselBehavior();
    window.addEventListener('resize', updateCarouselBehavior);
});