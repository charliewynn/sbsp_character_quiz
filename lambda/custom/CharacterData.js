const Easy = 'Main';
const Medium = 'Secondary';
const Hard = 'Uncommon';
const HintDifficulty = {
	Easy : "Easy",
	Medium : "Medium",
	Hard : "Hard"
}

exports.HintDifficulty = HintDifficulty;
exports.Difficulty = {
	Easy : Easy,
	Medium : Medium,
	Hard : Hard
}
function Character(id, difficulty, name){
	//I need to set this id, because it must match up with the
	//interaction model for alexa
	this.id = id;
	this.name = name;
	this.difficulty = difficulty;
	this.hints = [];
	this.easy = function(hint){
		this.hints.push(new Hint(hint, HintDifficulty.Easy));
		return this;
	}
	this.medium = function(hint){
		this.hints.push(new Hint(hint, HintDifficulty.Medium));
		return this;
	}
	this.hard = function(hint){
		this.hints.push(new Hint(hint, HintDifficulty.Hard));
		return this;
	}
}
let NextHintID = 1;
function Hint(text, difficulty){
	//hint ids can auto-increment because
	// we only access them programatically
	this.id = NextHintID++;
	this.text = text;
	this.difficulty = difficulty;
}

const SpongeBob = new Character(1, Easy, "sponge bob")
.easy("Lives in a pineapple. ")
.easy("His best friend is Patrick. ")
.medium("His initials are S.B. ")
.medium("His pet's name is Gary. ");

const Patrick = new Character(2, Easy, "patrick")
.easy("Lives under a rock. ")
.easy("His best friend is SpongeBob. ")
.medium("His initials are P.S. ")
.medium("He is a starfish. ");

const Squidward = new Character(3, Easy, "squidward")
.easy("He plays the clarinet. ")
.easy("He has six legs. ")
.medium("He lives between Spongebob and Patrick. ")
.medium("He is the cashier for the Crusty Crab. ");

const Sandy = new Character(4, Easy, "sandy")
.easy("She wears a flower on her helmet. ")
.easy("This character is a squirrel. ")
.medium("She lives in an air pod because she can't breathe underwater. ")
.medium("She's a scientist who researches monkeys. ");

const MrKrabs = new Character(6, Easy, "Mr. crabs")
.easy("He's the owner of the Crusty Crab. ")
.easy("He is Sponge Bob's boss. ")
.medium("He lives in an anchor with his daughter Pearl. ")
.medium("His girlfriend's name is Mrs. Puff. ");

const Plankton = new Character(5, Easy, "plankton")
.easy("He's always trying to steal Mr. Crabs Crabby Patty recipe. ")
.easy("He owns an amoeba as a pet, it's name is spot. ")
.medium("He runs the Chum Bucket with his computer Karen. ")
.medium("His first name is Sheldon, and his middle initial is jay. But he is better known as what? ");

const MrsPuff = new Character(7, Medium, "Mrs. Puff")
.easy("She's Sponge bob's teacher at the boating school")

const PearlKrabs = new Character(8, Medium, "Pearl Crabs")
.easy("someeasyhint")

const MermaidMan = new Character(9, Medium, "Mermaid Man")
.easy("mermaidthing")

const Gary = new Character(10, Medium, "Gary")
.easy("snth")

const LarryTheLobster = new Character(11, Hard, "Larry the Lobster")
.easy("lobsterlobster")

const KingNeptune = new Character(12, Hard, "King Neptune")
.easy("kingking")

const Karen = new Character(13, Hard, "Karen Plankton")
.easy("karenplankton")

const PottyTheParrot = new Character(14, Hard, "Potty the Parrot")
.easy("parrotparrot")
/*
	spongebob
	patrick
	squidward
	sandy
	mr. krabs
	plankton

	Mrs. Puff
	Pearl Krabs
	Mermaid Man
	Gary

	Larry the Lobster
	King Neptune
	Karen
	Potty the parrot
*/


//start hard

const Characters = [
	SpongeBob, Patrick, Squidward, Sandy, MrKrabs, Plankton,
	MrsPuff, PearlKrabs, MermaidMan, Gary,
	LarryTheLobster, KingNeptune, Karen, PottyTheParrot
];

exports.Characters = Characters;