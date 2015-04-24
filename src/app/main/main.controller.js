'use strict';

angular.module('ngWeather')
  .controller('MainCtrl', function ($scope, $http) {
    
    
    $scope.getCoords = function() {
        $http.get("http://maps.googleapis.com/maps/api/geocode/json?address="+$('#input').val()+"&sensor=false")
            .success(function(data, text){
                console.log(data);
				var lat = data.results[0].geometry.location.lat;
				var lng = data.results[0].geometry.location.lng;
				$scope.loc = data.results[0].address_components[1].long_name;


				$http.jsonp("https://api.forecast.io/forecast/9e3f9effa091da78070dd0e26d01368f/" + lat + "," + lng + "?callback=JSON_CALLBACK")
					.success(function(data){
						console.log(data);
						$scope.cTemp = data.currently.temperature;
					    $scope.cHumidity = data.currently.humidity;
					    $scope.cSummary = data.currently.summary;
					    $scope.cCloudCover = data.currently.cloudCover;
                        $scope.cWind = data.currently.windSpeed;
					    $scope.wIcon = data.currently.icon;
                    
                        //Weekly forecast
                        $scope.daily = data.daily.data;
					})

        });
        
        $('#input').val('');
    };
    
    $scope.iconObj = {
        color: 'cornflowerblue',
        size: 100
    }
    
    $scope.dailyCon = {
        color: '#abcdef',
        size: 30
    }
    
  });
