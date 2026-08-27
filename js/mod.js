let modInfo = {
	name: "The Azure Tree",
	author: "Eudaemonia",
	pointsName: "stone",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal(0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1.1",
	name: "Deep dreams",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.1.1: Deep dreams</h3><br>
		- Sapphire layer<br>
		- Added upgrades to Ruby<br>
		- Buffed Iron Upgrade 4 and Copper Upgrade 4<br>
		- Lowered the price of Gold Upgrade R<br>
		<br>
	<h3>v0.1: New beginnings</h3><br>
		- what do you think is in here???<br>
		`

let winText = `Congratulations on beating The Azure Tree, however it may receive updates so make sure to stay tuned!`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (hasUpgrade('c', 11)) gain = gain.times(2)
	if (hasUpgrade('c', 12)) gain = gain.times(2)
	if (hasUpgrade('c', 14)) gain = gain.times(2)
	if (hasUpgrade('c', 15)) gain = gain.times(2)
	if (hasUpgrade('c', 23)) gain = gain.times(2)
	if (hasUpgrade('c', 24)) gain = gain.times(25)
	if (hasUpgrade('i', 11)) gain = gain.times(10)
	if (hasUpgrade('cu', 11)) gain = gain.times(2)
	if (hasUpgrade('r', 11)) gain = gain.times(upgradeEffect('r', 11))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.s.points.gte(new Decimal(1))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
