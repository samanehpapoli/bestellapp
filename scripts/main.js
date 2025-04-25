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

/**
 * Adds a food item to the basket based on category and food index.
 * If the item already exists, increases its quantity.
 * Otherwise, adds it as a new item to the basket.
 * Then re-renders the basket.
 */
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

/**
 * Decreases the quantity of a basket item by one.
 * If the count reaches 1, removes the item from the basket.
 * Then re-renders the basket.
 */
function decreaseBasket(index) {
  if (baskets[index].count === 1) {
    deleteFromBasket(index);
  } else {
    baskets[index].count--;
  }

  renedrBasket();
}

/**
 * Removes an item from the basket by index and re-renders the basket.
 */

function deleteFromBasket(index) {
  baskets.splice(index, 1);
  renedrBasket();
}

/**
 * Renders the basket content in the DOM.
 * Updates visibility, generates item templates, and recalculates the total price.
 */

function renedrBasket() {
  changeBasketVisibility()
  let basketFoodsElement = document.getElementById("basket-foods");
  basketFoodsElement.innerHTML = "";
  for (let i = 0; i < baskets.length; i++) {
    basketFoodsElement.innerHTML += getBasketTemplate(i);
  }
  calculateSum();
}

/**
 * Toggles the visibility of basket elements based on whether the basket has items.
 * Shows basket info if not empty; otherwise, shows the empty basket message.
 */
function changeBasketVisibility() {
  if (baskets.length> 0) {
    document.getElementById("empty-basket").classList.add("d-none");
    document.getElementById("basket-info").classList.remove("d-none");
  }
  else{
    document.getElementById("empty-basket").classList.remove("d-none");
    document.getElementById("basket-info").classList.add("d-none")
  } 
}

/**
 * Calculates the total price of all items in the basket.
 * Updates the DOM with the sum of item prices, delivery cost, and total cost.
 */

function calculateSum() {
  let sumPrice = 0;
  for (let i = 0; i < baskets.length; i++) {
    sumPrice += baskets[i].count * baskets[i].price;
  }
  // Rounds the total sum to 2 decimal places and ensures it's a number
  sumPrice = parseFloat(sumPrice.toFixed(2));
  document.getElementById("sumPrice").innerHTML = sumPrice;
  document.getElementById("deliveryCost").innerHTML = DELIVERY_COST;
  document.getElementById("totalPrice").innerHTML = (
    sumPrice + DELIVERY_COST
  ).toFixed(2);
}
