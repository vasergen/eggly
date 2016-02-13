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
    .controller('EditBookCtrl', function($state, $stateParams, BooksModel) {
        var editBookCtrl = this;

        function returnToBooks() {
            $state.go('eggly.categories.books', {
                category: $stateParams.category
            });
        }

        function cancelEditing() {
            return returnToBooks();
        }

        function updatedBook() {
            editBookCtrl.book = angular.copy(editBookCtrl.editedBook)
            BooksModel.updateBook(editBookCtrl.book);
            returnToBooks();
        }

        BooksModel.getBookById($stateParams.bookId)
            .then(function(book) {
                if(book) {
                    editBookCtrl.book = book;
                    editBookCtrl.editedBook = angular.copy(editBookCtrl.book);
                } else {
                    returnToBooks();
                }
            })

        editBookCtrl.cancelEditing = cancelEditing;
        editBookCtrl.updatedBook = updatedBook;
    })