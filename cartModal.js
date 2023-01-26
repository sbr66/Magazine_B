window.addEventListener("load", () => {
  const cartBtn = document.querySelector("#header .cart");
  const cartCloseBtn = document.querySelector(".cart-close");
  const cartModal = document.querySelector(".cart-modal");
  const cartTop = document.querySelector(".cart-top");
  const cartModalBack = document.querySelector(".cart-modal-back");
  const body = document.querySelector(".wrapper");
  const overlay = document.querySelector(".overlay");

  body.addEventListener("click", cartModalToggle);

  let cartModalOpen = false;

  function cartModalToggle(e) {
    console.log(e.target);
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
});
