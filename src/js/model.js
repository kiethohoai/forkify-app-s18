import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPePage: RES_PER_PAGE,
    page: 1, //currentPage
  },
};

//=> loadRecipe
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    let { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (error) {
    throw error;
  }
};

//=> loadSearchResults
export const loadSearchResults = async function (query) {
  try {
    // Fetch data
    const data = await getJSON(`${API_URL}?search=${query}`);
    // Store query
    state.search.query = query;

    // Store results data
    state.search.results = data.data.recipes.map((rec) => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (error) {
    console.error(`Error at loadSearchResults (model.js)`, error);
    throw error;
  }
};

//=> getSearchResultsPage
export const getSearchResultsPage = function (page = 1) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPePage;
  const end = page * 10;
  return state.search.results.slice(start, end);
};
