// Gamedata
var gameData = {
    update: 0.2,
    beer: 0,
    beerPerClick: 1,
    beerPerClickCost: 10,
    money: 0,
    moneyPerBeer: 1
}

// Functions
function brewBeer() {
    gameData.beer += gameData.beerPerClick
    document.getElementById('beerBrewed').innerHTML = gameData.beer + " beer in stock"
}

function sellBeer() {
    if (gameData.beer > 0) {
        gameData.beer -= 1
        document.getElementById('beerBrewed').innerHTML = gameData.beer + " beer in stock"
        gameData.money += gameData.moneyPerBeer
        document.getElementById('money').innerHTML = "$" + gameData.money
    }
}

function sellAllBeer() {
    if (gameData.beer > 0) {
        gameData.money += (gameData.moneyPerBeer * gameData.beer)
        gameData.beer -= gameData.beer
        document.getElementById('beerBrewed').innerHTML = gameData.beer + " beer in stock"
        document.getElementById('money').innerHTML = "$" + gameData.money
    }
}

function buyBeerPerClick() {
    if (gameData.money >= gameData.beerPerClickCost) {
        gameData.money -= gameData.beerPerClickCost;
        gameData.beerPerClick += 1;
        gameData.beerPerClickCost = Math.round(gameData.beerPerClickCost * (Math.pow(1.09, gameData.beerPerClick)));
        document.getElementById('money').innerHTML = "$" + gameData.money
        document.getElementById("perClickUpgrade").innerHTML = "Current upgrade level: " + gameData.beerPerClick + " -- Cost: $" + gameData.beerPerClickCost
    }
}

//Toggle buttons
function toggleButtons() {
    //Toggle upgrade
    if (gameData.money < gameData.beerPerClickCost) {
        document.getElementById("upgrade-btn").disabled = true;
    } else {
        document.getElementById("upgrade-btn").disabled = false;
    }

    if (gameData.beer < 1) {
        document.getElementById("sell-btn").disabled = true;
        document.getElementById("sell-all-btn").disabled = true;
    } else {
        document.getElementById("sell-btn").disabled = false;
        document.getElementById("sell-all-btn").disabled = false;
    }
}

//Main game loop
var mainGameLoop = window.setInterval(function() {
    toggleButtons();
    // brewBeer();
}, 10)


/* 
Game management
The section below contains all game management code.
This includes all helper functions 
*/

window.onload = function() {
    var savegame = JSON.parse(localStorage.getItem("saveFile"))
    if (savegame !== null) {
        gameData = savegame
    }

    document.getElementById("beerBrewed").innerHTML = gameData.beer + " beer in stock"
    document.getElementById("money").innerHTML = "$" + gameData.money
    document.getElementById("perClickUpgrade").innerHTML = "Current upgrade level: " + gameData.beerPerClick + " -- Cost: $" + gameData.beerPerClickCost
}

// Save current game state to local json file
function saveGame() {
    var file = {
        update: gameData.update,
        beer: gameData.beer,
        beerPerClick: gameData.beerPerClick,
        beerPerClickCost: gameData.beerPerClickCost,
        money: gameData.money
    };

    localStorage.setItem('saveFile', JSON.stringify(file));
    displayMessage();
};

// Load saved game state from local json file
function loadGame() {
    var file = JSON.parse(localStorage.getItem('saveFile'));

    if (file !== null) {
        gameData.update = file.update
        gameData.beer = file.beer;
        gameData.beerPerClick = file.beerPerClick;
        gameData.beerPerClickCost = file.beerPerClickCost;
        gameData.money = file.money;

        document.getElementById("beerBrewed").innerHTML = gameData.beer + " beer in stock"
        document.getElementById("money").innerHTML = "$" + gameData.money
        document.getElementById("perClickUpgrade").innerHTML = "Current upgrade level: " + gameData.beerPerClick + " -- Cost: $" + gameData.beerPerClickCost
    } else {
        console.log("no save file")
    }
};

// Delete local json file
function restartGame() {
    localStorage.removeItem("saveFile");
    location.reload();
}

// Saving loop triggers autosave every 30 seconds
var saveGameLoop = window.setInterval(function() {
    var file = {
        update: gameData.update,
        beer: gameData.beer,
        beerPerClick: gameData.beerPerClick,
        beerPerClickCost: gameData.beerPerClickCost,
        money: gameData.money
    };

    localStorage.setItem('saveFile', JSON.stringify(file))
    
    document.getElementById("game_saved").innerHTML = "Game saved..."
    $('#game_saved').fadeIn().fadeOut(2000, "swing");

}, 30000)