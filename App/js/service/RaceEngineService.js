/**
 *
 * @license MIT License Copyright (c) 2017 Abhijit Gurav
 * @author  Abhijit Gurav, https://github.com/abhijit-g/
 *
 */
angular.module("race")
    .factory("raceEngineService", [function() {
       "use strict";
        return {
            initialise: function(canvasContext) {
                this.canvas = canvasContext;
            },

            blankScreen: function() {
                this.canvas.fillStyle = 'white';
                this.canvas.fillRect(0, 0, 600, 640);
            },

            drawImage: function(image, x, y) {
                this.canvas.drawImage(image, x, y, image.width, image.height);
            },

            drawLine: function(x, y, color) {
                this.canvas.beginPath();
                this.canvas.moveTo(x, 0);
                this.canvas.lineTo(x, y);
                this.canvas.lineWidth = 5;
                // set line color
                this.canvas.strokeStyle = color;
                this.canvas.stroke();
            }
        }
    }]);