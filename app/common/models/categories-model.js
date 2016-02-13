"use strict";

angular.module('eggly.models.categories', [])
    .service('CategoriesModel', function($http, $q) {
        var model = this;
        var categories;
        var currentCategory;
        var URLS = {
            FETCH: 'data/categories.json'
        }

        function extract(result) {
            return result.data;
        }

        function cacheCategories(result) {
            categories = extract(result);
            return categories;
        }

        model.getCategories = function() {
            return categories
                ? $q.when(categories)
                : $http.get(URLS.FETCH).then(cacheCategories);
        }

        model.getCategoryByName = function(categoryName) {
            var deferred = $q.defer();
            function _findCategory() {
                return _.find(categories, function(c) {
                    return c.name == categoryName
                })
            }

            if(categories) {
                deferred.resolve(_findCategory())
            } else {
                model.getCategories()
                    .then(function(result) {
                        deferred.resolve(_findCategory())
                    })
            }

            return deferred.promise;
        }

        model.setCurrentCategory = function(categoryName) {
            return model.getCategoryByName(categoryName)
                    .then(function(category) {
                        currentCategory = category
                    })
        }

        model.getCurrentCategory = function() {
            return currentCategory;
        }

        model.getCurrentCategoryName = function() {
            return currentCategory
                ? currentCategory.name
                : ''
        }
    })