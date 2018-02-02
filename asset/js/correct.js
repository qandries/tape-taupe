var horizontalMax;
var verticalMax;
var removeTimer;
var interval;
var life = 5;
var score = 0;
var apparitionTimer = 2000;
var disapearanceTimer = 1800;

$(document).ready(function() {
    $('[data-use="startgame"]').on('click', function() {
        //playSound('./assets/sound/background_sound.mp3');
        $('[data-use="life"] span').html(life);
        renderGameboard(5, 5);
        interval =  setInterval(displayTarget, apparitionTimer);
    });


    $('body').on('click','#target img', function() {
        clearTimeout(removeTimer);
        //playSound('./assets/sound/remove.mp3');
        removeTarget('true');
    });

    function playSound(sound) {
        $('body').append('<audio src="' + sound + '" autoplay></audio>');
    }
    function incrementScore(increment) {
        score += increment;
        $('[data-use="score"] span').html(score);
        apparitionTimer -= 100;
        disapearanceTimer = apparitionTimer;
        clearInterval(interval);
        interval = setInterval(displayTarget, apparitionTimer);
    }
    // Display an alert containing Game Over
    function gameOver() {
        $('section[data-use="gameboard"]').html('<h1>You loose</h1>');
        clearTimeout(removeTimer);
        clearInterval(interval);
        //alert('Game Over');
    }
    // Decrement the lifes, and display Game Over
    // if lifes is equal or below 0
    function loseLife() {
        life --;
        $('[data-use="life"] span').html(life);
        if(life <= 0) {
            gameOver();
        }
    }

    // Remove the target
    // If Status == true, increment score
    // Else execute loseLife
    function removeTarget(status) {
        $('#target').remove();
        if(status == 'true') {
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
        $('div[data-vertical="' + ver + '"] div[data-horizontal="' + hor + '"]').html('<div id="target" class="imgDiv"><img src="./asset/image/racoon.png"></div>');
        removeTimer = setTimeout(function() {
            removeTarget('false');
        }, disapearanceTimer);
    }
    function renderGameboard(horizontal = 10, vertical = 10) {
        horizontalMax = horizontal;
        verticalMax = vertical;
        var gameBoard = "";
        for (var i = 1; i <= vertical ; i++) {
            gameBoard += "<div data-vertical='" + i + "'>";
            for (var j = 1; j <= horizontal ; j++) {
                gameBoard += "<div style='height:" + 100 / vertical + "vh;width:" + 100 / horizontal + "%;' data-horizontal='" + j + "'></div>";
            }
            gameBoard += "</div>";
        }
        $('section[data-use="gameboard"]').html(gameBoard);
    }
});
