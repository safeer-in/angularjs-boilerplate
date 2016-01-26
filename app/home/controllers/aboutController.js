'use strict';

define(['app'], function (app) {

    var injectParams = ['$scope'];

    var AboutController = function ($scope) {
    	$scope.author = 'Mohammed Safeer A R';
    };

    AboutController.$inject = injectParams;

    app.register.controller('AboutController', AboutController);

});