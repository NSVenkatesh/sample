let count = 0;
let countGif = 0;
let searchInput;
let searchUrl;
let inputHide = document.querySelector(".input-main");
let gifHide = document.querySelector(".gif-search");
let popup = document.querySelector(".text-cover");
let setGif = document.querySelector(".set-gif");
let postBtn = document.querySelector(".btn-post");
popup.addEventListener("click", () => {
  if (count == 0) {
    inputHide.style.display = "block";
    count++;
  } else {
    count = 0;
    countGif = 0;
    inputHide.style.display = "none";
    gifHide.style.display = "none";
  }
});
let gifEle = document.querySelector(".btn-gif");
gifEle.addEventListener("click", () => {
  renderGif();
  if (countGif == 0) {
    gifHide.style.display = "block";
    countGif++;
  } else {
    countGif = 0;
    gifHide.style.display = "none";
  }
});
let cross = document.querySelector("#cross");
cross.addEventListener("click", () => {
  close();
});
gifSrc = (gif) => {
  let currentGif = gif.src;
  setGif.src = "";
  setGif.src = currentGif;
  countGif = 0;
  gifHide.style.display = "none";
};
postBtn.onclick = () => {
  let postInput = document.querySelector(".text-area").value;
  let postGif = document.querySelector(".set-gif").src;
  let currentDate = new Date();
  let dd = currentDate.getDate();
  let mm = currentDate.getMonth() + 1;
  let yyyy = currentDate.getFullYear();
  currentDate = dd + "/" + mm + "/" + yyyy;
  let postEle = `<div class="post-detail">
                  <div class="about-post">
                      <div class="p-flex">
                          <i class="fa-solid fa-circle-user"></i>
                          <div class="about">
                              <p class="name">Venkatesh</p>
                              <p class="time">${currentDate}</p>
                          </div>
                      </div>
                      <i class="fa-solid fa-ellipsis dot"></i>
                  </div>
                  <div class="pc">
                      <p class="post-input">${postInput}</p>
                      <div class="p-img">
                          <img src="${postGif}"
                              alt="gif" class="p-gif">
                      </div>
                  </div>
                  <div class="p-like">
                      <i class="fa-solid fa-heart p-heart" onclick="like(this)" data-color="gray"></i>
                  </div>
                </div>`;
  if (postInput == "") {
    if (postGif == "") {
      alert("Invalid input");
    } else {
      document.querySelector(".post-data").innerHTML += postEle;
      document.querySelector(".search").value = "";

      close();
    }
  } else if (postGif == "") {
    document.querySelector(".post-data").innerHTML += postEle;
    document.querySelector(".search").value = "";
    document.querySelector(".p-img").style.display = "none";
    close();
  } else {
    document.querySelector(".post-data").innerHTML += postEle;
    document.querySelector(".search").value = "";
    close();
  }
};
like = (heart) => {
  let color = heart.getAttribute("data-color");
  if (color == "gray") {
    heart.style.color = "red";
    heart.setAttribute("data-color", "red");
  } else {
    heart.style.color = "#d3d3d3";
    heart.setAttribute("data-color", "gray");
  }
};
close = () => {
  count = 0;
  countGif = 0;
  inputHide.style.display = "none";
  gifHide.style.display = "none";
  document.querySelector(".text-area").value = "";
  setGif.src = "";
};
search = (input) => {
  searchInput = input.value;
  searchUrl = `https://api.giphy.com/v1/gifs/search?api_key=N7TXMZrq1AEKTwN7R15kCZFW1ChB6V9u&q=${searchInput}&limit=50&rating=g&lang=en`;
  renderGif();
};
async function getGif() {
  let url =
    "https://api.giphy.com/v1/gifs/trending?api_key=N7TXMZrq1AEKTwN7R15kCZFW1ChB6V9u&limit=50&rating=g";

  if (searchInput == "" || searchInput == undefined) {
    response = await fetch(url);
  } else {
    response = await fetch(searchUrl);
  }
  try {
    let res = response;
    return await res.json();
  } catch (error) {
    console.log(error);
  }
}
async function renderGif() {
  document.querySelector(".gif-result").innerHTML = "";
  let render = await getGif();
  if (render) {
    render.data.map((gif) => {
      let imgSrc = gif.images.original.url;
      let imgEle = `<img src="${imgSrc}" class="gif-img" onclick="gifSrc(this)">`;
      document.querySelector(".gif-result").innerHTML += imgEle;
    });
  }
}
