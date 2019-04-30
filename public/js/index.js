var todoApp = angular.module('todoApp',['ui.router','ngCookies'])

.config(function($stateProvider){
    
    var connectionState = {
        name : 'connectionState',
        templateUrl : '../views/login.html',
        url : '/accueil',
        controller : 'ConnectCtrl'
    };

    var profilState = {
        name : 'espace',
        templateUrl : '../views/espace.html',
        url : '/espace',
        controller : 'EspaceCtrl'
    };

    $stateProvider.state(connectionState);
    $stateProvider.state(profilState);
})

.run(['$cookies','$state', '$timeout' , function($cookies,$state, $timeout) {
    var user = $cookies.getObject('cookies');
    if(user) {
        $state.go('espace');
    }
    else {
        $timeout(function(){
            $state.go('connectionState');
        })
    }
}]);
