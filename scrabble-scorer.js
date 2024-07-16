// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system.

const input = require("readline-sync");

const oldPointStructure = {
	1: ["A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
	2: ["D", "G"],
	3: ["B", "C", "M", "P"],
	4: ["F", "H", "V", "W", "Y"],
	5: ["K"],
	8: ["J", "X"],
	10: ["Q", "Z"],
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";

	for (let i = 0; i < word.length; i++) {
		for (const pointValue in oldPointStructure) {
			if (oldPointStructure[pointValue].includes(word[i])) {
				letterPoints += `Points for '${word[i]}': ${pointValue}\n`;
			}
		}
	}
	return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
	initWord = input.question("Let's play some scrabble! Enter a word: ");
	console.log(oldScrabbleScorer(initWord));
	return initWord;
}

let newPointStructure = transform(oldPointStructure);

let simpleScorer = (simpWord) => {
	//return simpWord.length;
	//console.log(simpWord.length)
	return simpWord.length;
};

let vowelBonusScorer = (term) => {
	let score = 0;
	let vowWord = term.split("");
	for (i = 0; i < vowWord.length; i++) {
		if (vowWord[i] == "a" || vowWord[i] == "e" || vowWord[i] == "i" || vowWord[i] == "o" || vowWord[i] == "u") {
			score += 3;
		} else score += 1;
	}
	return score;
};

let scrabbleScorer = (scrabWord) => {
	newPointStructure = transform(oldPointStructure);
	scrabWord = scrabWord.toLowerCase();
	let letterPoints = 0;
	for (let i = 0; i < scrabWord.length; i++) {
		letterPoints += newPointStructure[scrabWord[i]];
	}
	return letterPoints;
};

const scoringAlgorithms = [
	{ name: "Simple Score", description: "Each letter is worth 1 point.", scorerFunction: simpleScorer },
	{ name: "Bonus Vowels", description: "Vowels are 3 pts, consonants are 1 pt.", scorerFunction: vowelBonusScorer },
	{ name: "Scrabble", description: "The traditional scoring algorithm.", scorerFunction: scrabbleScorer },
];

function scorerPrompt(initWord) {
	let val = input.question("Please Input: \n0 - Simple Scorer \n1 - Bonus Vowel Scorer \n2 - Scrabble Scorer \nEnter 0,1 or 2: ");

	console.log(`Algorithm name: ${scoringAlgorithms[val].name} \nScore for '${initWord}': ${scoringAlgorithms[val].scorerFunction(initWord)}`);
}

function transform(points) {
	let val = {};
	for (key in points) {
		for (let i = 0; i < points[key].length; i++) {
			val[points[key][i].toLowerCase()] = Number(key);
		}
	}
	return val;
}

function runProgram() {
	initialPrompt();
	scorerPrompt(initWord);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
	initialPrompt: initialPrompt,
	transform: transform,
	oldPointStructure: oldPointStructure,
	simpleScorer: simpleScorer,
	vowelBonusScorer: vowelBonusScorer,
	scrabbleScorer: scrabbleScorer,
	scoringAlgorithms: scoringAlgorithms,
	newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt,
};
