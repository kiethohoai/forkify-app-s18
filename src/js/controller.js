import * as model from './model.js';
import recipeView from './views/recipeView.js';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

//todo controlRecipe
const controlRecipe = async function () {
  try {
    // Get id from hashchange
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Render spiner while loading data
    recipeView.renderSpinner();

    // 1) Loading Recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.error(error);
  }
};
// controlRecipe();

// Load events one by one (Bad Practice)
// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

// Load multils events (Good way)
['hashchange', 'load'].forEach((ev) =>
  window.addEventListener(ev, controlRecipe),
);
