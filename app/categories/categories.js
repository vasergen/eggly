'use strict'

angular
    .module('categories', [
        'eggly.models.categories'
    ])
    .config(function($stateProvider) {
        $stateProvider
            .state('eggly.categories', {
                url: '/',
                views: {
                    'books@': {
                        controller: 'BooksCtrl as booksListController',
                        templateUrl: 'app/books/books.tmpl.html'
                    },
                    'categories@': {
                        controller: 'CategoriesCtrl as categoriesCtrl' ,
                        templateUrl: 'app/categories/categories.tmpl.html'
                    }
                }
            })
    })
    .controller('CategoriesCtrl', function(CategoriesModel) {
        var CategoriesCtrl = this;

        CategoriesModel
            .getCategories()
            .then(function(result) {
                CategoriesCtrl.categories = result;
            })
    })