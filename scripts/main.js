function init() {
  renederCategory();
  renderMenuCategory();
}

function renderMenuCategory() {
  let MenuCategoryElement = document.getElementById("menu-category");
  MenuCategoryElement.innerHTML = "";
  for (let i = 0; i <categories.length; i++) {
    MenuCategoryElement.innerHTML += getMenuCategoryTemplate(i);
  }
}


function renederCategory() {
  let categoryElement = document.getElementById("category");
  categoryElement.innerHTML = "";
  for (let i = 0; i < categories.length; i++) {
    categoryElement.innerHTML += getCategoryTemplate(i);

    renderFoods(i);
  }
}

function renderFoods(index) {
  let foodElement = document.getElementById("foods" + index);
  foodElement.innerHTML = "";
  for (let j = 0; j < categories[index].foods.length; j++) {
    document.getElementById("foods" + index).innerHTML += getFoodTemplate(
      index,
      j
    );
  }
}
