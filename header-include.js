fetch("header.html")
  .then((res) => res.text())
  .then((data) => {
    document.querySelector("header").innerHTML = data;

    // Mobile Menu Toggle
    const wrapper = document.querySelector(".wrapper");
    const menuBtn = document.querySelector(".menu-btn");

    menuBtn.addEventListener("click", () => {
      wrapper.classList.toggle("active");
    });

    // 페이지별 헤더 디자인 변경
    const url = window.location.pathname;
    if (!url.includes("index")) {
      const li = document.querySelectorAll("#header li");
      const aLi = document.querySelectorAll("#header li a");
      const header = document.querySelector("#header");
      const headerLogo = document.querySelector("#header .left .logo img");
      const languageLogo = document.querySelector(
        "#header .right-list .language img"
      );

      const section = document.querySelector("section");
      const sectionStyle = getComputedStyle(section);
      const sectionBackground = sectionStyle.backgroundColor;
      console.log(sectionBackground);

      li.forEach((item) => {
        item.style.color = "#222";
      });

      aLi.forEach((item) => {
        item.style.color = "#222";
      });

      headerLogo.setAttribute("src", "/images/header_logo.svg");
      languageLogo.setAttribute("src", "/images/asset5.png");

      header.style.backdropFilter = "none";
      header.style.backgroundColor = sectionBackground;
    }
  });
