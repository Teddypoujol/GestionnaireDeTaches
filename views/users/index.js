var connexion = angular.module('connexion', []);

function mainController($scope, $http) {
    $scope.Data = {};
    $scope.user = {};

    $scope.connexion = function() {
       
        $http.post('/connect', $scope.Data)
            .success(function(data) {
                console.log(data)
                $scope.user._id=data._id;
                setCookie('user', $scope.user._id, 0.01);
                window.location.replace("/espace")
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

 
  
    
    
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    console.log('je te fais un cookie');
  }

 