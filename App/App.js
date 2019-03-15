/**
 *
 * @license MIT License Copyright (c) 2017 Abhijit Gurav
 * @author  Abhijit Gurav, https://github.com/abhijit-g/
 *
 */
angular.module("race", [])

    .controller("appController", ["$scope","bushService", "carService", "trafficService", "raceService", function($scope, bushService, carService, trafficService, raceService) {
        $scope.keydown = function(keyEvent) {
            bushService.keyPress(keyEvent.keyCode);
            carService.keyPress(keyEvent.keyCode);
            trafficService.keyPress(keyEvent.keyCode);
            if(keyEvent.keyCode === 32){
                raceService.keyPress();
            }
        };

        $scope.keyup = function(keyEvent) {
            bushService.keyRelease(keyEvent.keyCode);
            carService.keyRelease(keyEvent.keyCode);
            trafficService.keyRelease(keyEvent.keyCode);
        };
    }])

    .directive("road", ["$interval", "raceEngineService", "raceService", "trafficService", "bushService", function($interval, raceEngineService, raceService, trafficService, bushService) {
        return {
            restrict: 'A',
            template: '<canvas id="gameCanvas" width="600" height="640" style="border:1px solid #000000;"></canvas>'+
                    '<div class="scoreboard">'+
                        '<div class="lives">'+
                            '<label>Lives : </label>'+
                            '<div ng-repeat="l in lives">'+
                                '<img src="App/images/car1.png">'+
                            '</div>'+
                        '</div>'+
                        '<div class="level"><label>Level : </label><label>{{level}}</label></div>'+
                        '<div class="score"><label>Score : </label><label>{{score}}</label></div>'+
                        '<div class="instr"><label>Instructions / Message : </label><div><label class="instrLabel">Car control : Arrow keys</label></div><div><label class="msg">{{msg}}</label></div></div>'+
                    '</div>',

            link: function(scope, element) {
                var intervalPromise;
                var animation = 0;
                var context = element.find('canvas')[0].getContext("2d");

                raceEngineService.initialise(context);

                function gameLoop() {
                    if(!trafficService.isCollided()){
                        animation++;

                        if (animation === 4) {
                            animation = 0;
                        }

                        raceService.update(animation);
                        raceService.draw(animation);
                        scope.lives = trafficService.getLives();
                        scope.score = trafficService.getScore();
                        scope.level = bushService.getLevel();
                        scope.msg = trafficService.getMsg();
                    }
                }

                intervalPromise = $interval(gameLoop, 1000 / 60);

                scope.$on("$destroy", function() {
                    if (intervalPromise) {
                        $interval.cancel(intervalPromise);
                        intervalPromise = undefined;
                    }
                });
            }
        }
    }]);
