document.addEventListener('DOMContentLoaded', function() {
    const burgerBtn = document.querySelector('.header__btn');
    const burgerMenu = document.querySelector('.burger-menu');
    const closeBtn = document.querySelector('.burger-menu__close');
    
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    
    function openMenu() {
        burgerMenu.classList.remove('rightside-menu--close');
        burgerMenu.classList.add('rightside-menu--open');
        overlay.classList.add('overlay--active');
        document.body.style.overflow = 'hidden'; // Блокируем скролл
    }
    
    function closeMenu() {
        burgerMenu.classList.remove('rightside-menu--open');
        burgerMenu.classList.add('rightside-menu--close');
        overlay.classList.remove('overlay--active');
        document.body.style.overflow = ''; // Разблокируем скролл
    }
    
    burgerBtn.addEventListener('click', openMenu);
    closeBtn.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });
    
    window.addEventListener('resize', function() {
        if (window.innerWidth > 580) {
            closeMenu();
        }
    });
});

const links = document.querySelectorAll('.gallery-nav__link');

const items = document.querySelectorAll('.gallery-foto__item');

function showCards(filter) {
  for (let i = 0; i < items.length; i++) {
    const category = items[i].dataset.category; 
    if (filter === 'all' || category === filter) {
      items[i].classList.remove('hidden'); 
    } else {
      items[i].classList.add('hidden');
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  for (let i = 0; i < links.length; i++) {
    if (links[i].classList.contains('active')) { 
      const filter = links[i].dataset.filter;    
      showCards(filter);                          
      break;                                      
    }
  }
});

for (let i = 0; i < links.length; i++) {
  links[i].addEventListener('click', function(e) {
    e.preventDefault();

    for (let j = 0; j < links.length; j++) {
      links[j].classList.remove('active');
    }
    this.classList.add('active');

    const filter = this.dataset.filter;
    showCards(filter);
  });
}

const inner = document.querySelector('.video__inner');
const video = document.querySelector('.video__content');
const poster = document.querySelector('.video__poster');

function setPlayingState() {
  inner.classList.add('is-playing');
  poster.style.display = 'none';
  video.style.opacity = '1';
  video.style.pointerEvents = 'auto';
  video.setAttribute('controls', '');
  video.play().catch(err => console.warn('play() rejected:', err));
}

function unsetPlayingState() {
  inner.classList.remove('is-playing');
  video.removeAttribute('controls');
  poster.style.display = 'block';
  video.pause(); 
}

inner.addEventListener('click', function () {
  if (video.paused) {
    setPlayingState();
  } else {
    unsetPlayingState();
  }
});

video.addEventListener('ended', () => {
  video.currentTime = 0;
  unsetPlayingState();
});
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

document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector(".bid__form");
  const modal = document.getElementById("successModal");
  const closeBtn = modal.querySelector(".modal__close");

  const nameInput = document.getElementById("name");
  const nameError = document.getElementById("nameError");

  const phoneInput = document.getElementById("phone");
  const phoneError = document.getElementById("phoneError");

  const messageInput = form.querySelector("textarea");
  const messageError = document.createElement("small");
  messageError.classList.add("error-msg");
  messageInput.insertAdjacentElement("afterend", messageError);

  // Проверка телефона на ввод допустимых символов
  phoneInput.addEventListener("input", function() {
    const validChars = /^[0-9+\s()]*$/;
    if (!validChars.test(phoneInput.value)) {
      phoneError.textContent = "Введите корректный номер";
      phoneError.style.display = "block";
    } else {
      phoneError.style.display = "none";
    }
  });

  form.addEventListener("submit", function(e) {
    e.preventDefault();
    let hasError = false;

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const message = messageInput.value.trim();

    // Проверка имени
    if (!name) {
      nameError.textContent = "Заполните поле";
      nameError.style.display = "block";
      hasError = true;
    } else {
      nameError.style.display = "none";
    }

    // Проверка телефона
    const validPhone = /^[0-9+\s()]+$/;
    if (!phone) {
      phoneError.textContent = "Заполните поле";
      phoneError.style.display = "block";
      hasError = true;
    } else if (!validPhone.test(phone)) {
      phoneError.textContent = "Введите корректный номер";
      phoneError.style.display = "block";
      hasError = true;
    } else {
      phoneError.style.display = "none";
    }

    // Проверка textarea
    if (!message) {
      messageError.textContent = "Заполните поле";
      messageError.style.display = "block";
      hasError = true;
    } else {
      messageError.style.display = "none";
    }

    if (hasError) return;

    // Всё ок → показываем модалку
    modal.style.display = "block";
    form.reset();
  });

  // Закрытие модалки по кнопке
  closeBtn.addEventListener("click", function() {
    modal.style.display = "none";
  });

  // Закрытие модалки при клике вне неё
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
    
    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
      );
    }

    function animateProgressBars() {
      if (animated) return;
      
      progressBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        bar.style.width = percent + '%';
      });
      
      animated = true;
    }

    if (isElementInViewport(progressSection)) {
      animateProgressBars();
    }

    window.addEventListener('scroll', function() {
      if (isElementInViewport(progressSection) && !animated) {
        animateProgressBars();
      }
    });

    window.addEventListener('resize', function() {
      if (isElementInViewport(progressSection) && !animated) {
        animateProgressBars();
      }
    });
  });

document.addEventListener('DOMContentLoaded', function() {
  const counters = document.querySelectorAll('.indicators__title');
  const targets = [450, 2500, 10, 365];
  let animated = false; 

  function startCounters() {
    if (animated) return; 
    animated = true;
    
    counters.forEach((counter, index) => {
      let current = 0;
      const target = targets[index];
      const speed = 10;
      
      const timer = setInterval(function() {
        current += 2;
        counter.textContent = current;
        if (current >= target) clearInterval(timer);
      }, speed);
    });
  }

  function checkVisibility() {
    const section = document.querySelector('.indicators');
    const rect = section.getBoundingClientRect();
    
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      startCounters();
      window.removeEventListener('scroll', checkVisibility); 
    }
  }

  window.addEventListener('scroll', checkVisibility);
  checkVisibility();
});

