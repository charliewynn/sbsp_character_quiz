const Easy = 'Easy';
const Medium = 'Medium';
const Hard = 'Hard';
function Character(id, difficulty){
	//I need to set this id, because it must match up with the
	//interaction model for alexa
	this.id = id;
	this.difficulty = difficulty;
	this.hints = [];
}
let NextHintID = 1;
function Hint(text, difficulty){
	//hint ids can auto-increment because
	// we only access them programatically
	this.id = NextHintID++;
	this.text = text;
	this.difficulty = difficulty;
}

const SpongeBob = new Character(1, Easy);
SpongeBob.hints.push(new Hint("Lives in a pineapple", Easy));
SpongeBob.hints.push(new Hint("His best friend is Patrick", Easy));
SpongeBob.hints.push(new Hint("His initials are S.B.", Medium));
SpongeBob.hints.push(new Hint("His pet's name is Gary.", Medium));

const Patrick = new Character(2, Easy);
Patrick.hints.push(new Hint("Lives in a shell-thing??", Easy));
Patrick.hints.push(new Hint("His best friend is SpongeBob", Easy));
Patrick.hints.push(new Hint("His initials are P.S.", Medium));
Patrick.hints.push(new Hint("He is a starfish", Medium));

const Characters = [
	SpongeBob, Patrick
];

exports.Characters = Characters;