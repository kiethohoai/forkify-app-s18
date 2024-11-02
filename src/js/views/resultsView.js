import View from './View.js';

//ResultsView
class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = `No recipes found for your query. Please try again!`;
  _successMessage = '';

  //=> #generateMarkup()
  _generateMarkup() {
    return this._data
      .map((result) => this._generateMarkupPreview(result))
      .join('');
  }

  //=> _generateMarkupPreview(result)
  _generateMarkupPreview(result) {
    return `
      <li class="preview">
        <a class="preview__link" href="#${result.id}">
          <figure class="preview__fig">
            <img src="${result.image}" alt="${result.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${result.title}.</h4>
            <p class="preview__publisher">${result.publisher}</p>
            <div class="preview__user-generated">
              <svg>
                <use href="src/img/icons.svg#icon-user"></use>
              </svg>
            </div>
          </div>
        </a>
      </li>
    `;
  }
}

//=> Export
export default new ResultsView();
