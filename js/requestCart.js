fetch("/magazine_b_back/cart_ctrl.php?req_cart=get_cart")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    const cartPagelistWrapper = document.querySelector(".main-cart-wrapper");
    data.map((list) => {
      const cartListEl = `
                    <div class="main-cart-list">
                        <input type="checkbox" name="" value="" />
                        <div class="cart-list-content">
                          <div class="main-cart-info">
                              <p>${list.cart_name}</p>
                              <p>₩${list.cart_sum}</p>
                              <div class="main-cart-qnts">
                                  <i class="ri-subtract-line"></i>
                                  <p class="cart-count">${list.cart_count}</p>
                                  <i class="ri-add-line"></i>
                              </div>
                          </div>
                          <div class="main-cart-img">
                              <img src="${list.cart_img}" alt="" />
                          </div>
                        </div>
                    </div>`;
      cartPagelistWrapper.innerHTML += cartListEl;
    });

    const priceInfoWrapper = document.querySelector(".cart-price-wrapper");

    let itemTotalPrice = 0;
    data.forEach((i) => {
      itemTotalPrice += Number(i.cart_sum);
    });

    let deliveryCharge = 0;
    if (itemTotalPrice >= 18000) {
      deliveryCharge = 0;
    } else {
      deliveryCharge = 3000;
    }

    const priceInfoEl = `
    <div class="main-cart-sum price-info">
        <p>총 상품금액</p>
        <p>₩${itemTotalPrice}</p>
    </div>
    <div class="delivery-charge price-info">
        <p>배송비</p>
        <p>₩${deliveryCharge}</p>
    </div>
    <div class="final-price price-info">
        <p>총 결제금액</p>
        <p>₩${itemTotalPrice + deliveryCharge}</p>
    </div>`;

    priceInfoWrapper.innerHTML = priceInfoEl;
  })
  .catch((err) => console.log(err));
