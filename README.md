<br />
<p align="center">
  <a href="https://www.thewebsitekitchen.com">
    <img src="img/favicon.jpg" alt="Logo" width="120" height="120">
  </a>

  <h3 align="center">Pixbay Clone</h3>

  <p align="center">
Fetching Data from Pexels and PixBay API's and displaying them <br />
    <a href="m90khan@gmail.com"><strong>Contact Me</strong></a>
    <br />
    <br />
    <a href="https://m90khan.github.io/Advanture-Web-GSAP/">View Demo</a>
    
   </p>
</p>

## Table of Contents

- [About the Project](#about-the-project)
- [Process](#process)
- [Skills](#skills)
- [Code Snippet](#code)
- [Contact](#Contact)

---

### About the Project

<img src="./img/overview.jpg">
<img src="./img/overview-apis.jpg">

#### Process

- Write the the HTML structure
- Applied styling using sass
- Fetch data from the API Pexels and Pixbay
- take the images, urls and create display them on the front-end
- another thing that can be done is to store thee enrated div and based on selection we store them to localStorage . Wishlist Functionality

---

### Skills

- HTML5
- CSS3 - SCSS Syntax
- JavaScript
- API Integration

---

### Code Snippet

```javascript
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
```

---

### Contact

Reach out to me at one of the following places!

- Website : <a href="https://thewebsitekitchen.com" target="_blank">`thewebsitekitchen.com`</a>
- Linkedin : <a href="https://de.linkedin.com/in/khanmohsinx" target="_blank">`khanmohsinx`</a>

---
