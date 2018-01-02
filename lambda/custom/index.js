'use strict';
var Alexa = require("alexa-sdk");
const GameManager = require('./GameManager');

const states = {
	PreGame: '_PREGAME',
	MidGame: '_MidGame',
	EndGame: '_EndGame'
}
exports.handler = function(event, context) {
		var alexa = Alexa.handler(event, context);
		alexa.appId = 'amzn1.ask.skill.4f2782c5-5fc1-448f-af6c-58b3d27fd2b4';
    alexa.registerHandlers(NewSessionHandlers, PreGameHandlers, MidGameHandlers);
    alexa.execute();
};
const NewSessionHandlers = {
	'NewSession' : function(){
		const msg = "Welcome to the unofficial sponge bob character quiz. Say 'Start an easy, medium, or hard game'. I will give you hints unil you guess the correct Spongebob character";
		this.handler.state = states.PreGame;
		this.response.speak(msg).listen(msg);
		this.emit(":responseReady");
	},
	'AMAZON.HelpIntent' : function(){
		const msg = "Say 'Start an easy, medium, or hard game'. I will give you hints unil you guess the correct Spongebob character";
		this.response.speak(msg).listen(msg);
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
const PreGameHandlers = Alexa.CreateStateHandler(states.PreGame, {
	"StartGameIntent" : function(){
		console.log("StartGameIntent");
		const slotData = getSlotValues(this.event.request.intent.slots);
		console.log("slotdata", slotData);

		if(!slotData.difficulty){
			const msg = "Say 'start an easy, medium, or hard game'";
			this.emit(':elicitSlot', 'difficulty', msg, msg);
			return;
		}
		if(!slotData.difficulty.isValidated){
			const msg = "Say 'start an easy, medium, or hard game'";
			this.emit(':elicitSlot', 'difficulty', "Sorry, I misheard you. " + msg, msg);
			return;
		}
		const difficulty = slotData.difficulty;
		console.log("difficulty", difficulty);

		if(difficulty.isValidated){
			try{
				GameManager.NewGame(difficulty.id);
			}
			catch(e){
				const msg = "Say 'start an easy, medium, or hard game'";
				this.emit(':elicitSlot', 'difficulty', msg, msg);
				return;
			}
			this.handler.state = states.MidGame;
			const hintRes = GameManager.Hint(true);
			this.response.speak(hintRes[0]).listen(hintRes[1]);
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
	'Unhandled': function() {
			console.log("pregame UNHANDLED");
			const message = 'Say yes to continue, or no to end the game.';
			this.response.speak(message).listen(message);
			this.emit(':responseReady');
	}
});

const MidGameHandlers = Alexa.CreateStateHandler(states.MidGame,
{
	'StartGameIntent' : function(){
		this.emit("NewSession");
	},
	'GuessIntent' : function(){
		console.log("GuessIntent");
		const slotData = getSlotValues(this.event.request.intent.slots);
		console.log("slotdata", slotData);

		const reguessmsg = "Guess a character, or say 'I give up' to go to the next character";
		if(!slotData.character){
			return this.emit(':elicitSlot', 'character', reguessmsg, reguessmsg);
		}
		if(!slotData.character.isValidated){
			return this.emit(':elicitSlot', 'character', reguessmsg, reguessmsg);
		}

		console.log("Their Character", slotData.character);
		const guessRes = GameManager.Guess(+slotData.character.id);
		if(guessRes[0]){
			const scoremsg = "Congrats, you got " + guessRes[1] + " points for getting in right. ";
			const nextRes = GameManager.NextCharacter();
			if(!nextRes){
				//out of chars
				console.log("No more characters");
				this.response.speak(scoremsg + "That's all of the SpongeBob characters for this game! You scored a " + GameManager.Score())
				.listen("Say 'Start an easy, medium or hard' game to play again");
				this.handler.state = states.PreGame;
				this.emit(":responseReady");
			} else {
				console.log("Next char");
				const hintRes = GameManager.Hint(true);
				this.response.speak(scoremsg + "I've got another character for you. " + hintRes[0])
				.listen(hintRes[1]);
				this.emit(":responseReady");
			}
		} else {
			const hintRes = GameManager.Hint(false);
			this.emit(":elicitSlot", 'character',
			"Sorry, that's not the answer I was looking for. " + hintRes[0], hintRes[1]);
		}
	},
	"AMAZON.HelpIntent" : function(){
		this.response.speak("Say the name of a sponge bob character, or say 'I give up' to go to the next character")
		.listen("Say 'Start over' to start over");
		this.emit(':responseReady');
	},
	"AMAZON.StopIntent" : function(){
		console.log("mid Stop");
		this.response.speak("GoodBye!");
		this.emit(":responseReady");
	},
	'SessionEndedRequest': function () {
			console.log("mid SESSIONENDEDREQUEST");
			//this.attributes['endedSessionCount'] += 1;
			this.response.speak("Goodbye!");
			this.emit(':responseReady');
	},
	'Unhandled': function() {
			console.log("mid UNHANDLED");
			const message = 'I didn\'t understand you. Guess a character or say \'I Give up\'';
			this.response.speak(message).listen(message);
			this.emit(':responseReady');
	}
});

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