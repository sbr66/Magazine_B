const pageUrl = window.location.search;
console.log(pageUrl);
const cateInput = document.querySelectorAll(".mag-category input");
const cateList = document.querySelectorAll(".mag-category label");
console.log(cateList);
console.log(cateInput[0].value);

let pageVal = 1;
let cateVal = "none";

cateList.forEach((cate, idx) => {
  cate.addEventListener("click", function (e) {
    cateVal = cateInput[idx].value;
    console.log(cateVal);
    getPages(cateVal);
  });
});

function getPages(cateVal) {
  fetch(`/magazine_b_back/product_page.php?cate=${cateVal}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const productPage = document.querySelector(".product-page");
      let dataEl;
      for (i = 1; i <= data.page_num; i++) {
        dataEl = `
          <form>
            <input type="submit" name="page" value="${i}">
          </form>`;
        productPage.innerHTML += dataEl; // pagenation
      }

      const pageBtn = document.querySelectorAll(".product-page input");
      console.log(pageBtn);
      pageBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
          pageVal = btn.value;
        });
      });

      const totalNum = document.querySelector(".total");
      totalNum.innerHTML = `TOTAL ${data.data_num}`; // 제품 총 수량
      getProducts(cateVal, pageVal);
    })
    .catch((err) => console.log(err));
}

getPages();

// const cateBtn = document.querySelectorAll(".mag-category li");

// cateBtn.forEach((btn) => {
//   cateVal = btn.innerHTML;
//   btn.addEventListener("click", getProducts(cateVal, pageVal));
// });

// urlSearchParams.getAll("parameterName") : https://velog.io/@gillog/javaScript-URL-Parameter-%EA%B0%92-%EB%8B%A4%EB%A3%A8%EA%B8%B0

function getProducts() {
  const cateBtn = document.querySelectorAll(".mag-category li");
  cateBtn.forEach((btn) => {
    cateVal = btn.innerHTML;
    btn.addEventListener("click", () => {
      fetch(`/magazine_b_back/get_products.php?cate=${cateVal}&page=${pageVal}`)
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
    });
  });
}

getProducts();
