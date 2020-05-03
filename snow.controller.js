var app = angular.module('snowing', []);

app.controller('SnowCtrl', function SnowCtrl($scope, $interval, $window) {
    var maxspeed = 10.0;
    var maxsize = 45;

    $scope.milliseconds = 0;
    initializeSnow();
    $interval(anim, 20);
    
    function initializeSnow(){
        $scope.snowflakes = [];
        var rho = (0.3 + Math.random()*0.7)/2000.0;
        var n = rho * $window.innerHeight * $window.innerWidth;
        for(var i = 0; i < n; i++){
            var distance = 0.2 + 0.8*Math.random();
            var x = -10.0 + Math.random()*120.0;
            var y = -10.0 + Math.random()*120.0;
            $scope.snowflakes.push(
                {
                    distance: distance,
                    x: x,
                    y: y,
                    xx: x,
                    yy: y,
                    size: distance * maxsize,
                    vy: distance * maxspeed,
                    vx: 0 * distance * maxspeed * 0.1 * (Math.random() - Math.random()),
                    waves: {
                        ampx: 5 * Math.random(),
                        freqx: 0.0001 + 0.0004 * Math.random(),
                        shiftx: Math.random() * Math.PI,
                        ampy: 1 * Math.random(),
                        freqy: 0.0001 + 0.0004 * Math.random(),
                        shifty: Math.random() * Math.PI
                    }
                }
            )
        }
    }
    
    function PeriodicBoundaryConditions(flake) {
        if(flake.xx < -10){flake.xx += 120;}
        if(flake.xx > 110){flake.xx -= 120;}
        if(flake.yy < -10){flake.yy += 120;}
        if(flake.yy > 110){flake.yy -= 120;}
    }
               
    function anim() {
        $scope.milliseconds += 20;
        $scope.snowflakes.forEach(function(flake) {
            var dx = flake.distance * flake.waves.ampx * Math.sin(flake.waves.shiftx + $scope.milliseconds*flake.waves.freqx);
            var dy = flake.distance * flake.waves.ampy * Math.sin(flake.waves.shifty + $scope.milliseconds*flake.waves.freqy);
            flake.xx += flake.vx * 0.02;
            flake.yy += flake.vy * 0.02;
            flake.x = flake.xx + dx;
            flake.y = flake.yy + dy;
            PeriodicBoundaryConditions(flake);
        });
    }
})
