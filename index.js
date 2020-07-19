// 563492ad6f91700001000001545f43d70873455a84aa28d0ea811cbd
// 17539114-03bd75b0c6c7532d082b9f7cb

const authPexels = "563492ad6f91700001000001545f43d70873455a84aa28d0ea811cbd";
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
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}
// async function pexelsPhotos() {
//   const datapexel = await fetch(
//     "https://api.pexels.com/v1/curated?per_page=15&page=1",
//     {
//       //method tell us what we want to do with the data
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         Authorization: authPexels,
//       },
//     }
//   );
//   const data = await datapexel.json();
//   console.log(data.photos);
//   data.photos.forEach((photo) => {
//     const galleryImg = document.createElement("div");
//     galleryImg.classList.add("gallery__img");
//     galleryImg.innerHTML = `<img src=${photo.src.large}> <p>${photo.photographer}</p>`;
//     gallery.appendChild(galleryImg);
//   });
// }

// async function searchPhotos(query) {
//   const datapexel = await fetch(
//     `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`,
//     {
//       //method tell us what we want to do with the data
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         Authorization: authPexels,
//       },
//     }
//   );

//   const data = await datapexel.json();
//   console.log(data.photos);
//   data.photos.forEach((photo) => {
//     const galleryImg = document.createElement("div");
//     galleryImg.classList.add("gallery__img");
//     galleryImg.innerHTML = `<img src=${photo.src.large}> <p>${photo.photographer}</p>`;
//     gallery.appendChild(galleryImg);
//   });
// }

pexelsPhotos();
