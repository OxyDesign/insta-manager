
var instaManager = angular.module('instaManager',[]);

instaManager.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {
    var url;
    $scope.lastPage = false;
    $scope.usertype = 'follows';

    $scope.token = '';
    $scope.id = '';

    $scope.order = 'outgoing_status';
    $scope.reverse = false;

    $scope.sort = function(order){
        $scope.reverse = ($scope.order === order) ? !$scope.reverse : false;
        $scope.order = order;
    };

    $scope.reset = function(){
        $scope.data = null;
    };

    $scope.load = function(){
        if($scope.lastPage || !$scope.token || !$scope.id) return;

        if(!$scope.data){
            $scope.data = [];
            url = 'https://api.instagram.com/v1/users/'+$scope.id+'/'+$scope.usertype+'?access_token='+$scope.token;
        }

        $http.jsonp(
            url+'&callback=JSON_CALLBACK'
        ).then(function (response) {
            $scope.data = $scope.data.concat(response.data.data);
            url = response.data.pagination.next_url;
            if(!url) $scope.lastPage = true;
        }, function (response) {
            console.log('Error : ',response);
        });
    };
}]);

instaManager.directive('peopleElt', function(){
    return {
        replace: true,
        restrict: 'E',
        scope:{
            userindex:'@',
            token:'@',
            people:'='
        },
        controller: ['$scope', '$http', function($scope, $http) {
            $http.jsonp(
                'https://api.instagram.com/v1/users/'+$scope.people.id+'/relationship?access_token='+$scope.token+'&callback=JSON_CALLBACK'
            ).then(function (response) {
                angular.merge($scope.people, response.data.data);
            }, function (response) {
                console.log('Error : ',response);
            });
        }],
        templateUrl:'tpl/people.html'
    };
});
