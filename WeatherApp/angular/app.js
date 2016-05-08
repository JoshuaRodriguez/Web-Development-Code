// MODULE
var weatherApp = angular.module('weatherApp', ['ngResource']);

// CONTROLLERS
weatherApp.controller('forecastController', ['$scope', '$resource', function($scope, $resource, cityService) {

    $scope.city = "Miami, FL";

    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", {
        callback: "JSON_CALLBACK"
    },{
        get: {
            method: "JSONP"
        }
    });

    $scope.submit = function() {
        $scope.city = $scope.input;
        $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt: 7, appid: '190ffde1d264f4e35fcd919f5a75d3fe'});
        console.log($scope.weatherResult);
    }

    $scope.kelvinToFahrenheit = function(degK) {
        return Math.round((1.8 * (degK - 273)) + 32);
    }

    $scope.convertToDate = function(dt) {
        return new Date(dt * 1000);
    }

    $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt: 12, appid: '190ffde1d264f4e35fcd919f5a75d3fe'});
    console.log($scope.weatherResult);

}]);

// DIRECTIVES
weatherApp.directive('navBar', function() {
    return {
        templateUrl: 'angular/directives/navbar.html'
    }
});

weatherApp.directive('searchForm', function() {
    return {
        templateUrl: 'angular/directives/search-form.html'
    }
});

weatherApp.directive('displayCity', function() {
    return {
        templateUrl: 'angular/directives/display-city.html'
    }
});

weatherApp.directive('weatherPanels', function() {
    return {
        templateUrl: 'angular/directives/weather-panels.html'
    }
});
