
function getMenuCategoryTemplate(index){
    return `<a href="#food-category-${index}">${categories[index].name}</a>`
   }

function getCategoryTemplate(index) {
  return ` <div class="food-category" id="food-category-${index}">
                <img src="./asset/img/${categories[index].image}" alt="">
                <h2>${categories[index].name}</h2>
                </div>
                <div class="foods" id="foods${index}"></div>`;
}

function getFoodTemplate(categoryIndex, foodIndex) {
  return ` <div class="food">
                <h2>${categories[categoryIndex].foods[foodIndex].name}</h2>
                <p>${categories[categoryIndex].foods[foodIndex].description}</p>
                <span class="euro">${categories[categoryIndex].foods[foodIndex].price}</span>
                <div class="icon icon-plus"></div>
            </div> `;
}
