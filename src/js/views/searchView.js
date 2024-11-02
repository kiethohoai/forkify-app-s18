class SearchView {
  _parentElement = document.querySelector('.search');

  //=> getQuery()
  getQuery() {
    const query =
      this._parentElement.querySelector('.search__field').value;
    // Clear the search field
    this._clearInput();

    // Return query value
    return query;
  }

  //=> addHandlerSearch(handler)
  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  //=> clearInput()
  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }
}

export default new SearchView();
