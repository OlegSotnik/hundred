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
