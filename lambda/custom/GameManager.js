//you play a certain difficulty, easy, medium hard.
//you are given an easy character, then hints of the selected difficulty
//then another easy char until you run out.
//then a medium character, still with same hint difficulty
//until you do everyone and are scored

const Utilities = require('./Utilities');
const CharacterData = require('./CharacterData');
const Characters = CharacterData.Characters;

const arrRandom = Utilities.arrRandom;
let lastHint = "";

let CurrentDifficulty = 'Easy';
let UsedChars = [];

let HintsUsed = [];
let Score = 0;
let CurrentCharacter = undefined;

exports.Score = function(){
	return Score;
}

exports.LastHint = function(){
	return lastHint;
}

function ById(id){
	const hits = Characters.filter(c=>c.id === id);
	if(hits.length === 0){
		throw "No characters found for id: " + id;
	}
	if(hits.length > 1){
		throw "Multiple characters found for id: " + id;
	}
	return hits[0];
}

exports.CurrentName = function(){
	return ById(CurrentCharacter).name;
}

exports.Hint = function(isFirst){
	const CharHints = ById(CurrentCharacter).hints;
	console.log("char hints", CharHints.map(h=>h.id));
	const CurrDiffHints = CharHints.filter(h=>h.difficulty === CurrentDifficulty);
	console.log("diffHints", CurrDiffHints.map(h=>h.id));
	const Unused = CurrDiffHints.filter(h=>HintsUsed.indexOf(h.id) === -1);
	console.log("unused", Unused.map(h=>h.id));
	const nextHint = arrRandom(Unused);
	console.log("Hint", HintsUsed, nextHint);
	if(!nextHint){
		return ["You're all out of hints, keep guessing or say I give up to move onto the next Character", "No more hints, guess or say I give up"];
	}
	lastHint = nextHint.text;
	HintsUsed.push(nextHint.id);
	if(isFirst){
		return ["Your first hint is: " + nextHint.text, "Guess a character or say 'I give up' to go to the next character"];
	}
	return ["Your next hint is: " + nextHint.text, "Guess a character or say 'I give up' to go to the next character"];
}

exports.Guess = function(id){
	console.log("Guessing id", id, CurrentCharacter);
	const hintsUsed = HintsUsed.length;
	if(CurrentCharacter === id){
		let scoreAddition = 0;
		switch(CurrentDifficulty){
			case 'Easy':
				scoreAddition = Math.floor(100/(hintsUsed || 1));
			break;
			case 'Medium':
				scoreAddition = Math.floor(150/(hintsUsed || 1));
			break;
			case 'Hard':
				scoreAddition = Math.floor(250/(hintsUsed || 1));
			break;
		}
		HintsUsed = [];
		Score += scoreAddition;
		return [true, scoreAddition, hintsUsed];
	}
	return [false];
}

exports.NewGame = function(difficulty){
	if(['Easy','Medium','Hard'].indexOf(difficulty) === -1) throw "Bad hint difficulty";
	CurrentDifficulty = difficulty;
	UsedChars = [];
	HintsUsed = [];
	Score = 0;
	NextCharacter();
}

function NextCharacter(){
	console.log("Getting Next Character", UsedChars);
	let nextChar = arrRandom(Characters.filter(c=>c.difficulty === 'Easy' && UsedChars.indexOf(c.id) === -1));
	if(!nextChar)
		nextChar = arrRandom(Characters.filter(c=>c.difficulty === 'Medium' && UsedChars.indexOf(c.id) === -1));
	if(!nextChar)
		nextChar = arrRandom(Characters.filter(c=>c.difficulty === 'Hard' && UsedChars.indexOf(c.id) === -1));
	if(!nextChar){
		//game is over, they did everyone
		console.log("No Next Character");
		return false;
	}
	HintsUsed = [];
	CurrentCharacter = nextChar.id;
	UsedChars.push(CurrentCharacter);
	console.log("CharsLeft", UsedChars, Characters.filter(c=>c.difficulty === nextChar.difficulty && UsedChars.indexOf(c.id) === -1));
	return {
		Character : nextChar,
		LeftOnLevel : Characters.filter(c=>c.difficulty === nextChar.difficulty && UsedChars.indexOf(c.id) === -1).length
	};
}

exports.NextCharacter = NextCharacter;

exports.load = function(data){
	UsedChars = data.UsedChars;
	Score = data.Score;
	CurrentCharacter = data.CurrentCharacter;
	CurrentDifficulty = data.CurrentDifficulty;
	HintsUsed = data.HintsUsed;
}

exports.export = function(){
	return {
		UsedChars : UsedChars,
		Score : Score,	
		CurrentCharacter : CurrentCharacter,
		CurrentDifficulty : CurrentDifficulty,
		HintsUsed : HintsUsed
	};
}