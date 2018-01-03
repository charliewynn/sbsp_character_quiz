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
Patrick.hints.push(new Hint("Lives under a rock", Easy));
Patrick.hints.push(new Hint("His best friend is SpongeBob", Easy));
Patrick.hints.push(new Hint("His initials are P.S.", Medium));
Patrick.hints.push(new Hint("He is a starfish", Medium));

const Squidward = new Character(3, Easy);
Squidward.hints.push(new Hint("He plays the clarinet", Easy));
Squidward.hints.push(new Hint("He has six legs", Easy));
Squidward.hints.push(new Hint("He lives between Spongebob and Patrick", Medium));
Squidward.hints.push(new Hint("He is the cashier for the Crusty Crab", Medium));

const Sandy = new Character(4, Medium);
Sandy.hints.push(new Hint("She wears a flower on her helmet", Easy));
Sandy.hints.push(new Hint("This character is a squirrel", Easy));
Sandy.hints.push(new Hint("She lives in an air pod because she can't breathe underwater", Medium));
Sandy.hints.push(new Hint("She's a scientist who researches monkeys", Medium));

const MrKrabs = new Character(6, Medium);
MrKrabs.hints.push(new Hint("He's the owner of the Crusty Crab", Easy));
MrKrabs.hints.push(new Hint("He is Sponge Bob's boss", Easy));
MrKrabs.hints.push(new Hint("He lives in an anchor with his daughter Pearl", Medium));
MrKrabs.hints.push(new Hint("His girlfriend's name is Mrs. Puff", Medium));

const Plankton = new Character(5, Hard);
Plankton.hints.push(new Hint("He's always trying to steal Mr. Crabs Crabby Patty recipe", Easy));
Plankton.hints.push(new Hint("He owns an amoeba as a pet named Spot", Easy));
Plankton.hints.push(new Hint("He runs the Chum Bucket with his computer Karen", Medium));
Plankton.hints.push(new Hint("His first name is Sheldon, and his middle initial is jay. But he is better known as what?", Medium));

const Characters = [
	SpongeBob, Patrick,
	Sandy, MrKrabs,
	Plankton
];

exports.Characters = Characters;