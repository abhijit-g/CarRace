/**
 *
 * @license MIT License Copyright (c) 2017 Abhijit Gurav
 * @author  Abhijit Gurav, https://github.com/abhijit-g/
 *
 */
angular.module("race")
    .factory("raceService", ["raceEngineService", "roadService", "carService", "bushService", "trafficService",
        function(raceEngineService, roadService, carService, bushService, trafficService) {
        "use strict";
            var lives = [1, 2, 3];

            return {
                draw: function(animation) {
                    raceEngineService.blankScreen();
                    roadService.draw();
                    carService.draw();
                    bushService.draw();
                    trafficService.draw();

                },

                update: function(animation) {
                    if(animation === 0){
                        carService.checkCreateCar();
                        bushService.checkCreateBush();
                        trafficService.checkCreateCar();
                    }

                    carService.update(animation);
                    bushService.update(animation);
                    trafficService.update(animation)

                },

                keyPress: function() {
                    if(trafficService.isCollided()){
                        carService.destroy();
                        bushService.destroy();
                        trafficService.destroy();
                        bushService.resetLevel();
                        trafficService.resetGame();
                    }
                },
            }
        }]);
