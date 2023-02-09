const pageUrl = window.location.search;
console.log(pageUrl);

fetch(`/magazine_b_back/get_products_ex.php${pageUrl}`)
  .then((res) => res.json())
  .then((data) => {
    const productBox = document.querySelector(".mag-products");
    let dataEl;
    // console.log(data);
    data.map((item) => {
      dataEl = `
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
                <div>₩${item.mag_price}</div>
                </div>
                <button class="mag-cart-btn">ADD TO CART</button>
            </div>
        </div>`;
      productBox.innerHTML += dataEl;
    });
  })
  .catch((err) => console.log(err));
