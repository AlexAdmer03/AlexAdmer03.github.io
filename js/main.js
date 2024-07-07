
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
