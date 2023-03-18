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

const editPopup = document.querySelector(".popup__profile-editing");
const addCardPopup = document.querySelector(".popup__add-feeditem");
const galleryImagePopup = document.querySelector(".popup__gallery-image");

const editPopupCloseButton = editPopup.querySelector(".popup__close-button");
const addCardPopupCloseButton = addCardPopup.querySelector(
  ".popup__close-button"
);
const galleryImagePopupCloseButton = galleryImagePopup.querySelector(
  ".popup__close-button"
);

const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");

const inputName = document.querySelector(".popup__input_type_name");
const inputTitle = document.querySelector(".popup__input_type_title");
const inputCardTitle = document.querySelector(".popup__input_type_cardtitle");
const inputImageUrl = document.querySelector(".popup__input_type_image-url");

const profileName = document.querySelector(".profile__name");
const profileTitle = document.querySelector(".profile__title");

const editProfileForm = editPopup.querySelector(".popup__form");
const addCardForm = addCardPopup.querySelector(".popup__form");

function createCard(cardData) {
  const feedItem = templateFeedItem.cloneNode(true);

  const title = feedItem.querySelector(".feed-item__name");
  const image = feedItem.querySelector(".feed-item__image");
  const removeButton = feedItem.querySelector(".feed-item__remove-button");
  const likeButton = feedItem.querySelector(".feed-item__like-button");
  const popupImage = galleryImagePopup.querySelector(".popup__image");
  const imageCaption = galleryImagePopup.querySelector(".popup__caption");

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
    galleryImagePopup.classList.remove("popup_hidden");
    imageCaption.textContent = cardData.name;
    popupImage.src = cardData.link;
    popupImage.alt = cardData.name;
  });

  galleryImagePopupCloseButton.addEventListener("click", () => {
    galleryImagePopup.classList.add("popup_hidden");
  });

  feedList.prepend(feedItem);
}

initialCards.forEach(createCard);

function fillProfileForm() {
  inputName.value = profileName.textContent;
  inputTitle.value = profileTitle.textContent;
}

editProfileButton.addEventListener("click", () => {
  fillProfileForm();
  editPopup.classList.remove("popup_hidden");
});

editPopupCloseButton.addEventListener("click", () => {
  editPopup.classList.add("popup_hidden");
});

addCardButton.addEventListener("click", () => {
  addCardForm.reset();
  addCardPopup.classList.remove("popup_hidden");
});

addCardPopupCloseButton.addEventListener("click", () => {
  addCardPopup.classList.add("popup_hidden");
});

editProfileForm.addEventListener("submit", (event) => {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileTitle.textContent = inputTitle.value;
  editPopup.classList.add("popup_hidden");
});

addCardForm.addEventListener("submit", (event) => {
  event.preventDefault();
  createCard({ name: inputCardTitle.value, link: inputImageUrl.value });
  addCardPopup.classList.add("popup_hidden");
});
