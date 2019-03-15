/**
 *
 * @license MIT License Copyright (c) 2017 Abhijit Gurav
 * @author  Abhijit Gurav, https://github.com/abhijit-g/
 *
 */
angular.module("race")
    .factory("trafficService", ["raceEngineService", "carDirection", "carService", "$timeout", function(raceEngineService, carDirection, carService, $timeout) {
        "use strict";

        var cars = null;

        var score = 0;

        var speed = 1;

        var status = 'stop';

        var collision = false;

        var msg = "";

        var lives = [1, 2, 3];

        var create = function() {
            cars = [];
        };

        function newCarAllowed(){
            var lastCar = _.last(cars);
            if(status === 'running'){
                return lastCar.y >= 320;
            } else {
                return lastCar.y <= 320;
            }
        }

        function addToTraffic() {
            if(cars.length < 1 || newCarAllowed()){
                var lane = getRandomInt(1, 3);
                if(status === 'stop'){
                    while(carService.getCarLane() === lane){
                        lane = getRandomInt(1, 3);
                    }
                }
                var car = {};

                car.img = new Image();
                car.img.src = 'App/images/car' + getRandomInt(1, 7) + '.png';

                car.x = (lane * 100) + 55;
                if(status === 'running'){
                    car.y = -320;
                } else {
                    car.y = 960;
                }

                cars.push(car);
            }
        }

        function getRandomInt(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        return {

            checkCreateCar: function() {
                if (cars) {
                    return;
                }

                create();
            },

            destroy: function() {
                cars = null;
            },



            update: function(animation){
                if (!cars) {
                    return;
                }

                if (animation % 2 !== 0) {
                    return;
                }

                _.forEach(cars, function(car) {
                    car.prevX = car.x;
                    car.prevY = car.y;

                    if(status === 'running'){
                        car.dy = (5*speed);
                        car.y += (5*speed);
                    } else {
                        car.dy = -(5*speed);
                        car.y -= (5*speed);
                    }
                });

                _.remove(cars, function(car) {
                    if(status === 'running' && car.y >= 650){
                        if(car.y >= 650 && car.y <= 750){
                            score += 10;
                        }
                        return true;
                    } else if(status !== 'running' && car.y <= -170){
                        return true;
                    }
                });
            },

            draw: function() {
                var that = this;
                if (!cars) {
                    return;
                }

                var destX;
                var destY;

                addToTraffic();

                _.forEach(cars, function(car) {
                    destX = car.prevX;
                    destY = car.prevY + (car.dy);
                    raceEngineService.drawImage(car.img, destX, destY);
                    if(that.checkCollision(destX, destY, car.img.height)){
                        car.img.src = 'App/images/blast.png';
                        raceEngineService.drawImage(car.img, destX, destY);
                        if(lives.length - 1 < 1){
                            msg = 'GAME OVER !!!' + '\r\n' +'  Hit Space bar to ReStart !!!';
                        } else {
                            msg = 'Hit Space bar to use life !!!';
                        }
                        $timeout(function () {
                            collision = true;
                        }, 30);
                    }
                });
            },

            checkCollision: function(x, y, height) {
                return x === carService.getCar().x && (y + height) > carService.getCar().y;
            },

            isCollided: function() {
                return collision;
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

            getScore: function() {
                return score;
            },

            resetGame: function() {
                lives = _.slice(lives, 0, -1);
                if(lives.length < 1){
                    lives = [1, 2, 3];
                    score = 0;
                    speed = 1;
                }
                msg = "";
                collision = false;
            },

            raiseSpeed: function() {
                speed += 1.5;
            },

            getMsg: function(){
                return msg;
            },

            getLives: function(){
                return lives;
            }
        }
    }]);