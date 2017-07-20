var app = angular.module('beauty', ['ngResource','ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
        .when('/add-bag', {
            templateUrl: 'partials/bag-form.html',
            controller: 'AddBagCtrl'
        })
        .when('/bag/:id', {
            templateUrl: 'partials/bag-form.html',
            contriller: 'EditBagCtrl'
        })
        .when('/bag/delete/:id', {
        templateUrl: 'partials/bag-delete.html',
        controller: 'DeleteBagCtrl'
    })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.controller('HomeCtrl', ['$scope', '$resource', 
    function($scope, $resource){
        var Bags = $resource('/api/bags');
        Bags.query(function(bags){
            $scope.bags = bags;
        });
    }]);

app.controller('AddBagCtrl', ['$scope', '$resource', '$location',
    function($scope, $resource, $location){
        $scope.save = function(){
            var Bags = $resource('/api/bags');
            Bags.save($scope.bag, function(){
                $location.path('/');
            });
        };
    }]);

app.controller('EditBagCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){	
        var Bags = $resource('/api/bags/:id', { id: '@_id' }, {
            update: { method: 'PUT' }
        });

        Bags.get({ id: $routeParams.id }, function(bag){
            $scope.bag = bag;
        });

        $scope.save = function(){
            Bags.update($scope.bag, function(){
                $location.path('/');
            });
        }
    }]);

app.controller('DeleteBagCtrl', ['$scope', '$resource', '$location', '$routeParams',
    function($scope, $resource, $location, $routeParams){
        var Bags = $resource('/api/bags/:id');

        Bags.get({ id: $routeParams.id }, function(bag){
            $scope.bag = bag;
        })

        $scope.delete = function(){
            Bags.delete({ id: $routeParams.id }, function(bag){
                $location.path('/');
            });
        }
    }]);