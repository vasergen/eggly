'use strict'

angular
    .module('book.edit', [])
    .config(function($stateProvider) {
        $stateProvider
            .state('eggly.categories.books.edit', {
                url: 'books/:bookId/edit',
                templateUrl: 'app/books/edit/book-edit.tmpl.html',
                controller: 'EditBookCtrl as editBookCtrl'
            })
    })
    .controller('EditBookCtrl', function() {

    })