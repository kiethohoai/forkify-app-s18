import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

//=> controlRecipe
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

//=> controlSearchResults
const controlSearchResults = async function () {
  try {
    // 0) Render spinner
    resultsView.renderSpinner();

    // 1) Get query
    const query = searchView.getQuery();

    if (!query) return;

    // 2) Get data from query
    await model.loadSearchResults(query);

    // 3) If ok, render search views results (Paginate)
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());
  } catch (error) {
    console.error(`Error at controlSearchResults (controler.js)`, error);
  }
};

//=> Start when App running!
const init = (function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
})();
