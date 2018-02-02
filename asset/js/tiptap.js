var abscisseMax;
var ordonneeMax;
var removeTimer;
var interval;
var score = 0;
var life = 3;
var appearanceTimer = 1500;
var disappearanceTimer = 1200;
$(document).ready(function () {
    StartGame();

    $('body').on('click', '#target img',function () {
        clearTimeout(removeTimer);
        playSound('../sound/remove.mp3');
        removeTarget(true);
    });

    function StartGame() {
        $('section[data-use="gameOverPage"]').html('<div id="start"><p>Do you want to start : <br></p><button id="button" type="button">Start</button></div>');
        $('body').on('click', 'button', function () {
            $('#start').remove();
            score = 0;
            life = 3;
            playSound('../sound/background_sound.mp3');
            renderGameboard(5,5);
            displayMenu(score,life);
            interval = setInterval(displayTarget, appearanceTimer);
        });
    }

    function playSound(sound) {
        $('body').append('<audio src="' + sound + '" autoplay></audio>');
    }

    function displayMenu(score, life) {
        $('section[data-use="menu"]').html('<div class="menu"><ul><li>Score : ' + score + '</li><li>Life : ' + life + '</li></ul></div>')
    }

    function incrementScore(increment) {
        score = score + increment;
        displayMenu(score,life);
        appearanceTimer -= 100;
        disappearanceTimer -= 10;
        clearInterval(interval);
        interval = setInterval(displayTarget, appearanceTimer);
    }

// Display the game over window and reinitialize the game
   function gameOver(score) {
       $('section[data-use="gameOverPage"]').html('<div id="gameOver"><p>Here\'s your score : ' + score + '<br> Do you want to continue : <br></p><button id="button" type="button">Restart</button></div>');
       clearTimeout(removeTimer);
       clearInterval(interval);
       $('body').on('click', 'button', function () {
           life = 3;
           $('#gameOver').remove();
       });
   }

   function loseLife() {
       life--;
       displayMenu(score,life);
       if(life <= 0) {
          gameOver(score);
       }
   }

   // Allows the target to get removed either by clicking it (status exist then score goes up) or let it pass(status is false then lose a life)
   function removeTarget(status) {
      $('#target').remove();
      if (status){
         incrementScore(1);
      }else{
         loseLife();
      }
   }

    // Generate pseudo-random position for the target.
    // Launch countdown to disappearance.
   function displayTarget() {
      var abs = 1 + Math.floor(Math.random() * abscisseMax);
      var ord = 1 + Math.floor(Math.random() * ordonneeMax);
      $('div[data-ordonnee="' + ord + '"] div[data-abscisse="' + abs + '"]').html('<div id="target" class="imgDiv"><img id="hit" src="./asset/image/racoon.png"></div>');
      removeTimer = setTimeout(function () {
         removeTarget(false)
      }, disappearanceTimer)
   }

   function renderGameboard(abscisse = 10, ordonnee = 10) {
       abscisseMax = abscisse;
       ordonneeMax = ordonnee;
       var gameboard = "";
       for (var i=1; i <= ordonnee; i++){
          gameboard += "<div data-ordonnee='" + i + "'>";
          for (var j=1; j <= abscisse; j++){
             gameboard += "<div style='height:" + 100 / ordonnee + "vh;width: " + 100 / abscisse + "%;' data-abscisse='" + j + "'></div>"
          }
          gameboard += "</div>";
       }
       $('section[data-use="gameboard"]').html(gameboard);
   }
});