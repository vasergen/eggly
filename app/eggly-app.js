'use strict'

    angular
        .module('Eggly', [
            'ui.router',
            'categories',
            'books'
        ])
        /*.config(function($stateProvider) {
            $stateProvider.state('eggly', {
                url: '/',
                templateUrl: 'app/categories/categories.tmpl.html',
                controller: 'MainCtrl'
            })
        })*/
        .config(function ($stateProvider) {
            $stateProvider
                .state('eggly', {
                    url: '/', // Make to navigate to index.html#/
                    templateUrl: 'app/categories/categories.tmpl.html',
                    controller: 'MainCtrl'
                })
            ;
        })
        .controller('MainCtrl', function($scope) {
            $scope.books = [
                {"id":0, "title": "AngularJS", "url": "http://angularjs.org", "category": "Development" },
                {"id":1, "title": "Egghead.io", "url": "http://angularjs.org", "category": "Development" },
                {"id":2, "title": "A List Apart", "url": "http://alistapart.com/", "category": "Design" },
                {"id":3, "title": "One Page Love", "url": "http://onepagelove.com/", "category": "Design" },
                {"id":4, "title": "MobilityWOD", "url": "http://www.mobilitywod.com/", "category": "Exercise" },
                {"id":5, "title": "Robb Wolf", "url": "http://robbwolf.com/", "category": "Exercise" },
                {"id":6, "title": "Senor Gif", "url": "http://memebase.cheezburger.com/senorgif", "category": "Humor" },
                {"id":7, "title": "Wimp", "url": "http://wimp.com", "category": "Humor" },
                {"id":8, "title": "Dump", "url": "http://dump.com", "category": "Humor" }
            ];
            $scope.categories = [
                {"id": 0, "name": "Development"},
                {"id": 1, "name": "Design"},
                {"id": 2, "name": "Exercise"},
                {"id": 3, "name": "Humor"}
            ];

            function setCurrentCategory(category) {
                $scope.currentCategory = category;
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
