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
.easy("Lives in a pineapple under the sea. ")
.easy("He is best friends with his neighbor Patrick Star. ")
.easy("He owns a pet snail named Gary. ")
.easy("He is the main character, the show and this alexa game are named after him. ")
.medium("He attends Mrs. Puff's Boating School where he has failed the exam over one million times. ")
.medium("He has won 374 consecutive Employee of the Month awards at the Krusty Krab. ")
.medium("His first words were 'May I take your Order?'. ")
.hard("He was born July fourteenth 1986. ")
.hard("In the Episode 'Are You Happy Now?' he is incorrectly credited with creating the Krabby Patty. ")
.hard("This character lives at 124 Conch Street, Bikini Bottom. ");

const Patrick = new Character(2, Easy, "patrick")
.easy("He is a pink starfish who lives under a rock. ")
.easy("His best friend is SpongeBob. ")
.easy("He lives next door to squidward, two doors down from spongebob. ")
.medium("He was the lead drummer in the Bikini Bottom Super Band. ")
.medium("He wears a green swimsuit with purple flowers. ")
.medium("He has an older sister named Sam Star. ")
.medium("He lives two doors down from Spongebob at 120 Conch Street. ")
.hard("He knows C.P.R. and uses it to save Squidward after he nearly chokes on a fork. ")
.hard("He has been known to eat one thousand crabby patties in five minutes. ")
.hard("His parents names are Margie and Herb. ")

const Squidward = new Character(3, Easy, "squidward")
.easy("He plays the clarinet. ")
.easy("He is a turquoise colored octopus. ")
.easy("Although he is an octopus, he only has six legs. ")
.easy("He's actually an octopus, even though his first name makes it seem like he is something else. ")
.medium("He has at least 492 self portraits. ")
.medium("H(e lives in a house resembling an Easter Island giant head. ")
.medium("He lives between Spongebob and Patrick. ")
.medium("He is the cashier for the Crusty Crab. ")
.hard("He has a tottoo of a red rose on his right arm. ")
.hard("In october 2007, Nickelodeon characters were shown dressed in halloween costumes. This character was dressed as the Phantom of the Opera. ")

const Sandy = new Character(4, Easy, "sandy")
.easy("She wears a flower on her helmet. ")
.easy("This character is a squirrel. ")
.easy("She had a twin brother named Randy Cheeks. ")
.easy("She is the only female main character. ")
.easy("She comes from Texas and speaks with a southern accent. ")
.medium("She and sponge bob share a favorite hobby of karate. ")
.medium("She lives in an air pod because she can't breathe underwater. ")
.medium("She was born in Houston Texas. ")
.medium("This is the only main character without a species in their name. ")
.hard("This character has a medieval ancestor named Dark Knight. ")
.hard("This character is employeed by a trio of monkeys. ")
.hard("This character dressed as a pet goldfish for halloween in the episode Scaredy Pants. ");

const MrKrabs = new Character(5, Easy, "Mr. crabs")
.easy("He's the owner of the Crusty Crab. ")
.easy("He is Sponge Bob's boss. ")
.easy("Although he owns a restaurant, he is not very good at cooking. ")
.easy("His nemisis is Plankton, who is always trying to steal his crabby patty recipe. ")
.medium("He lives in an anchor with his daughter Pearl. ")
.medium("His first name is Eugene. ")
.medium("He was born the same day as Plankton. ")
.medium("His girlfriend's name is Mrs. Puff. ")
.hard("His parents names are Victor and Betsy. ")
.hard("Although this character can breath air, they are seen wearing a water helmet in Sandy's treedome. ")
.hard("This character was born November 30th 1942 and has a sister. ");

const Plankton = new Character(6, Easy, "plankton")
.easy("He's always trying to steal Mr. Crabs Crabby Patty recipe. ")
.easy("He owns a restaurant called the Chum Bucket with his computer Karen. ")
.easy("He used to be best friends with Mr. crabs, but they had a falling out over the secret recipe to crabby patties. ")
.medium("He owns an amoeba as a pet, it's name is spot. ")
.medium("He runs the Chum Bucket. ")
.medium("His first name is Sheldon, and his middle initial is jay. But he is better known as what? ")
.medium("His phone number is one eight hundred three two eight, two four eight six. Or one eight hundred, eat, chum. ")
.hard("This character shares a birthday with Mr. crabs. ")
.hard("This is the only main character without a twitter account. ")
.hard("This character was born November 30th 1942 and has no known siblings. ");

//---

const MrsPuff = new Character(7, Medium, "Mrs. Puff")
.easy("She's Sponge bob's teacher at the boating school")
.easy("She is a tan colored puffer fish. ")
.easy("She used to be married to Mr. Puff, who is now deceased. ")
.medium("She is known to be in a relationship with Mr. crabs at times. ")
.medium("She owns a snail which she has had since she was a little girl. ")
.hard("This character is ambidextrous, writing with their right hand in the episode 'Boating School', and with their left in 'Sandy's rocket'. ")
.hard("This character has the largest criminal record of all of the spongebob characters. ")
.hard("This character had their bus stolen by Mr. Crabs in 'Hello Bikini Bottom'")

const MermaidMan = new Character(8, Medium, "Mermaid Man")
.easy("He is a semi-retired superhero, who wears a star shaped mask so he can breath under water. ")
.easy("This superhero has a sidekick named Barnacle boy. ")
.easy("his secret headquarters is called the Mermalair. ")
.medium("He is a human, who wears a mask so he can breath underwater. ")
.medium("This character wears pink slippers. ")
.hard("His real name is earnie. ")
.hard("He was voiced by Ernest Borgnine. ")

const Gary = new Character(10, Medium, "Gary")
.easy("He is Sponge bob's pet snail. ")
.easy("He meows like a cat. ")
.easy("Sponge bob sometimes calls him Gare Bear. ")
.medium("He can store stuff under his shell, such as a record player and a diamond. ")
.medium("His full name is Gerald Wilson Jr. ")
.hard("This is the only main character who has never been arrested")
.hard("It is revealed in the movie Sponge Out of water that this character hates mayo. ")

const FlyingDutchman = new Character(11, Medium, "Flying Dutchman")
.easy("He is a green ghost that flies around. ")
.easy("He is named after a legendary ghost ship. ")
.medium("He has a sister named Sally Dutchman. ")
.medium("He is in charge of Davy Jones' locker. ")
.hard("He has to have his dining sock on to eat. ")
.hard("It is said it takes one thousand years for his beard to grow. ")

//---

const PearlKrabs = new Character(12, Hard, "Pearl Crabs")
.easy("She is a whale. ")
.easy("She is Mr. Crabs daughter. ")
.medium("She is the only other major character who is a mammal besides Sandy. ")
.medium("She once went to the prom with Sponge bob. ")
.hard("She lives at 3451 Anchor way. ")
.hard("In a crusty crab commercial she is called Amy instead of her real name. ")

const Karen = new Character(13, Hard, "Karen")
.easy("She is the main computer system in Plankton's laboratory. ")
.easy("She is Plankton's main sidekick and helps him come up with his plots to steal crabby patties. ")
.medium("She is a Mark two Uni vac with 256 gigabytes of ram")
.medium("She can change her color depending on her mood, blue when sad, red when angry. ")
.hard("This character was named after the wife of the show's creator. ")
.hard("She once had Mr. Crabs steal two kiddie meal toys. ");

const PatchyThePirate = new Character(14, Hard, "Patchy The Pirate")
.easy("He is one of the only major live action character in the show. ")
.easy("Like all good pirates, he has a parrot whos name is potty the parrot. ")
.medium("He is the president of the spongebob squarepants fan club. ")
.medium("Like any good pirate, he has a hook for a hand. ")
.hard("The actor who plays this character is also the voice actor for spongebob. ")
.hard("He is the only character in the franchise to have a guest appearance in another series. ")

/*
	spongebob
	patrick
	squidward
	sandy
	mr. krabs
	plankton

	Mrs. Puff
	Mermaid Man
	Gary
	Flying Dutchman

	Pearl Krabs
	Karen
	Patchy the pirate
*/


//start hard

const Characters = [
	SpongeBob, Patrick, Squidward, Sandy, MrKrabs, Plankton,
	MrsPuff, MermaidMan, Gary, FlyingDutchman,
	PearlKrabs, Karen, PatchyThePirate
];

exports.Characters = Characters;