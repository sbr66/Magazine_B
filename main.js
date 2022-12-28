const shopTitles = document.querySelectorAll(".shop-title h2");
const shopContents = document.querySelectorAll(".shop-preview-box");
const bookTitles = document.querySelectorAll(".books-title-box h2");
const bookContents = document.querySelectorAll(".books-preview-box");
const shopSection = document.querySelector(".shop-section");
const bookSection = document.querySelector(".books-section");

const dateBox = document.querySelector(".date-box");

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
const day = () => {
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

  return dayOfWeek + ",";
};

const year = () => {
  let now = new Date();
  let todayYear = now.getFullYear();
  return todayYear;
};

const month = () => {
  let now = new Date();
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
  return todayMonth;
};

const date = () => {
  let now = new Date();
  let todayDate = now.getDate();
  return todayDate;
};

dateBox.innerHTML = `${day()} <br> ${date()} ${month()} <br> ${year()}`;
