fetch("/magazine_b_back/get_new.php")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    const descWrapper = document.querySelector(".new-left");
    const dataEl = `
                <h3>${data.mag_cate}</h3>
                <h2>ISSUE NO.${data.mag_issue}</h2>
                <a herf="#" class="new-title">${data.mag_title}</a>
                <p class="desc">${data.mag_desc}</p>
                <a href="/magazine_b/detail.html?${data.mag_idx}" class="new-btn">SHOP NOW</a>`;
    descWrapper.innerHTML = dataEl;
  })
  .catch((err) => console.log(err));
