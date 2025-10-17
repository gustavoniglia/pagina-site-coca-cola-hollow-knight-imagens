/**
 * script.js - Funcionalidades interativas para a landing page Coca-Cola x Hollow Knight
 * 
 * Este arquivo contém todas as interações JavaScript da landing page, incluindo:
 * - Navegação suave
 * - Animações de scroll
 * - Interações do formulário
 * - Efeitos de parallax
 * - Menu mobile
 * - Efeitos de hover
 */

// ============================================
// NAVEGAÇÃO SUAVE
// ============================================
/**
 * Adiciona scroll suave para todos os links internos da página
 * Seleciona todos os links que começam com # e adiciona um evento de clique
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // Previne o comportamento padrão do link
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Scroll suave até o elemento, com offset de 80px para compensar o header fixo
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// ANIMAÇÕES DE ENTRADA
// ============================================
/**
 * Configuração do Intersection Observer
 * Usado para detectar quando elementos entram na viewport
 * e adicionar animações
 */
const observerOptions = {
    threshold: 0.1 // Elemento será animado quando 10% dele estiver visível
};

/**
 * Observer que adiciona classe 'animate' aos elementos
 * quando eles entram na viewport
 */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

/**
 * Adiciona os elementos que serão observados para animação de entrada
 * Aplica a classe fade-in e começa a observar cada elemento
 */
document.querySelectorAll('.character-card, .feature-card').forEach(element => {
    element.classList.add('fade-in');
    observer.observe(element);
});

// ============================================
// FORMULÁRIO DE CONTATO
// ============================================
/**
 * Gerencia as interações e animações do formulário de contato
 * Inclui:
 * - Prevenção de envio padrão
 * - Animações de feedback
 * - Simulação de envio
 */
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Adiciona classe de animação em todos os campos
        form.querySelectorAll('input, textarea').forEach(input => {
            input.classList.add('submitted');
        });

        // Simulação do processo de envio
        const submitButton = form.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        
        // Altera o texto do botão e desabilita durante o "envio"
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;

        // Simula o tempo de envio e mostra feedback
        setTimeout(() => {
            submitButton.textContent = 'Mensagem Enviada!';
            form.reset();
            
            // Retorna o botão ao estado original após 2 segundos
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        }, 1500);
    });
}

// ============================================
// EFEITO PARALLAX
// ============================================
/**
 * Adiciona efeito de parallax na imagem do hero
 * A imagem se move mais lentamente que o scroll da página
 */
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        // Move a imagem 40% da velocidade do scroll
        heroImage.style.transform = `translateY(${scrolled * 0.4}px)`;
    }
});

// ============================================
// LIGHTBOX / GALLERY
// ============================================
/**
 * Lightbox for the gallery in 'Várias Marcas'.
 * - Open modal when thumbnail clicked
 * - Navigate next/prev
 * - Close with close button, overlay click or ESC
 */
const gallery = document.getElementById('brandGallery');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeBtn = document.querySelector('.lightbox-close');
const prevBtn = document.querySelector('.lightbox-prev');
const nextBtn = document.querySelector('.lightbox-next');

let galleryItems = [];
let currentIndex = 0;

if (gallery && lightbox) {
    galleryItems = Array.from(gallery.querySelectorAll('.gallery-thumb'));

    // Open lightbox when clicking a thumbnail
    galleryItems.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            openLightbox(index);
        });
    });

    // Close
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Prev/Next
    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); showPrev(); });
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); showNext(); });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (lightbox.getAttribute('aria-hidden') === 'false') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showPrev();
            if (e.key === 'ArrowRight') showNext();
        }
    });
}

function openLightbox(index) {
    currentIndex = index;
    const img = galleryItems[currentIndex];
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt || '';
    lightboxCaption.textContent = img.alt || '';
    lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
    lightboxCaption.textContent = '';
}

function showPrev() {
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    openLightbox(currentIndex);
}

function showNext() {
    currentIndex = (currentIndex + 1) % galleryItems.length;
    openLightbox(currentIndex);
}

// ============================================
// MENU MOBILE
// ============================================
/**
 * Cria e gerencia o menu mobile
 * Adiciona o botão hamburger e controla a abertura/fechamento do menu
 */
const createMobileMenu = () => {
    const nav = document.querySelector('.nav-bar');
    const navLinks = document.querySelector('.nav-links');
    
    if (nav && navLinks) {
        // Cria o botão hamburger
        const hamburger = document.createElement('div');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = '<span></span><span></span><span></span>';
        
        // Adiciona o botão hamburger antes da lista de links
        nav.insertBefore(hamburger, navLinks);
        
        // Adiciona evento de toggle para abrir/fechar o menu
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
};

// Inicializa o menu mobile
createMobileMenu();

// ============================================
// EFEITOS DE HOVER NOS CARDS
// ============================================
/**
 * Adiciona efeito de hover dinâmico nos cards
 * O efeito segue a posição do mouse dentro do card
 */
document.querySelectorAll('.character-card, .feature-card').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        // Calcula a posição do mouse relativa ao card
        const { left, top } = card.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        
        // Define variáveis CSS personalizadas para a posição do mouse
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// ============================================
// ANIMAÇÃO DE LOADING
// ============================================
/**
 * Adiciona classe 'loaded' ao body quando a página
 * termina de carregar, permitindo animações de entrada
 */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});