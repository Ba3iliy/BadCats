// Основные переменные
const body = document.body;
const burgerMenu = document.querySelector('.burger-menu');
const navLinks = document.querySelector('.nav-links');
const ctaButtons = document.querySelectorAll('.cta-button');
const bookingModal = document.querySelector('.booking-modal');
const closeModal = document.querySelector('.close-modal');
const bookingForm = document.getElementById('booking-form');
const sliderDots = document.querySelectorAll('.slider-dot');
const reviews = document.querySelectorAll('.review');

// Создание элемента курсора-кота
const catCursor = document.createElement('div');
catCursor.classList.add('cat-cursor');
body.appendChild(catCursor);

// Функция для анимации неоновых элементов
function animateNeon() {
    const neonElements = document.querySelectorAll('.neon-line, .section-header h2');
    
    neonElements.forEach(element => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'neonPulse 2s infinite alternate';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(element);
    });
}

// Функция для анимации появления элементов при скролле
function animateOnScroll() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                    observer.unobserve(section);
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(section);
    });
}

// Функция для управления фиксированной навигацией
function handleNavigation() {
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
            header.style.boxShadow = '0 5px 20px rgba(153, 0, 255, 0.3)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.9)';
            header.style.boxShadow = 'none';
        }
    });
}

// Функция для управления мобильным меню
function handleMobileMenu() {
    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        if (burgerMenu.classList.contains('active')) {
            burgerMenu.querySelector('.line:nth-child(1)').style.transform = 'rotate(45deg) translate(5px, 6px)';
            burgerMenu.querySelector('.line:nth-child(2)').style.opacity = '0';
            burgerMenu.querySelector('.line:nth-child(3)').style.transform = 'rotate(-45deg) translate(5px, -6px)';
            
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '80px';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
            navLinks.style.padding = '20px';
            navLinks.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.3)';
            navLinks.style.zIndex = '999';
        } else {
            burgerMenu.querySelector('.line:nth-child(1)').style.transform = 'none';
            burgerMenu.querySelector('.line:nth-child(2)').style.opacity = '1';
            burgerMenu.querySelector('.line:nth-child(3)').style.transform = 'none';
            
            navLinks.style.display = '';
        }
    });
}

// Функция для управления модальным окном бронирования
function handleBookingModal() {
    ctaButtons.forEach(button => {
        button.addEventListener('click', () => {
            bookingModal.style.display = 'flex';
            setTimeout(() => {
                bookingModal.style.opacity = '1';
            }, 10);
        });
    });
    
    closeModal.addEventListener('click', closeBookingModal);
    
    window.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            closeBookingModal();
        }
    });
    
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Имитация отправки формы
        const submitButton = bookingForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Отправка...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.textContent = 'Успешно!';
            submitButton.style.background = 'linear-gradient(45deg, #39ff14, #00ccff)';
            
            setTimeout(() => {
                closeBookingModal();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.background = '';
                bookingForm.reset();
                
                // Показываем уведомление об успешном бронировании
                showNotification('Бронирование успешно отправлено! Мы свяжемся с вами для подтверждения.');
            }, 1500);
        }, 2000);
    });
}

// Функция закрытия модального окна
function closeBookingModal() {
    bookingModal.style.opacity = '0';
    setTimeout(() => {
        bookingModal.style.display = 'none';
    }, 300);
}

// Функция для управления слайдером отзывов
function handleReviewSlider() {
    let currentSlide = 0;
    
    function showSlide(index) {
        reviews.forEach((review, i) => {
            review.style.transform = `translateX(${(i - index) * 100}%)`;
        });
        
        sliderDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }
    
    sliderDots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            currentSlide = i;
            showSlide(currentSlide);
        });
    });
    
    // Автоматическое переключение слайдов
    setInterval(() => {
        currentSlide = (currentSlide + 1) % reviews.length;
        showSlide(currentSlide);
    }, 5000);
    
    // Инициализация слайдера
    showSlide(currentSlide);
}

// Функция для создания эффекта курсора-кота
function handleCatCursor() {
    document.addEventListener('mousemove', (e) => {
        // Задержка движения для эффекта "хвоста"
        setTimeout(() => {
            catCursor.style.left = `${e.clientX}px`;
            catCursor.style.top = `${e.clientY}px`;
            catCursor.style.opacity = '1';
        }, 50);
    });
    
    // Скрываем курсор при выходе за пределы окна
    document.addEventListener('mouseout', () => {
        catCursor.style.opacity = '0';
    });
    
    // Эффект при клике
    document.addEventListener('click', () => {
        catCursor.style.transform = 'scale(1.2)';
        setTimeout(() => {
            catCursor.style.transform = 'scale(1)';
        }, 200);
    });
}

// Функция для отображения уведомлений
function showNotification(message) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;
    
    // Стили для уведомления
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = 'rgba(30, 30, 40, 0.9)';
    notification.style.color = '#fff';
    notification.style.padding = '15px 20px';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0 0 15px rgba(153, 0, 255, 0.5)';
    notification.style.zIndex = '9999';
    notification.style.transform = 'translateY(100px)';
    notification.style.opacity = '0';
    notification.style.transition = 'all 0.3s ease';
    
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.style.transform = 'translateY(0)';
        notification.style.opacity = '1';
    }, 10);
    
    // Автоматическое скрытие через 5 секунд
    setTimeout(() => {
        notification.style.transform = 'translateY(100px)';
        notification.style.opacity = '0';
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Функция для создания эффекта неоновых частиц на фоне
function createNeonParticles() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    
    document.body.appendChild(canvas);
    
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // Массив цветов для частиц
    const colors = [
        'rgba(153, 0, 255, 0.7)',
        'rgba(0, 204, 255, 0.7)',
        'rgba(57, 255, 20, 0.7)'
    ];
    
    // Класс для частиц
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0 || this.x > width) this.speedX *= -1;
            if (this.y < 0 || this.y > height) this.speedY *= -1;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        }
    }
    
    // Создаем массив частиц
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Функция анимации
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        
        // Соединяем частицы линиями, если они находятся рядом
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = particles[i].color;
                    ctx.lineWidth = 0.2;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                    ctx.closePath();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // Обработка изменения размера окна
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });
    
    animate();
}

// Функция для плавной прокрутки к разделам при клике на ссылки навигации
function smoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Закрываем мобильное меню при клике на ссылку
                if (burgerMenu.classList.contains('active')) {
                    burgerMenu.click();
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Обновляем функцию initReviewSlider
function initReviewSlider() {
    const slider = document.querySelector('.review-slider');
    const reviews = document.querySelectorAll('.review');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    let interval;

    // Функция показа слайда
    function showSlide(index) {
        reviews.forEach((review, i) => {
            review.classList.remove('active', 'prev');
            if (i === index) {
                review.classList.add('active');
                review.style.animation = 'slideIn 0.5s forwards';
            } else if (i === (index - 1 + reviews.length) % reviews.length) {
                review.classList.add('prev');
                review.style.animation = 'slideOut 0.5s forwards';
            } else {
                review.style.animation = '';
                review.style.opacity = '0';
            }
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Следующий слайд
    function nextSlide() {
        currentSlide = (currentSlide + 1) % reviews.length;
        showSlide(currentSlide);
    }

    // Предыдущий слайд
    function prevSlide() {
        currentSlide = (currentSlide - 1 + reviews.length) % reviews.length;
        showSlide(currentSlide);
    }

    // Автоматическое переключение
    function startAutoSlide() {
        interval = setInterval(nextSlide, 5000); // Каждые 5 секунд
    }

    function stopAutoSlide() {
        clearInterval(interval);
    }

    // Добавляем кнопки навигации
    const prevButton = document.createElement('button');
    prevButton.className = 'slider-nav slider-prev';
    prevButton.innerHTML = '❮';
    prevButton.onclick = () => {
        stopAutoSlide();
        prevSlide();
        startAutoSlide();
    };

    const nextButton = document.createElement('button');
    nextButton.className = 'slider-nav slider-next';
    nextButton.innerHTML = '❯';
    nextButton.onclick = () => {
        stopAutoSlide();
        nextSlide();
        startAutoSlide();
    };

    slider.appendChild(prevButton);
    slider.appendChild(nextButton);

    // Обработчики для точек
    dots.forEach((dot, index) => {
        dot.onclick = () => {
            stopAutoSlide();
            currentSlide = index;
            showSlide(currentSlide);
            startAutoSlide();
        };
    });

    // Запускаем слайдер
    showSlide(currentSlide);
    startAutoSlide();

    // Останавливаем автопереключение при наведении
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);
}

// Инициализация всех функций при загрузке страницы
window.addEventListener('DOMContentLoaded', () => {
    // Устанавливаем начальные стили для секций (для анимации появления)
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    });
    
    // Запускаем все функции
    animateNeon();
    animateOnScroll();
    handleNavigation();
    handleMobileMenu();
    handleBookingModal();
    handleReviewSlider();
    handleCatCursor();
    createNeonParticles();
    smoothScroll();
    
    // Показываем уведомление о загрузке сайта
    setTimeout(() => {
        showNotification('Добро пожаловать в Bad Cats! Готовы к игре?');
    }, 1500);
    
    // Запускаем после загрузки страницы
    initReviewSlider();
});
