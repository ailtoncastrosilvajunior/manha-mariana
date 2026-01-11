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

});
