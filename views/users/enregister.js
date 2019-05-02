

var enregistrer = angular.module('enregistrer', []);

enregistrer.controller("mainController", function($scope, $http) {
    $scope.insData = {};

    $scope.enregistrer = function() {
        console.log($scope.insData)
        // if(validateForm(event)){
            $http.post('/newUser', $scope.insData)
            .success(function(data) {
                $scope.insData = {};
                
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        // }
        
    };

  
    
    
});
