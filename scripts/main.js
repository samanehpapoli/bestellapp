const DELIVERY_COST = 4.99;
const MIN_ORDER_PRICE = 29.99;
let baskets = [];
let hideFoods = 0;

function init() {
  InitializeStaticItems();
  renderMenuCategory();
  renederCategory();
  updateBasketsFromLocalStorage();
  renedrBasket();
}

function InitializeStaticItems() {
  document.getElementById("min-order-price").innerHTML = MIN_ORDER_PRICE;
  document.getElementById("delivery-cost").innerHTML = DELIVERY_COST;
}

function updateBasketsFromLocalStorage() {
  baskets = getFromLocalStorage("bestellAppBasket");
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
    document.getElementById("foods" + index).innerHTML += getFoodTemplate(index, j);
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
  let findBasketIndex = baskets.findIndex((basket) => basket.name === food.name);
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
  changeBasketVisibility();
  let basketFoodsElement = document.getElementById("basket-foods");
  basketFoodsElement.innerHTML = "";
  for (let i = 0; i < baskets.length; i++) {
    basketFoodsElement.innerHTML += getBasketTemplate(i);
  }
  renderTotalBasket();
  caculateTotalFoodCount();
  saveTolocalStorage("bestellAppBasket", baskets);
}

/**
 * Toggles visibility of basket elements based on whether the basket has items.
 * Hides the "empty basket" message and shows basket details if items exist; otherwise,
 *  does the reverse.
 */
function changeBasketVisibility() {
  if (baskets.length > 0) {
    document.getElementById("empty-basket").classList.add("d-none");
    document.getElementById("basket-info").classList.remove("d-none");
    document.getElementById("basket-button-section").classList.remove("d-none");
    document.getElementById("footer").classList.add("up");
  } else {
    document.getElementById("empty-basket").classList.remove("d-none");
    document.getElementById("basket-info").classList.add("d-none");
    document.getElementById("basket-button-section").classList.add("d-none");
    document.getElementById("footer").classList.remove("up");
  }
}

/**
 * Calculates the total price of all items in the basket.
 * Updates the DOM with the sum of item prices, delivery cost, and total cost.
 */
function renderTotalBasket() {
  let sum = calculateSum(baskets);
  let totalPrice = parseFloat((sum + DELIVERY_COST).toFixed(2));
  document.getElementById("basket-total").innerHTML = getTotalTemplate(sum, totalPrice);
  document.getElementById("totalPrice-checkout").innerHTML = totalPrice;
  document.getElementById("total-price-in-button").innerHTML = totalPrice;
  checkMinBasketPrice(totalPrice);
}

function calculateSum(foods) {
  let sum = 0;
  foods.forEach((food) => {
    sum += food.count * food.price;
  });
  // Rounds the total sum to 2 decimal places and ensures it's a number
  // parseFloat(...) converts the string back to a float number.
  return parseFloat(sum.toFixed(2));
}

function showBasketInfo() {
  document.getElementById("side-menu").classList.add("show");
}

function hideBasketInfo() {
  document.getElementById("side-menu").classList.remove("show");
}
/**kkhodam */

function filterFoods() {
  categories.forEach((category, i) => {
    category.foods.forEach((food, j) => {
      checkFoodFilter(i, j, food);
    });
    checkCategoryFilter(i, category);
    hideFoods = 0;
  });
}

function checkFoodFilter(i, j, food) {
  let searchText = document.getElementById("searchBox").value.toLowerCase().trim();
  let foodElement = document.getElementById(`food-${i}-${j}`);
  if (foodElement) {
    if (food.name.toLowerCase().includes(searchText)) {
      foodElement.classList.remove("d-none");
    } else {
      foodElement.classList.add("d-none");
      hideFoods++;
    }
  }
}

function checkCategoryFilter(i, category) {
  if (hideFoods === category.foods.length) {
    document.getElementById(`category-${i}`).classList.add("d-none");
  } else {
    document.getElementById(`category-${i}`).classList.remove("d-none");
  }
}

// In this function, I've used `forEach` instead of a regular `for` loop,
// which allowed me to easily perform operations on each item in the array.
/**
 * Calculates the total number of food items in the basket and updates it on the page.
Initialize a variable to store the total count of food items.
Use forEach to loop through each item in the 'baskets' array.
For each food item, add its count to the totalFoodCount.
Update the HTML element with the total food count.
 */
function caculateTotalFoodCount() {
  let totalFoodCount = 0;
  baskets.forEach((food) => {
    totalFoodCount += food.count;
  });
  document.getElementById("foods-total-count").innerHTML = totalFoodCount;
}

function checkMinBasketPrice(totalPrice) {
  let bascketCheckoutButtonElement = document.getElementById("basket-checkout-button");
  if (totalPrice >= MIN_ORDER_PRICE) {
    bascketCheckoutButtonElement.classList.remove("disable");
    bascketCheckoutButtonElement.setAttribute("onclick", "checkoutBasket()");
  } else {
    bascketCheckoutButtonElement.classList.add("disable");
    bascketCheckoutButtonElement.removeAttribute("onclick", "checkoutBasket()");
  }
}

function checkoutBasket() {
  saveTolocalStorage("bestellAppRecipe", baskets);
  baskets = [];
  renedrBasket();
  removeFromLocalStorage("bestellAppBasket");
  document.getElementById("overlay").classList.remove("d-none");
  document.getElementById("side-menu").classList.remove("show");
  let recipeFoods = getFromLocalStorage("bestellAppRecipe");
  renderFoodRecipe(recipeFoods);
  renderTotalRecipe(recipeFoods);
}

function renderFoodRecipe(recipeFoods) {
  let recipeFoodsElement = document.getElementById("recipe-foods");
  recipeFoodsElement.innerHTML = "";
  recipeFoods.forEach((food) => {
    recipeFoodsElement.innerHTML += getRecipeFoodTemplate(food);
  });
}

function renderTotalRecipe(recipeFoods) {
  let sum = calculateSum(recipeFoods);
  let totalPrice = parseFloat((sum + DELIVERY_COST).toFixed(2));
  document.getElementById("recipe-total").innerHTML = getTotalTemplate(sum, totalPrice);
}

function closeRecipe() {
  document.getElementById("overlay").classList.add("d-none");
  removeFromLocalStorage("bestellAppRecipe");
}

function saveTolocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key) {
  if (JSON.parse(localStorage.getItem(key)) === null) {
    return [];
  } else {
    return JSON.parse(localStorage.getItem(key));
  }
}

function removeFromLocalStorage(key) {
  localStorage.removeItem(key);
}
