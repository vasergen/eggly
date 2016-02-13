"use strict";

angular.module('eggly.models.books', [

])
.service('BooksModel', function($http) {
    var model = this;
    var URLS = {
        FETCH: 'data/bookmarks.json'
    }

    function extract(result) {
        return result.data;
    }

    model.getBooks = function() {
        return $http.get(URLS.FETCH).then(extract);
    }
});