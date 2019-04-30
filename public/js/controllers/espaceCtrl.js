todoApp.controller('EspaceCtrl',['$cookies','$scope', '$state','$http', function($cookies,$scope,$state,$http){
    $scope.Data = {};
    $scope.user = $cookies.getObject('cookies');
    
    $scope.addList = function(){
        var liste = {
            name: $scope.liste.name,
            description: $scope.liste.description,
            tasks: $scope.liste.tasks
        };
        $http({
            method: 'POST',
            url: '/addList',
            data: liste
        }).then(function successCallback(response){
            callback(response);
        }, function errorCallback(err){
            console.log('Error: ' + err.data.error);
        });


    };


    $scope.getList = function(){
        var liste = {
            name: $scope.liste.name,
            description: $scope.liste.description,
            tasks: $scope.liste.tasks
        };
        $http({
            method: 'POST',
            url: '/addList',
            data: liste
        }).then(function successCallback(response){
            callback(response);
        }, function errorCallback(err){
            console.log('Error: ' + err.data.error);
        });


    };


 

}]);