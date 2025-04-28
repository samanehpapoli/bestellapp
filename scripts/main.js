const DELIVERY_COST = 4.99;
const MIN_ORDER_PRICE = 29.99;
let baskets = [];
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
  calculateSum();
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
  } else {
    document.getElementById("empty-basket").classList.remove("d-none");
    document.getElementById("basket-info").classList.add("d-none");
    document.getElementById("basket-button-section").classList.add("d-none");
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
  // parseFloat(...) converts the string back to a float number.
  sumPrice = parseFloat(sumPrice.toFixed(2));
  let totalPrice = parseFloat((sumPrice + DELIVERY_COST).toFixed(2));
  document.getElementById("sumPrice").innerHTML = sumPrice;
  document.getElementById("deliveryCost").innerHTML = DELIVERY_COST;
  document.getElementById("totalPrice").innerHTML = totalPrice;
  document.getElementById("totalPrice-checkout").innerHTML = totalPrice;
  document.getElementById("total-price-in-button").innerHTML = totalPrice;
  checkMinBasketPrice(totalPrice);
}

function showBasketInfo() {
  document.getElementById("side-menu").classList.add("show");
}

function hideBasketInfo() {
  document.getElementById("side-menu").classList.remove("show");
}
/**kkhodam */

function filterFoods() {
  let searchText = document.getElementById("searchBox").value.toLowerCase().trim();

  for (let i = 0; i < categories.length; i++) {
    let category = categories[i];

    for (let j = 0; j < category.foods.length; j++) {
      let food = category.foods[j];
      let foodElement = document.getElementById(`food-${i}-${j}`);

      if (foodElement) {
        if (food.name.toLowerCase().includes(searchText)) {
          // foodElement.classList.add("green");
          foodElement.classList.remove("d-none");
        } else {
          // foodElement.classList.remove("green");
          foodElement.classList.add("d-none");
        }
      }
    }
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

// function checkMinBasketPrice(totalPrice) {
//   console.log(totalPrice);
// }

// function checkoutBasket() {
//   console.log(" check");
// }

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
