/**
 *
 * @license MIT License Copyright (c) 2017 Abhijit Gurav
 * @author  Abhijit Gurav, https://github.com/abhijit-g/
 *
 */
angular.module("race")
    .factory("roadService", ["raceEngineService", function(raceEngineService) {
        "use strict";

        return {

            draw: function (animation) {
                raceEngineService.drawLine(150, 640, 'red');
                raceEngineService.drawLine(450, 640, 'red');
                raceEngineService.drawLine(250, 640, 'black');
                raceEngineService.drawLine(350, 640, 'black');
            }
        }
    }]);