/** @format */

var horizontalMax;
var verticalMax;
var removeTimer;
var interval;
var life = 5;
var score = 0;
var apparitionTimer = 2000;
var disappearanceTimer = 1800;

function addEventListener(el, eventName, eventHandler, selector) {
    if (selector) {
        const wrappedHandler = (e) => {
            if (!e.target) return;
            const el = e.target.closest(selector);
            if (el) {
                eventHandler.call(el, e);
            }
        };
        el.addEventListener(eventName, wrappedHandler);
        return wrappedHandler;
    } else {
        const wrappedHandler = (e) => {
            eventHandler.call(el, e);
        };
        el.addEventListener(eventName, wrappedHandler);
        return wrappedHandler;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    addEventListener(document.querySelector('[data-use="gameOverPage"]'), "click", function () {
        //playSound('./assets/sound/background_sound.mp3');
        document.querySelector('[data-use="life"] span').innerHTML = life;
        renderGameboard(5, 5);
        interval = setInterval(displayTarget, apparitionTimer);
    });

    addEventListener(
        document.getElementById("body"),
        "click",
        function () {
            clearTimeout(removeTimer);
            //playSound('./assets/sound/remove.mp3');
            removeTarget("true");
        },
        "#target img"
    );

    /*   function playSound(sound) {
        $('body').append('<audio src="' + sound + '" autoplay></audio>');
    }*/
    function incrementScore(increment) {
        score += increment;
        document.querySelector('[data-use="score"] span').innerHTML = score;
        apparitionTimer -= 100;
        disappearanceTimer = apparitionTimer;
        clearInterval(interval);
        interval = setInterval(displayTarget, apparitionTimer);
    }
    // Display an alert containing Game Over
    function gameOver() {
        document.querySelector('section[data-use="gameboard"]').innerHTML = "<h1>You loose</h1>";
        clearTimeout(removeTimer);
        clearInterval(interval);
        //alert('Game Over');
    }
    // Decrement the lifes, and display Game Over
    // if lifes is equal or below 0
    function loseLife() {
        life--;
        document.querySelector('[data-use="life"] span').innerHTML = life;
        if (life <= 0) {
            gameOver();
        }
    }

    // Remove the target
    // If Status == true, increment score
    // Else execute loseLife
    function removeTarget(status) {
        document.querySelector("#target").remove();
        if (status == "true") {
            incrementScore(1);
        } else {
            loseLife();
        }
    }

    // Generate pseudo-random position for the target.
    // Launch countdown to disparition.
    function displayTarget() {
        var hor = 1 + Math.floor(Math.random() * horizontalMax);
        var ver = 1 + Math.floor(Math.random() * verticalMax);
        document.querySelector(
            'div[data-vertical="' + ver + '"] div[data-horizontal="' + hor + '"]'
        ).innerHTML = '<div id="target" class="imgDiv"><img src="./asset/image/racoon.png"></div>';
        removeTimer = setTimeout(function () {
            removeTarget("false");
        }, disappearanceTimer);
    }
    function renderGameboard(horizontal = 10, vertical = 10) {
        horizontalMax = horizontal;
        verticalMax = vertical;
        var gameBoard = "";
        for (var i = 1; i <= vertical; i++) {
            gameBoard += "<div data-vertical='" + i + "'>";
            for (var j = 1; j <= horizontal; j++) {
                gameBoard +=
                    "<div style='height:" +
                    100 / vertical +
                    "vh;width:" +
                    100 / horizontal +
                    "%;' data-horizontal='" +
                    j +
                    "'></div>";
            }
            gameBoard += "</div>";
        }
        document.querySelector('section[data-use="gameboard"]').innerHTML = gameBoard;
    }
});
