'use strict';

angular
    .module('book.create', [])
    .config(function($stateProvider) {
        $stateProvider
            .state('eggly.categories.books.create', {
                url: 'books/create',
                templateUrl: 'app/books/create/book-create.tmpl.html',
                controller: 'CreateBookCtrl as createBookCtrl'
            })
    })
    .controller('CreateBookCtrl', function() {

    })
