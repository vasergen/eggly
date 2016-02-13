"use strict";

angular.module('eggly.models.categories', [])
    .service('CategoriesModel', function($http, $q) {
        var model = this;
        var categories;
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
    })