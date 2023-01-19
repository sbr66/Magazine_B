const cartBtn = document.querySelector("#header .cart");
const cartCloseBtn = document.querySelector(".cart-close");
const cartModal = document.querySelector(".cart-modal");
const body = document.querySelector(".wrapper");

body.addEventListener("click", cartModalToggle);

let cartModalOpen = false;

function cartModalToggle(e) {
  if (e.target == cartBtn) {
    cartModal.style.transform = "translateX(0)";
    return (cartModalOpen = true);
  }
  if (cartModalOpen == true) {
    if (e.target != cartModal) {
      cartModal.style.transform = "translateX(+101%)";
    } else {
      if (e.target == cartCloseBtn) {
        cartModal.style.transform = "translateX(+101%)";
      }
    }
  }
}
