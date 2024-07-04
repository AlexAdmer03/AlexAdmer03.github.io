document.addEventListener('DOMContentLoaded', () => {
    const adaptiveElements = document.querySelectorAll('.adaptive-element');

    function updateShadows() {
        const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);

        adaptiveElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementScrollPercentage = (rect.top + rect.height / 2) / window.innerHeight;
            const shadowIntensity = Math.min(Math.max(elementScrollPercentage, 0), 1);

            const topShadow = `0 -10px 20px rgba(157, 78, 221, ${0.3 * (1 - shadowIntensity)})`;
            const bottomShadow = `0 10px 20px rgba(14, 6, 33, ${0.3 * shadowIntensity})`;

            element.style.boxShadow = `${topShadow}, ${bottomShadow}`;
        });
    }

    window.addEventListener('scroll', updateShadows);
    window.addEventListener('resize', updateShadows);
    updateShadows();
});

document.addEventListener('DOMContentLoaded', function () {
    var navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(14, 6, 33, 1)'; // Solid color
        } else {
            navbar.style.backgroundColor = 'rgba(14, 6, 33, 0.95)'; // Semi-transparent
        }
    });
});