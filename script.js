// Tab Navigation
document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.bottom-nav-item');
    const sections = document.querySelectorAll('.prayer-section');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetSection = tab.dataset.section;

            // Remove active class from all tabs and sections
            tabs.forEach(t => t.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));

            // Add active class to clicked tab and corresponding section
            tab.classList.add('active');
            document.getElementById(targetSection).classList.add('active');

            // Scroll to top of content
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Scroll to top button
    const scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Índice Início — scroll suave ao clicar nos cards
    document.querySelectorAll('.inicio-index-card').forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.scrollTo;
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Add subtle animation to prayer cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.prayer-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

		function fillTemplate(templateId, selector) {
				const tpl = document.getElementById(templateId);
				if (!tpl) return;

				document.querySelectorAll(selector).forEach(slot => {
						if (slot.dataset.included === 'true') return;
						slot.appendChild(tpl.content.cloneNode(true));
						slot.dataset.included = 'true';
				});
		}

    fillTemplate('oracao-padrao', '[data-include="oracao"]');
	fillTemplate('gloria-seja-ao-pai', '[data-include="gloria"]');

    // Liturgia das Horas — link definido em config.js (atualizar mensalmente)
    const liturgiaLink = document.getElementById('liturgiaLink');
    if (liturgiaLink && typeof CONFIG !== 'undefined' && CONFIG.LITURGIA_URL) {
        liturgiaLink.href = CONFIG.LITURGIA_URL;
    }

    // Font Size Control
    const fontSizes = {
        small: 14,
        normal: 16,
        large: 18,
        xlarge: 20
    };

    let currentSizeIndex = 1; // Start at normal (16px)
    const sizeKeys = Object.keys(fontSizes);

    // Load saved font size preference
    const savedSize = localStorage.getItem('fontSize');
    if (savedSize) {
        const savedIndex = sizeKeys.indexOf(savedSize);
        if (savedIndex !== -1) {
            currentSizeIndex = savedIndex;
            applyFontSize(savedSize);
        }
    }

    function applyFontSize(sizeKey) {
        const size = fontSizes[sizeKey];
        document.documentElement.style.fontSize = size + 'px';
        localStorage.setItem('fontSize', sizeKey);
    }

    // Decrease font size
    document.getElementById('decreaseFont').addEventListener('click', () => {
        if (currentSizeIndex > 0) {
            currentSizeIndex--;
            applyFontSize(sizeKeys[currentSizeIndex]);
        }
    });

    // Reset to normal font size
    document.getElementById('resetFont').addEventListener('click', () => {
        currentSizeIndex = 1; // normal
        applyFontSize(sizeKeys[currentSizeIndex]);
    });

    // Increase font size
    document.getElementById('increaseFont').addEventListener('click', () => {
        if (currentSizeIndex < sizeKeys.length - 1) {
            currentSizeIndex++;
            applyFontSize(sizeKeys[currentSizeIndex]);
        }
    });

});
