/* ______________________________________________
Like Button Section
_______________________________________________*/

//select dom element
let likehomeSaveBtn = document.querySelectorAll(".main-img-like");
let navbarElement = document.querySelector(".saved-spot");
let count;
//empty array that will save liked button status for local storage
let storageBtnHome = [];
let saveButtonArray = [];
let galleryArray = [];
//button array with default status
const likeBtnHome = [
  {
    likedBtn: "btn-13",
    click: false,
  },
  {
    likedBtn: "btn-14",
    click: false,
  },
  {
    likedBtn: "btn-15",
    click: false,
  },
];

const homeSaveBtnHome = [
  {
    likedBtn: "btn-save-13",
    click: false,
  },
  {
    likedBtn: "btn-save-14",
    click: false,
  },
  {
    likedBtn: "btn-save-15",
    click: false,
  },
];
//on click change button to liked and save status to local storage

likehomeSaveBtn.forEach((element) => {
  element.addEventListener("click", function (event) {
    event.preventDefault();

    //change button to liked status
    element.innerText = "LIKED";
    element.style.backgroundColor = "#5e68c4";
    element.style.color = "white";

    //save buttons liked status to local storage
    storageBtnHome = JSON.parse(localStorage.getItem("likesHome"));
    for (let i = 0; i < likeBtnHome.length; i++) {
      if (likeBtnHome[i].likedBtn === element.id) {
        storageBtnHome[i].click = true;
        localStorage.setItem("likesHome", JSON.stringify(storageBtnHome));
      }
    }
  });
});

// on page load check if page was loaded before
function loadpage() {
  if (localStorage.getItem("hasCodeRunBeforeHome") === null) {
    localStorage.setItem("likesHome", JSON.stringify(likeBtnHome));
    localStorage.setItem("homeSaveButton", JSON.stringify(homeSaveBtnHome));
    localStorage.setItem("HomeImg", JSON.stringify(galleryArray));
    localStorage.setItem("hasCodeRunBeforeHome", true);

    //load counter for saved images with correct number
    if (Number(localStorage.getItem("numberSaved")) > 0) {
      count = Number(localStorage.getItem("numberSaved"));
    } else {
      count = 0;
    }
  } else {
    storageBtnHome = JSON.parse(localStorage.getItem("likesHome"));
    saveButtonArray = JSON.parse(localStorage.getItem("homeSaveButton"));
    galleryArray = JSON.parse(localStorage.getItem("HomeImg"));
    count = Number(localStorage.getItem("numberSaved"));
    //set button status according to localstorage state
    for (let i = 0; i < likeBtnHome.length; i++) {
      if (storageBtnHome[i].click == true) {
        document.getElementById(`${storageBtnHome[i].likedBtn}`).innerText = "LIKED";
        document.getElementById(`${storageBtnHome[i].likedBtn}`).style.backgroundColor = "#5e68c4";
        document.getElementById(`${storageBtnHome[i].likedBtn}`).style.color = "white";
      }
      if (saveButtonArray[i].click == true) {
        document.getElementById(`${saveButtonArray[i].likedBtn}`).style.backgroundColor = "#5e68c4";
        document.getElementById(`${saveButtonArray[i].likedBtn}`).style.color = "white";
      }
      if (saveButtonArray[i].click == true) {
        navbarElement.style.visibility = "visible";
      }
    }
  }
}

/* ______________________________________________
Save Page Section
_______________________________________________*/
let homeSaveBtn = document.querySelectorAll(".main-img-save");

homeSaveBtn.forEach((element) => {
  element.addEventListener("click", function (e) {
    e.preventDefault();

    let mainImg = element.parentElement.firstElementChild;
    let imgSource = mainImg.src;

    //count content saved by user and save to local storage
    if (element.style.color != "white") {
      count = count + 1;
    }

    localStorage.setItem("numberSaved", count);

    galleryArray.push(imgSource);
    localStorage.setItem("HomeImg", JSON.stringify(galleryArray));

    //change appearance of button
    element.style.backgroundColor = "#5e68c4";
    element.style.color = "white";

    //store save button clicked in local storage

    saveButtonArray = JSON.parse(localStorage.getItem("homeSaveButton"));
    for (let i = 0; i < likeBtnHome.length; i++) {
      if (saveButtonArray[i].likedBtn === element.id) {
        saveButtonArray[i].click = true;
        localStorage.setItem("homeSaveButton", JSON.stringify(saveButtonArray));
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
