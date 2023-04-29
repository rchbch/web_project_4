const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const templateFeedItem = document
  .querySelector("#template__feed-item")
  .content.querySelector(".feed-item");
const feedList = document.querySelector(".feed-list");

const editPopup = document.querySelector(".popup_type_profile-editing");
const addCardPopup = document.querySelector(".popup_type_add-feed-item");
const galleryImagePopup = document.querySelector(".popup_type_gallery");

const closeButtons = document.querySelectorAll(".popup__close-button");
const closeOverlay = document.querySelectorAll(".popup__background");

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const inputName = document.querySelector(".popup__input_type_name");
const inputTitle = document.querySelector(".popup__input_type_title");
const inputCardTitle = document.querySelector(".popup__input_type_card-title");
const inputImageUrl = document.querySelector(".popup__input_type_image-url");

const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");

const editProfileForm = editPopup.querySelector(".popup__form");
const addCardForm = addCardPopup.querySelector(".popup__form");

const popupImage = galleryImagePopup.querySelector(".popup__image");
const imageCaption = galleryImagePopup.querySelector(".popup__caption");

function getCard(cardData) {
  const feedItem = templateFeedItem.cloneNode(true);
  const title = feedItem.querySelector(".feed-item__name");
  const image = feedItem.querySelector(".feed-item__image");
  const removeButton = feedItem.querySelector(".feed-item__remove-button");
  const likeButton = feedItem.querySelector(".feed-item__like-button");

  title.textContent = cardData.name;
  image.src = cardData.link;
  image.alt = cardData.name;

  removeButton.addEventListener("click", (event) => {
    feedItem.remove();
  });
  likeButton.addEventListener("click", (event) => {
    likeButton.classList.toggle("feed-item__like-button_filled");
  });
  image.addEventListener("click", (event) => {
    openPopup(galleryImagePopup);
    imageCaption.textContent = cardData.name;
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
  });

  return feedItem;
}

function createCard(cardData) {
  const feedItem = getCard(cardData);
  feedList.prepend(feedItem);
}

initialCards.forEach(createCard);

function fillProfileForm() {
  inputName.value = profileName.textContent;
  inputTitle.value = profileTitle.textContent;
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

closeOverlay.forEach((background) => {
  const popup = background.closest(".popup");
  background.addEventListener("click", () => closePopup(popup));
});

editProfileButton.addEventListener("click", () => {
  fillProfileForm();
  openPopup(editPopup);
  initialValidationCheck(editProfileForm, config);
});

addCardButton.addEventListener("click", () => {
  openPopup(addCardPopup);
  initialValidationCheck(addCardForm, config);
});

editProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileTitle.textContent = inputTitle.value;
  closePopup(editPopup);
});

addCardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  createCard({ name: inputCardTitle.value, link: inputImageUrl.value });
  closePopup(addCardPopup);
  addCardForm.reset();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    if (popup) {
      closePopup(popup);
    }
  }
});
