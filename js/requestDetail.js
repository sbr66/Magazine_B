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
      <form>
        <button type="submit" class="cart-btn">
            ￦<p class="sum-price">${data.mag_price}</p>
            <p>ADD TO CART</p>
        </button>
        <input type="hidden" name="cart_idx" value="${data.mag_idx}">
        <input type="hidden" name="cart_name" value="${data.mag_name}">
        <input type="hidden" name="cart_desc" value="${data.mag_desc}">
        <input type="hidden" name="cart_price" value="${data.mag_price}">
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
          <form>
            <button type="submit" class="cart-btn">
              ￦<p class="sum-price">${data.mag_price}</p>
              <p>ADD TO CART</p>
            </button>
            <input type="hidden" name="cart_idx" value="${data.mag_idx}">
            <input type="hidden" name="cart_name" value="${data.mag_name}">
            <input type="hidden" name="cart_desc" value="${data.mag_desc}">
            <input type="hidden" name="cart_price" value="${data.mag_price}">
            <input type="hidden" name="cart_count" value="1" class="cart-count">
            <input type="hidden" name="cart_sum" value="${data.mag_price}" class="cart-sum">
          </form>
        </div>
      </div>`;
    detailHeader.innerHTML = headerInfo;

    // 수량 증가 및 합산 가격 출력
    const countBtn = document.querySelectorAll(".qnts i");
    const countEl = document.querySelectorAll(".count");
    const sumEl = document.querySelectorAll(".sum-price");
    const cartCountEl = document.querySelectorAll(".cart-count");

    const cartSumEl = document.querySelectorAll(".cart-sum");

    let count = Number(countEl[0].textContent);
    let sumPrice = Number(sumEl[0].textContent);

    // console.log(sumPrice);

    countBtn.forEach((btn) => {
      btn.addEventListener("click", function () {
        if (this.classList.contains("up-btn")) {
          count++;
        } else {
          count <= 1 ? (count = 1) : count--;
        }
        console.log(count);

        countEl.forEach((i) => {
          i.textContent = count;
        });
        cartCountEl.forEach((i) => {
          i.value = count;
        });

        sumEl.forEach((i) => {
          i.textContent = count * sumPrice;
        });

        cartSumEl.forEach((i) => {
          i.value = count * sumPrice;
        });
      });
    });
  })
  .catch((err) => console.log(err));

window.addEventListener("scroll", function () {
  const scrollY = this.scrollY;
  // console.log(scrollY);
  const detailHeader = this.document.querySelector("#detail-header");
  const commonHeader = this.document.querySelector("#header");

  if (scrollY >= 115) {
    detailHeader.style.opacity = "100";
    commonHeader.style.display = "none";
  } else {
    detailHeader.style.opacity = "0";
    commonHeader.style.display = "block";
  }
});
