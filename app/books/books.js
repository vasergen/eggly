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
            .state('eggly.categories.books', {
                url: 'category/:category/',
                views: {
                    'books@': {
                        templateUrl: 'app/books/books.tmpl.html',
                        controller: 'BooksCtrl as booksListController'
                    }
                }
            })
    })
    .controller('BooksCtrl', function($stateParams, BooksModel, CategoriesModel) {
        var booksCtrl = this;

        CategoriesModel.setCurrentCategory($stateParams.category)

        BooksModel.getBooks().then(function(books) {
            booksCtrl.books = books;
        })

        booksCtrl.getCurrentCategory = CategoriesModel.getCurrentCategory;
        booksCtrl.getCurrentCategoryName = CategoriesModel.getCurrentCategoryName;
    })