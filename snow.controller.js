var app = angular.module('snowing', []);

app.controller('SnowCtrl', function SnowCtrl($scope, $interval) {
    var maxspeed = 10.0;
    var maxsize = 40;
    $scope.snowflakes = [
        {x: 10.1, y: 40.6, size: maxsize, vx: 0.0, vy: maxspeed},
        {x: 30.2, y: 80.5, size: maxsize, vx: 0.0, vy: maxspeed},
        {x: 70.3, y: 20.4, size: maxsize, vx: 0.0, vy: maxspeed}
    ];
    initializeSnow();
    $interval(anim, 20);
    
    function initializeSnow(){
        var n = 10 + Math.random()*100;
        for(var i = 0; i < n; i++){
            var distance = 0.2 + 0.8*Math.random();
            $scope.snowflakes.push(
                {
                    x: -10.0 + Math.random()*120.0,
                    y: -10.0 + Math.random()*120.0,
                    size: distance * maxsize,
                    vy: distance * maxspeed
                }
            )
        }
    }
    
    function PeriodicBoundaryConditions(flake) {
        if(flake.x < -10){flake.x += 120;}
        if(flake.x > 110){flake.x -= 120;}
        if(flake.y < -10){flake.y += 120;}
        if(flake.y > 110){flake.y -= 120;}
    }
               
    function anim() {
        for (var i = 0; i < $scope.snowflakes.length; i++ ) {
            $scope.snowflakes[i].x += ($scope.snowflakes[i].vx || 0.0) * 0.02;
            $scope.snowflakes[i].y += ($scope.snowflakes[i].vy || 0.0) * 0.02;
            PeriodicBoundaryConditions($scope.snowflakes[i]);
        }   
    }
})