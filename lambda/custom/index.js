'use strict';
var Alexa = require("alexa-sdk");
const GameManager = require('./GameManager');
const Utilities = require('./Utilities');
const Difficulties = require('./CharacterData').Difficulty
const arrRandom = Utilities.arrRandom;

const states = {
	PreGame: '_PREGAME',
	MidGame: '_MidGame',
	MightStopGame : '_MightStopGame',
	WillProbablyStopGame : '_WillProbablyStopGame',
	AskShouldPlayAgain : "_AskShouldPlayAgain",
	EndGame: '_EndGame'
}
exports.handler = function(event, context) {
		var alexa = Alexa.handler(event, context);
		alexa.appId = 'amzn1.ask.skill.4f2782c5-5fc1-448f-af6c-58b3d27fd2b4';
    alexa.registerHandlers(NewSessionHandlers, PreGameHandlers, MidGameHandlers, MightStopGameHandlers, WillProbablyStopGameHandlers, GameOverAskToPlayAgainHandlers);
    alexa.execute();
};
const NewSessionHandlers = {
	'NewSession' : function(){
		const msg = "Welcome to the unofficial sponge bob character quiz. Would you like to play an easy, medium, or hard game?";
		this.handler.state = states.PreGame;
		this.response.speak(msg).listen("I'll give you hints about the main characters, then less common secondary characters and finally the more difficult characters. Do you want to play on easy, medium, or hard?");
		this.emit(":responseReady");
	},
	'NextSession' : function(){
		const msg = "Do you want to play an easy, medium, or hard game?";
		this.handler.state = states.PreGame;
		this.response.speak(msg).listen(msg);
		this.emit(":responseReady");
	},
	'AMAZON.HelpIntent' : function(){
		const msg = "This is the unofficial sponge bob character quiz. You decide if you want to play on easy, medium, or hard. I'll start you off with " + 
		"the main sponge bob characters and give you hints. The hints will be easy, medium or hard depending on which difficulty you picked. " +
		"After the main characters I'll quiz you on some of the secondary characters. If you keep playing I'll ask you to guess some of the harder characters. " +
		"You get more points if you play on harder difficulties, so practice until you can guess them all on Hard! Do you want to play on easy, medium or hard.";
		this.response.speak(msg).listen("Do you want to play on easy, medium, or hard?");
		this.emit(":responseReady");
	},
	"AMAZON.StopIntent": function() {
		console.log("new STOPINTENT");
		this.response.speak("Goodbye!");
		this.emit(':responseReady');
	},
	"AMAZON.CancelIntent": function() {
		console.log("new CANCELINTENT");
		this.response.speak("Goodbye!");
		this.emit(':responseReady');
	},
	'SessionEndedRequest': function () {
			console.log("new SESSIONENDEDREQUEST");
			//this.attributes['endedSessionCount'] += 1;
			this.response.speak("Goodbye!");
			this.emit(':responseReady');
	},
	'Unhandled': function() {
			console.log("new UNHANDLED");
			const message = 'I didn\'t understand you. Say start an easy game to play.';
			this.response.speak(message).listen(message);
			this.emit(':responseReady');
	}
}
const RequestStart = function(){
	const msg = "Say 'start an easy, medium, or hard game'";
	return this.emit(':ask', msg, msg);
}
const PreGameHandlers = Alexa.CreateStateHandler(states.PreGame, {
	"StartGameIntent" : function(){
		console.log("StartGameIntent");
		const slotData = getSlotValues(this.event.request.intent.slots);
		console.log("slotdata", slotData);

		if(!slotData.difficulty){
			return RequestStart();
		}
		const difficulty = slotData.difficulty;
		console.log("difficulty", difficulty);

		if(difficulty.isValidated){
			try{
				GameManager.NewGame(difficulty.id);
			}
			catch(e){
				return RequestStart();
			}
			this.handler.state = states.MidGame;
			const hintRes = GameManager.Hint(true);
			this.response.speak("Starting an " + difficulty.id + " game. " + hintRes[0]).listen(hintRes[1]);
			this.emit(":responseReady");
		}
	},
	"AMAZON.StopIntent": function() {
		console.log("pregame STOPINTENT");
		this.response.speak("Goodbye!");
		this.emit(':responseReady');
	},
	"AMAZON.CancelIntent": function() {
		console.log("pregame CANCELINTENT");
		this.response.speak("Goodbye!");
		this.emit(':responseReady');
	},
	'SessionEndedRequest': function () {
			console.log("pregame SESSIONENDEDREQUEST");
			//this.attributes['endedSessionCount'] += 1;
			this.response.speak("Goodbye!");
			this.emit(':responseReady');
	},
	'AMAZON.HelpIntent' : function(){
		const msg = "This is the unofficial sponge bob character quiz. You decide if you want to play on easy, medium, or hard. I'll start you off with " + 
		"the main sponge bob characters and give you hints. The hints will be easy, medium or hard depending on which difficulty you picked. " +
		"After the main characters I'll quiz you on some of the secondary characters. If you keep playing I'll ask you to guess some of the harder characters. " +
		"You get more points if you play on harder difficulties, so practice until you can guess them all on Hard! Do you want to play on easy, medium or hard.";
		this.response.speak(msg).listen("Do you want to play on easy, medium, or hard?");
		this.emit(":responseReady");
	},
	'Unhandled': function() {
			console.log("pregame UNHANDLED");
			const msg = "Say 'start an easy, medium, or hard game'";
			return this.emit(':ask', msg, msg);
	}
});

const MightStopGameHandlers = Alexa.CreateStateHandler(states.MightStopGame,
{
	'AMAZON.YesIntent' : function(){
		this.handler.state = states.PreGame;
		this.emit(":ask", "Starting over, your score that game was, " + GameManager.Score() + " points. Do you want an easy, medium or hard game?",
		"Tell me if you want an easy, medium, or hard game");
	},
	'AMAZON.NoIntent' : function(){
		this.handler.state = states.MidGame;
		this.emit(":ask", "Your last hint was, " + GameManager.LastHint()+ ". Guess a character or ask for another hint.", "You can also say 'I give up' to go to the next character");
	},
	'AMAZON.HelpIntent' : function(){
		this.emit(":ask", "Say yes to start a new game, or no to continue your current game");
	},
	"Unhandled" : function(){
		this.emit(":ask", "Are you sure you want to stop your game?", "Say yes to stop your game, or no to continue");
	}

});
const GameOverAskToPlayAgainHandlers = Alexa.CreateStateHandler(states.AskShouldPlayAgain,
{
	'AMAZON.YesIntent' : function(){
		this.handler.state = states.PreGame;
		this.emit(":ask", "Great, which difficulty do you want to play on?", "Say start an easy, medium, or hard game.");
	},
	'AMAZON.NoIntent' : function(){
		this.emit(":tell", "Thanks for playing");
	},
	"Unhandled" : function(){
		this.emit(":ask", "Say yes to start a new game, or no to quit playing");
	}
});
const WillProbablyStopGameHandlers = Alexa.CreateStateHandler(states.WillProbablyStopGame,
{
	'AMAZON.YesIntent' : function(){
		this.emit(":tell", "Thanks for playing, your final score was " + GameManager.Score() + " points. Goodbye!");
	},
	'AMAZON.NoIntent' : function(){
		this.handler.state = states.MidGame;
		this.emit(":ask", "Your last hint was, " + GameManager.LastHint()+ ". Guess a character or ask for another hint.", "You can also say 'I give up' to go to the next character");
	},
	'AMAZON.HelpIntent' : function(){
		this.emit(":ask", "Say yes to stop playing, or no to continue your current game");
	},
	"Unhandeled" : function(){
		this.emit(":ask", "Are you sure you want to stop your game?", "Say yes to stop playing, or no to continue");
	}
}
);
const MidGameHandlers = Alexa.CreateStateHandler(states.MidGame,
{
	"AMAZON.StopIntent" : function(){
		this.handler.state = states.WillProbablyStopGame;
		this.emit(":ask", "Are you sure you want to stop your game?", "Say yes to stop your game, or no to continue");
	},
	'StopGameIntent' : function(){
		this.handler.state = states.MightStopGame;
		this.emit(":ask", "Are you sure you want to stop your game?", "Say yes to stop your game, or no to continue");
	},
	'GuessIntent' : function(){
		console.log("GuessIntent");
		const slotData = getSlotValues(this.event.request.intent.slots);
		console.log("slotdata", slotData);

		const reguessmsg = "Guess a character, or say 'I give up' to go to the next character";
		const UnknownCharacter = "Sorry, I don't know that character. Say 'I need a hint' or say 'I give up' to go to the next character";
		if(!slotData.character){
			return this.emit(':ask', reguessmsg, reguessmsg);
		}
		if(!slotData.character.isValidated){
			return this.emit(':ask', UnknownCharacter, reguessmsg);
		}

		console.log("Their Character", slotData.character);
		const guessRes = GameManager.Guess(+slotData.character.id);
		if(guessRes[0]){
			const numHints = (guessRes[2] == 1 ? "just one hint. " : (guessRes[2] + " hints. "));
			const gratsMsg = arrRandom([
				"Congrats",
				"Nice job",
				"Way to go"
			])
			const scoremsg = gratsMsg + ", you got " + guessRes[1] + " points for getting it right with " + numHints;

			doNextCharacter.bind(this)(scoremsg);
		} else {
			console.log("they got it wrong");
			const hintRes = GameManager.Hint(false);
			return this.emit(":ask",
			"Sorry, it's not " + slotData.character.resolved + ". " + hintRes[0], hintRes[1]);
		}
	},
	"HintIntent" : function(){
		const hintResp = GameManager.Hint(false);
		this.response.speak(hintResp[0]).listen(hintResp[1]);
		this.emit(":responseReady");
	},
	"GiveUpIntent" : function(){
		console.log("They gave up");
		const whoWasIt = GameManager.CurrentName();
		const intro = arrRandom([
			"No problem, ",
			"Carrying on, ",
			"It's okay, "
		]) + arrRandom([
			"the character was " + whoWasIt + ". ",
			whoWasIt + " was the answer. "
		]);
		doNextCharacter.bind(this)(intro);
	},
	"AMAZON.HelpIntent" : function(){
		this.response.speak("Say the name of a sponge bob character, or say 'I need a hint' to get another hint. ")
		.listen("You can also say 'I give up' to go to the next character. Or say 'Start over' to start over");
		this.emit(':responseReady');
	},
	'SessionEndedRequest': function () {
			console.log("mid SESSIONENDEDREQUEST");
			//this.attributes['endedSessionCount'] += 1;
			this.response.speak("Goodbye!");
			this.emit(':responseReady');
	},
	'Unhandled': function() {
			console.log("mid UNHANDLED");
			const message = 'I didn\'t understand you. Guess a character or say I need a hint to get another hint';
			this.response.speak(message).listen("You can also say 'I give up' to go to the next character.");
			this.emit(':responseReady');
	}
});

function doNextCharacter(intro){
	const nextRes = GameManager.NextCharacter();
	if(!nextRes){
		//out of chars
		console.log("No more characters");
		this.response.speak(intro + " That's all of the SpongeBob characters for this game! Your final score is " + GameManager.Score() + " points. Would you like to play again?")
		.listen("Would you like to play again?");
		//.listen("Say 'Start an easy, medium or hard' game to play again");
		this.handler.state = states.AskShouldPlayAgain
		this.emit(":responseReady");
	} else {
		let nextCharIntro = "";
		console.log("NextRes", nextRes);
		if(nextRes.LeftOnLevel == 0){
			if(nextRes.Character.difficulty == Difficulties.Hard){
				nextCharIntro = "This is the last character! ";
			} else {
				nextCharIntro = "This is the last " + nextRes.Character.difficulty + " character. ";
			}
		} else {
			nextCharIntro = arrRandom([
				" Here's your next character. ",
				" I've got your next character. ",
				" Here's the next one. "
			])
		}

		console.log("Next char");
		const hintRes = GameManager.Hint(true);
		this.response.speak( intro + nextCharIntro + hintRes[0])
		.listen(hintRes[1]);
		this.emit(":responseReady");
	}
}

function getSlotValues(filledSlots) {
	//given event.request.intent.slots, a slots values object so you have
	//what synonym the person said - .synonym
	//what that resolved to - .resolved
	//and if it's a word that is in your slot values - .isValidated
	let slotValues = {};

	console.log('The filled slots: ' + JSON.stringify(filledSlots));
	Object.keys(filledSlots).forEach(function (item) {
		//console.log("item in filledSlots: "+JSON.stringify(filledSlots[item]));
		var name = filledSlots[item].name;
		//console.log("name: "+name);
		if (filledSlots[item] &&
			filledSlots[item].resolutions &&
			filledSlots[item].resolutions.resolutionsPerAuthority[0] &&
			filledSlots[item].resolutions.resolutionsPerAuthority[0].status &&
			filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {

			switch (filledSlots[item].resolutions.resolutionsPerAuthority[0].status.code) {
				case "ER_SUCCESS_MATCH":
					slotValues[name] = {
						"synonym": filledSlots[item].value,
						"resolved": filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.name,
						"id": filledSlots[item].resolutions.resolutionsPerAuthority[0].values[0].value.id,
						"isValidated": true
					};
					break;
				case "ER_SUCCESS_NO_MATCH":
					slotValues[name] = {
						"synonym": filledSlots[item].value,
						"resolved": filledSlots[item].value,
						"isValidated": false
					};
					break;
			}
		} else {
			slotValues[name] = {
				"synonym": filledSlots[item].value,
				"resolved": filledSlots[item].value,
				"isValidated": false
			};
		}
	}, this);
	//console.log("slot values: "+JSON.stringify(slotValues));
	if(slotValues.test){
		console.log("Intercepting test slots");
		Object.keys(slotValues).forEach(sv=>{
			slotValues[sv].isValidated = true;
			slotValues[sv].id = slotValues[sv].resolved;
			return sv;
		});
	}
	return slotValues;
}