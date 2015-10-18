
var instaManager = angular.module('instaManager',[]);

instaManager.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {
    var url;
    $scope.lastPage = false;

    $scope.token = '';
    $scope.id = '';

    $scope.load = function(){
        if($scope.lastPage || !$scope.token || !$scope.id) return;

        if(!$scope.data){
            $scope.data = [];
            url = 'https://api.instagram.com/v1/users/'+$scope.id+'/followed-by?access_token='+$scope.token;
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