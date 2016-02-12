'use strict'

angular
    .module('books', [
        'book.create',
        'book.delete',
        'book.edit',
        'eggly.models.books',
        'eggly.models.categories'
    ])
    .config(function($stateProvider) {
        $stateProvider
            .state('eggly.books', {
                url: '/cat/:category',
                views: {
                    'books@': {
                        templateUrl: 'app/books/books.tmpl.html',
                        controller: 'BooksCtrl as booksListController'
                    },
                    'categories@': {
                        controller: 'CategoriesCtrl as categoriesCtrl',
                        templateUrl: 'app/categories/categories.tmpl.html'
                    }
                }
            })
    })
    .controller('BooksCtrl', function($stateParams, BooksModel) {
        var booksCtrl = this;
        booksCtrl.currentCategoryName = $stateParams.category
        booksCtrl.books = BooksModel.getBooks()
    })