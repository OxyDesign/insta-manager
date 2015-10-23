
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

instaManager.directive('peopleElt', function(){
    return {
        restrict: 'E',
        scope:{
            userid:'@',
            userindex:'@',
            userfullname:'@',
            username:'@',
            token:'@'
        },
        controller: ['$scope', '$http', function($scope, $http) {
            $http.jsonp(
                'https://api.instagram.com/v1/users/'+$scope.userid+'/relationship?access_token='+$scope.token+'&callback=JSON_CALLBACK'
            ).then(function (response) {
                $scope.data = response.data.data;
            }, function (response) {
                console.log('Error : ',response);
            });
        }],
        template:function(elt,scope){
            return '<div>{{data.target_user_is_private}} - {{data.outgoing_status}} - {{userindex}} - [{{userid}}] - {{userfullname}} / <a href="https://instagram.com/{{username}}/" target="_blank">{{username}}</a></div>';
        }
    };
});
