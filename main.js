const mains = document.querySelectorAll(".main-wrapper");

const shopTitles = document.querySelectorAll(".shop-title h2");
const shopContents = document.querySelectorAll(".shop-preview-box");
const bookTitles = document.querySelectorAll(".books-title-box h2");
const bookContents = document.querySelectorAll(".books-preview-box");
const shopSection = document.querySelector(".shop-section");
const bookSection = document.querySelector(".books-section");

const dateBox = document.querySelector(".date-box");

// Main Section
function showImage() {
  let idx = 0;
  mains.forEach((main) => {
    main.classList.remove("active");
  });
  idx++;
  mains[idx].classList.add("active");
  if (idx > mains.length) {
    idx = 0;
  }
}

setInterval(showImage, 2000);

// Shop Section Tap
shopTitles.forEach((title, idx) => {
  title.addEventListener("click", () => {
    shopTitles.forEach((i) => {
      i.classList.remove("active");
    });
    title.classList.add("active"); // 클릭한 요소 밑줄

    shopContents.forEach((content) => {
      content.classList.remove("active");
    });
    shopContents[idx].classList.add("active"); // tap

    switch (idx) {
      case 0:
        shopSection.style.background = "rgb(152, 192, 196)";
        break;
      case 1:
        shopSection.style.background = "rgb(249, 231, 159)";
        break;
      case 2:
        shopSection.style.background = "rgb(239, 219, 228)";
        break;
      case 3:
        shopSection.style.background = "rgb(217, 228, 241)";
        break;
    } // 배경색 변경
  });
});

// Books Section Tap
bookTitles.forEach((title, idx) => {
  title.addEventListener("click", () => {
    bookTitles.forEach((i) => {
      i.classList.remove("active");
    });
    title.classList.add("active"); // 클릭한 요소 밑줄

    bookContents.forEach((content) => {
      content.classList.remove("active");
    });
    bookContents[idx].classList.add("active"); // Tap

    switch (idx) {
      case 0:
        bookSection.style.background = "rgb(242, 242, 242)";
        break;
      case 1:
        bookSection.style.background = "rgb(214, 214, 201)";
        break;
      case 2:
        bookSection.style.background = "rgb(202, 219, 231)";
        break;
    } // 배경색 변경
  });
});

// Newsletter Section 현재 날짜 입력
const today = () => {
  let now = new Date();
  const week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dayOfWeek = week[now.getDay()];
  let todayYear = now.getFullYear();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let todayMonth = months[now.getMonth()];
  let todayDate = now.getDate();
  return (
    dayOfWeek + ",<br>" + todayDate + " " + todayMonth + "<br>" + todayYear
  );
};

dateBox.innerHTML = today();
