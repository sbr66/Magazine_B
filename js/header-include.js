fetch("/magazine_b/header.html")
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
    if (!url.includes("index") && url.includes("html")) {
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

      headerLogo.setAttribute("src", "/magazine_b/images/header_logo.svg");
      languageLogo.setAttribute("src", "/magazine_b/images/asset5.png");

      header.style.backdropFilter = "none";
      header.style.backgroundColor = sectionBackground;
    }

    // Cart Modal
    const cartBtn = document.querySelector("#header .cart");
    const cartCloseBtn = document.querySelector(".cart-close");
    const cartModal = document.querySelector(".cart-modal");
    const cartTop = document.querySelector(".cart-top");
    const cartModalBack = document.querySelector(".cart-modal-back");
    const body = document.querySelector("body");
    const overlay = document.querySelector(".overlay");

    body.addEventListener("click", cartModalToggle);

    let cartModalOpen = false;

    function cartModalToggle(e) {
      // console.log(cartModalOpen);
      // console.log(e.target);
      if (e.target == cartBtn) {
        // cart btn 클릭시 cart modal 열림
        cartModal.style.transform = "translateX(0)";
        overlay.classList.add("active");
        return (cartModalOpen = true);
      }

      if (cartModalOpen == true) {
        // cart modal이 열려있을때
        if (e.target != cartModal && e.target != cartTop) {
          // cart modal 영역 외 클릭시 닫기
          cartModal.style.transform = "translateX(+101%)";
          overlay.classList.remove("active");
          return (cartModalOpen = false);
        } else if (e.target == cartCloseBtn || e.target == cartModalBack) {
          // cart modal의 close 버튼 클릭시 닫기
          cartModal.style.transform = "translateX(+101%)";
          overlay.classList.remove("active");
          return (cartModalOpen = false);
        }
      }
    }
  })
  .catch((err) => console.log(err));
