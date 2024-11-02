import * as model from './model.js';
import recipeView from './views/recipeView.js';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

//todo controlRecipe
const controlRecipe = async function () {
  try {
    // 1) Get id from hashchange
    const id = window.location.hash.slice(1);

    if (!id) return;

    // 2) Render spiner while loading data
    recipeView.renderSpinner();

    // 3) Loading Recipe
    await model.loadRecipe(id);

    // 4) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError();
  }
};

//todo Start when App running!
const init = (function () {
  recipeView.addHandlerRender(controlRecipe);
})();
