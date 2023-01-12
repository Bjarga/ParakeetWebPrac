/* ______________________________________________
Like Button Section
_______________________________________________*/

//select dom element
const likeSaveBtn = document.querySelectorAll(".main-img-like");
let navbarElement = document.querySelector(".saved-spot");
let count;
//empty array that will save liked button status for local storage
let storageBtn = [];
let galleryArray = [];
//button array with default status
const likeBtn = [
  {
    likedBtn: "btn-1",
    savedBtn: "sbtn-1",
    click: false,
  },
  {
    likedBtn: "btn-2",
    savedBtn: "sbtn-2",
    click: false,
  },
  {
    likedBtn: "btn-3",
    savedBtn: "sbtn-3",
    click: false,
  },
  {
    likedBtn: "btn-4",
    savedBtn: "sbtn-4",
    click: false,
  },
  {
    likedBtn: "btn-5",
    savedBtn: "sbtn-5",
    click: false,
  },
  {
    likedBtn: "btn-6",
    savedBtn: "sbtn-6",
    click: false,
  },
  {
    likedBtn: "btn-7",
    savedBtn: "sbtn-7",
    click: false,
  },
  {
    likedBtn: "btn-8",
    savedBtn: "sbtn-8",
    click: false,
  },
  {
    likedBtn: "btn-9",
    savedBtn: "sbtn-9",
    click: false,
  },
  {
    likedBtn: "btn-10",
    savedBtn: "sbtn-10",
    click: false,
  },
  {
    likedBtn: "btn-11",
    savedBtn: "sbtn-11",
    click: false,
  },
  {
    likedBtn: "btn-12",
    savedBtn: "sbtn-12",
    click: false,
  },
];

const saveBtnAr = [
  {
    savedBtn: "sbtn-1",
    click: false,
  },
  {
    savedBtn: "sbtn-2",
    click: false,
  },
  {
    savedBtn: "sbtn-3",
    click: false,
  },
  {
    savedBtn: "sbtn-4",
    click: false,
  },
  {
    savedBtn: "sbtn-5",
    click: false,
  },
  {
    savedBtn: "sbtn-6",
    click: false,
  },
  {
    savedBtn: "sbtn-7",
    click: false,
  },
  {
    savedBtn: "sbtn-8",
    click: false,
  },
  {
    savedBtn: "sbtn-9",
    click: false,
  },
  {
    savedBtn: "sbtn-10",
    click: false,
  },
  {
    savedBtn: "sbtn-11",
    click: false,
  },
  {
    savedBtn: "sbtn-12",
    click: false,
  },
];
//on click change button to liked and save status to local storage

likeSaveBtn.forEach((element) => {
  element.addEventListener("click", function (event) {
    event.preventDefault();

    //change button to liked status
    element.innerText = "LIKED";
    element.style.backgroundColor = "#5e68c4";
    element.style.color = "white";

    //save buttons liked status to local storage

    storageBtn = JSON.parse(localStorage.getItem("likes"));
    for (let i = 0; i < likeBtn.length; i++) {
      if (likeBtn[i].likedBtn === element.id) {
        storageBtn[i].click = true;
        localStorage.setItem("likes", JSON.stringify(storageBtn));
      }
    }
  });
});

// on page load check if page was loaded before
function loadpage() {
  if (localStorage.getItem("hasCodeRunBefore") === null) {
    console.log("not run");
    localStorage.setItem("likes", JSON.stringify(likeBtn));
    localStorage.setItem("saveButton", JSON.stringify(saveBtnAr));
    localStorage.setItem("hasCodeRunBefore", true);
    localStorage.setItem("GalleryImg", JSON.stringify(galleryArray));

    //load counter for saved images with correct number
    if (Number(localStorage.getItem("numberSaved")) > 0) {
      count = Number(localStorage.getItem("numberSaved"));
    } else {
      count = 0;
    }
  } else {
    storageBtn = JSON.parse(localStorage.getItem("likes"));
    saveButtonArray = JSON.parse(localStorage.getItem("saveButton"));
    galleryArray = JSON.parse(localStorage.getItem("GalleryImg"));
    count = Number(localStorage.getItem("numberSaved"));

    //set like and save button status according to localstorage state
    for (let i = 0; i < likeBtn.length; i++) {
      if (storageBtn[i].click == true) {
        document.getElementById(`${storageBtn[i].likedBtn}`).innerText = "LIKED";
        document.getElementById(`${storageBtn[i].likedBtn}`).style.backgroundColor = "#5e68c4";
        document.getElementById(`${storageBtn[i].likedBtn}`).style.color = "white";
      }
      if (saveButtonArray[i].click == true) {
        document.getElementById(`${saveButtonArray[i].savedBtn}`).style.backgroundColor = "#5e68c4";
        document.getElementById(`${saveButtonArray[i].savedBtn}`).style.color = "white";
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
const saveBtn = document.querySelectorAll(".main-img-save");

let saveButtonArray = [];

saveBtn.forEach((element) => {
  element.addEventListener("click", function (e) {
    e.preventDefault();

    let img = element.parentElement;
    let imgSource = img.querySelector(".gal-img").src;

    //count content saved by user and save to local storage
    if (element.style.color != "white") {
      count = count + 1;
    }
    localStorage.setItem("numberSaved", count);

    galleryArray.push(imgSource);
    localStorage.setItem("GalleryImg", JSON.stringify(galleryArray));

    //change appearance of button
    element.style.backgroundColor = "#5e68c4";
    element.style.color = "white";

    //store save button clicked in local storage

    saveButtonArray = JSON.parse(localStorage.getItem("saveButton"));
    for (let i = 0; i < likeBtn.length; i++) {
      if (saveButtonArray[i].savedBtn === element.id) {
        saveButtonArray[i].click = true;
        localStorage.setItem("saveButton", JSON.stringify(saveButtonArray));
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

function sendMail() {
  window.open("mailto:test@example.com?subject=subject&body=body");
}
