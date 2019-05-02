todoApp.controller('ConnectCtrl',['$cookies','$scope', '$state','$http', function($cookies,$scope,$state,$http){
    $scope.Data = {};
    $scope.insData = {};

    $scope.login = function(){
        if($scope.Data.username != "" && $scope.Data.password != ""){
            var requete = {
                username : $scope.Data.username,
                password : $scope.Data.password
            }
            $http({
                method: 'POST',
                url: 'users/connect',
                data: requete
            }).then(function successCallback(response){
                var cookie = {
                    username : response.data.username
                }
                $cookies.putObject('cookies', cookie);
                $state.go('espace');
            }, function errorCallback(err){
                // mdp undefined
                console.log('Error: ' + err.data.error);
            });
        } else {
            console.log("remplissez les champs");
        }


    };

    $scope.redirectRegister = function(){
        $state.go("register")
    }
    
    $scope.register = function(){
        if($scope.insData.username != "" && $scope.insData.password != ""){
            var requete = {
                username : $scope.insData.username,
                password : $scope.insData.password
            }
            $http({
                method: 'POST',
                url: 'users/register',
                data: requete
            }).then(function successCallback(response){
                var cookie = {
                    username : response.data.username
                }
                $cookies.putObject('cookies', cookie);
                $state.go('espace');
            }, function errorCallback(err){
                // mdp undefined
                console.log('Error: ' + err.data.error);
            });
        } else {
            console.log("remplissez les champs");
        }


    };
}]);