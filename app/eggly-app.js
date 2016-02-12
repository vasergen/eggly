'use strict'

    angular
        .module('Eggly', [
            'ui.router',
            'categories',
            'books'
        ])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('eggly', {
                    url: '',
                    abstract: true
                })

            $urlRouterProvider.otherwise('/');
        })
        .controller('MainCtrl', function($scope, $state) {
            function setCurrentCategory(category) {
                //$state.go('eggly.books', {category: category.name});
                $scope.currentCategory = category;
                $scope.categories = [
                    {"id": 0, "name": "Development"},
                    {"id": 1, "name": "Design"},
                    {"id": 2, "name": "Exercise"},
                    {"id": 3, "name": "Humor"}
                ];
                cancelEditingCategory();
                cancelCreatingCategory();
            }

            function isCurrentCategory(category) {
                if(!category || !$scope.currentCategory)
                    return false;

                return category.name == $scope.currentCategory.name;
            }

            function startCreatingCategory() {
                $scope.isCreating = true;
                $scope.isEditing = false;
                resetAddForm();
            }

            function startEditingCategory() {
                console.log('startEditingCategory');
                $scope.isCreating = false;
                $scope.isEditing = true;
            }

            function cancelEditingCategory() {
                $scope.isEditing = false;
            }

            function cancelCreatingCategory() {
                $scope.isCreating = false;
            }

            function setCurrentBook(book) {
                $scope.currentBook = book;
            }

            function saveCurrentBook() {
                cancelCreatingCategory();
                cancelEditingCategory();
            }

            function resetAddForm() {
                $scope.newBook = {
                    title: "",
                    url: "",
                    category: $scope.currentCategory.name
                }
            }

            function addBook() {
                $scope.books.push($scope.newBook);
                cancelCreatingCategory();
                cancelEditingCategory();
            }

            function deleteBook(book) {
                _.remove($scope.books, function(b) {
                    return b.id == book.id;
                })
            }

            $scope.deleteBook = deleteBook;

            $scope.currentBook = null;
            $scope.currentCategory = null;
            $scope.isCreating = false;
            $scope.isEditing = false;

            $scope.addBook = addBook;
            $scope.saveCurrentBook = saveCurrentBook;
            $scope.setCurrentBook = setCurrentBook;
            $scope.startEditingCategory = startEditingCategory;
            $scope.cancelEditingCategory = cancelEditingCategory;
            $scope.startCreatingCategory = startCreatingCategory;
            $scope.cancelCreatingCategory = cancelCreatingCategory;
            $scope.setCurrentCategory = setCurrentCategory;
            $scope.isCurrentCategory = isCurrentCategory;
        })
