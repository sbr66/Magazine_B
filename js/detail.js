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
