// $(function () {    // функция бургер меню

//   $('.header__btn').on('click', function () {
//     $('.burger-menu').removeClass('rightside-menu--close')

//   });  
//   $('.burger-menu__close').on('click', function () { 
//     $('.burger-menu').addClass('rightside-menu--close') 
    
//   });  
// })



// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Элементы
    const burgerBtn = document.querySelector('.header__btn');
    const burgerMenu = document.querySelector('.burger-menu');
    const closeBtn = document.querySelector('.burger-menu__close');
    
    // Создаем оверлей
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    
    // Функция открытия меню
    function openMenu() {
        burgerMenu.classList.remove('rightside-menu--close');
        burgerMenu.classList.add('rightside-menu--open');
        overlay.classList.add('overlay--active');
        document.body.style.overflow = 'hidden'; // Блокируем скролл
    }
    
    // Функция закрытия меню
    function closeMenu() {
        burgerMenu.classList.remove('rightside-menu--open');
        burgerMenu.classList.add('rightside-menu--close');
        overlay.classList.remove('overlay--active');
        document.body.style.overflow = ''; // Разблокируем скролл
    }
    
    // Слушатели событий
    burgerBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    
    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });
    
    // Закрытие при ресайзе (опционально)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 580) {
            closeMenu();
        }
    });
});


// Gallery

/* // Находим все ссылки в навигации галереи
const links = document.querySelectorAll('.gallery-nav__link');
// const       — создаёт переменную, которую нельзя переназначить (лучше для DOM-элементов)
// links       — имя переменной
// document    — объект, представляющий весь HTML-документ
// .querySelectorAll('.gallery-nav__link') — возвращает NodeList всех элементов с этим классом

// Находим все карточки с фото
const items = document.querySelectorAll('.gallery-foto__item');
// items — коллекция всех li с фотографиями

// Перебираем каждую ссылку
links.forEach(function(link) {
    // .forEach(callback) — метод NodeList/массива, выполняет функцию для каждого элемента
    // function(link) { ... } — обычная функция, параметр link — текущий элемент NodeList

    link.addEventListener('click', function(e) {
        // link.addEventListener('click', callback) — навешиваем обработчик события клика
        // function(e) { ... } — функция-колбэк, которая срабатывает при клике
        // e — объект события (event)

        e.preventDefault();
        // e.preventDefault() — отменяет стандартное действие браузера (ссылки не переходят по href)

        const current = document.querySelector('.gallery-nav__link.active');
        // Находим ссылку, которая уже активна (имеет класс active)
        // Если такой элемент есть, присвоим его переменной current

        if (current) current.classList.remove('active');
        // Если есть активная ссылка, убираем у неё класс active
        // classList — объект для работы с классами
        // .remove('active') — удаляет класс active

        this.classList.add('active');
        // this — текущий элемент, на который кликнули (т.е. наша ссылка)
        // .classList.add('active') — добавляем класс active

        const filter = this.dataset.filter;
        // dataset — объект, который хранит все data-атрибуты элемента
        // this.dataset.filter — значение data-filter на кликнутой ссылке
        // например 'all', 'nature', 'profi'

        // Перебираем все карточки с фотографиями
        items.forEach(function(item) {
            // item — текущий элемент li в NodeList items
            const cat = item.dataset.category;
            // cat — категория карточки, берём из data-category

            // Скрываем карточку, если она не подходит под фильтр
            item.classList.toggle('hidden', !(filter === 'all' || cat === filter));
            // .classList.toggle('hidden', condition)
            // если condition true — добавляет класс hidden
            // если condition false — убирает класс hidden
            // !(filter === 'all' || cat === filter)
            //   — true, если фильтр НЕ "all" и категория не совпадает
            //   — false, если фильтр "all" или категория совпадает
        });
    });
}); */


// 2й вариант с For - больше кода, но понятнее
// 1. Находим все ссылки в навигации
const links = document.querySelectorAll('.gallery-nav__link');

// 2. Находим все карточки с фотографиями
const items = document.querySelectorAll('.gallery-foto__item');

// 3. Показываем карточки, которые соответствуют фильтру
function showCards(filter) {
  for (let i = 0; i < items.length; i++) {
    const category = items[i].dataset.category; // читаем категорию карточки
    if (filter === 'all' || category === filter) {
      items[i].classList.remove('hidden'); // показываем карточку
    } else {
      items[i].classList.add('hidden'); // скрываем карточку
    }
  }
}

// 4. При загрузке сайта показываем карточки активной ссылки
document.addEventListener('DOMContentLoaded', function() {
  for (let i = 0; i < links.length; i++) {
    if (links[i].classList.contains('active')) { // если ссылка активна
      const filter = links[i].dataset.filter;    // берём её фильтр
      showCards(filter);                          // показываем нужные карточки
      break;                                      // нашли первую активную ссылку, дальше не ищем
    }
  }
});

// 5. Навешиваем клик на каждую ссылку
for (let i = 0; i < links.length; i++) {
  links[i].addEventListener('click', function(e) {
    e.preventDefault(); // отменяем стандартное поведение ссылки (не прыгаем в начало)

    // Снимаем подчёркивание с предыдущей активной ссылки
    for (let j = 0; j < links.length; j++) {
      links[j].classList.remove('active');
    }

    // Добавляем подчёркивание текущей ссылке
    this.classList.add('active');

    // Фильтруем карточки по выбранной ссылке
    const filter = this.dataset.filter;
    showCards(filter);
  });
}



// Видео

/* const playBtn = document.querySelector('.video__play');
const pauseBtn = document.querySelector('.video__pause');
const video = document.querySelector('.video__content');
const poster = document.querySelector('.video__poster');
const inner = document.querySelector('.video__inner');

function setPlayingState() {
  inner.classList.add('is-playing');
  poster.style.display = 'none';
  video.style.opacity = '1';
  video.style.pointerEvents = 'auto';
  video.setAttribute('controls', '');
}

function unsetPlayingState() {
  inner.classList.remove('is-playing');
  video.removeAttribute('controls');
  poster.style.display = 'block'; // показать постер снова
  // ВАЖНО: НЕ скрываем само видео, оставляем opacity = 1
  // иначе в Chrome оно "глохнет" после первого клика
}

playBtn.addEventListener('click', e => {
  e.preventDefault();
  setPlayingState();
  video.play().catch(err => console.warn('play() error:', err));
});

pauseBtn.addEventListener('click', e => {
  e.preventDefault();
  if (!video.paused) video.pause();
});

// Слушаем события
video.addEventListener('play', () => {
  inner.classList.add('is-playing');
});

video.addEventListener('pause', () => {
  unsetPlayingState();
});

video.addEventListener('ended', () => {
  video.currentTime = 0;
  unsetPlayingState();
}); */











const inner = document.querySelector('.video__inner');
const video = document.querySelector('.video__content');
const poster = document.querySelector('.video__poster');

// Запуск
function setPlayingState() {
  inner.classList.add('is-playing');
  poster.style.display = 'none';
  video.style.opacity = '1';
  video.style.pointerEvents = 'auto';
  video.setAttribute('controls', '');
  video.play().catch(err => console.warn('play() rejected:', err));
}

// Остановка
function unsetPlayingState() {
  inner.classList.remove('is-playing');
  video.removeAttribute('controls');
  poster.style.display = 'block';
  video.pause();

  
}

// Клик по блоку (и play, и pause работают)
inner.addEventListener('click', function () {
  if (video.paused) {
    setPlayingState();
  } else {
    unsetPlayingState();
  }
});

// Синхронизация
video.addEventListener('ended', () => {
  video.currentTime = 0;
  unsetPlayingState();
});




// слайдер

/* $('.top__slider').slick({
    dots: true,     // Показывать точки для навигации
    arrows: false,  // Скрыть стрелки
    fade: true,      // Плавное затухание при смене слайдов (работает только при slidesToShow: 1)
    autoplay: true  // Автоматический проигрывание слайдов
  }); */

  $(function() {
  $('.slider__top').slick({
    dots: true,
    fade: true,
    autoplay: true,
    arrows: true,
    prevArrow: $('.slider-prev'),
    nextArrow: $('.slider-next'),
  });
});



// Модалка

document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector(".bid__form");
  const modal = document.getElementById("successModal");
  const closeBtn = modal.querySelector(".modal__close");

  const phoneInput = document.getElementById("phone");
  const phoneError = document.getElementById("phoneError");

  // Разрешаем только цифры, +, пробелы, скобки
  phoneInput.addEventListener("input", function() {
    const validChars = /^[0-9+\s()]*$/;

    if (!validChars.test(phoneInput.value)) {
      phoneInput.classList.add("error");
      phoneError.textContent = "Введите корректный номер";
      phoneError.style.display = "block";
    } else {
      phoneInput.classList.remove("error");
      phoneError.style.display = "none";
    }
  });

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = form.querySelector("input[placeholder='Имя']").value.trim();
    const phone = phoneInput.value.trim();

    // Проверка на пустые поля
    if (!name || !phone) {
      alert("Пожалуйста, заполните все поля!");
      return;
    }

    // Проверка телефона
    const validChars = /^[0-9+\s()]+$/;
    if (!validChars.test(phone)) {
      phoneInput.classList.add("error");
      phoneError.textContent = "Введите корректный номер";
      phoneError.style.display = "block";
      return;
    }

    // Всё ок → показываем модалку
    modal.style.display = "block";
    form.reset();
  });

  closeBtn.addEventListener("click", function() {
    modal.style.display = "none";
  });

  window.addEventListener("click", function(e) {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});


















 document.addEventListener('DOMContentLoaded', function() {
    const progressSection = document.querySelector('.conditions-bottom');
    const progressBars = document.querySelectorAll('.progress-fill');
    let animated = false;
    
    // Функция для проверки видимости элемента
    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
    }
    
    // Функция для анимации прогресс-баров
    function animateProgressBars() {
      if (animated) return;
      
      progressBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        // Устанавливаем ширину напрямую, без CSS переменной
        bar.style.width = percent + '%';
      });
      
      animated = true;
    }
    
    // Проверяем при загрузке страницы
    if (isElementInViewport(progressSection)) {
      animateProgressBars();
    }
    
    // Проверяем при скролле
    window.addEventListener('scroll', function() {
      if (isElementInViewport(progressSection) && !animated) {
        animateProgressBars();
      }
    });
    
    // Также проверяем при изменении размера окна
    window.addEventListener('resize', function() {
      if (isElementInViewport(progressSection) && !animated) {
        animateProgressBars();
      }
    });
  });

  


