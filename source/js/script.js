// Модальное главное меню

const headerToggle = document.querySelector(".header__toggle");
const headerNavList = document.querySelector(".header__nav-list");

headerToggle.classList.remove("visually-hidden");
headerNavList.classList.add("header__nav-list--closed");

headerToggle.addEventListener("click", function (evt) {
  evt.preventDefault();
  headerToggle.classList.toggle("header__toggle--closed");
  headerNavList.classList.toggle("header__nav-list--closed");
});

const theLinks = document.querySelectorAll(".nav-item__link");
theLinks.forEach(link => link.addEventListener("click", () => {
  headerToggle.classList.toggle("header__toggle--closed");
  headerNavList.classList.toggle("header__nav-list--closed");
}))

document.addEventListener('click', (e) => {
  const withinBoundariesList = e.composedPath().includes(headerNavList);
  const withinBoundariesToggle = e.composedPath().includes(headerToggle);

  if (!withinBoundariesList && !withinBoundariesToggle) {
    headerNavList.classList.add("header__nav-list--closed");
    headerToggle.classList.remove("header__toggle--closed");
  }
})

// Модальное окно кнопки призыва к действию

const modalCTA = document.querySelector(".page__modal-call-to-action");
const buttonCTA = document.querySelector(".call-to-action__button");
const toggleCTA = document.querySelector(".modal-call-to-action__toggle-box, .modal-call-to-action__toggle");

buttonCTA.addEventListener("click", function (evt) {
  evt.preventDefault();
  modalCTA.classList.remove("visually-hidden");
});

toggleCTA.addEventListener("click", function (evt) {
  evt.preventDefault();
  modalCTA.classList.add("visually-hidden");
});

// Проверяем валидация формы

// "use strict"

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.modal-call-to-action__form');
  const modalCTA = document.querySelector(".page__modal-call-to-action");
  const modalDone = document.querySelector(".page__modal-feedback--done");

  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);

    if (error <= 4) {
      const modalCTAContainer = document.querySelector('.modal-call-to-action__container');

      modalCTAContainer.classList.add('modal-call-to-action__container--sending');

      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData
      });

      modalCTAContainer.classList.remove('modal-call-to-action__container--sending');
      modalCTA.classList.add("visually-hidden");
      modalDone.classList.remove("visually-hidden");

      const buttonFeedbackDone = document.querySelector(".modal-feedback__button--done");
      const toggleFeedbackDone = document.querySelector(".modal-feedback__toggle-box--done, .modal-feedback__toggle--done");

      toggleFeedbackDone.addEventListener("click", function (evt) {
        evt.preventDefault();
        modalDone.classList.add("visually-hidden");
      });

      buttonFeedbackDone.addEventListener("click", function (evt) {
        evt.preventDefault();
        modalDone.classList.add("visually-hidden");
      });
    } else {
      // Открытие/закрытие попапа feedback
      const modalError = document.querySelector(".page__modal-feedback--error");

      modalError.classList.remove("visually-hidden");

      const buttonFeedbackError = document.querySelector(".modal-feedback__button--error");
      const toggleFeedbackError = document.querySelector(".modal-feedback__toggle-box--error, .modal-feedback__toggle--error");

      toggleFeedbackError.addEventListener("click", function (evt) {
        evt.preventDefault();
        modalError.classList.add("visually-hidden");
      });

      buttonFeedbackError.addEventListener("click", function (evt) {
        evt.preventDefault();
        modalError.classList.add("visually-hidden");
      });
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('.item-radio__input-field');

    for (let i = 0; i < formReq.length; i++) {
      const input = formReq[i];
      formRemoveError(input);

      if (input.classList.contains('__email')) {
        if (emailTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (input.classList.contains('__phone')) {
        if (phoneTest(input)) {
          formAddError(input);
          error++;
        }
      } else if (input.classList.contains('__telegram')) {
        if (telegramTest(input)) {
          formAddError(input);
          error++;
        }
      }
    }
    return error;
  }

  function formAddError(input) {
    input.classList.add('item-radio__input-field--error');
  }

  function formRemoveError(input) {
    input.classList.remove('item-radio__input-field--error');
  }

  // функция валидации email
  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }

  // функция валидации phone
  function phoneTest(input) {
    return !/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(input.value);
  }

  // функция валидации telegram
  function telegramTest(input) {
    return !/^@\w+([\.-]?\w+)$/.test(input.value);
  }

});



// Кнопка 'scroll-up'

const offset = 800;
const scrollUp = document.querySelector('.page__scroll-up');
const scrollUpSvgPath = document.querySelector('.scroll-up__svg-path');
const pathLength = scrollUpSvgPath.getTotalLength();

scrollUpSvgPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
scrollUpSvgPath.style.transition = 'stroke-dashoffset 20ms';

const getTop = () => window.pageYOffset || document.documentElement.scrollTop;

// Кнопка 'scroll-up'  функция вычисления длины заливки тени кнопки, соответственно величине скролла
const updateDashoffset = () => {
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const dashoffset = pathLength - (getTop() * pathLength / height);

  scrollUpSvgPath.style.strokeDashoffset = dashoffset;
};

// Кнопка 'scroll-up'  функция появления и исчезновения кнопки скролла
window.addEventListener('scroll', () => {
  updateDashoffset();

  if (getTop() > offset) {
    scrollUp.classList.add('page__scroll-up--active');
  } else {
    scrollUp.classList.remove('page__scroll-up--active');
  }
});

// Кнопка 'scroll-up'  функция скролла в начало страница при нажатии на кнопку
scrollUp.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

updateDashoffset();



// Анимация блока stages-of-work



function offsett(el) {
  const rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
}

let stagesOfWorkItems = document.querySelectorAll('.stages-of-work__item');

window.addEventListener('scroll', animOnScroll);
function animOnScroll() {
  for (let index = 0; index < stagesOfWorkItems.length; index++) {
    const animation = stagesOfWorkItems[index];

    const animationHeight = animation.offsetHeight;
    const animationOffset = offsett(animation).top;

    if (scrollY > animationOffset - animationHeight) {
      animation.classList.add('stages-of-work__item--animation');
    }
  }
}

setTimeout(() => {
  animOnScroll();
}, 50);

let aboutUsItems = document.querySelectorAll('.about-us__item');

window.addEventListener('scroll', animOnScrollAboutUs);
function animOnScrollAboutUs() {
  for (let index = 0; index < aboutUsItems.length; index++) {
    const animation = aboutUsItems[index];

    const animationHeight = animation.offsetHeight;
    const animationOffset = offsett(animation).top;

    if (scrollY > animationOffset - window.screen.height / 1.5) {
      animation.classList.add('about-us__item--animation');
    }
  }
}

setTimeout(() => {
  animOnScrollAboutUs();
}, 50);


// слайдер в отзывах

let sliderItems = document.querySelectorAll('.feedback__slider-item');
let radioButtons = document.querySelectorAll('.feedback__radio-button');
const arrowsPrev = document.querySelector('.slider-arrows__prev');
const arrowsNext = document.querySelector('.slider-arrows__next');


for (let index = 0; index < sliderItems.length; index++) {

  arrowsPrev.addEventListener("click", function () {
    if (radioButtons[index].checked) {
      radioButtons[index - 1].click();
    }

    onP();
  });
}

for (let index = sliderItems.length; index >= 0; index--) {
  arrowsNext.addEventListener("click", function () {
    if (radioButtons[index].checked) {
      radioButtons[index + 1].click();
    }

    onP();
  });
}

for (let index = 0; index < sliderItems.length; index++) {
  radioButtons[index].addEventListener("click", function () {
    onP();
  });
}

function onP() {
  if (radioButtons[0].checked) {
    arrowsPrev.classList.add('feedback__slider-arrows--no-active');
    arrowsNext.classList.remove('feedback__slider-arrows--no-active');
  } else {
    if (radioButtons[sliderItems.length - 1].checked) {
      arrowsNext.classList.add('feedback__slider-arrows--no-active');
      arrowsPrev.classList.remove('feedback__slider-arrows--no-active');
    } else {
      arrowsNext.classList.remove('feedback__slider-arrows--no-active');
      arrowsPrev.classList.remove('feedback__slider-arrows--no-active');
    }
  }
}
onP();




document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);
// document.addEventListener('touchend', handleTouchEnd, false);

const sliderList = document.querySelector('.feedback__slider-list');

let x1 = null;
// let y1 = null;

function handleTouchStart(event) {
  const firstTouch = event.touches[0];

  x1 = firstTouch.clientX;
  // y1 = firstTouch.clientY;


  // console.log(x1, y1);
}

function handleTouchMove(event) {
  if (!x1) {
    return false;
  }

  let x2 = event.touches[0].clientX;
  // let y2 = event.touches[0].clientY;
  let xDiff = x2 - x1;
  // let yDiff = y2 - y1;
  // console.log(x2, y2);
  if (xDiff > 7) {
    for (let index = 0; index < sliderItems.length; index++) {
      if (radioButtons[index].checked) {
        radioButtons[index - 1].click();
        onP();
      }
    }
  } else {
    if (xDiff < -7) {
      for (let index = sliderItems.length - 1; index >= 0; index--) {
        if (radioButtons[index].checked) {
          radioButtons[index + 1].click();
          onP();
        }
      }
    }
  }
  x1 = null;
  y1 = null;
}

////
// let sliderTrack = document.querySelector('.feedback__slider-list');
// posInit = 0;
// posX1 = 0;
// posX2 = 0;
// posFinal = 0;
// posThreshold = slideWidth * .35;
// trfRegExp = /[-0-9.]+(?=px)/;

// getEvent = function () {
//   return event.type.search('touch') !== -1 ? event.touches[0] : event;
//   // p.s. event - аргумент по умолчанию в функции
// },
//   // или es6
//   getEvent = () => event.type.search('touch') !== -1 ? event.touches[0] : event,

//   swipeStart = function () {
//     let evt = getEvent();

//     // берем начальную позицию курсора по оси Х
//     posInit = posX1 = evt.clientX;

//     // убираем плавный переход, чтобы track двигался за курсором без задержки
//     // т.к. он будет включается в функции slide()
//     sliderTrack.style.transition = '';

//     // и сразу начинаем отслеживать другие события на документе
//     document.addEventListener('touchmove', swipeAction);
//     document.addEventListener('touchend', swipeEnd);
//     document.addEventListener('mousemove', swipeAction);
//     document.addEventListener('mouseup', swipeEnd);
//   },
//   swipeAction = function () {
//     let evt = getEvent(),
//       // для более красивой записи возьмем в переменную текущее свойство transform
//       style = sliderTrack.style.transform,
//       // считываем трансформацию с помощью регулярного выражения и сразу превращаем в число
//       transform = +style.match(trfRegExp)[0];

//     posX2 = posX1 - evt.clientX;
//     posX1 = evt.clientX;

//     sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
//     // можно было бы использовать метод строк .replace():
//     // sliderTrack.style.transform = style.replace(trfRegExp, match => match - posX2);
//     // но в дальнейшем нам нужна будет текущая трансформация в переменной
//   }

// swipeEnd = function () {
//   // финальная позиция курсора
//   posFinal = posInit - posX1;

//   document.removeEventListener('touchmove', swipeAction);
//   document.removeEventListener('mousemove', swipeAction);
//   document.removeEventListener('touchend', swipeEnd);
//   document.removeEventListener('mouseup', swipeEnd);

//   // убираем знак минус и сравниваем с порогом сдвига слайда
//   if (Math.abs(posFinal) > posThreshold) {
//     // если мы тянули вправо, то уменьшаем номер текущего слайда
//     if (posInit < posX1) {
//       slideIndex--;
//       // если мы тянули влево, то увеличиваем номер текущего слайда
//     } else if (posInit > posX1) {
//       slideIndex++;
//     }
//   }

//   // если курсор двигался, то запускаем функцию переключения слайдов
//   if (posInit !== posX1) {
//     slide();
//   }

// };

// sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';

// slider.addEventListener('touchstart', swipeStart);
// slider.addEventListener('mousedown', swipeStart);
