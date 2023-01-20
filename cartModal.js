const cartBtn = document.querySelector("#header .cart");
const cartCloseBtn = document.querySelector(".cart-close");
const cartModal = document.querySelector(".cart-modal");
const cartTop = document.querySelector(".cart-top");
const cartModalBack = document.querySelector(".cart-modal-back");
const body = document.querySelector(".wrapper");

body.addEventListener("click", cartModalToggle);

let cartModalOpen = false;

function cartModalToggle(e) {
  console.log(e.target);
  if (e.target == cartBtn) {
    cartModal.style.transform = "translateX(0)";
    return (cartModalOpen = true);
  }
  if (cartModalOpen == true) {
    if (e.target != cartModal && e.target != cartTop) {
      cartModal.style.transform = "translateX(+101%)";
    } else {
      if (e.target == cartCloseBtn || e.target == cartModalBack) {
        cartModal.style.transform = "translateX(+101%)";
      }
    }
  }
}
