// Gamedata
let gameData = {
    update: 0.2,
    beer: 0,
    beerPerClick: 1,
    beerPerClickCost: 10,
    grain: 10,
    money: 0,
    moneyPerBeer: 1,
    grainCapacity: 10,
    grainCost: 1,
    grainPerMin: 0.1
}

// Global variables
let grainInterval = 5000;

// Functions
function brewBeer() {
    if (gameData.grain >= 1) {
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
    if (gameData.money >= gameData.grainCost) {
        gameData.grain += 1;
        gameData.money = (gameData.money - gameData.grainCost);
        showGameData();
    }
}

function harvestGrain() {
    if(gameData.grain < gameData.grainCapacity) {
        gameData.grain += gameData.grainPerMin;
        showGameData();
    }
}

//Toggle buttons
function toggleButtons() {
    //Toggle brew
    if (gameData.grain < 1) {
        document.getElementById("brew-btn").disabled = true;
    } else {
        document.getElementById("brew-btn").disabled = false;
    }

    //Toggle upgrade
    if (gameData.money < gameData.beerPerClickCost) {
        document.getElementById("upgrade-btn").disabled = true;
    } else {
        document.getElementById("upgrade-btn").disabled = false;
    }

    // Toggle sell
    if (gameData.beer < 1) {
        document.getElementById("sell-btn").disabled = true;
        document.getElementById("sell-all-btn").disabled = true;
    } else {
        document.getElementById("sell-btn").disabled = false;
        document.getElementById("sell-all-btn").disabled = false;
    }

    // Toggle buy grain
    if (gameData.money < gameData.grainCost) {
        document.getElementById("buy-grain-btn").disabled = true;
    } else {
        document.getElementById("buy-grain-btn").disabled = false;
    }
}

//Game loops
let mainGameLoop = window.setInterval(function() {
    toggleButtons();
}, 10)

let grainLoop = window.setInterval(function() {
    harvestGrain();
}, grainInterval)

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
    $(".beerBrewed").html(gameData.beer + " beer in stock");
    $(".grainStock").html((Math.round(gameData.grain * 10) / 10) + " kg grain in stock");
    $(".money").html("$" + gameData.money);
    $(".perClickUpgrade").html("Current upgrade level: " + gameData.beerPerClick + " -- Cost: $" + gameData.beerPerClickCost);
    $(".grainPrice").html("Price per kg grain: $" + gameData.grainCost);
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
        money: gameData.money,
        moneyPerBeer: gameData.moneyPerBeer,
        grainCapacity: gameData.grainCapacity,
        grainCost: gameData.grainCost,
        grainPerMin: gameData.grainPerMin
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
        gameData.moneyPerBeer = file.moneyPerBeer;
        gameData.grainCapacity = file.grainCapacity;
        gameData.grainCost = file.grainCost;
        gameData.grainPerMin = file.grainPerMin;

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
    var file = {
        update: gameData.update,
        beer: gameData.beer,
        beerPerClick: gameData.beerPerClick,
        beerPerClickCost: gameData.beerPerClickCost,
        grain: gameData.grain,
        money: gameData.money,
        moneyPerBeer: gameData.moneyPerBeer,
        grainCapacity: gameData.grainCapacity,
        grainCost: gameData.grainCost,
        grainPerMin: gameData.grainPerMin
    };

    localStorage.setItem('saveFile', JSON.stringify(file))
    
    $($(".game_saved").html("Game saved...")).fadeIn().fadeOut(2000, "swing");

}, 30000)