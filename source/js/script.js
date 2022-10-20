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

"use strict"

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.modal-call-to-action__form');
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    if (error <= 4) {

    } else {
      // Открытие/закрытие попапа ошибки
      const modalError = document.querySelector(".page__modal-error");
      const buttonError = document.querySelector(".modal-error__button");
      const toggleError = document.querySelector(".modal-error__toggle-box, .modal-error__toggle");

      modalError.classList.remove("visually-hidden");

      toggleError.addEventListener("click", function (evt) {
        evt.preventDefault();
        modalError.classList.add("visually-hidden");
      });

      buttonError.addEventListener("click", function (evt) {
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

// Отправка сообщения на почту
