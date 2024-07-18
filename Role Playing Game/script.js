// let variables (they could change).
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0; // First weapon of the player weapons[0];
let fighting;
let monsterHealth;
let inventory = ["stick"]; // This array contains a string.

// const variables (they will not change).
const button1 = document.querySelector("#button1"); // select the button from the html archive
const button2 = document.querySelector("#button2"); // select the button from the html archive
const button3 = document.querySelector("#button3"); // select the button from the html archive
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

// Array of weapons. This array contains objects.
const weapons = [
    { name: 'stick', power: 5 },
    { name: 'dagger', power: 30 },
    { name: 'claw hammer', power: 50 },
    { name: 'sword', power: 100 }
];

// Array of monsters. This array contains objects.
const monsters = [
    {name: 'slime', level: 2, health: 15 },
    {name: 'fanged beast', level: 8, health: 60 },
    {name: 'dragon', level: 20, health: 300 },
];

//  Array of Locations. This array contains objects.
const locations = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in the town square. You see a sign that says \"Store\"."
    },
    {
        name: "store",
        "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You enter the store."
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You enter the cave. You see some monsters."
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a monster."
    },
    {
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, easterEgg],
        text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
    },
    {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You die. &#x2620;"
    },
    {
        name: "win",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;"
    },
    {
        name: "easter egg", 
        "button text": ["2", "8", "Go to town square?"], 
        "button functions": [pickTwo, pickEight, goTown], 
        text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!" 
    }
];

// Initialize buttons.
button1.onclick = goStore; // function of the button 1
button2.onclick = goCave; // function of the button 2
button3.onclick = fightDragon; // function of the button 3

// update function
function update(location) {
    monsterStats.style.display = "none"; // After a monster is defeated, the monster's stat box should no longer display.
    button1.innerText = location["button text"][0]; // update the text at button 1 with the location array
    button2.innerText = location["button text"][1]; // update the text at button 2 with the location array
    button3.innerText = location["button text"][2]; // update the text at button 3 with the location array
    button1.onclick = location["button functions"][0]; // update the function at button 1 with the location array
    button2.onclick = location["button functions"][1]; // update the function at button 2 with the location array
    button3.onclick = location["button functions"][2]; // update the function at button 3 with the location array
    text.innerHTML = location.text; // update the text to display with the array loctaion
}

// Button Functions. 
function goTown() {
    update(locations[0]);
}

function goStore() {
    update(locations[1]);
}

function goCave() {
    update(locations[2]);
}

function buyHealth() {
    if (gold >= 10) {
        gold -= 10; // this is equal to gold = gold - 10;
        health += 10; // thios is equal to health = health + 10;
        goldText.innerText = gold; // updating the gold variable (display the new value of gold)
        healthText.innerText = health; // updating the health variable
        text.innerText = "You acquire more health.";
    } else {
        text.innerText = "You do not have enough gold to buy health."; // update the text element to display
}

function buyWeapon() {
    if (currentWeapon < weapons.length - 1) { // check if currentWeapon is less than the length of the weapons array
        if (gold >= 30) {
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold; // updating the gold variable (display the new value of gold)
            let newWeapon = weapons[currentWeapon].name; // local variable to tell the player what weapon they bought
            text.innerText = "You now have a " + newWeapon + "."; // update the text element to display
            inventory.push(newWeapon); // Add the newWeapon to the end of the inventory array
            text.innerText += " In your inventory you have: " + inventory; // Update the text without erease the old one.
        } else {
            text.innerText = "You do not have enough gold to buy a weapon."; // Update the text if you don't have more gold
        }
    } else {
        text.innerText = "You already have the most powerful weapon!"; // text at display
        button2.innerText = "Sell weapon for 15 gold"; // text at button 2
        button2.onclick = sellWeapon; // button 2 function sellWeapon
    }
}

function sellWeapon() {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift(); // shift() removes the first element in the array and returns it
        text.innerText = "You sold a " + currentWeapon + ".";
        text.innerText += " In your inventory you have: " + inventory;
    } else {
        text.innerText = "Don't sell your only weapon!";
    }
}

function fightSlime() {
    fighting = 0; // 0 - the index of slime in the monsters array
    goFight(); // Call the goFight() function.
}

function fightBeast() {
    fighting = 1; // 1 - the index of slime in the monsters array
    goFight(); // Call the goFight() function.
}

function fightDragon() {
    fighting = 2; // 2 - the index of slime in the monsters array
    goFight(); // Call the goFight() function.
}

function goFight() {
    update(locations[3]); // update function with the fourth object in locations
    monsterHealth = monsters[fighting].health; // set the health of the current monster
    monsterStats.style.display = "block"; // take the monsterStats element from the CSS file and displays it.
    monsterName.innerText = monsters[fighting].name; // Update the text Current monster's name
    monsterHealthText.innerText = monsterHealth; // Update the text Current monster's health
}

function attack() {
    text.innerText = "The " + monsters[fighting].name + " attacks."; // name of the current monster fighting
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + "."; // name of the current weapon
    health -= getMonsterAttackValue(monsters[fighting].level); // health minus the monster's level.
    if (isMonsterHit()) {
        monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp); // monsterHealth minus the power of the player's current weapon
    } else {
        text.innerText += " You miss.";
    }
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if (health <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        /*if (fighting === 2) {
            winGame();
        } else {
            defeatMonster();
        }*/
    fighting === 2 ? winGame() : defeatMonster();
    }
    if (Math.random() <= 0.1 && inventory.length !== 1) {
        text.innerText += " Your " + inventory.pop() + " breaks."; /* this returns the last item in inventory while removing it from the array at the same time */
        currentWeaponIndex--;
    }
}

function getMonsterAttackValue(level) {
    const hit = (level * 5) - (Math.floor(Math.random() * xp));
    console.log(hit);
    return hit > 0 ? hit : 0; // returns hit if hit is greater than 0, or returns 0 if it is not.
}

function isMonsterHit() {
    return Math.random() > 0.2 || health < 20; /* This "returns" True (= a Hit) every time Math.random is above 0,2, which is 80% of the time; giving us an 80% Hit Rate; OR every time the Health of the player drops below 20 */
  }

function dodge() {
    text.innerText = "You dodge the attack from the " + monsters[fighting].name; // Display the text and monsters name
}

function defeatMonster() {
    gold += Math.floor(monsters[fighting].level * 6.7); // gold plus the monster's level
    xp += monsters[fighting].level; // xp to xp plus the monster's level
    goldText.innerText = gold; // goldText display the updated values
    xpText.innerText = xp; // xpText display the updated values
    update(locations[4]); // update function with locations[4] as the argument
}

function lose() {
    update(locations[5]);
}

function winGame() {
    update(locations[6]);
}

function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeaponIndex = 0;
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
  }

function easterEgg() {
    update(locations[7]);
}

function pickTwo() {
    pick(2);
  }
  
  function pickEight() {
    pick(8);
  }

function pick(guess) {
    const numbers = [];
    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 11));
    }
    text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
    for (let i = 0; i < 10; i++) {
        text.innerText += numbers[i] + "\n";
    }
    if (numbers.includes(guess)) {
        text.innerText += "Right! You win 20 gold!";
        gold += 20;
        goldText.innerText = gold;
    } else {
        text.innerText += "Wrong! You lose 10 health!";
        health -= 10;
        healthText.innerText = health;
        if (health <= 0) {
            lose();
          }
    }
}