class SearchView {
  #parentElement = document.querySelector('.search');

  //=> getQuery()
  getQuery() {
    const query = this.#parentElement.querySelector('.search__field').value;
    // Clear the search field
    this.#clearInput();

    // Return query value
    return query;
  }

  //=> addHandlerSearch(handler)
  addHandlerSearch(handler) {
    this.#parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }

  //=> clearInput()
  #clearInput() {
    this.#parentElement.querySelector('.search__field').value = '';
  }
}

export default new SearchView();
