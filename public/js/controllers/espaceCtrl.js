todoApp.controller('EspaceCtrl',['$cookies','$scope', '$state','$http', function($cookies,$scope,$state,$http){
    $scope.Data = {};
    $scope.user = $cookies.getObject('cookies');

    $scope.getList = function(){
        $http({
            method: 'GET',
            url: 'listes/get'
        }).then(function successCallback(response){
            $scope.listes = response.data;
        }, function errorCallback(err){
            console.log('Error: ' + err.data.error);
        });
    };

    $scope.addList = function(){
        var liste = {
            name: $scope.Data.name,
            description: $scope.Data.description,
        };
        $http({
            method: 'POST',
            url: 'listes/new',
            data: liste
        }).then(function successCallback(response){
            $scope.Data = {};
            $scope.getList();
        }, function errorCallback(err){
            console.log('Error: ' + err.data.error);
        });
    };

    $scope.deleteList = function(list_id){
        $http({
            method: 'DELETE',
            url: 'listes/delete/' + list_id
        }).then(function successCallback(response){
            $scope.getList();
        }, function errorCallback(err){
            console.log('Error: ' + err.data.error);
        });
    };

    $scope.deconnexion = function(){
        if($scope.user.username != ""){
            $cookies.remove('cookies');
        }
        $state.go('connectionState');
    }
    $scope.getList();
}]);