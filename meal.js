const mealsDiv = document.getElementById("mealsdiv");
const searchEl = document.getElementById("search");
const mymealsDiv = document.getElementById("mymealsdiv");

async function search(keyword) {
  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`);
    if (!response.ok) {
      throw new Error('Failed to fetch meal data');
    }
    const data = await response.json();

    mealsDiv.innerHTML = '';

    if (data.meals) {
      data.meals.forEach(meal => {
        const div = document.createElement("div");
        div.classList.add("card", "mt-4", "m-2");
        div.style.width = "18rem";
        div.innerHTML = `
          <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strCategory}</p>
            <p class="card-text">${meal.strTags}</p>
            <p class="card-text">Recipe - <a href="${meal.strYoutube}">Watch here</a></p>
            <button class="btn btn-info add-to-fav">Add to your fav meals</button>
          </div>`;
        mealsDiv.append(div);

        // Add event listener to 'Add to your fav meals' button
        const addToFavButton = div.querySelector('.add-to-fav');
        addToFavButton.addEventListener('click', () => {
          if (!mymealsDiv.contains(div)) {
            mymealsDiv.append(div);
            addToFavButton.textContent = 'Remove from fav meals';
          } else {
            mymealsDiv.removeChild(div);
            addToFavButton.textContent = 'Add to your fav meals';
          }
        });
      });
    } else {
      console.log('No meals found');
    }
  } catch (error) {
    console.error(error);
  }
}

searchEl.addEventListener('input', () => {
  const keyword = searchEl.value.trim(); // Trim to remove leading and trailing spaces
  if (keyword === '') {
    mealsDiv.innerHTML = ''; // Clear mealsDiv when the search keyword is empty
  } else {
    search(keyword);
  }
});
