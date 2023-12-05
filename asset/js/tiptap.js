/** @format */

let abscisseMax;
let ordonneeMax;
let removeTimer;
let interval;
let score = 0;
let life = 5;
let appearanceTimer = 1500;
let disappearanceTimer = 1200;

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
    StartGame();

    addEventListener(
        document.querySelector("body"),
        "click",
        function () {
            clearTimeout(removeTimer);
            //playSound('../sound/remove.mp3');
            removeTarget(true);
        },
        "#target img"
    );

    function StartGame() {
        document.querySelector('section[data-use="gameOverPage"]').innerHTML =
            '<div id="start"><p>Do you want to start : <br></p><button id="button" type="button">Start</button></div>';

        addEventListener(
            document.querySelector("body"),
            "click",
            function () {
                document.getElementById("start").remove();
                score = 0;
                life = 5;
                //playSound('../sound/background_sound.mp3');
                renderGameboard(5, 5);
                displayMenu(score, life);
                interval = setInterval(displayTarget, appearanceTimer);
            },
            "button"
        );
    }

    /*    function playSound(sound) {
        $('body').append('<audio src="' + sound + '" autoplay></audio>');
    }
*/
    function displayMenu(score, life) {
        document.querySelector('section[data-use="menu"]').innerHTML =
            '<div class="menu"><ul><li>Score : ' +
            score +
            "</li><li>Life : " +
            life +
            "</li></ul></div>";
    }

    function incrementScore(increment) {
        score = score + increment;
        displayMenu(score, life);
        //appearanceTimer -= 100;
        //disappearanceTimer -= 50;
        clearInterval(interval);
        interval = setInterval(displayTarget, appearanceTimer);
    }

    // Display the game over window and reinitialize the game
    function gameOver(score) {
        document.querySelector('section[data-use="gameOverPage"]').innerHTML =
            '<div id="gameOver"><p>Here\'s your score : ' +
            score +
            '<br> Do you want to continue : <br></p><button id="button" type="button">Restart</button></div>';
        clearTimeout(removeTimer);
        clearInterval(interval);
        addEventListener(
            document.querySelector("body"),
            "click",
            function () {
                life = 3;
                document.getElementById("gameOver").remove();
            },
            "button"
        );
    }

    function loseLife() {
        life--;
        displayMenu(score, life);
        if (life <= 0) {
            gameOver(score);
        }
    }

    // Allows the target to get removed either by clicking it (status exist then score goes up) or let it pass(status is false then lose a life)
    function removeTarget(status) {
        document.getElementById("target").remove();
        if (status) {
            incrementScore(1);
        } else {
            loseLife();
        }
    }

    // Generate pseudo-random position for the target.
    // Launch countdown to disappearance.
    function displayTarget() {
        let abs = 1 + Math.floor(Math.random() * abscisseMax);
        let ord = 1 + Math.floor(Math.random() * ordonneeMax);
        document.querySelector(
            'div[data-ordonnee="' + ord + '"] div[data-abscisse="' + abs + '"]'
        ).innerHTML =
            '<div id="target" class="imgDiv"><img id="hit" src="./asset/image/racoon.png"></div>';
        removeTimer = setTimeout(function () {
            removeTarget(false);
        }, disappearanceTimer);
    }

    function renderGameboard(abscisse = 10, ordonnee = 10) {
        abscisseMax = abscisse;
        ordonneeMax = ordonnee;
        let gameboard = "";
        for (let i = 1; i <= ordonnee; i++) {
            gameboard += "<div data-ordonnee='" + i + "'>";
            for (let j = 1; j <= abscisse; j++) {
                gameboard +=
                    "<div style='height:" +
                    100 / ordonnee +
                    "vh;width: " +
                    100 / abscisse +
                    "%;' data-abscisse='" +
                    j +
                    "'></div>";
            }
            gameboard += "</div>";
        }
        document.querySelector('section[data-use="gameboard"]').innerHTML = gameboard;
    }
});
