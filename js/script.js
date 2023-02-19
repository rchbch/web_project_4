const editButton = document.querySelector(".profile__edit-button");
const popup = document.querySelector(".popup__profile-editing");
const closeButton = popup.querySelector(".popup__close-button");
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const inputName = document.querySelector(".popup__input_type_name");
const inputTitle = document.querySelector(".popup__input_type_title");

function toggleForm() {
  inputName.value = profileName.textContent;
  inputTitle.value = profileTitle.textContent;
  popup.classList.toggle("popup_visible");
}

editButton.addEventListener("click", toggleForm);
closeButton.addEventListener("click", toggleForm);

let formElement = document.querySelector(".popup__form");

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileTitle.textContent = inputTitle.value;
  popup.classList.toggle("popup_visible");
}

formElement.addEventListener("submit", handleProfileFormSubmit);
