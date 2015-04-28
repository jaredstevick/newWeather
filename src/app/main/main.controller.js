/*$*/
'use strict';

angular.module('ngWeather')
  .controller('MainCtrl', function ($scope, $http) {
    
    $scope.noShow = false;
         
    
    $scope.getCoords = function() {
        $http.get('http://maps.googleapis.com/maps/api/geocode/json?address='+$('#input').val()+'&sensor=false')
            .success(function(data){
                console.log(data);
                var lat = data.results[0].geometry.location.lat;
                var lng = data.results[0].geometry.location.lng;
                $scope.loc = data.results[0].address_components[1].long_name;


                $http.jsonp('https://api.forecast.io/forecast/9e3f9effa091da78070dd0e26d01368f/' + lat + ',' + lng + '?callback=JSON_CALLBACK')
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
                    
                        $scope.noShow = true;

                        
                        // if ($scope.wIcon === "sleet") {
                        //     $('body').addClass('sleet');
                        // };
                        if ($scope.wIcon === 'clear-day') {
                            $('body').removeClass();
                            $('body').addClass('clearDay');
                        };
                        if ($scope.wIcon === 'rain') {
                            $('body').removeClass();
                            $('body').addClass('rainy');
                        };
                        if ($scope.wIcon === 'clear-night') {
                            $('body').removeClass();
                            $('body').addClass('clearNight');
                        };
                        if ($scope.wIcon === 'partly-cloudy-night')  {
                            $('body').removeClass();
                            $('body').addClass('cloudNight');
                        };
                        if ($scope.wIcon === 'cloudy') {
                            $('body').removeClass();
                            $('body').addClass('cloudy');
                        };
                        if ($scope.wIcon === 'partly-cloudy-day')  {
                            $('body').removeClass();
                            $('body').addClass('pCloudyDay');
                        };
                        
                        if ($scope.wIcon === 'fog')  {
                            $('body').removeClass();
                            $('body').addClass('foggy');
                        };
                        if ($scope.wIcon === 'windy') {
                            $('body').removeClass();
                            $('body').addClass('windy');
                        };
                        if ($scope.cTemp < 36) {
                            $('body').removeClass();
                            $('body').addClass('cold');
                        };
                    });

        });
        
        $('#input').val('');
    };
    
    $scope.headerCon = {
        color: '#eee',
        size: 120,
        icon: 'partly-cloudy-day'
    };
    
    $scope.iconObj = {
        color: 'cornflowerblue',
        size: 100
    };
    
    $scope.dailyCon = {
        color: 'cornflowerblue',
        size: 50
    };

  
    
  });
