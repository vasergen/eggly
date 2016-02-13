'use strict'

    angular
        .module('Eggly', [
            'ngAnimate',
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