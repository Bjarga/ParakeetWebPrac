/* ______________________________________________
Like Button Section
_______________________________________________*/

//select dom element
const likeSaveBtnProducts = document.querySelectorAll(".like-product-btn");
const navbarElement = document.querySelector(".saved-spot");
let count;
//empty array that will save liked button status for local storage
let storageBtnProducts = [];
let saveProductButtonArray = [];
//button array with default status
const likeBtnProducts = [
  {
    likedBtn: "Pbtn-1",
    click: false,
  },
  {
    likedBtn: "Pbtn-2",
    click: false,
  },
  {
    likedBtn: "Pbtn-3",
    click: false,
  },
  {
    likedBtn: "Pbtn-4",
    click: false,
  },
  {
    likedBtn: "Pbtn-5",
    click: false,
  },
  {
    likedBtn: "Pbtn-6",
    click: false,
  },
  {
    likedBtn: "Pbtn-7",
    click: false,
  },
  {
    likedBtn: "Pbtn-8",
    click: false,
  },
  {
    likedBtn: "Pbtn-9",
    click: false,
  },
  {
    likedBtn: "Pbtn-10",
    click: false,
  },
  {
    likedBtn: "Pbtn-11",
    click: false,
  },
  {
    likedBtn: "Pbtn-12",
    click: false,
  },
];
const savingBtnProducts = [
  {
    PlikedBtn: "Pbtn-save-1",
    click: false,
  },
  {
    PlikedBtn: "Pbtn-save-2",
    click: false,
  },
  {
    PlikedBtn: "Pbtn-save-3",
    click: false,
  },
  {
    PlikedBtn: "Pbtn-save-4",
    click: false,
  },
  {
    PlikedBtn: "Pbtn-save-5",
    click: false,
  },
  {
    PlikedBtn: "Pbtn-save-6",
    click: false,
  },
  {
    PlikedBtn: "Pbtn-save-7",
    click: false,
  },
  {
    PlikedBtn: "Pbtn-save-8",
    click: false,
  },
  {
    PlikedBtn: "Pbtn-save-9",
    click: false,
  },
  {
    PlikedBtn: "Pbtn-save-10",
    click: false,
  },
  {
    PlikedBtn: "Pbtn-save-11",
    click: false,
  },
  {
    PlikedBtn: "Pbtn-save-12",
    click: false,
  },
];
//on click change button to liked and save status to local storage

likeSaveBtnProducts.forEach((element) => {
  element.addEventListener("click", function (event) {
    event.preventDefault();

    //change button to liked status
    element.innerText = "LIKED";
    element.style.backgroundColor = "#5e68c4";
    element.style.color = "white";

    //save buttons liked status to local storage
    storageBtnProducts = JSON.parse(localStorage.getItem("likesProducts"));
    for (let i = 0; i < likeBtnProducts.length; i++) {
      if (likeBtnProducts[i].likedBtn === element.id) {
        storageBtnProducts[i].click = true;
        localStorage.setItem("likesProducts", JSON.stringify(storageBtnProducts));
      }
    }
  });
});

// on page load check if page was loaded before
function loadpage() {
  if (localStorage.getItem("hasCodeRunBeforeProducts") === null) {
    localStorage.setItem("likesProducts", JSON.stringify(likeBtnProducts));
    localStorage.setItem("saveProductButton", JSON.stringify(savingBtnProducts));
    localStorage.setItem("hasCodeRunBeforeProducts", true);
    localStorage.setItem("ProductImg", JSON.stringify(productGalleryArray));

    //load counter for saved images with correct number
    if (Number(localStorage.getItem("numberSaved")) > 0) {
      count = Number(localStorage.getItem("numberSaved"));
    } else {
      count = 0;
    }
  } else {
    storageBtnProducts = JSON.parse(localStorage.getItem("likesProducts"));
    saveProductButtonArray = JSON.parse(localStorage.getItem("saveProductButton"));
    productGalleryArray = JSON.parse(localStorage.getItem("ProductImg"));
    count = Number(localStorage.getItem("numberSaved"));
    //set button status according to localstorage state
    for (let i = 0; i < likeBtnProducts.length; i++) {
      if (storageBtnProducts[i].click == true) {
        document.getElementById(`${storageBtnProducts[i].likedBtn}`).innerText = "LIKED";
        document.getElementById(`${storageBtnProducts[i].likedBtn}`).style.backgroundColor = "#5e68c4";
        document.getElementById(`${storageBtnProducts[i].likedBtn}`).style.color = "white";
      }
      if (saveProductButtonArray[i].click == true) {
        document.getElementById(`${saveProductButtonArray[i].PlikedBtn}`).innerText = "SAVED";
        document.getElementById(`${saveProductButtonArray[i].PlikedBtn}`).style.backgroundColor = "#5e68c4";
        document.getElementById(`${saveProductButtonArray[i].PlikedBtn}`).style.color = "white";
      }
      if (saveProductButtonArray[i].click == true) {
        navbarElement.style.visibility = "visible";
      }
    }
  }
}

/* ______________________________________________
Save Page Section
_______________________________________________*/

let saveImgBtn = document.querySelectorAll(".save-product-btn");

let productGalleryArray = [];

saveImgBtn.forEach((element) => {
  element.addEventListener("click", function (e) {
    e.preventDefault();

    let image = element.parentElement.firstElementChild;
    let imageSource = image.src;

    //count content saved by user and save to local storage
    if (element.style.color != "white") {
      count = count + 1;
    }

    localStorage.setItem("numberSaved", count);

    productGalleryArray.push(imageSource);
    localStorage.setItem("ProductImg", JSON.stringify(productGalleryArray));

    //change appearance of button
    element.innerText = "SAVED";
    element.style.backgroundColor = "#5e68c4";
    element.style.color = "white";

    //store save button clicked in local storage

    saveProductButtonArray = JSON.parse(localStorage.getItem("saveProductButton"));
    for (let i = 0; i < likeBtnProducts.length; i++) {
      if (saveProductButtonArray[i].PlikedBtn === element.id) {
        saveProductButtonArray[i].click = true;
        localStorage.setItem("saveProductButton", JSON.stringify(saveProductButtonArray));
      }
    }

    //add save page in navbar for user
    navbarElement.style.visibility = "visible";
    alert(`You have saved ${count} item(s) to your save items page`);
  });
});
/* ______________________________________________
Comment section
_______________________________________________*/

const commentForm = document.querySelector(".comment-section-conatainer");

const commentInput = commentForm["comment"];
const submitBtn = document.querySelector("#submit");
const displayComments = document.querySelector(".display-comments");

const userComments = JSON.parse(localStorage.getItem("userComments")) || [];

//push comment to array
const addComment = (comment) => {
  userComments.push({ comment });

  localStorage.setItem("userComments", JSON.stringify(userComments));

  return { comment };
};

// function to create and add comment to webpage
const createCommentElement = ({ comment }) => {
  //create Elements
  const commentDiv = document.createElement("div");
  const commentDisplay = document.createElement("p");

  //fill content
  commentDisplay.innerText = '"' + comment + '"';

  // add comment to webpage
  commentDiv.append(commentDisplay);
  displayComments.appendChild(commentDiv);
};

userComments.forEach(createCommentElement);

commentForm.onsubmit = (e) => {
  e.preventDefault();

  const newComment = addComment(commentInput.value);

  createCommentElement(newComment);

  commentInput.value = "";
};
