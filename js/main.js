// Gamedata
let gameData = {
    update: 0.2,
    beer: 0,
    beerPerClick: 1,
    beerPerClickCost: 10,
    grain: 10,
    money: 0,
    moneyPerBeer: 1
}

let grainCost = 1;

// Functions
function brewBeer() {
    if (gameData.grain > 0) {
        gameData.beer += gameData.beerPerClick
        gameData.grain = (gameData.grain - 1)
        showGameData();
    }
}

function sellBeer() {
    if (gameData.beer > 0) {
        gameData.beer -= 1
        gameData.money += gameData.moneyPerBeer
        showGameData();
    }
}

function sellAllBeer() {
    if (gameData.beer > 0) {
        gameData.money += (gameData.moneyPerBeer * gameData.beer)
        gameData.beer -= gameData.beer
        showGameData();
    }
}

function buyBeerPerClick() {
    if (gameData.money >= gameData.beerPerClickCost) {
        gameData.money -= gameData.beerPerClickCost;
        gameData.beerPerClick += 1;
        gameData.beerPerClickCost = Math.round(gameData.beerPerClickCost * (Math.pow(1.09, gameData.beerPerClick)));
        showGameData();
    }
}

function buyGrain() {
    if (gameData.money >= grainCost) {
        gameData.grain += 1;
        gameData.money = (gameData.money - grainCost);
        showGameData();
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

    if (gameData.money < grainCost) {
        document.getElementById("buy-grain-btn").disabled = true;
    } else {
        document.getElementById("buy-grain-btn").disabled = false;
    }
}

//Main game loop
let mainGameLoop = window.setInterval(function() {
    toggleButtons();
    // brewBeer();
}, 10)

//Content pages

function load_brewery() {
    $("#brewery").show();
    $("#wholesale").hide();
    $("#research").hide();
    $("#events").hide();
    $("#statistics").hide();
}

function load_wholesale() {
    $("#brewery").hide();
    $("#wholesale").show();
    $("#research").hide();
    $("#events").hide();
    $("#statistics").hide();
}

function load_research() {
    $("#brewery").hide();
    $("#wholesale").hide();
    $("#research").show();
    $("#events").hide();
    $("#statistics").hide();
}

function load_events() {
    $("#brewery").hide();
    $("#wholesale").hide();
    $("#research").hide();
    $("#events").show();
    $("#statistics").hide();
}

function load_statistics() {
    $("#brewery").hide();
    $("#wholesale").hide();
    $("#research").hide();
    $("#events").hide();
    $("#statistics").show();
}


/* 
Game management
The section below contains all game management code.
This includes all helper functions 
*/

function showGameData() {
    document.getElementById("beerBrewed").innerHTML = gameData.beer + " beer in stock"
    document.getElementById('grainStock').innerHTML = gameData.grain + " kg grain in stock"
    document.getElementById("money").innerHTML = "$" + gameData.money
    document.getElementById("perClickUpgrade").innerHTML = "Current upgrade level: " + gameData.beerPerClick + " -- Cost: $" + gameData.beerPerClickCost
    document.getElementById("grainPrice").innerHTML = "Price per kg grain: $" + grainCost;
}

window.onload = function() {
    var savegame = JSON.parse(localStorage.getItem("saveFile"))
    if (savegame !== null) {
        gameData = savegame
    }

    showGameData();
}

// Save current game state to local json file
function saveGame() {
    var file = {
        update: gameData.update,
        beer: gameData.beer,
        beerPerClick: gameData.beerPerClick,
        beerPerClickCost: gameData.beerPerClickCost,
        grain: gameData.grain,
        money: gameData.money
    };

    localStorage.setItem('saveFile', JSON.stringify(file));
};

// Load saved game state from local json file
function loadGame() {
    var file = JSON.parse(localStorage.getItem('saveFile'));

    if (file !== null) {
        gameData.update = file.update
        gameData.beer = file.beer;
        gameData.beerPerClick = file.beerPerClick;
        gameData.beerPerClickCost = file.beerPerClickCost;
        gameData.grain = file.grain;
        gameData.money = file.money;

        showGameData();
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
let saveGameLoop = window.setInterval(function() {
    let file = {
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