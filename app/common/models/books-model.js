"use strict";

angular.module('eggly.models.books', [

])
.service('BooksModel', function($http, $q) {
    var model = this;
    var books;
    var URLS = {
        FETCH: 'data/bookmarks.json'
    };

    function extract(result) {
        return result.data;
    }

    function cacheBooks(result) {
        books = extract(result);
        return books;
    }

    function findBook(bookId) {
        return _.find(books, function(book) {
            return book.id == parseInt(bookId, 10)
        })
    }

    model.getBookById = function(bookId) {
        var deffered = $q.defer();
        if(books) {
            deffered.resolve(findBook(bookId))
        } else {
            model.getBooks().then(function() {
                deffered.resolve(findBook(bookId))
            })
        }
        return deffered.promise;
    }

    model.getBooks = function() {
        var deffered = $q.defer();
        if(books) {
            deffered.resolve(books)
        } else {
            $http.get(URLS.FETCH).then(function(books) {
                deffered.resolve(cacheBooks(books))
            })
        }
        return deffered.promise;
    }

    model.createBook = function(book) {
        book.id = books.length;
        books.push(book);
    }

    model.updateBook = function(book) {
        var index = _.findIndex(books, function(b) {
            return b.id === book.id;
        })
        books[index] = book;
    }

    model.deleteBook = function(book) {
        _.remove(books, function(b) {
            return b.id == book.id
        })
    }
});