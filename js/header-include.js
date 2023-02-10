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
    const mobileCartBtn = document.querySelector(".mobile-cart");
    const cartModalBack = document.querySelector(".cart-modal-back");
    const overlay = document.querySelector(".overlay");

    // console.log(mobileCartBtn);
    body.addEventListener("click", cartModalToggle);

    let cartModalOpen = false;
    // console.log(cartModalOpen);

    function cartModalToggle(e) {
      // console.log(cartModalOpen);
      // console.log(e.target);
      if (e.target == cartBtn || e.target == mobileCartBtn) {
        // cart btn 클릭시 cart modal 열림
        cartModal.style.transform = "translateX(0)";
        overlay.classList.add("active");
        return (cartModalOpen = true);
      }

      if (cartModalOpen == true) {
        if (e.target == overlay || e.target == cartCloseBtn) {
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
      })
      .catch((err) => {
        console.log(err);
      });

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

    fetch("/magazine_b_back/cart_ctrl.php?req_cart=get_cart")
      .then((res) => res.json())
      .then((cartData) => {
        // console.log(cartData);
        const cartModalWrapper = document.querySelector(".cart-lists-wrapper");
        const cartCountNum = document.querySelectorAll(".cart-count-num");

        // 카트에 담긴 상품이 없을때
        if (!cartData || cartData.length === 0) {
          cartModalWrapper.innerHTML = `<p class="no-cart">장바구니에 상품이 없습니다.</p>`;
          cartCountNum.forEach((num) => {
            num.textContent = "[0]";
          });
          return;
        }

        // 추가한 상품 카트에 출력
        cartData.map((list) => {
          // console.log(list);
          cartListEl = `
            <div class="cart-list">
              <div class="cart-img">
                <img src="${list.cart_img}" alt="" />
              </div>
      
              <div class="cart-info-box">
                <p class="cart-title">${list.cart_name}</p>
                <p>￦${list.cart_sum}</p>
                <div class="cart-qnts">
                  <i class="ri-subtract-line"></i>
                  <p class="cart-count">${list.cart_count}</p>
                  <i class="ri-add-line"></i>
                </div>
              </div>

              <i class="ri-close-line remove-cart" id="btn-${list.cart_idx}"></i>
            </div>
          `;
          cartModalWrapper.innerHTML += cartListEl;
        });

        // 추가한 상품 총 수량 출력
        const cartListCountEl = document.querySelectorAll(".cart-count");
        let cartListCount = 0;
        cartListCountEl.forEach((count) => {
          // console.log(count.textContent);
          cartListCount += Number(count.textContent);
        });
        // console.log(cartListCount);

        cartCountNum.forEach((num) => {
          num.textContent = `[${cartListCount}]`;
        });

        // 추가한 상품 합산 가격 출력
        const checkOutBtn = document.querySelector(".check-out-btn");
        let cartSumPrice = 0;
        cartData.forEach((data) => {
          cartSumPrice += Number(data.cart_sum);
        });
        // console.log(cartSumPrice);
        checkOutBtn.textContent = `￦${cartSumPrice} CHECK OUT`;

        // 카트 상품 삭제
        const rmvCartBtn = document.querySelectorAll(".remove-cart");
        rmvCartBtn.forEach((btn) => {
          btn.addEventListener("click", function () {
            const cartIdx = Number(this.getAttribute("id").split("-")[1]);
            fetch(
              `/magazine_b_back/cart_ctrl.php?req_cart=del_cart&cart_idx=${cartIdx}`
            )
              .then((res) => res.json())
              .then((del) => {
                console.log(del);
                alert(del.msg);
                location.reload();
              })
              .catch((err) => console.log(err));
          });
        });
      })
      .catch((err) => console.log(err));
  })
  .catch((err) => console.log(err));
