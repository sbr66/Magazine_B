const pageUrl = window.location.search;
console.log(pageUrl);

fetch(`/magazine_b_back/get_products_ex.php${pageUrl}`)
  .then((res) => res.json())
  .then((data) => {
    const productBox = document.querySelector(".mag-products");
    console.log(data);
    const sliceData = data.slice(0, 10);
    console.log(sliceData);

    sliceData.map((item) => {
      let dataEl = `
        <div class="mag-product-item ${item.mag_cate}">
            <div class="prd-img-wrapper">
                <a href="/magazine_b/detail.html?${item.mag_idx}">
                <img
                    src="${item.mag_img1}"
                    alt=""
                /></a>
            </div>

            <div class="prd-img-wrapper">
                <a href="/magazine_b/detail.html?${item.mag_idx}">
                <img
                    src="${item.mag_img2}"
                    alt=""
                /></a>
            </div>

            <div class="mag-info-wrapper">
                <div class="mag-info">
                <div><a href="/magazine_b/detail.html?${item.mag_idx}">${item.mag_title}</a></div>
                <div>ISSUE NO.${item.mag_issue}</div>
                <div>${item.mag_cate}</div>
                <div class="mag-item-price">₩${item.mag_price}</div>
                </div>
                <form onsubmit="return false">
                  <button type="submit" class="mag-cart-btn">ADD TO CART</button>
                  <input type="hidden" name="cart_idx" value="${item.mag_idx}">
                  <input type="hidden" name="cart_name" value="${item.mag_title}">
                  <input type="hidden" name="cart_desc" value="${item.mag_desc}">
                  <input type="hidden" name="cart_price" value="${item.mag_price}">
                  <input type="hidden" name="cart_img" value="${item.mag_img1}">
                  <input type="hidden" name="cart_count" value="1" class="cart-count">
                  <input type="hidden" name="cart_sum" value="${item.mag_price}" class="cart-sum">
                </form>
            </div>
        </div>`;

      productBox.innerHTML += dataEl;

      const addCartBtn = document.querySelectorAll(".mag-cart-btn");

      // 장바구니에 상품 추가
      addCartBtn.forEach((btn, idx) => {
        btn.addEventListener("click", () => {
          const magItemFormEl = document.querySelectorAll(
            ".mag-info-wrapper form"
          );
          const formData = new FormData(magItemFormEl[idx]);
          fetch("/magazine_b_back/cart_ctrl.php?req_cart=add_cart", {
            method: "POST",
            body: formData,
          })
            .then((res) => res.json())
            .then((cart) => {
              console.log(cart);
              alert(cart.msg);
              location.reload();
            })
            .catch((err) => console.log(err));
        });
      });
    });
  })
  .catch((err) => console.log(err));
