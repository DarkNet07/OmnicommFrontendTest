import ApiMixinFactory from './mixins/apiMixin';
var tableMixin = require('./mixins/tableMixin').default;
var paginationMixin = require('./mixins/paginationMixin');
var React = require('react');
var createReactClass = require('create-react-class');
var Pagination = require('./Pagination').default;
var $ = require('jquery');

const apiMixinFactory = new ApiMixinFactory();

// console.log(apiMixinFactory, 'проверка прототипааа');

const apiMixin = apiMixinFactory.getApiMixin($.ajax);
var App = createReactClass({
  mixins: [tableMixin, paginationMixin, apiMixin],
  handlePageChange: function (pageNumber) {
    this.handleClick(pageNumber);
  },
  render: function () {
    var self = this;

    var start = this.state.itemsPerPage * (this.state.activePage - 1);
    var end = start + this.state.itemsPerPage;
    // console.log(start, 'это начало', end, 'конец');
    // console.log(this.state.universities, 'универы');
    var universities = this.state.universities.slice(start, end);
    var table = self.renderTable(universities);

    return (
      <div>
        <label htmlFor="#search">Поиск</label>
        <br />
        <input
          id="search"
          onChange={(e) => this.handleSearchChange(e)}
          type="string"
          value={this.state.value}
        />

        <div>{table}</div>
        <Pagination
          itemsPerPage={10}
          totalItems={this.state.universities.length}
          onPageChange={this.handlePageChange}
        />
        <div>{this.state.color}</div>
      </div>
    );
  },
});

export { App };
