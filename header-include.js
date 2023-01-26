fetch("header.html")
  .then((res) => res.text())
  .then((data) => {
    document.querySelector("header").innerHTML = data;

    // Mobile Menu Toggle
    const wrapper = document.querySelector(".wrapper");
    const menuBtn = document.querySelector(".menu-btn");

    menuBtn.addEventListener("click", () => {
      wrapper.classList.toggle("active");
    });
  });
