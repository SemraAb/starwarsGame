var attact;
var enemyAttact;
var health;
var figure1 = $("#figure1");
var figure2 = $("#figure2");
var figure3 = $("#figure3");
var figure4 = $("#figure4");
var clickNum = 0;
var count = 0;
var health1;
var health2;
// For Random Numbers
$(".gamezone").hide()
var getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
// Game Restart Function
var initializeGame = function () {
  location.reload();
};
// Game Start , each player get its random values
var startGame = function () {
  figure1 = getRandom(1, 40);
  figure2 = getRandom(1, 40);
  figure3 = getRandom(1, 40);
  figure4 = getRandom(1, 40);
  $("#figure1").attr("data", figure1);
  $("#figure2").attr("data", figure2);
  $("#figure3").attr("data", figure3);
  $("#figure4").attr("data", figure4);
  //for cheking random calues
  console.log("figure 1- " + figure1);
  console.log("figure 2- " + figure2);
  console.log("figure 3- " + figure3);
  console.log("figure 4- " + figure4);
};
startGame();
// Selection part , your choice and enemies
$(".button").on("click", function (e) {
  $(".gamezone").show()
  if (clickNum === 0) {
    let idOfClicked = $(this).closest("div").attr("id");
    var clickedElement = $("#" + idOfClicked + "");
    $(".enemies").append($(".characters"));
    $(".yourChar").append(clickedElement);
    $(".select").hide();
    clickNum++;
    
  } else if (clickNum === 1) {
    let cls = $(this).closest("div").attr("id");
    var b = $("#" + cls + "");
    $(".defenderChar").append(b);
    clickNum++;
  }
});

$("#btnattact").on("click", function playing() {
  //Adding random numbers to attact and enemy attact to figures' "data" attribute
  attact = $(".yourChar .figure").attr("data");
  enemyAttact = $(".defenderChar .figure").attr("data");
  // Adding health of figures to #health data attributes
  health1 = $(".yourChar .figure #health").attr("data");
  health2 = $(".defenderChar #health").attr("data");
  // for cheking health count
  console.log("biricinin qalan cani " + health1);
  console.log("ikincini qalan cani " + health2);
  //  attact zone , minus operation add result to the data attr of #health
  health1 = health1 - enemyAttact;
  health2 = health2 - attact;

  checking();
});
// Cheking who is won or lost the game
var checking = function () {
  //Game cantinues
  if (health1 > 0 && health2 > 0) {
    // update data attr of health
    $(".yourChar .figure #health").attr("data", health1);
    $(".defenderChar #health").attr("data", health2);
    // checking consoles
    console.log("figurun datasina elave olunen canlar 1 " + health1);
    console.log("figurun datasina elave olunen canlar 2  " + health2);
    // update health count in the user side
    health1 = $(".yourChar .figure #health").html(health1);
    health2 = $(".defenderChar #health").html(health2);
  } // If user lost the game
  else if (health1 == 0 || health1 < 0) {
    alert("You Lost");
    initializeGame();
  }
  // add enemy to loser if it lost the game , and for get congrat message we must you count , count = number of enemies , i mean max num of child of loser div
  else if (health2 == 0 || health2 < 0) {
    $(".loser").append($(".defenderChar .figure"));
    count++;
    if (count === 3) {
      alert("Congratss , You Won the game!");
      initializeGame();
      return;
    }
    alert("select another enemy");
    $(".button").on("click", function () {
      let cls = $(this).closest("div").attr("id");
      var b = $("#" + cls + "");
      $(".defenderChar").append(b);
    });
  }
};
