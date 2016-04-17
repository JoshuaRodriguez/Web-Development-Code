var numberOfSquares = 6;
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var resetButton = document.querySelector("#reset");
var easyButton = document.querySelector("#easy");
var hardButton = document.querySelector("#hard");
var squares = document.querySelectorAll(".square");
var h1 = document.querySelector("h1");
var colors = generateRandomColors(numberOfSquares);
var colorPicked = pickColor();

easy.addEventListener("click", function () {
    hard.classList.remove("selected");
    easy.classList.add("selected");
    numberOfSquares = 3;
    colors = generateRandomColors(numberOfSquares);
    colorPicked = pickColor();
    colorDisplay.textContent = colorPicked;
    for(var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.background = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }

    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";
});

hard.addEventListener("click", function () {
    easy.classList.remove("selected");
    hard.classList.add("selected");
    numberOfSquares = 6;
    colors = generateRandomColors(numberOfSquares);
    colorPicked = pickColor();
    colorDisplay.textContent = colorPicked;
    for(var i = 0; i < squares.length; i++) {
        squares[i].style.background = colors[i];
        squares[i].style.display = "block";
    }

    resetButton.textContent = "New Colors";
    messageDisplay.textContent = "";
});

resetButton.addEventListener("click", function () {
    colors = generateRandomColors(numberOfSquares);
    colorPicked = pickColor();
    colorDisplay.textContent = colorPicked;
    for(var i = 0; i < squares.length; i++) {
        squares[i].style.background = colors[i];
    }

    h1.style.background = "steelblue";
    this.textContent = "New Colors";
    messageDisplay.textContent = "";
});

colorDisplay.textContent = colorPicked;

for(var i = 0; i < squares.length; i++) {
    squares[i].style.background = colors[i];

    squares[i].addEventListener("click", function() {
        var clickedColor = this.style.background;

        if(clickedColor === colorPicked) {
            messageDisplay.textContent = "Correct!";
            resetButton.textContent = "Play Again?";
            changeColors(clickedColor);
        } else {
            this.style.background = "#232323";
            messageDisplay.textContent = "Try Again";
        }
    });
}

function changeColors(color) {
    for(var i = 0; i < squares.length; i++) {
        squares[i].style.background = color;
    }

    h1.style.background = color;
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    var arr = [];

    for(var i = 0; i < num; i++) {
        arr.push(randomColor());
    }

    return arr;
}

function randomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
