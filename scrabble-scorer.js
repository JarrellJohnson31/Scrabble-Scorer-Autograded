// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt()

{
   console.log("Let's play some scrabble!" );
   wordSelection = input.question("Enter a word: ")
   console.log(oldScrabbleScorer(wordSelection))

};

let newPointStructure = transform(oldPointStructure);

function simpleScorer(word){
   let score = 0;
   for(let i = 0; i < word.length; i++) {
      score += 1;
      }
return score;
}

function vowelBonusScorer(word){
   let score = 0;
   let vowel = ['A', 'E', 'I', 'O', 'U']
   word = word.toUpperCase();

   for(let i = 0; i < word.length; i++){
      if( vowel.includes(word[i])){
         score += 3;
      
      }
      else
      {
         score += 1;
      }
      
   }
 return score;
};

function scrabbleScorer(word){
   let score = 0;
   word = word.toLowerCase();
   for( let i = 0; i < word.length; i++){
      score += newPointStructure[word[i]]
   }
   return score;
};

const scoringAlgorithms = [
   {
      name: "Simple Score",
      description: "Each letter is worth 1 pt.",
      scorerFunction: simpleScorer

   },
   {
      name: "Bonus Vowels",
      description: "Vowels are 3 pts, consonants are 1 pt.",
      scorerFunction: vowelBonusScorer
   },
   {
      name: "Scrabble",
      description: "The traditional scoring algorithm",
      scorerFunction: scrabbleScorer
   }


];

function scorerPrompt() {
   console.log("Let's play some scrabble!" );
   wordSelection = input.question("Enter a word: ")
   let score = 0;
   console.log("Which scoring method would you like to use? ")
   for( let i = 0; i < scoringAlgorithms.length; i++){
      console.log(scoringAlgorithms[i].name + ": " + scoringAlgorithms[i].description)
   }
   newAnswer = input.question("Enter 0, 1, or 2: ")

   if( newAnswer == "0"){
      score = scoringAlgorithms[0].scorerFunction(wordSelection)
   }
    else if( newAnswer == "1"){
      score = scoringAlgorithms[1].scorerFunction(wordSelection)
    }
    else
    {
    score = scoringAlgorithms[2].scorerFunction(wordSelection)

    }
    console.log(`Score for '${wordSelection}' : ${score} `)
}

function transform(oldPointStructure)
 {
   let newStructure = {}
   for( value in oldPointStructure){
      let letters = oldPointStructure[value]

      for( let i = 0; i < letters.length; i++){
         newStructure[letters[i].toLowerCase()] = Number(value)
      }
   }
   return newStructure;
 };

function runProgram() {
   scorerPrompt();
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
	scorerPrompt: scorerPrompt
};
