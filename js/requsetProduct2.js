fetch("/magazine_b_back/get_products.php")
  .then((res) => res.json())
  .then((data) => {
    let initCount = 10; // 초기에 뿌려질 데이터 갯수
    let addCount = 0; // 특정 동작(클릭)시 추가될 데이터 갯수
    let allData = []; // 전체 데이터 요소가 들어갈 초기 공간

    initMagData();
    function initMagData(data) {
      allData = data;
      getMagData();
    }

    const getMagData = () => {
      let sliceData = allData.slice(addCount, 10);
      let dataEl;
      sliceData.map((item) => {
        const productBox = document.querySelector(".mag-products");
        dataEl = `
                <div class="mag-product-item ${item.mag_cate}">
                    <div class="prd-img-wrapper">
                        <a href="#">
                        <img src="${item.mag_img1}" alt=""/></a>
                    </div>
        
                    <div class="prd-img-wrapper">
                        <a href="#">
                        <img src="${item.mag_img2}" alt=""/></a>
                    </div>
        
                    <div class="mag-info-wrapper">
                        <div class="mag-info">
                        <div><a href="#">${item.mag_title}</a></div>
                        <div>ISSUE NO.${item.mag_issue}</div>
                        <div>${item.mag_cate}</div>
                        <div>₩${item.mag_price}</div>
                        </div>
                        <button class="mag-cart-btn">ADD TO CART</button>
                    </div>
                </div>`;
        productBox.innerHTML += dataEl;
      });
    };
  })
  .catch((err) => console.log(err));
