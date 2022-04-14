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

document.addEventListener( 'click', (e) => {
	const withinBoundariesList = e.composedPath().includes(headerNavList);
  const withinBoundariesToggle = e.composedPath().includes(headerToggle);

	if ( ! withinBoundariesList && ! withinBoundariesToggle  ) {
    headerNavList.classList.add("header__nav-list--closed");
    headerToggle.classList.remove("header__toggle--closed");
	}
})
