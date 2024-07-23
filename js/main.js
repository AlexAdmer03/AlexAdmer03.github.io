
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
            title: "Projekt 1",
            images: ["/img/profile1.jpg", "/img/IMG_3130.jpg"],
            description: "Detta är en detaljerad beskrivning av Projekt 1. Här kan du beskriva projektets syfte, utmaningar och resultat.",
            technologies: ["HTML", "CSS", "JavaScript"],
            link: "#"
        },
        2: {
            title: "Projekt 2",
            images: ["/img/IMG_3130.jpg", "/img/profile1.jpg"],
            description: "Här är en utförlig beskrivning av Projekt 2. Förklara vad som gör detta projekt unikt och intressant.",
            technologies: ["React", "Node.js", "MongoDB"],
            link: "#"
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