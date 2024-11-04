import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

//=> controlRecipe
const controlRecipe = async function () {
  try {
    // 1) Get id from hashchange
    const id = window.location.hash.slice(1);

    if (!id) return;

    // 2) Render spiner while loading data
    recipeView.renderSpinner();

    // Update results view to mark selected search results
    resultsView.update(model.getSearchResultsPage());

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
    resultsView.render(model.getSearchResultsPage());

    // 4) Render initial Pagination Button
    paginationView.render(model.state.search);
  } catch (error) {
    console.error(`Error at controlSearchResults (controler.js)`, error);
  }
};

const controlPagination = function (gotoPage) {
  console.log(`🚀  gotoPage =>`, gotoPage);

  //  Render new Results
  resultsView.render(model.getSearchResultsPage(gotoPage));

  //  Render new Pagination Button
  paginationView.render(model.state.search);
};

/* ===== controlServings ==== */
const controlServings = function (newServings) {
  // 1) Update the recipe servings (in state)
  // model.updateServings(16);
  model.updateServings(newServings);

  // 2) Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

//=> Start when App running!
const init = (function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
})();
