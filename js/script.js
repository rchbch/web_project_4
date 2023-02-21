const editProfileButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup__profile-editing");
const closeButton = editPopup.querySelector(".popup__close-button");
const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");
const inputName = document.querySelector(".popup__input_type_name");
const inputTitle = document.querySelector(".popup__input_type_title");

function fillProfileForm() {
  inputName.value = profileName.textContent;
  inputTitle.value = profileTitle.textContent;
}

function openProfileForm() {
  fillProfileForm();
  editPopup.classList.remove("popup_visible");
}

function closeProfileForm() {
  editPopup.classList.add("popup_visible");
}

editProfileButton.addEventListener("click", openProfileForm);
closeButton.addEventListener("click", closeProfileForm);

const formElement = document.querySelector(".popup__form");

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileTitle.textContent = inputTitle.value;
  editPopup.classList.add("popup_visible");
}

formElement.addEventListener("submit", handleProfileFormSubmit);
