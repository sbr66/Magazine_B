const detailUrl = window.location.search;
const urlIdx = detailUrl.split("?")[1];

fetch(`/magazine_b_back/get_detail.php?idx=${urlIdx}`)
  .then((res) => res.json())
  .then((data) => {
    const detailBox = document.querySelector(".detail-container");
    // console.log(data);
    let magazineInfo;
    magazineInfo = `
        <div class="detail-left">
            <div class="detail-label">
            <p>${data.mag_cate}</p>
            <p>ISSUE NO.${data.mag_issue}</p>
            </div>
            <h2 class="detail-title">${data.mag_title}</h2>
            <p class="detail-price">&#8361;${data.mag_price}</p>
            <div class="qnts">
            <i class="ri-subtract-line down-btn"></i>
            <p class="count">1</p>
            <i class="ri-add-line up-btn"></i>
            </div>
        </div>
        <div class="detail-right">
          <form onsubmit="return false" class="cart-form">
            <button type="submit" class="cart-btn">
                ￦<p class="sum-price">${data.mag_price}</p>
                <p>ADD TO CART</p>
            </button>
            <input type="hidden" name="cart_idx" value="${data.mag_idx}">
            <input type="hidden" name="cart_name" value="${data.mag_title}">
            <input type="hidden" name="cart_desc" value="${data.mag_desc}">
            <input type="hidden" name="cart_price" value="${data.mag_price}">
            <input type="hidden" name="cart_img" value="${data.mag_img1}">
            <input type="hidden" name="cart_count" value="1" class="cart-count">
            <input type="hidden" name="cart_sum" value="${data.mag_price}" class="cart-sum">
          </form>  
            <div class="detail-desc">
                <p class="desc-title">DESCRIPTION</p>
                <p>${data.mag_desc}</p>
            </div>
        </div>`;

    detailBox.innerHTML = magazineInfo;

    const detailDesc = document.querySelector(".res-desc .container p");
    // console.log(detailDesc);
    const descEl = data.mag_desc;
    detailDesc.append(descEl);

    const detailHeader = document.querySelector("#detail-header");
    let headerInfo;
    headerInfo = ` 
      <div class="container">
        <div class="header-info-wrapper">
          <p>${data.mag_cate}</p>
          <p>ISSUE NO.${data.mag_issue}</p>
          <p>${data.mag_title}</p>
          <p>￦${data.mag_price}</p>
        </div>
        <div class="header-cart-wrapper">
          <div class="header-qnts qnts">
            <i class="ri-subtract-line down-btn"></i>
            <p class="count">1</p>
            <i class="ri-add-line up-btn"></i>
          </div>
          <form onsubmit="return false" class="cart-form">
            <button type="submit" class="cart-btn">
              ￦<p class="sum-price">${data.mag_price}</p>
              <p>ADD TO CART</p>
            </button>
            <input type="hidden" name="cart_idx" value="${data.mag_idx}">
            <input type="hidden" name="cart_name" value="${data.mag_title}">
            <input type="hidden" name="cart_desc" value="${data.mag_desc}">
            <input type="hidden" name="cart_price" value="${data.mag_price}">
            <input type="hidden" name="cart_img" value="${data.mag_img1}">
            <input type="hidden" name="cart_count" value="1" class="cart-count">
            <input type="hidden" name="cart_sum" value="${data.mag_price}" class="cart-sum">
          </form>
        </div>
      </div>`;
    detailHeader.innerHTML = headerInfo;

    requestCart();
  })
  .catch((err) => console.log(err));

function requestCart() {
  // 수량 변경 및 합산 가격 출력
  const countBtn = document.querySelectorAll(".qnts i"); // 수량 변경 버튼
  const countEl = document.querySelectorAll(".count"); // 수량
  const sumEl = document.querySelectorAll(".sum-price"); // 합산 가격
  const cartCountEl = document.querySelectorAll(".cart-count"); // <input name="cart-count">

  const cartSumEl = document.querySelectorAll(".cart-sum"); // <input name="cart-sum">

  let count = Number(countEl[0].textContent); // 수량 버튼 누르면 변경 될 수량
  let sumPrice = Number(sumEl[0].textContent); // 제품 가격

  // console.log(sumPrice);

  countBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      if (this.classList.contains("up-btn")) {
        count++;
      } else {
        count <= 1 ? (count = 1) : count--;
      } // 버튼 누르면 수량 변경
      // console.log(count);

      countEl.forEach((i) => {
        i.textContent = count;
      }); // 변경된 수량 화면에 출력

      sumEl.forEach((i) => {
        i.textContent = count * sumPrice;
      }); // 합산 가격 화면에 출력

      cartCountEl.forEach((i) => {
        i.value = count;
      });

      cartSumEl.forEach((i) => {
        i.value = count * sumPrice;
      });
    });
  });

  const addCartBtns = document.querySelectorAll(".cart-btn");
  const formData = new FormData(
    document.querySelector(".header-cart-wrapper .cart-form")
  );

  // 장바구니 버튼 클릭시 상품 추가
  addCartBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      formData.set("cart_count", `${count}`);
      formData.set("cart_sum", `${count * sumPrice}`);

      // console.log(count, count * sumPrice);

      fetch("/magazine_b_back/cart_ctrl.php?req_cart=add_cart", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((cart) => {
          // console.log(cart);
          alert(cart.msg);
          location.reload();
        })
        .catch((err) => console.log(err));
    });
  });
}
