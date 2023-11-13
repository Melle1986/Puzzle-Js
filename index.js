let rows = 5;
let columns = 5;

let currTile;
let otherTile;
let turns = 0;

let timerExpired = false;

function moveStart() {
  if (this.style.border.includes("green")) {
    return;
  }
  currTile = this;
  this.style.border = "1px solid black";
}

function moveOver(e) {
  e.preventDefault();
}

function moveEnter(e) {
  e.preventDefault();
}

function moveLeave() { }

function moveDrop() {
  otherTile = this;
}

function moveEnd() {
  if (timerExpired || currTile.src.includes("blank")) {
    return;
  }
  let currImg = currTile.src;
  let otherImg = otherTile.src;
  currTile.src = otherImg;
  otherTile.src = currImg;

  turns += 1;
  document.getElementById("turns").innerText = turns;

  checkImagePlacement(otherTile);
}

function checkImagePlacement(image) {
  const imageName = image.src.split("/").pop();
  const imageOrder = parseInt(imageName.split(".")[0], 10);

  const boardIndex = Array.from(
    document.getElementById("board").children
  ).indexOf(image);

  if (imageOrder === boardIndex + 1) {
    image.style.border = "1.5px solid green";
    // Bild ist an der richtigen Stelle
    image.removeEventListener("dragstart", moveStart);
    image.removeEventListener("dragend", moveEnd);
    image.removeEventListener("dragover", moveOver);
    image.removeEventListener("dragenter", moveEnter);
    image.removeEventListener("dragleave", moveLeave);
    image.removeEventListener("drop", moveDrop);
  } else {
    image.style.border = "1.5px solid red";
    // Bild ist an der falschen Stelle
  }
}

window.onload = function () {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      let tile = document.createElement("img");
      tile.src = "./images/blank.jpg";

      tile.addEventListener("dragstart", moveStart);
      tile.addEventListener("dragover", moveOver);
      tile.addEventListener("dragenter", moveEnter);
      tile.addEventListener("dragleave", moveLeave);
      tile.addEventListener("drop", moveDrop);
      tile.addEventListener("dragend", moveEnd);

      document.getElementById("board").append(tile);
    }
  }

  let pieces = [];
  for (let i = 1; i <= rows * columns; i++) {
    pieces.push(i.toString() + ".jpg");
  }

  pieces = shuffleArray(pieces); // Mische die Bilder

  for (let i = 0; i < pieces.length; i++) {
    let tile = document.createElement("img");
    tile.src = "./images/" + pieces[i];

    tile.addEventListener("dragstart", moveStart);
    tile.addEventListener("dragover", moveOver);
    tile.addEventListener("dragenter", moveEnter);
    tile.addEventListener("dragleave", moveLeave);
    tile.addEventListener("drop", moveDrop);
    tile.addEventListener("dragend", moveEnd);

    document.getElementById("pieces").append(tile);
  }
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function startTimer(duration) {
  var timer = duration,
    minutes,
    seconds;
  var interval = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);
    document.getElementById("timer").innerText =
      minutes + "m " + seconds + "s ";
    if (--timer < 0) {
      timer = duration;
      clearInterval(interval);
      timerExpired = true; // Timer ist abgelaufen
      document.getElementById("message").style.display = "block";
// Entferne die Eventlistener für das Ziehen der Bilder
     
      // in die function timer mit einbauen damit sound spielt wenn timer abgelaufen ist
      document.getElementById("timerSound").play("bing.mp3");
    }
  }, 1000);
}
startTimer(180);
removeDragEventListeners();


// // Let komplett einsetzen damit der sound abgespielt wird 
// let timerSound = document.getElementById("timerSound");

function playSound() {
  timerSound.currentTime = 0;
  timerSound.play("bing.mp3");
  
  // Event-Listener entfernen, um nur einmal abzuspielen
  timerSound.removeEventListener("ended", playSound);
}

// Die function wird verwendet um den sound im hintergrund ab zu spielen 

function playAudioOnLoad() {
  let audio = document.getElementById('startSeite');
  if (audio) {
    audio.play("natur.mp3");
  } else {
    console.error("Audio-Element mit der ID 'startSeite' nicht gefunden.");
  }
}

// Event-Listener hinzufügen, der die Funktion beim Laden der Seite aufruft
window.addEventListener('load', playAudioOnLoad);


function removeDragEventListeners() {
  const tiles = document.querySelectorAll("img");
  tiles.forEach(function (tile) {
    tile.removeEventListener("dragstart", moveStart);
    tile.removeEventListener("dragend", moveEnd);
  });
}

let reloadButton = document.getElementById("reloadButton");
reloadButton.addEventListener("click", function () {
  location.reload();
});

const image = document.getElementById("image");
const toggleButton = document.getElementById("toggleButton");

let isImageVisible = false;

// dazu da das das Bild beim Start nicht angezeigt wird aber dafür beim klicken
function toggleImage() {
  if (isImageVisible) {
    image.style.display = "none"; // Bild ausblenden
  } else {
    image.style.display = "block"; // Bild anzeigen
  }
  isImageVisible = !isImageVisible;
}

toggleButton.addEventListener("mousedown", toggleImage);
toggleButton.addEventListener("mouseup", toggleImage);

// function allImagesPlacedCorrectly() {
//   const imageElements = document.querySelectorAll("img");
//   for (const image of imageElements) {
//     if (!image.style.border.includes("green")) {
//       return false; // Es gibt mindestens ein Bild, das nicht korrekt platziert wurde
//     }
//   }
//   return true; // Alle Bilder sind korrekt platziert
// }