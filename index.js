import { authPexels, authPix } from "./apikeys.js";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search__input");
const form = document.querySelector(".search");
const more = document.querySelector(".more");

let searchValue;

let page = 1;
let fetchLink;
let currentSearch;

//event listeners
searchInput.addEventListener("input", updateinput);
function updateinput(e) {
  searchValue = e.target.value;
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  pixPhotos(searchValue);

  searchPhotos(searchValue);
});

more.addEventListener("click", loadMore);
//API Fetch
async function fetchApi(url) {
  const datapexel = await fetch(url, {
    //method tell us what we want to do with the data
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: authPexels,
    },
  });
  const data = await datapexel.json();
  console.log(data.photos);
  return data;
}

function generatePictures(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery__img");
    galleryImg.innerHTML = `
    <div class="gallery__info  "><p class="btn"><a href="${photo.photographer_url}"target="_blank"  >${photo.photographer}</a></p> 
    <a href=${photo.src.original} class="btn btn--secondary" target="_blank">Download</a></div> <img src=${photo.src.large}>`;
    gallery.appendChild(galleryImg);
  });
}

async function pexelsPhotos() {
  fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=1`;
  const data = await fetchApi(fetchLink);

  generatePictures(data);
}

async function searchPhotos(query) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`;
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

async function loadMore() {
  page++;
  //if value already there
  if (currentSearch) {
    // query gets cleared up everytime
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

pexelsPhotos();
async function pixPhotos(query) {
  const datapix = await fetch(
    `https://pixabay.com/api/?key=${authPix}&q=${query}&image_type=photo`,
    {
      //method tell us what we want to do with the data
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );
  const data = await datapix.json();
  console.log(data.hits);
  data.hits.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery__img");
    galleryImg.innerHTML = `
    <div class="gallery__info  "><p class="btn"><a href="${photo.userImageURL}"target="_blank"  >${photo.user}</a></p> 
    <a href=${photo.largeImageURL} class="btn btn--secondary" target="_blank">Download</a></div> <img src=${photo.webformatURL}>`;
    gallery.appendChild(galleryImg);
  });
}
pixPhotos(15);
