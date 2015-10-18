
var instaManager = angular.module('instaManager',[]);

instaManager.controller('mainCtrl', ['$scope', '$http', function($scope, $http) {
    var dummyData = {
        "data":[
            {"username":"UserName1","profile_picture":"pictureUrl","id":"000000000","full_name":"Full Name 1"},
            {"username":"UserName2","profile_picture":"pictureUrl","id":"000000000","full_name":"Full Name 2"},
            {"username":"UserName3","profile_picture":"pictureUrl","id":"000000000","full_name":"Full Name 3"},
            {"username":"UserName4","profile_picture":"pictureUrl","id":"000000000","full_name":"Full Name 4"},
            {"username":"UserName5","profile_picture":"pictureUrl","id":"000000000","full_name":"Full Name 5"}
        ]
    };
    var count = 5;

    $scope.load = function(){
        if(!$scope.data){
            $scope.data = dummyData;
        }else{
            $scope.data.data = $scope.data.data.concat(Array.apply(null, {length: 5}).map(function(){
                return {"username":"UserName"+(++count),"profile_picture":"pictureUrl","id":"000000000","full_name":"Full Name "+count};
            }));
        }
    };
}]);