var app = angular.module('snowing', []);

app.controller('SnowCtrl', function SnowCtrl($scope, $interval, $window) {
    var maxspeed = 10.0;
    initializeFunctionsAndVariables();
    $scope.initializeSnow();
    $interval(anim, $scope.millisecondsInterval);
    
    
    function initializeFunctionsAndVariables() {
        $scope.startTime = Date.now();
        $scope.milliseconds = 0;

        $scope.settings = {
            snowflakeSymbol: "●",
            optionsVisible: false,
            maxsize: 45,
            maxrho: 125.0,
            minz: 1.0,
            maxz: 8.0,
            windx: 0.0
        };

    
        $scope.initializeSnow = function(){
            $scope.settings.optionsVisible = false;
            $scope.snowflakes = [];
            var rho = (0.8 + Math.random()*0.2) * $scope.settings.maxrho / 1000000.0;
            var n = rho * $window.innerHeight * $window.innerWidth * ($scope.settings.maxz - $scope.settings.minz);
            for(var i = 0; i < n; i++){
                /*var distance = 0.2 + 0.8*Math.random();
                var x = -10.0 + Math.random()*120.0;
                var y = -10.0 + Math.random()*120.0;
                var z = $scope.settings.minz + Math.random() * ($scope.settings.maxz - $scope.settings.minz);
                var distance = 1.0/z;
                $scope.snowflakes.push(
                    {
                        distance: distance,
                        x: x,
                        y: y,
                        xx: x,
                        yy: y,
                        size: distance * $scope.settings.maxsize,
                        vy: distance * maxspeed,
                        vx: distance * (maxspeed * 0.1 * (Math.random() - Math.random()) + $scope.settings.windx),
                        waves: {
                            ampx: 5 * Math.random(),
                            freqx: 0.0001 + 0.0004 * Math.random(),
                            shiftx: Math.random() * Math.PI,
                            ampy: 1 * Math.random(),
                            freqy: 0.0001 + 0.0004 * Math.random(),
                            shifty: Math.random() * Math.PI
                        }
                    }
                )*/
                $scope.snowflakes.push(createFlake());
            }
        }
    }
    
    function createFlake(flake){
        var returnNewFlake = !flake;
        if(returnNewFlake){
            flake = {};
        }
        
        var x = -10.0 + Math.random()*120.0;
        flake.x = x;
        flake.xx = x;
        var distance = flake.distance;
        if(returnNewFlake){
            var y = -10.0 + Math.random()*120.0;
            flake.y = y;
            flake.yy = y;
            var z = $scope.settings.minz + Math.random() * ($scope.settings.maxz - $scope.settings.minz);
            distance = 1.0/z;
            flake.distance = distance;
        }
        flake.size = distance * $scope.settings.maxsize;
        flake.vy = distance * maxspeed;
        flake.vx = distance * (maxspeed * 0.1 * (Math.random() - Math.random()) + $scope.settings.windx);
        flake.waves = {
            ampx: 5 * Math.random(),
            freqx: 0.0001 + 0.0004 * Math.random(),
            shiftx: Math.random() * Math.PI,
            ampy: 1 * Math.random(),
            freqy: 0.0001 + 0.0004 * Math.random(),
            shifty: Math.random() * Math.PI
        };
        
        if(returnNewFlake){
            return flake;
        }
    }
    
    function PeriodicBoundaryConditions(flake) {
        if(flake.xx < -10){flake.xx += 120;}
        if(flake.xx > 110){flake.xx -= 120;}
        if(flake.yy < -10){
            var ynew = flake.yy + 120;
            createFlake(flake);
            flake.yy = ynew;
        }
        if(flake.yy > 110){
            ynew = flake.yy - 120;
            createFlake(flake);
            flake.yy = ynew;
        }
    }
               
    function anim() {
        var newMilliseconds = Date.now() - $scope.startTime;
        var dt = 0.001*(newMilliseconds - $scope.milliseconds);
        $scope.milliseconds = newMilliseconds;
        $scope.snowflakes.forEach(function(flake) {
            var dx = flake.distance * flake.waves.ampx * Math.sin(flake.waves.shiftx + $scope.milliseconds*flake.waves.freqx);
            var dy = flake.distance * flake.waves.ampy * Math.sin(flake.waves.shifty + $scope.milliseconds*flake.waves.freqy);
            flake.xx += flake.vx * dt;
            flake.yy += flake.vy * dt;
            flake.x = flake.xx + dx;
            flake.y = flake.yy + dy;
            PeriodicBoundaryConditions(flake);
        });
    }
})
