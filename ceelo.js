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
  var len=array.length,
      out=[],
      counts={};

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

	// console.log(array);
	if (array[0] === array[1] && array [0] === array[2]) {
		// console.log("You got trips!");
		result.level = "trips";
		result.score = array[0];
		// console.log("result: ", result);
	} else if (findDuplicates(array).length > 0) {
		// console.log("You got two of a kind!");
		var dupes = findDuplicates(array)[0];
		// console.log("dupes: ", dupes)
		for (var i = 0; i < 3; i++) {
			if (array[i] != dupes) {
				var point = array[i];
				// console.log("point: ", point);
				result.level = "point";
				result.score = point;
				// console.log("result: ", result);
			}
		}
	} else if (array === [ 1, 2, 3 ]) {
		// console.log("You got 1-2-3, you lose!");
		result.level = "lose";
		result.score = "1-2-3";
		// console.log("result: ", result);
	} else if (array === [ 4, 5, 6 ]) {
		// console.log("You got 4-5-6, you win!!");
		result.level = "win";
		result.score = "4-5-6";
		// console.log("result: ", result);
	} else {
		// console.log("REROLLING!");
		checkRoll(roll());
	}

	return result; 
}

function setUpGame(numberOfPlayers) {
	var players = numberOfPlayers || 2;
	var allPlayers = [];

	for ( var i = 1; i < players; i++) {
		var player = {};
		player.playerName = "player" + i;
		console.log("player: ", player.playerName);
		console.log(player.typeof)
		allPlayers.push(player);
	}
	// console.log('allPlayers: ', allPlayers);
	return allPlayers;
}

function assignRoll(player, result) {
	// player.roll = result.level;
	// player.score = result.score;
	// console.log("player[playerName]: ", player[playerName]);
	// console.log("result: ", result);
}

// function compareRolls(userArray) {
// 	console.log("userArray: ", userArray);
// }

function play(commandLineInput) {
	// set up the game by establishing how many players from CL input
	var numberOfPlayers = parseFloat(commandLineInput) + 1;
	var allPlayers = setUpGame(numberOfPlayers);
	console.log("allPlayers: ",allPlayers);
	console.log("allPlayers.length: ",allPlayers.length);
	// iterate through all players and roll
	for (var player in allPlayers) {
		if (allPlayers.hasOwnProperty(player)) {
			console.log("PLAYER: ", Object.keys(player));
			var result = checkRoll(roll());
			// assignRoll(player, result);
		}
	}
}

// PLAY with a command line input for how many players to simulate
play(process.argv[2]); 