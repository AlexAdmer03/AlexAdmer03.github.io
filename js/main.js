
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
    const closeButton = document.querySelector('.close-button');

    // Projektdata (ersätt med din egen projektinformation)
    const projectData = {
        1: {
            title: "Projekt 1",
            image: "/img/profile1.jpg",
            description: "Detta är en detaljerad beskrivning av Projekt 1. Här kan du beskriva projektets syfte, utmaningar och resultat.",
            technologies: ["HTML", "CSS", "JavaScript"],
            link: "#"
        },
        2: {
            title: "Projekt 2",
            image: "/img/IMG_3130.jpg",
            description: "Här är en utförlig beskrivning av Projekt 2. Förklara vad som gör detta projekt unikt och intressant.",
            technologies: ["React", "Node.js", "MongoDB"],
            link: "#"
        }
        // Lägg till fler projekt här
    };

    projectCards.forEach(card => {
        const button = card.querySelector('.project-link');
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Förhindra standardbeteende för knappen
            const projectId = card.getAttribute('data-project-id');
            const project = projectData[projectId];

            document.getElementById('dialogTitle').textContent = project.title;
            document.getElementById('dialogImage').src = project.image;
            document.getElementById('dialogDescription').textContent = project.description;
            
            const techContainer = document.getElementById('dialogTechnologies');
            techContainer.innerHTML = '';
            project.technologies.forEach(tech => {
                const span = document.createElement('span');
                span.textContent = tech;
                techContainer.appendChild(span);
            });

            document.getElementById('dialogLink').href = project.link;

            dialog.style.display = 'block';
        });
    });

    closeButton.addEventListener('click', () => {
        dialog.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === dialog) {
            dialog.style.display = 'none';
        }
    });

    // Debugging: Logga när skriptet har körts
    console.log('Project carousel script has loaded and executed.');
});