// ============================================
// CONFIGURAÇÕES INICIAIS E SELEÇÃO DE ELEMENTOS - Ramon
// ============================================

const header = document.getElementById('header');
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const navList = document.querySelector('.nav-list');
const navLinks = document.querySelectorAll('.nav-link');
const btnGaleria = document.getElementById('btnGaleria');
const fadeElements = document.querySelectorAll('.fade-in');

// ============================================
// HEADER SCROLL EFFECT
// ============================================

if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ============================================
// MENU MOBILE TOGGLE
// ============================================

if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navList.classList.toggle('active');
        document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
    });
}

// Fechar menu ao clicar em um link
if (navLinks && navLinks.length > 0 && menuToggle && navList) {
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Fechar menu ao clicar fora
if (nav && navList && menuToggle) {
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && navList.classList.contains('active')) {
            navList.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// SMOOTH SCROLL PARA LINKS DE NAVEGAÇÃO
// ============================================

if (navLinks && navLinks.length > 0 && header) {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Botão "Ver Galeria" no header
if (btnGaleria && header) {
    btnGaleria.addEventListener('click', (e) => {
        e.preventDefault();
        const galeriaSection = document.getElementById('galeria');
        if (galeriaSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = galeriaSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// Botão "Ler História Completa" no hero
const btnHero = document.querySelector('.btn-hero');
if (btnHero) {
    btnHero.addEventListener('click', (e) => {
        e.preventDefault();
        const carreiraSection = document.getElementById('carreira');
        if (carreiraSection) {
            const headerHeight = header.offsetHeight;
            const targetPosition = carreiraSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// ============================================
// ANIMAÇÃO DE SCROLL REVEAL (FADE-IN)
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Opcional: parar de observar após animar
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar todos os elementos com classe fade-in
function initFadeElements() {
    const allFadeElements = document.querySelectorAll('.fade-in');
    
    if (allFadeElements.length > 0) {
        allFadeElements.forEach(element => {
            // Verificar se o elemento já está visível na viewport
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                // Se já está visível, tornar visível imediatamente
                element.classList.add('visible');
            } else {
                // Se não está visível, adicionar pre-animate e observar
                element.classList.add('pre-animate');
                observer.observe(element);
            }
        });
    }
}

// Inicializar quando o DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFadeElements);
} else {
    // DOM já está carregado
    initFadeElements();
}

// ============================================
// ANIMAÇÃO STAGGER PARA CARDS DE CONQUISTAS
// ============================================

const achievementCards = document.querySelectorAll('.achievement-card');
achievementCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// ============================================
// ANIMAÇÃO STAGGER PARA GALERIA
// ============================================

const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});

// ============================================
// EFETO PARALLAX SUAVE NO HERO (OPCIONAL)
// ============================================

const heroImage = document.querySelector('.hero-image');
if (heroImage) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            const heroHeight = heroSection.offsetHeight;
            if (scrolled < heroHeight) {
                heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        }
    });
}

// ============================================
// LAZY LOADING PARA IMAGENS (MELHORA PERFORMANCE)
// ============================================

if ('loading' in HTMLImageElement.prototype) {
    // Navegador suporta lazy loading nativo
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.src;
    });
} else {
    // Fallback para navegadores antigos
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ============================================
// HIGHLIGHT ATIVO DO MENU BASEADO NA SEÇÃO VISÍVEL
// ============================================

const sections = document.querySelectorAll('section[id]');

const highlightMenu = () => {
    if (!navLinks || navLinks.length === 0) return;
    
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
};

if (sections && sections.length > 0) {
    window.addEventListener('scroll', highlightMenu);
}

// ============================================
// INICIALIZAÇÃO GERAL
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Garantir que o conteúdo está visível
    document.body.style.opacity = '1';
});

// ============================================
// MELHORIAS DE ACESSIBILIDADE
// ============================================

// Adicionar suporte para navegação por teclado
if (navList && menuToggle) {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navList.classList.contains('active')) {
            navList.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// PERFORMANCE: DEBOUNCE PARA EVENTOS DE SCROLL
// ============================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce em funções de scroll se necessário
const debouncedHighlightMenu = debounce(highlightMenu, 100);

// ============================================
// LIGHTBOX PARA GALERIA
// ============================================

const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const galleryItems = document.querySelectorAll('[data-gallery-item]');

let currentImageIndex = 0;
const images = [];

// Preencher array com informações das imagens (se lightbox existir)
if (lightbox && galleryItems.length > 0) {
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('img');
        const captionEl = item.querySelector('.gallery-overlay span');
        if (img && captionEl) {
            images.push({
                src: img.src,
                alt: img.alt,
                caption: captionEl.textContent
            });

            item.addEventListener('click', () => {
                openLightbox(index);
            });
        }
    });
}

function openLightbox(index) {
    if (!lightbox || !lightboxImage || !lightboxCaption) return;
    currentImageIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function updateLightboxImage() {
    if (!lightboxImage || !lightboxCaption || images.length === 0) return;
    lightboxImage.src = images[currentImageIndex].src;
    lightboxImage.alt = images[currentImageIndex].alt;
    lightboxCaption.textContent = images[currentImageIndex].caption;
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    updateLightboxImage();
}

function showPrevImage() {
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    updateLightboxImage();
}

if (lightboxClose && lightboxNext && lightboxPrev) {
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', showNextImage);
    lightboxPrev.addEventListener('click', showPrevImage);

    // Fechar ao clicar fora da imagem
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        }
    });
}


// ============================================
// BOTÃO VOLTAR AO TOPO
// ============================================

const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// INICIALIZAÇÃO
// ============================================

console.log('🚀 Landing Page Alexis Sánchez carregada com sucesso!');

