// 카테고리 클릭시 폰트 색상 변경
const magCategory = document.querySelectorAll(".mag-category li");
console.log(magCategory);
magCategory.forEach((item, idx) => {
  item.addEventListener("click", () => {
    magCategory.forEach((i) => {
      i.style.color = "#ccc";
    });
    magCategory[idx].style.color = "#222";
  });
});
