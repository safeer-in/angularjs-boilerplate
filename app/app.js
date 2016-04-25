define([], function() {

    var app = angular.module('app', ['ui.router', 'routeResolverServices', 'menu.directives']);

    app.config(['$stateProvider', '$urlRouterProvider', 'routeResolverProvider', '$controllerProvider',
        '$compileProvider', '$filterProvider', '$provide', '$httpProvider',

        function($stateProvider, $urlRouterProvider, routeResolverProvider, $controllerProvider,
            $compileProvider, $filterProvider, $provide, $httpProvider) {



            app.register = {
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service
            };

            //Define routes - controllers will be loaded dynamically
            var route = routeResolverProvider.route;

            $urlRouterProvider.otherwise("/home");
            $stateProvider
            //route.resolve() now accepts the convention to use (name of controller & view) as well as the 
            //module and 
            //path where the controller or view lives in the controllers or views folder if it's in a sub folder. 
            //For example, the controllers for customers live in controllers/customers and the views are in views/customers.
            //The controllers for orders live in controllers/orders and the views are in views/orders
            //The second parameter allows for putting related controllers/views into subfolders to better organize large projects
            //Thanks to Ton Yeung for the idea and contribution
            //eg: route.resolve(baseName, module, path, controllerAs, secure)
            .state('home', {
                url: '/home',
                views: {
                    maincontent: route.resolve('Home', 'home', '', 'vm'),
                    contact: route.resolve('Contact', 'home', '', 'vm')
                }
            }).state('about', {
                url: '/about',
                views: {
                    maincontent: route.resolve('About', 'home', '', 'vm')
                }
            }).state('contact', {
                url: '/contact',
                views: {
                    maincontent: route.resolve('Contact', 'home', '', 'vm')
                }
            });

        }
    ]);

    return app;
});