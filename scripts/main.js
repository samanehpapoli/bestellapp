const DELIVERY_COST = 4.99;
let baskets = [];
function init() {
  renederCategory();
  renderMenuCategory();
}

function renderMenuCategory() {
  let MenuCategoryElement = document.getElementById("menu-category");
  MenuCategoryElement.innerHTML = "";
  for (let i = 0; i < categories.length; i++) {
    MenuCategoryElement.innerHTML += getMenuTemplate(i);
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

function addToBasket(categoryIndex, foodIndex) {
  let food = categories[categoryIndex].foods[foodIndex];
  let findBasketIndex = baskets.findIndex(
    (basket) => basket.name === food.name
  );
  if (findBasketIndex >= 0) {
    baskets[findBasketIndex].count++;
  } else {
    baskets.push({
      name: food.name,
      price: food.price,
      count: 1,
    });
  }
  renedrBasket();
}

function increaseBasket(index) {
  baskets[index].count++;
  renedrBasket();
}

function decreaseBasket(index) {
  if (baskets[index].count === 1) {
    deleteFromBasket(index);
  } else {
    baskets[index].count--;
  }

  renedrBasket();
}

function deleteFromBasket(index) {
  baskets.splice(index, 1);
  renedrBasket();
}

function renedrBasket() {
  let basketFoodsElement = document.getElementById("basket-foods");
  basketFoodsElement.innerHTML = "";
  for (let i = 0; i < baskets.length; i++) {
    basketFoodsElement.innerHTML += getBasketTemplate(i);
  }
  calculateSum();
}

function calculateSum() {
  let sumPrice = 0;
  for (let i = 0; i < baskets.length; i++) {
    sumPrice += baskets[i].count * baskets[i].price;
  }
  sumPrice = parseFloat(sumPrice.toFixed(2));
  document.getElementById("sumPrice").innerHTML = sumPrice;
  document.getElementById("deliveryCost").innerHTML = DELIVERY_COST;
  document.getElementById("totalPrice").innerHTML = (
    sumPrice + DELIVERY_COST
  ).toFixed(2);
}
