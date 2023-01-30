const detailUrl = window.location.search;
const urlIdx = detailUrl.split("?")[1];

fetch(`/magazine_b_back/get_detail.php?idx=${urlIdx}`)
  .then((res) => res.json())
  .then((data) => {
    const detailBox = document.querySelector(".detail-container");
    console.log(data);
    let dataEl;
    dataEl = `
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
    detailBox.innerHTML = dataEl;
  })
  .catch((err) => console.log(err));
