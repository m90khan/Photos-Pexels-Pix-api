// 563492ad6f91700001000001545f43d70873455a84aa28d0ea811cbd
// 17539114-03bd75b0c6c7532d082b9f7cb

const authPexels = "563492ad6f91700001000001545f43d70873455a84aa28d0ea811cbd";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search__input");
const form = document.querySelector(".search");

let searchValue;

//event listener
searchInput.addEventListener("input", updateinput);
function updateinput(e) {
  searchValue = e.target.value;
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  searchPhotos(searchValue);
});

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
  return data;
}

function generatePictures(data) {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery__img");
    galleryImg.innerHTML = `<img src=${photo.src.large}> <p>${photo.photographer}</p>`;
    gallery.appendChild(galleryImg);
  });
}

async function pexelsPhotos() {
  const data = await fetchApi(
    `https://api.pexels.com/v1/curated?per_page=15&page=1`
  );

  generatePictures(data);
}

async function searchPhotos(query) {
  const data = await fetchApi(
    `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`
  );
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
