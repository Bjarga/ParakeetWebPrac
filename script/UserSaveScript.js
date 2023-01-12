let galleryContentArray = JSON.parse(localStorage.getItem("GalleryImg"));
let productContentArray = JSON.parse(localStorage.getItem("ProductImg"));
let homeContentArray = JSON.parse(localStorage.getItem("HomeImg"));

let userList = document.querySelector(".user-list");

let gallery = [...new Set(galleryContentArray)];
let productPic = [...new Set(productContentArray)];
let homePic = [...new Set(homeContentArray)];

gallery.forEach((element) => {
  let li = document.createElement("li");
  li.innerHTML = `<img class="save-img"
          src=${element}
          alt="gallery image">`;
  userList.appendChild(li);
});

productPic.forEach((element) => {
  let list = document.createElement("li");
  list.innerHTML = `<img class="save-img"
          src=${element}
          alt="gallery image">`;
  userList.appendChild(list);
});

homePic.forEach((element) => {
  let liste = document.createElement("li");
  liste.innerHTML = `<img class="save-img"
          src=${element}
          alt="gallery image">`;
  userList.appendChild(liste);
});

// let arrayLength = gallery.length + productPic.length + homePic.length;

// localStorage.setItem("NumberSaved", arrayLength);
