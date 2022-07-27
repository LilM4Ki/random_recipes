const btn_comida = document.querySelector('#escolher_comida');

const container_comida = document.querySelector('#comida');


btn_comida.addEventListener("click", () =>{
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(res => res.json())
    .then(res => {
    createMeal(res.meals[0]);
    });
});

const createMeal = (meal) => {
    const ingredients = [];

    for(let i = 1; i<=20; i++) {
        if(meal[`strIngredient${i}`]){
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`)
        }else{
            break;
        }
    }
    const newInnerHTML = `
    <div class="row text-align-center">
    <img  class="col-lg-6" id="foodImg" src="${meal.strMealThumb}" alt="Meal Image">
        <div class="col-6">
            ${meal.strCategory ? `<p><strong>Category:</strong> ${meal.strCategory}</p>` : ''}
            ${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
            ${meal.strTags ? `<p><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>` : ''}
            <h5><strong>Ingredients:</strong></h5>
            <ul>
            ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
        </div>
        <div class="col 12">
            <h4 id="title_food" ><strong>${meal.strMeal}</strong></h4>
            <p>${meal.strInstructions}</p>
        </div>
    </div>
    ${meal.strYoutube ? `
    <div class="col 12 text-center">
        <h5 id="titulo_video"><strong>Video Recipe</strong></h5>
        <div class="col 12" id="videoWrapper">
            <iframe max-width="600" max-height="400"
            src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}">
            </iframe>
        </div>
    </div>` : ''}
`;

container_comida.innerHTML = newInnerHTML;
}