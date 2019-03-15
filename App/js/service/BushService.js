/**
 *
 * @license MIT License Copyright (c) 2017 Abhijit Gurav
 * @author  Abhijit Gurav, https://github.com/abhijit-g/
 *
 */
angular.module("race")
    .factory("bushService", ["raceEngineService", "carDirection", "trafficService", function(raceEngineService, carDirection, trafficService) {
        "use strict";

        var bush = null;

        var lastScore = 0;

        var status = 'stop';

        var level = 1;

        var speed = 1;

        var create = function() {
            bush = {
                x: 40,
                y: 0,
                dy: 0
            }
        };

        return {

            checkCreateBush: function() {
                if (bush) {
                    return;
                }

                create();
            },

            destroy: function() {
                bush = null;
            },

            update: function(animation){
                if (!bush) {
                    return;
                }

                if (animation % 2 !== 0) {
                    return;
                }

                var score = trafficService.getScore();

                if(score > 0 && score !== lastScore && score%100 === 0){
                    level += 1;
                    speed += 1.5;
                    trafficService.raiseSpeed();
                    lastScore = score;
                }

                bush.prevX = bush.x;
                bush.prevY = bush.y;

                if(status === 'running'){
                    bush.dy = (15*speed);
                    bush.y += (15*speed);
                } else {
                    bush.dy = 0;
                }

            },

            draw: function() {
                if (!bush) {
                    return;
                }

                var destX;
                var destY;
                var image = new Image();
                image.src = 'App/images/bush.jpg'

                destX = bush.prevX;
                destY = bush.prevY + bush.dy;

                if(destY > image.height){
                    bush.y = destY = 0;
                }

                raceEngineService.drawImage(image, destX, destY - image.height);
                raceEngineService.drawImage(image, destX, destY);
                raceEngineService.drawImage(image, destX, destY + image.height);
                raceEngineService.drawImage(image, destX, destY + 2 * image.height);
                raceEngineService.drawImage(image, destX, destY + 3 * image.height);

                raceEngineService.drawImage(image, destX + 450, destY - image.height);
                raceEngineService.drawImage(image, destX + 450, destY);
                raceEngineService.drawImage(image, destX + 450, destY + image.height);
                raceEngineService.drawImage(image, destX + 450, destY + 2 * image.height);
                raceEngineService.drawImage(image, destX + 450, destY + 3 * image.height);

            },

            keyPress: function(keyCode) {
                if(keyCode === 38){
                    status = 'running'
                }
            },

            keyRelease: function(keyCode) {
                if(keyCode === 38){
                    status = 'stop'
                }
            },

            getLevel: function() {
                return level;
            },

            resetLevel: function() {
                if(trafficService.getLives().length === 1){
                    level = 1;
                    speed = 1;
                }
            },
        }
    }]);