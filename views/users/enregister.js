

var enregistrer = angular.module('enregistrer', []);

function mainController($scope, $http) {
    $scope.insData = {};

    $scope.enregistrer = function() {
        if(validateForm(event)){
            $http.post('/newUser', $scope.insData)
            .success(function(data) {
                $scope.insData = {};
                window.location.replace("/confirmation")
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        }
        
    };

  
    
    
}
