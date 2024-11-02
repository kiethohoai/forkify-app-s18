import * as model from './model.js';
import recipeView from './views/recipeView.js';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

//todo controlRecipe
const controlRecipe = async function () {
  try {
    // Get id from hashchange
    const id = window.location.hash.slice(1);
    console.log(`🚀  id =>`, id);

    if (!id) return;

    // 0) Render spiner while loading data
    recipeView.renderSpinner();

    // 1) Loading Recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.error(error);
  }
};

//todo Start when App running!
const init = (function () {
  recipeView.addHandlerRender(controlRecipe);
})();
