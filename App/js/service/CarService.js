/**
 *
 * @license MIT License Copyright (c) 2017 Abhijit Gurav
 * @author  Abhijit Gurav, https://github.com/abhijit-g/
 *
 */
angular.module("race")
    .factory("carService", ["raceEngineService", "carDirection", function(raceEngineService, carDirection) {
        "use strict";

        var car = null;

        var status = 'stop';

        var create = function() {
            car = {
                x: 255,
                y: 500,
                dx: 0
            }
        };

        return {

            checkCreateCar: function() {
                if (car) {
                    return;
                }

                create();
            },

            destroy: function() {
                car = null;
            },

            getCarLane: function() {
                return (car.x - 55)/100;
            },

            getCar: function() {
                return car;
            },

            update: function(animation){
                if (!car) {
                    return;
                }

                if (animation % 2 !== 0) {
                    return;
                }

                car.prevX = car.x;
                car.prevY = car.y;


                if(status === 'left' && car.x > 155){
                    car.dx = -100;
                    car.x -= 100;
                    status = 'running';
                } else if(status === 'right' && car.x < 355){
                    car.dx = 100;
                    car.x += 100;
                    status = 'running';
                } else {
                    car.dx = 0;
                }

            },

            draw: function() {
                if (!car) {
                    return;
                }

                var destX;
                var destY;
                var image = new Image();
                image.src = 'App/images/car1.png'

                destX = car.prevX + (car.dx);
                destY = car.prevY;
                raceEngineService.drawImage(image, destX, destY);
            },

            keyPress: function(keyCode) {
                if(keyCode === 38){
                    status = 'running'
                } else if(keyCode === 37){
                    status = 'left'
                } else if(keyCode === 39){
                    status = 'right'
                }
            },

            keyRelease: function(keyCode) {
                if(keyCode === 38){
                    status = 'stop'
                }
            },
        }
    }]);