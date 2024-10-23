
// Skapa flytande partiklar
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const numberOfParticles = 50;

    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Slumpmässig storlek mellan 2-6px
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Slumpmässig startposition
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Slumpmässig rörelse
        const moveX = (Math.random() - 0.5) * 200;
        const moveY = (Math.random() - 0.5) * 200;
        particle.style.setProperty('--moveX', `${moveX}px`);
        particle.style.setProperty('--moveY', `${moveY}px`);
        
        // Slumpmässig animationsfördröjning
        particle.style.animationDelay = `${Math.random() * 20}s`;
        
        particlesContainer.appendChild(particle);
    }
}
// Initiera sidan
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
});