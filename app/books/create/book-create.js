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
    .controller('CreateBookCtrl', function($state, $stateParams, BooksModel) {
        var createBookCtrl = this;

        function returnToBooks() {
            $state.go('eggly.categories.books', {
                category: $stateParams.category
            });
        }

        function cancelCreating() {
            returnToBooks();
        }

        function createBook(book) {
            BooksModel.createBook(book);
            returnToBooks();
        }

        function resetForm() {
            createBookCtrl.newBook = {
                title: '',
                url: '',
                category: $stateParams.category
            }
        }

        createBookCtrl.cancelCreating = cancelCreating;
        createBookCtrl.createBook = createBook;
        resetForm();
    })
