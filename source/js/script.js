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
