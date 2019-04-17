
var connexion = angular.module('connexion', []);

function mainController($scope, $http) {
    $scope.Data = {};

    $scope.connexion = function() {
       
        $http.post('/connect', $scope.Data)
            .success(function(data) {
                console.log(data)
                //setCookie('user', $scope.user._id, 0.01);
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

  function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }