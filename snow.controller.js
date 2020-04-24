var app = angular.module('snowing', []);

app.controller('SnowCtrl', function SnowCtrl($scope, $interval) {
    var maxspeed = 10.0;
    var maxsize = 40;

    initializeSnow();
    $interval(anim, 20);
    
    function initializeSnow(){
        $scope.snowflakes = [];
        var n = 10 + Math.random()*100;
        for(var i = 0; i < n; i++){
            var distance = 0.2 + 0.8*Math.random();
            $scope.snowflakes.push(
                {
                    x: -10.0 + Math.random()*120.0,
                    y: -10.0 + Math.random()*120.0,
                    size: distance * maxsize,
                    vy: distance * maxspeed,
                    vx: distance * maxspeed * 0.1 * (Math.random() - Math.random())
                    amp: 2 + Math.random()*4,
                    wavl: 20 + Math.random()*20
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
            var ax = $scope.snowflakes[i].amp * Math.sin($scope.snowflakes[i].y/$scope.snowflakes[i].wavl);
            var ay = 0:
            $scope.snowflakes[i].vx += ax;
            $scope.snowflakes[i].vy += ay;
            $scope.snowflakes[i].x += $scope.snowflakes[i].vx * 0.02;
            $scope.snowflakes[i].y += $scope.snowflakes[i].vy * 0.02;
            PeriodicBoundaryConditions($scope.snowflakes[i]);
        }   
    }
})
