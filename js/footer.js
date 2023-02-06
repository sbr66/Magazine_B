fetch("/magazine_b/footer.html")
  .then((res) => res.text())
  .then((data) => {
    document.querySelector("footer").innerHTML = data;

    // Footer byline toggle
    const companyBtn = document.querySelector(".company-btn");
    // console.log(companyBtn);
    companyBtn.addEventListener("click", () => {
      document.querySelector(".footer-container").classList.toggle("active");
    });
  });
