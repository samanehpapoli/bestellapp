
function getMenuTemplate(categoryIndex){
    return `<a href="#food-category-${categoryIndex}">${categories[categoryIndex].name}</a>`
   }

function getCategoryTemplate(index) {
  let category = categories[index] 
  return ` <div class="food-category" id="food-category-${index}">
                <img src="./asset/img/${category.image}" alt="">
                <h2>${category.name}</h2>
                </div>
                <div class="foods" id="foods${index}"></div>`;
}

function getFoodTemplate(categoryIndex, foodIndex) {
  let food = categories[categoryIndex].foods[foodIndex]
  return ` <div class="food">
                <h2>${food.name}</h2>
                <p>${food.description}</p>
                <span class="euro">${food.price}</span>
                <div class="icon icon-plus" onclick="addToBasket(${categoryIndex},${foodIndex})"></div>
            </div> `;
}

function getBasketTemplate(basketIndex) {
  let food = baskets[basketIndex];
  let totalPrice = (food.price * food.count).toFixed(2);
  return  ` <div class="basket-food">
            <h3>${food.name}</h3>
            <div class="basket-food-info">
              <div class="count">
                <span class="icon icon-minus" onclick="decreaseBasket(${basketIndex})"></span>
                <span>${food.count}x</span>
                <span class="icon icon-plus" onclick="increaseBasket(${basketIndex})" ></span>
              </div>
              <div class="price euro">${totalPrice}</div>
              <div class="icon icon-trash-o" onclick="deleteFromBasket(${basketIndex})"></div>
            </div>
          </div>`
        
}