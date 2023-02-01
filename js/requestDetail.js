const detailUrl = window.location.search;
const urlIdx = detailUrl.split("?")[1];

fetch(`/magazine_b_back/get_detail.php?idx=${urlIdx}`)
  .then((res) => res.json())
  .then((data) => {
    const detailBox = document.querySelector(".detail-container");
    console.log(data);
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
        <i class="ri-subtract-line"></i>
        <p class="count">1</p>
        <i class="ri-add-line"></i>
        </div>
    </div>
    <div class="detail-right">
        <button>
            <p>&#8361;${data.mag_price}</p>
            <p>ADD TO CART</p>
        </button>
        <div class="detail-desc">
            <p class="desc-title">DESCRIPTION</p>
            <p>${data.mag_desc}</p>
        </div>
    </div>`;
    detailBox.innerHTML = magazineInfo;
    // &#8361;
    const detailHeader = document.querySelector("#detail-header");
    let headerInfo;
    headerInfo = ` <div class="container">
    <div class="header-info-wrapper">
      <p>${data.mag_cate}</p>
      <p>ISSUE NO.${data.mag_issue}</p>
      <p>${data.mag_title}</p>
      <p>￦${data.mag_price}</p>
      
    </div>
    <div class="header-cart-wrapper">
      <div class="header-qnts">
        <i class="ri-subtract-line"></i>
        <p class="count">1</p>
        <i class="ri-add-line"></i>
      </div>
      <button class="cart-btn">
        <p>￦${data.mag_price}</p>
        <p>ADD TO CART</p>
      </button>
    </div>
  </div>`;
    detailHeader.innerHTML = headerInfo;
  })
  .catch((err) => console.log(err));

window.addEventListener("scroll", function () {
  const scrollY = this.scrollY;
  console.log(scrollY);
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
