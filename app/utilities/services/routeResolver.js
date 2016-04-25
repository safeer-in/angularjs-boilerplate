'use strict';

define([], function() {

    var routeResolver = function() {

        this.$get = function() {
            return this;
        };

        this.routeConfig = function() {
            var viewsDirectory = '',
                controllersDirectory = '',

                setViewsDirectory = function(viewsDir) {
                    viewsDirectory = viewsDir;
                },

                setControllersDirectory = function(controllersDir) {
                    controllersDirectory = controllersDir;
                },

                getViewsDirectory = function() {
                    return viewsDirectory;
                },

                getControllersDirectory = function() {
                    return controllersDirectory;
                };

            return {
                setViewsDirectory: setViewsDirectory,
                setControllersDirectory: setControllersDirectory,
                getControllersDirectory: getControllersDirectory,
                getViewsDirectory: getViewsDirectory
            };
        }();

        this.route = function(routeConfig) {

            var resolve = function(baseName, module, path, controllerAs, secure, params) {
                    if (!path) path = '';
                    routeConfig.setViewsDirectory(module + '/views/');
                    var routeDef = {};
                    var baseFileName = baseName.charAt(0).toLowerCase() + baseName.substr(1);
                    routeDef.templateUrl = routeConfig.getViewsDirectory() + path + baseFileName + '.html';
                    routeDef.controller = baseName + 'Controller';
                    if (controllerAs) routeDef.controllerAs = controllerAs;
                    routeDef.secure = (secure) ? secure : false;
                    routeDef.data = params ? params : {};
                    routeDef.resolve = {
                        load: ['$q', '$rootScope',
                            function($q, $rootScope) {
                                routeConfig.setControllersDirectory(module + '/controllers/');
                                var dependencies = [routeConfig.getControllersDirectory() + path + baseFileName + 'Controller.js'];
                                return resolveDependencies($q, $rootScope, dependencies);
                            }
                        ]
                    };

                    return routeDef;
                },

                resolveDependencies = function($q, $rootScope, dependencies) {
                    var defer = $q.defer();
                    require(dependencies, function() {
                        defer.resolve();
                        $rootScope.$apply()
                    });

                    return defer.promise;
                };

            return {
                resolve: resolve
            }
        }(this.routeConfig);

    };

    var servicesApp = angular.module('routeResolverServices', []);

    //Must be a provider since it will be injected into module.config()    
    servicesApp.provider('routeResolver', routeResolver);
});