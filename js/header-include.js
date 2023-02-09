fetch("/magazine_b/header.html")
  .then((res) => res.text())
  .then((data) => {
    document.querySelector(".header-wrapper").innerHTML = data;

    // Mobile Menu Toggle
    const menuBtn = document.querySelector(".menu-btn");
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const mobileMenu = document.querySelector(".mobile-menu");
    const body = document.querySelector("body");

    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.add("active");
      body.style.overflowY = "hidden";
    });

    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      body.style.overflowY = "auto";
    });

    // Cart Modal
    const cartBtn = document.querySelector("#header .cart");
    const cartCloseBtn = document.querySelector(".cart-close");
    const cartModal = document.querySelector(".cart-modal");
    const cartTop = document.querySelector(".cart-top");
    const cartModalBack = document.querySelector(".cart-modal-back");
    const overlay = document.querySelector(".overlay");

    body.addEventListener("click", cartModalToggle);

    let cartModalOpen = false;
    // console.log(cartModalOpen);

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

    // 로그인 & 로그아웃 버튼
    const loginBtn = document.querySelectorAll(".login");
    // console.log(loginBtn);

    fetch("/magazine_b_back/check_sign.php")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(
          "id :",
          data.userid,
          "user idx :",
          data.user_idx,
          "cart count :",
          data.cart_count,
          "user level :",
          data.user_level
        );

        if (data.userid === "guest") {
          loginBtn.forEach((btn) => {
            btn.innerHTML = '<a href="/magazine_b/sign-in.html">Login</a>';
          });
        } else {
          loginBtn.forEach((btn) => {
            btn.innerHTML = `<div class="signout"><span>${data.userid}</span> &nbsp;| <span class="signout-btn">Logout</span></div>`;
          });
        }

        const signoutBtn = document.querySelectorAll(".signout-btn");

        if (signoutBtn) {
          signoutBtn.forEach((btn) => {
            btn.addEventListener("click", () => {
              this.fetch("/soaply_backend/model/register.php?q=signout")
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);
                  this.alert("로그아웃 되었습니다.");
                  this.location.reload();
                })
                .catch((err) => {
                  console.log(err);
                });
            });
          });
        }

        // 페이지별 헤더 디자인 변경
        const url = window.location.pathname;
        const li = document.querySelectorAll("#header li, #header li a");
        const header = document.querySelector("#header");

        if (!url.includes("index") && url.includes("html")) {
          const headerLogo = document.querySelector("#header .left .logo img");
          const languageLogo = document.querySelector(
            "#header .right-list .language img"
          );

          const section = document.querySelector("section");
          const sectionStyle = getComputedStyle(section);
          const sectionBackground = sectionStyle.backgroundColor;
          // console.log(sectionBackground);

          li.forEach((item) => {
            item.style.color = "#222";
          });

          headerLogo.setAttribute("src", "/magazine_b/images/header_logo.svg");
          languageLogo.setAttribute("src", "/magazine_b/images/asset5.png");

          header.style.backdropFilter = "none";
          header.style.backgroundColor = sectionBackground;
        }

        // Detail Page Header
        const detailUrl = window.location.href;
        if (detailUrl.includes("detail")) {
          window.addEventListener("scroll", function () {
            const scrollY = this.scrollY;
            // console.log(scrollY);
            const detailHeader = document.querySelector("#detail-header");
            const commonHeader = document.querySelector("#header");

            if (scrollY >= 115) {
              detailHeader.style.opacity = "100";
              commonHeader.style.display = "none";
            } else {
              detailHeader.style.opacity = "0";
              commonHeader.style.display = "block";
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => console.log(err));
