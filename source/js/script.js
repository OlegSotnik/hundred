// Модальное главное меню в мобильной и планшетной версии

const mainNav = document.querySelector(".main-nav");
const pageHeaderTop = document.querySelector(".page-header__top");
const logoLink = document.querySelector(".logo-link");
const pageHeaderContainer = document.querySelector(".page-header-container");
const mainNavToggle = document.querySelector(".main-nav__toggle");
const buttonAuthorization = document.querySelector(".button-authorization");

mainNav.classList.add("main-nav--closed");
mainNavToggle.classList.remove("visually-hidden");

mainNavToggle.addEventListener("click", function (evt) {
  evt.preventDefault();
  mainNavToggle.classList.toggle("main-nav__toggle--closed");
  pageHeaderTop.classList.toggle("page-header__top--background-color");
  pageHeaderContainer.classList.toggle("page-header-container--background");
  logoLink.classList.toggle("logo-image--toggle-closed");
  mainNav.classList.toggle("main-nav--closed");
  buttonAuthorization.classList.toggle("button-authorization--width-tablet-nav-open");
});

// Модальное окно с бизнес тарифами

const businessRates = document.querySelector(".business-rates");
const businessTariffLinkText = document.querySelector(".business-tariff-link__text");
const businessRatesLinkClose = document.querySelector(".business-rates__link-close");

businessTariffLinkText.addEventListener("click", function (evt) {
  evt.preventDefault();
  businessRates.classList.remove("business-rates--closed");
});

businessRatesLinkClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  businessRates.classList.add("business-rates--closed");
});


window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (evt.target.closest('.business-rates--closed') === null) {
      evt.preventDefault();
      businessRates.classList.add("business-rates--closed");
    }
  }
});
