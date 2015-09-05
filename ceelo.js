function roll() {
	var die1 = Math.floor(Math.random() * 6) + 1;
	var die2 = Math.floor(Math.random() * 6) + 1;
	var die3 = Math.floor(Math.random() * 6) + 1;
	var rolls = [];
	
	rolls.push(die1);
	rolls.push(die2);
	rolls.push(die3);
	rolls.sort();
	
	return rolls;
}

function findDuplicates(array) {
  var len=array.length, out=[], counts={};

  for (var i=0;i<len;i++) {
    var item = array[i];
    counts[item] = counts[item] >= 1 ? counts[item] + 1 : 1;
  }

  for (var item in counts) {
    if(counts[item] > 1)
      out.push(item);
  }
  return out;
}

function checkRoll(array) {
	var result = {};

	if (array[0] === array[1] && array [0] === array[2]) {
		result.level = "trips";
		result.score = array[0];
	} else if (findDuplicates(array).length > 0) {
		var dupes = findDuplicates(array)[0];
		for (var i = 0; i < 3; i++) {
			if (array[i] != dupes) {
				var point = array[i];
				result.level = "point";
				result.score = point;
			}
		}
	} else if (array === [ 1, 2, 3 ]) {
		result.level = "lose";
		result.score = "1-2-3";
	} else if (array === [ 4, 5, 6 ]) {
		result.level = "win";
		result.score = "4-5-6";
	} else {
		return checkRoll(roll());
	}
	return result; 
}

function filterBadRolls(roll) {
	console.log("roll: ", roll);
}

function setUpGame(numberOfPlayers) {
	var players = numberOfPlayers || 2;
	var allPlayers = [];

	for ( var i = 1; i < players; i++) {
		var player = {};
		player.playerName = "player" + i;
		allPlayers.push(player);
	}

	return allPlayers;
}

function assignRoll(player, result) {
	player.roll = result.level;
	player.score = result.score;
	console.log("player ", player);
	// console.log("result: ", result);
}

function compareRolls(userArray) {
	console.log("userArray: ", userArray);
}

function play(commandLineInput) {
	// set up the game by establishing how many players from CL input
	var numberOfPlayers = parseFloat(commandLineInput) + 1;
	var allPlayers = setUpGame(numberOfPlayers);
	console.log("allPlayers: ",allPlayers);
	console.log("allPlayers.length: ",allPlayers.length);

	for (var i = 0, noOfPlayers = allPlayers.length; i < noOfPlayers; i++) {
		var player = allPlayers[i]
		var result = checkRoll(roll());

		// console.log("player: ", player.playerName);
		assignRoll(player, result);
	}
}

// PLAY with a command line input for how many players to simulate
play(process.argv[2]); 