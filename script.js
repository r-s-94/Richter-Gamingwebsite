//  Tic Tac Toe Game

let gameStateObject = {
  solutionsArray: [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ],
  players: { playerOne: "x", playerTwo: "o" },
  occupiedBoard: [null, null, null, null, null, null, null, null, null],
};

const singlePlayBoard = document.getElementsByClassName(
  "tic-tac-toe-game-playing-field"
);
const ticTacToeQuestionDiv = document.getElementsByClassName(
  "tic-tac-toe-game-question-event-div"
)[0];
const startGameDiv = document.getElementsByClassName(
  "tic-tac-toe-game-start-game-div"
)[0];
const choicePlayerComputerDiv = document.getElementsByClassName(
  "tic-tac-toe-game-choice-player-computer-div"
)[0];
const whoPlayerStartDiv = document.getElementsByClassName(
  "tic-tac-toe-game-who-player-start-div"
)[0];
const startPlayerOrComputerDiv = document.getElementsByClassName(
  "tic-tac-toe-game-who-start-player-computer-div"
)[0];
const gameWinnerDiv = document.getElementsByClassName(
  "tic-tac-toe-game-game-winner-div"
)[0];
const gameNobodyWinDiv = document.getElementsByClassName(
  "tic-tac-toe-game-game-nobody-win-div"
)[0];
const gamePlayAgainDiv = document.getElementsByClassName(
  "tic-tac-toe-game-game-play-again-div"
)[0];
const gameFinishDiv = document.getElementsByClassName(
  "tic-tac-toe-game-game-finish-div"
)[0];
const showWinnerDOM = document.getElementsByClassName(
  "tic-tac-toe-game-show-winner"
)[0];

let currentPlayer;
let winnerPlayer = "";
let winner = false;
let playerPlayerMatch = false;
let playerComputerMatch = false;
let notInRow = false;

showFirtsQuestion();

function showFirtsQuestion() {
  choicePlayerComputerDiv.classList.add("hidden");
  whoPlayerStartDiv.classList.add("hidden");
  startPlayerOrComputerDiv.classList.add("hidden");
  gameWinnerDiv.classList.add("hidden");
  gameNobodyWinDiv.classList.add("hidden");
  gamePlayAgainDiv.classList.add("hidden");
  gameFinishDiv.classList.add("hidden");
}

function askPlayOptions() {
  startGameDiv.classList.add("hidden");
  choicePlayerComputerDiv.classList.remove("hidden");
}

function startGameWith(gameChoice) {
  if (gameChoice === "player") {
    choicePlayerComputerDiv.classList.add("hidden");
    whoPlayerStartDiv.classList.remove("hidden");
  } else {
    choicePlayerComputerDiv.classList.add("hidden");
    startPlayerOrComputerDiv.classList.remove("hidden");
  }
}

function playWithPlayers(playerChoice) {
  if (playerChoice === "x") {
    playerPlayerMatch = true;
    currentPlayer = gameStateObject.players.playerOne;
    whoPlayerStartDiv.classList.add("hidden");
    ticTacToeQuestionDiv.classList.add("hidden");
  } else {
    playerPlayerMatch = true;
    currentPlayer = gameStateObject.players.playerTwo;
    whoPlayerStartDiv.classList.add("hidden");
    ticTacToeQuestionDiv.classList.add("hidden");
  }
}

function playingWithPlayerOrComputer(playerOrComputer) {
  if (playerOrComputer === "player") {
    playerComputerMatch = true;
    currentPlayer = gameStateObject.players.playerOne;
    choicePlayerComputerDiv.classList.add("hidden");
    startPlayerOrComputerDiv.classList.add("hidden");
    ticTacToeQuestionDiv.classList.add("hidden");
  } else {
    playerComputerMatch = true;
    currentPlayer = gameStateObject.players.playerTwo;
    choicePlayerComputerDiv.classList.add("hidden");
    startPlayerOrComputerDiv.classList.add("hidden");
    ticTacToeQuestionDiv.classList.add("hidden");
    computerChoiceYourPlayingField();
  }
}

function computerChoiceYourPlayingField() {
  let freeBoardArray = [];

  for (let index = 0; index < gameStateObject.occupiedBoard.length; index++) {
    if (gameStateObject.occupiedBoard[index] === null) {
      freeBoardArray.push(index);
    }
  }

  const randomComputerPlayingFieldChoice =
    freeBoardArray[Math.floor(Math.random() * freeBoardArray.length)];

  updatePlayingField(randomComputerPlayingFieldChoice);
}

function checkPlayingFieldOccupied(playingFieldNumber) {
  if (gameStateObject.occupiedBoard[playingFieldNumber] === null) {
    updatePlayingField(playingFieldNumber);
  }
}

function updatePlayingField(playingFieldNumber) {
  singlePlayBoard[playingFieldNumber].innerHTML = currentPlayer;

  gameStateObject.occupiedBoard[playingFieldNumber] = currentPlayer;

  checkWinner(currentPlayer);

  nobodyWin();

  changeCurrentPlayer(currentPlayer);
}

function changeCurrentPlayer(player) {
  if (player === "x") {
    currentPlayer = gameStateObject.players.playerTwo;

    if (playerComputerMatch) {
      computerChoiceYourPlayingField();
    }
  } else {
    currentPlayer = gameStateObject.players.playerOne;
  }
}

function checkWinner() {
  let solutionArray = 0;
  const solutionArrays = gameStateObject.solutionsArray;

  for (let index = 0; index < solutionArrays.length; index++) {
    const board = gameStateObject.occupiedBoard;

    if (
      board[solutionArrays[index][0]] === board[solutionArrays[index][1]] &&
      board[solutionArrays[index][1]] === board[solutionArrays[index][2]]
    ) {
      // null überprüfen
      if (board[solutionArrays[index][0]] !== null) {
        // welcher Spieler sitzt auf den Feldern?
        solutionArray = index;
        const markSolutionFieldOne = solutionArrays[solutionArray][0];
        const markSolutionFieldTwo = solutionArrays[solutionArray][1];
        const markSolutionFieldThree = solutionArrays[solutionArray][2];
        winnerPlayer = board[solutionArrays[index][0]];
        winner = true;
        singlePlayBoard[markSolutionFieldOne].classList.add(
          "mark-winner-field-one"
        );
        singlePlayBoard[markSolutionFieldTwo].classList.add(
          "mark-winner-field-two"
        );
        singlePlayBoard[markSolutionFieldThree].classList.add(
          "mark-winner-field-three"
        );
        setTimeout(showWinner, 2300);
      }
    }
  }
}

/*function checkThree() {
  gameStateObject.solutionsArray.forEach((solutionElement) => {
    if (
      solutionElement[0].player === gameStateObject.players.playerOne &&
      solutionElement[1].player === gameStateObject.players.playerOne &&
      solutionElement[2].player === gameStateObject.players.playerOne
    ) {
      
    }

    if (
      solutionElement[0].player === gameStateObject.players.playerTwo &&
      solutionElement[1].player === gameStateObject.players.playerTwo &&
      solutionElement[2].player === gameStateObject.players.playerTwo
    ) {
      showWinner(currentPlayer);
    }
  });
}*/

function showWinner() {
  showWinnerDOM.innerHTML = winnerPlayer;
  gameWinnerDiv.classList.remove("hidden");
  ticTacToeQuestionDiv.classList.remove("hidden");
  setTimeout(hiddenWinner, 2300);
}

function nobodyWin() {
  const findNotOccupiedBoard = gameStateObject.occupiedBoard.findIndex(
    (notOccupiedBoard) => {
      return notOccupiedBoard === null;
    }
  );

  // gameStateObject.occupiedBoard.forEach((field) => {
  //   if (field === null) x = false;
  // });

  /*for (let i = 0; i < gameStateObject.occupiedBoard.length; i++) {
    if (gameStateObject.occupiedBoard[i] !== null) {
      allPlayingFieldsOccupied = true;
      break;
    }
  }*/

  if (findNotOccupiedBoard === -1) {
    gameStateObject.solutionsArray.forEach((solutionElement) => {
      const board = gameStateObject.occupiedBoard;

      if (
        board[solutionElement[0]] !== board[solutionElement[1]] ||
        board[solutionElement[1]] !== board[solutionElement[2]]
      ) {
        notInRow = true;

        if (notInRow === true && winner === false) {
          setTimeout(showNobodyWin, 2300);
        }
      }
    });
  }
}

function showNobodyWin() {
  gameNobodyWinDiv.classList.remove("hidden");
  ticTacToeQuestionDiv.classList.remove("hidden");
  setTimeout(hiddenNoboyWin, 2500);
}

function hiddenWinner() {
  for (let index = 0; index < singlePlayBoard.length; index++) {
    singlePlayBoard[index].classList.remove("mark-winner-field-one");
    singlePlayBoard[index].classList.remove("mark-winner-field-two");
    singlePlayBoard[index].classList.remove("mark-winner-field-three");
  }

  gameWinnerDiv.classList.add("hidden");
  setTimeout(gamePlayAgainQuestion, 500);
}

function hiddenNoboyWin() {
  gameNobodyWinDiv.classList.add("hidden");
  setTimeout(gamePlayAgainQuestion, 500);
}

function gamePlayAgainQuestion() {
  gamePlayAgainDiv.classList.remove("hidden");
}

function playAgainTicTacToe(playAgainAnswer) {
  if (playAgainAnswer === "yes") {
    gamePlayAgainDiv.classList.add("hidden");
    choicePlayerComputerDiv.classList.remove("hidden");
    resetGameTicTacToe();
  } else {
    gamePlayAgainDiv.classList.add("hidden");
    gameFinishDiv.classList.remove("hidden");
  }
}

function resetGameTicTacToe() {
  for (let index = 0; index < gameStateObject.occupiedBoard.length; index++) {
    gameStateObject.occupiedBoard[index] = null;

    document.getElementsByClassName("tic-tac-toe-game-playing-field")[
      index
    ].innerHTML = "";
  }

  playerPlayerMatch = false;
  playerComputerMatch = false;
  notInRow = false;
  winner = false;
}

//  Schere Stein Papier Spiel

const computerChoiceArray = ["Schere", "Stein", "Papier"];
const gameCharacterArray = ["Schere", "Stein", "Papier"];
const gameCharacterIMGArray = [
  "./assets/Schere.png",
  "./assets/Stein.png",
  "./assets/Papier.png",
];
const questionDiv = document.getElementsByClassName("question-div")[0];
const stonePaperScissorsStartGameDiv = document.getElementsByClassName(
  "rock-paper-scissors-start-game-div"
)[0];
const buttonOrVoiceDiv = document.getElementsByClassName(
  "button-or-voice-div"
)[0];
const stonePaperScissorsButtonDiv = document.getElementsByClassName(
  "scissors-stone-paper-button-div"
)[0];
const voiceDiv = document.getElementsByClassName("voice-div")[0];
const gamePlayAgainQuestionMainDiv = document.getElementsByClassName(
  "game-play-again-question-main-div"
)[0];
const gamePlayAgainQuestionDiv = document.getElementsByClassName(
  "game-play-again-question-div"
)[0];
const gamePlayAgainStandardQuestion = document.getElementsByClassName(
  "game-play-again-standard-question"
)[0];
const gamePlayAgainQuestionButtonDiv = document.getElementsByClassName(
  "game-play-again-question-button-div"
)[0];
const evectDiv = document.getElementsByClassName("evect-div")[0];
const gameRoundDiv = document.getElementsByClassName("game-round-div")[0];
const countGameRoundStatus = document.getElementsByClassName(
  "count-game-round-status"
)[0];
const sequenceDiv = document.getElementsByClassName("sequence-div")[0];
const sessionWinnerDiv =
  document.getElementsByClassName("session-winner-div")[0];
const sessionWinner = document.getElementsByClassName("session-winner")[0];

const recordingStatus = document.getElementsByClassName("recording-status")[0];
const playerVoiceChoice = document.getElementsByClassName(
  "player-voice-choice"
)[0];
const showPlayerScore = document.getElementById("player-score");
const showComputerScore = document.getElementById("computer-score");
const sessionPlayerImg = document.getElementsByClassName("player-img")[0];
const sessionComputerImg = document.getElementsByClassName("computer-img")[0];

let countGameRound = 0;
let controlTimeOut;
let randomComputerChoice;

let computerObject = {
  sessionWinnerName: "",
  score: 0,
  choice: "",
};

let playerObject = {
  sessionWinnerName: "",
  score: 0,
  choice: "",
};

showGameWithWhat();

function showGameWithWhat() {
  evectDiv.classList.add("hidden");
  gameRoundDiv.classList.add("hidden");
  sequenceDiv.classList.add("hidden");
  gamePlayAgainQuestionMainDiv.classList.add("hidden");
  gamePlayAgainQuestionButtonDiv.classList.add("hidden");
  sessionWinnerDiv.classList.add("hidden");
  buttonOrVoiceDiv.classList.add("hidden");
  stonePaperScissorsButtonDiv.classList.add("hidden");
  voiceDiv.classList.add("hidden");
}

function showControlOptions() {
  stonePaperScissorsStartGameDiv.classList.add("hidden");
  buttonOrVoiceDiv.classList.remove("hidden");
}

function buttonOrVoiceChoice(buttonOrVoice) {
  buttonOrVoiceDiv.classList.add("hidden");
  gamePlayAgainQuestionButtonDiv.classList.add("hidden");

  if (buttonOrVoice === "button") {
    stonePaperScissorsButtonDiv.classList.remove("hidden");
    questionDiv.classList.add("hidden");
  } else {
    voiceDiv.classList.remove("hidden");
    questionDiv.classList.add("hidden");
  }
}

function startRecognition() {
  const speechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  if (speechRecognition) {
    recognition = new webkitSpeechRecognition();
    console.log(recognition);
    recognition.lang = "de-DE";
    recognition.interimResults = false;
    recognition.start();

    recognition.onstart = () => {
      console.log("Die Spracherkennung wurde gestartet.");
      recordingStatus.innerHTML = "Spracherkennung gestartet, bitte sprechen.";
    };

    recognition.onend = () => {
      console.log("Spracherkennung beendet.");
      recordingStatus.innerHTML = "Spracherkennung beendet.";
    };

    recognition.onresult = (event) => {
      transcript = event.results[0][0].transcript;
      console.log("Erkannte Sprache:", transcript);
      if (
        transcript === "Schere" ||
        transcript === "Stein" ||
        transcript === "Papier"
      ) {
        playerVoiceChoice.innerHTML = transcript;
        playerMakeAChoice(transcript);
      } else {
        playerVoiceChoice.innerHTML =
          "Deine Spracheingabe bitte nochmal wiederholen.";
      }
    };

    recognition.onerror = (event) => {
      console.log("Fehler bei derSprachaufnahme:", event.console.error);
    };
  } else {
    console.error(
      "Spracherkennungs-API wird von diesem Browser nicht unterstützt."
    );
  }
}

function playerMakeAChoice(choice) {
  playerObject.choice = choice;

  computerChoice();
}

function computerChoice() {
  randomComputerChoice =
    computerChoiceArray[Math.floor(Math.random() * computerChoiceArray.length)];

  computerObject.choice = randomComputerChoice;

  nextGameRound();
}

function nextGameRound() {
  countGameRound = countGameRound + 1;
  countGameRoundStatus.innerHTML = countGameRound;

  setTimeout(showNextRound, 1000);
}

function showNextRound() {
  evectDiv.classList.remove("hidden");
  gameRoundDiv.classList.remove("hidden");
  setTimeout(closeNextRound, 2000);
}

function closeNextRound() {
  gameRoundDiv.classList.add("hidden");
  showSequense();
}

function showSequense() {
  sequenceDiv.classList.remove("hidden");

  setTimeout(gameDuell, 2300);
}

function gameDuell() {
  sequenceDiv.classList.add("hidden");
  evectDiv.classList.add("hidden");

  showPlayerCharater();
  showComputerCharacter();

  if (
    playerObject.choice === "Schere" &&
    computerObject.choice === "Stein" // "Stein"
  ) {
    computerObject.sessionWinnerName = "computer";
    setTimeout(showSessionWinnerRockPaperScissors, 3000);
  }

  if (
    playerObject.choice === "Schere" &&
    computerObject.choice === "Papier" // "Papier"
  ) {
    playerObject.sessionWinnerName = "player";
    setTimeout(showSessionWinnerRockPaperScissors, 3000);
  }

  if (
    playerObject.choice === "Stein" &&
    computerObject.choice === "Schere" // "Schere"
  ) {
    playerObject.sessionWinnerName = "player";
    setTimeout(showSessionWinnerRockPaperScissors, 3000);
  }

  if (
    playerObject.choice === "Stein" &&
    computerObject.choice === "Papier" // "Papier"
  ) {
    computerObject.sessionWinnerName = "computer";
    setTimeout(showSessionWinnerRockPaperScissors, 3000);
  }

  if (
    playerObject.choice === "Papier" &&
    computerObject.choice === "Stein" // "Stein"
  ) {
    playerObject.sessionWinnerName = "player";
    setTimeout(showSessionWinnerRockPaperScissors, 3000);
  }

  if (
    playerObject.choice === "Papier" &&
    computerObject.choice === "Schere" // "Schere"
  ) {
    computerObject.sessionWinnerName = "computer";
    setTimeout(showSessionWinnerRockPaperScissors, 3000);
  }

  if (playerObject.choice === computerObject.choice) {
    setTimeout(equalChoice, 2000);
  }
}

function showSessionWinnerRockPaperScissors() {
  const sessionPlayerImg = document.getElementsByClassName("player-img")[0];
  sessionPlayerImg.remove();

  const sessionComputerImg = document.getElementsByClassName("computer-img")[0];
  sessionComputerImg.remove();

  if (playerObject.sessionWinnerName === "player") {
    playerObject.score = playerObject.score + 1;
    showPlayerScore.innerHTML = playerObject.score;

    if (playerObject.score === 3) {
      clearTimeout(controlTimeOut);
      gamePlayAgainQuestionDiv.innerHTML =
        "Herzlichen Glückwunsch du hast das Spiel Gewonnen.";

      setTimeout(showGamePlayAgainMainDiv, 2000);
    } else {
      sessionWinner.innerHTML = "Dieses Duell hast du gewonnen.";
      evectDiv.classList.remove("hidden");
      sessionWinnerDiv.classList.remove("hidden");
      setTimeout(backToGameRockPaperScissors, 3000);
    }
  } else {
    computerObject.score = computerObject.score + 1;
    showComputerScore.innerHTML = computerObject.score;

    if (computerObject.score === 3) {
      clearTimeout(controlTimeOut);
      gamePlayAgainQuestionDiv.innerHTML =
        "Der Computer hat das Spiel Gewonnen.";

      setTimeout(showGamePlayAgainMainDiv, 2000);
    } else {
      sessionWinner.innerHTML = "Dieses Duell hat der Computer gewonnen.";
      evectDiv.classList.remove("hidden");
      sessionWinnerDiv.classList.remove("hidden");
      setTimeout(backToGameRockPaperScissors, 3000);
    }
  }
}

function equalChoice() {
  const sessionPlayerImg = document.getElementsByClassName("player-img")[0];
  sessionPlayerImg.remove();

  const sessionComputerImg = document.getElementsByClassName("computer-img")[0];
  sessionComputerImg.remove();

  sessionWinner.innerHTML = "Unentschieden. Dieses Duell hat niemand gewonnen.";

  sessionWinnerDiv.classList.remove("hidden");
  evectDiv.classList.remove("hidden");
  setTimeout(backToGameRockPaperScissors, 3000);
}

function backToGameRockPaperScissors() {
  playerVoiceChoice.innerHTML = "";

  playerObject.sessionWinnerName = "";
  playerObject.choice = "";

  computerObject.sessionWinnerName = "";
  computerObject.choice = "";

  sessionWinner.innerHTML = "";
  sessionWinnerDiv.classList.add("hidden");
  evectDiv.classList.add("hidden");
}

function showGamePlayAgainMainDiv() {
  gamePlayAgainStandardQuestion.innerHTML =
    "Möchtest du das Spiel weiter spielen?";
  stonePaperScissorsButtonDiv.classList.add("hidden");
  voiceDiv.classList.add("hidden");
  questionDiv.classList.remove("hidden");
  gamePlayAgainQuestionMainDiv.classList.remove("hidden");
  gamePlayAgainQuestionButtonDiv.classList.remove("hidden");
}

function playAgainRockPaperScissors(answer) {
  if (answer === "ja") {
    resetGameRockPaperScissors();
    gamePlayAgainQuestionButtonDiv.classList.add("hidden");
    gamePlayAgainQuestionMainDiv.classList.add("hidden");
    buttonOrVoiceDiv.classList.remove("hidden");
  } else {
    gamePlayAgainQuestionDiv.innerHTML = "Das Spiel ist zu Ende.";
    gamePlayAgainStandardQuestion.innerHTML = "";
    gamePlayAgainQuestionButtonDiv.classList.add("hidden");
  }
}

function showPlayerCharater() {
  for (let index = 0; index < gameCharacterArray.length; index++) {
    if (playerObject.choice === gameCharacterArray[index]) {
      const player = document.getElementsByClassName("player")[0];
      const imgEl = document.createElement("img");
      imgEl.setAttribute("src", gameCharacterIMGArray[index]);
      imgEl.setAttribute("class", "player-img img-properties");
      player.appendChild(imgEl);

      if (gameCharacterArray[index] === gameCharacterArray[0]) {
        document
          .getElementsByClassName("player-img")[0]
          .classList.add("turn-around-scissors-img");
      }
    }
  }
}

function showComputerCharacter() {
  for (let index = 0; index < gameCharacterArray.length; index++) {
    if (randomComputerChoice === gameCharacterArray[index]) {
      const player = document.getElementsByClassName("computer")[0];
      const imgEl = document.createElement("img");
      imgEl.setAttribute("src", gameCharacterIMGArray[index]);
      imgEl.setAttribute("class", "computer-img img-properties");
      player.appendChild(imgEl);
    }
  }
}

function resetGameRockPaperScissors() {
  computerObject = {
    sessionWinnerName: "",
    score: 0,
    choice: "",
  };

  showComputerScore.innerHTML = computerObject.score;

  playerObject = {
    sessionWinnerName: "",
    score: 0,
    choice: "",
  };

  countGameRound = 0;

  showPlayerScore.innerHTML = playerObject.score;
  playerVoiceChoice.innerHTML = "";
}

//  Würfellabyrinth

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const localStoragePlayerKey = "playerStatus";

let timeControl;
let checkCollision = false;
let prevValueX = 0;
let prevValueY = 0;
let question;

let player = {
  level: 1,
};

const canvasProperties = {
  startX: 0,
  startY: 0,
  endX: 800,
  endY: 425,
  color: "white",
};

let redDice = {
  startX: 50,
  startY: 150,
  width: 75,
  height: 75,
  color: "red",
};

let copyRedDice = {
  currentPositionX: 0,
  currentPositionY: 0,
  width: 75,
  height: 75,
};

let goalDice = {
  startX: 500,
  startY: 150,
  width: 100,
  height: 100,
};

const obstacleLevelOne = [
  {
    startX: 280,
    startY: 100,
    width: 75,
    height: 75,
    color: "gray",
  },
  {
    startX: 280,
    startY: 176,
    width: 75,
    height: 75,
    color: "gray",
  },
  {
    startX: 280,
    startY: 252,
    width: 75,
    height: 75,
    color: "gray",
  },
];

const obstacleLevelTwo = [
  {
    startX: 220,
    startY: 172,
    width: 75,
    height: 75,
    color: "gray",
  },
  {
    startX: 220,
    startY: 248,
    width: 75,
    height: 75,
    color: "gray",
  },
  {
    startX: 220,
    startY: 325,
    width: 75,
    height: 75,
    color: "gray",
  },
  {
    startX: 400,
    startY: 25,
    width: 75,
    height: 75,
    color: "gray",
  },
  {
    startX: 400,
    startY: 101,
    width: 75,
    height: 75,
    color: "gray",
  },
  {
    startX: 400,
    startY: 177,
    width: 75,
    height: 75,
    color: "gray",
  },
];

ctx.fillStyle = canvasProperties.color;
ctx.fillRect(
  canvasProperties.startX,
  canvasProperties.startY,
  canvasProperties.endX,
  canvasProperties.endY
);

//ctx.fillStyle = redDice.color;
//ctx.fillRect(redDice.startX, redDice.startY, redDice.width, redDice.height);

/*ctx.strokeRect(
  goalDice.startX,
  goalDice.startY,
  goalDice.width,
  goalDice.height
);*/

/*if (player.level === 1) {
  drawFirstLevel();
}

if (player.level === 2) {
  drawSecondLevel();
}*/

function loadGame() {
  const loadPlayerStatus = localStorage.getItem(localStoragePlayerKey);

  console.log(loadPlayerStatus);

  if (!loadPlayerStatus) {
    console.log("Check");
    player.level = 1;
    drawFirstLevel();
  }

  if (loadPlayerStatus) {
    const editePlayerStatus = JSON.parse(loadPlayerStatus);

    question = prompt(
      "Möchtest du weiter spielen wo du aufgehört haben dann tippen die 1 sonst die 2."
    );

    if (question === "1") {
      console.log(editePlayerStatus);
      console.log(editePlayerStatus.level);
      player.level = editePlayerStatus.level;
      console.log(player);
      console.log(player.level);

      if (player.level === 1) {
        drawFirstLevel();
      }

      if (player.level === 2) {
        drawSecondLevel();
      }
    } else {
      player.level = 1;
      drawFirstLevel();
      saveGame();
    }
  }
}

function drawFirstLevel() {
  redDice = {
    startX: 100,
    startY: 150,
    width: 75,
    height: 75,
    color: "red",
  };

  ctx.fillStyle = canvasProperties.color;
  ctx.fillRect(
    canvasProperties.startX,
    canvasProperties.startY,
    canvasProperties.endX,
    canvasProperties.endY
  );

  ctx.fillStyle = redDice.color;
  ctx.fillRect(redDice.startX, redDice.startY, redDice.width, redDice.height);

  ctx.strokeRect(
    goalDice.startX,
    goalDice.startY,
    goalDice.width,
    goalDice.height
  );

  drawObstacleLevelOne();

  checkCollision = false;
}

function drawSecondLevel() {
  redDice = {
    startX: 50,
    startY: 150,
    width: 75,
    height: 75,
    color: "red",
  };

  goalDice = {
    startX: 600,
    startY: 150,
    width: 100,
    height: 100,
  };

  ctx.fillStyle = canvasProperties.color;
  ctx.fillRect(
    canvasProperties.startX,
    canvasProperties.startY,
    canvasProperties.endX,
    canvasProperties.endY
  );

  ctx.fillStyle = redDice.color;
  ctx.fillRect(redDice.startX, redDice.startY, redDice.width, redDice.height);

  ctx.strokeRect(
    goalDice.startX,
    goalDice.startY,
    goalDice.width,
    goalDice.height
  );

  drawObstacleLevelTwo();

  checkCollision = false;
}

function drawObstacleLevelOne() {
  for (let index = 0; index < obstacleLevelOne.length; index++) {
    ctx.fillStyle = obstacleLevelOne[index].color;
    ctx.fillRect(
      obstacleLevelOne[index].startX,
      obstacleLevelOne[index].startY,
      obstacleLevelOne[index].width,
      obstacleLevelOne[index].height
    );
  }
}

function drawObstacleLevelTwo() {
  for (let index = 0; index < obstacleLevelTwo.length; index++) {
    ctx.fillStyle = obstacleLevelTwo[index].color;
    ctx.fillRect(
      obstacleLevelTwo[index].startX,
      obstacleLevelTwo[index].startY,
      obstacleLevelTwo[index].width,
      obstacleLevelTwo[index].height
    );
  }
}

function move(event) {
  event.preventDefault();
  /*if (event.keyCode) {
      alert(event.keyCode);
    }*/

  /*if (even.keyCode === 13) {
      playSecondLevel();
    }*/

  if (event.keyCode === 37 && player.level === 1) {
    timeControl = setInterval(playFirstLevel("right"), 1);
  }

  if (event.keyCode === 38 && player.level === 1) {
    timeControl = setInterval(playFirstLevel("up"), 1);
  }

  if (event.keyCode === 39 && player.level === 1) {
    timeControl = setInterval(playFirstLevel("left"), 1);
  }

  if (event.keyCode === 40 && player.level === 1) {
    timeControl = setInterval(playFirstLevel("down"), 1);
  }

  if (event.keyCode === 37 && player.level === 2) {
    timeControl = setInterval(playSecondLevel("right"), 1);
  }

  if (event.keyCode === 38 && player.level === 2) {
    timeControl = setInterval(playSecondLevel("up"), 1);
  }

  if (event.keyCode === 39 && player.level === 2) {
    timeControl = setInterval(playSecondLevel("left"), 1);
  }

  if (event.keyCode === 40 && player.level === 2) {
    timeControl = setInterval(playSecondLevel("down"), 1);
  }
}

function move2(event) {
  event.preventDefault();
  let coordinateX = event.touches[0].clientX;
  let coordinateY = event.touches[0].clientY;

  if (player.level === 1) {
    if (coordinateX < prevValueX) {
      playFirstLevel("right");
      prevValueX = coordinateX;
    }

    if (coordinateX > prevValueX) {
      playFirstLevel("left");
      prevValueX = coordinateX;
    }

    if (coordinateY < prevValueY) {
      playFirstLevel("up");
      prevValueY = coordinateY;
    }

    if (coordinateY > prevValueY) {
      playFirstLevel("down");
      prevValueY = coordinateY;
    }
  }

  if (player.level === 2) {
    if (coordinateX < prevValueX) {
      playSecondLevel("right");
      prevValueX = coordinateX;
    }

    if (coordinateX > prevValueX) {
      playSecondLevel("left");
      prevValueX = coordinateX;
    }

    if (coordinateY < prevValueY) {
      playSecondLevel("up");
      prevValueY = coordinateY;
    }

    if (coordinateY > prevValueY) {
      playSecondLevel("down");
      prevValueY = coordinateY;
    }
  }
}

function stopMove() {
  clearInterval(timeControl);
}

function playFirstLevel(direction) {
  ctx.fillStyle = canvasProperties.color;
  ctx.fillRect(
    canvasProperties.startX,
    canvasProperties.startY,
    canvasProperties.endX,
    canvasProperties.endY
  );

  ctx.strokeRect(
    goalDice.startX,
    goalDice.startY,
    goalDice.width,
    goalDice.height
  );

  drawObstacleLevelOne();

  /*if (  redDice.startX + redDice.width >= goalDice.startX &&
    redDice.startY + redDice.height >= goalDice.startY &&
    redDice.startY <= goalDice.startY + goalDice.height &&
    redDice.startX <= goalDice.startX + goalDice.width &&
   
    ) {
      alert("Kolliosion");
    }*/

  if (
    redDice.startX > goalDice.startX &&
    redDice.startX < goalDice.startX + goalDice.width &&
    redDice.startY > goalDice.startY &&
    redDice.startY < goalDice.startY + goalDice.height &&
    checkCollision === false
  ) {
    alert(
      "Herzlichen Glückwunsch, du hast das rote Viereck in das Zielgebiet gebracht."
    );

    question = prompt(
      "Möchtest du weiter spielen dann tippe die 1 oder möchtest du aufhören dann tippe die 2."
    );

    if (question === "1") {
      checkCollision = true;
      player.level = 2;
      saveGame();
      drawSecondLevel();
    } else {
      checkCollision = true;
      player.level = 2;
      saveGame();
      player.level = 0;
      alert("Das Spiel ist beendet. Ihr Spielstand wird gespeichert");
      drawNull();
    }
  }

  if (
    redDice.startX + redDice.width >= obstacleLevelOne[0].startX &&
    redDice.startY + redDice.height >= obstacleLevelOne[0].startY &&
    redDice.startX <= obstacleLevelOne[0].startX + obstacleLevelOne[0].width &&
    redDice.startX + redDice.width >= obstacleLevelOne[1].startX &&
    redDice.startX <= obstacleLevelOne[1].startX + obstacleLevelOne[1].width &&
    redDice.startX + redDice.width >= obstacleLevelOne[2].startX &&
    redDice.startY <= obstacleLevelOne[2].startY + obstacleLevelOne[2].height &&
    redDice.startX <= obstacleLevelOne[2].startX + obstacleLevelOne[2].width
  ) {
    alert("Sie haben das Hindernis berührt, das Spiel beginnt von vorn.");
    restGame();
  }

  /*if (
    redDice.startX + redDice.width >= obstacleTwo[0].startX &&
    redDice.startY + redDice.height >= obstacleTwo[0].startY &&
    redDice.startX <= obstacleTwo[0].startX + obstacleTwo[0].width &&
    redDice.startX + redDice.width >= obstacleTwo[1].startX &&
    redDice.startX <= obstacleTwo[1].startX + obstacleTwo[1].width &&
    redDice.startX + redDice.width >= obstacleTwo[2].startX &&
    redDice.startY <= obstacleTwo[2].startY + obstacleTwo[2].height &&
    redDice.startX <= obstacleTwo[2].startX + obstacleTwo[2].width
  ) {
    alert("Sie haben das Hindernis berührt, das Spiel beginnt von vorn.");
    restGame();
  }*/

  /*if (
      redDice.startY + redDice.height >= goalDice.startX &&
      checkCollision === false
    ) {
      alert(
        "Herzlichen Glückwunsch, du hast die Vierecke kollidieren lassen. Das Spiel ist zu Ende."
      );
     
      checkCollision = true;
    }*/

  if (
    redDice.startX <= 0 ||
    redDice.startY <= 0 ||
    redDice.startY + redDice.height >= canvasProperties.endY ||
    redDice.startX + redDice.width >= canvasProperties.endX
  ) {
    alert("Sie verlassen das Spiel. Das Spiel beginnt von vorn.");
    restGame();
  }

  if (direction === "right") {
    ctx.fillStyle = redDice.color;
    ctx.fillRect(
      (redDice.startX = redDice.startX - 1.5),
      redDice.startY,
      redDice.width,
      redDice.height
    );

    copyRedDice.currentPositionX = redDice.startX = redDice.startX - 1.5;
    console.log(copyRedDice.currentPositionX);
  }

  if (direction === "up") {
    ctx.fillStyle = redDice.color;
    ctx.fillRect(
      redDice.startX,
      (redDice.startY = redDice.startY - 1.5),
      redDice.width,
      redDice.height
    );

    copyRedDice.currentPositionY = redDice.startY = redDice.startY - 1.5;
    console.log(copyRedDice.currentPositionY);
  }

  if (direction === "left") {
    ctx.fillStyle = redDice.color;
    ctx.fillRect(
      (redDice.startX = redDice.startX + 1.5),
      redDice.startY,
      redDice.width,
      redDice.height
    );

    copyRedDice.currentPositionX = redDice.startX = redDice.startX + 1.5;
    console.log(copyRedDice.currentPositionX);
  }

  if (direction === "down") {
    ctx.fillStyle = redDice.color;
    ctx.fillRect(
      redDice.startX,
      (redDice.startY = redDice.startY + 1.5),
      redDice.width,
      redDice.height
    );

    copyRedDice.currentPositionY = redDice.startY = redDice.startY + 1.5;
    console.log(copyRedDice.currentPositionY);
  }
}

function playSecondLevel(direction) {
  ctx.fillStyle = canvasProperties.color;
  ctx.fillRect(
    canvasProperties.startX,
    canvasProperties.startY,
    canvasProperties.endX,
    canvasProperties.endY
  );

  ctx.strokeRect(600, goalDice.startY, goalDice.width, goalDice.height);

  drawObstacleLevelTwo();

  /*if (  redDice.startX + redDice.width >= goalDice.startX &&
    redDice.startY + redDice.height >= goalDice.startY &&
    redDice.startY <= goalDice.startY + goalDice.height &&
    redDice.startX <= goalDice.startX + goalDice.width &&
   
    ) {
      alert("Kolliosion");
    }*/

  if (
    redDice.startX > goalDice.startX &&
    redDice.startX < goalDice.startX + goalDice.width &&
    redDice.startY > goalDice.startY &&
    redDice.startY < goalDice.startY + goalDice.height &&
    checkCollision === false
  ) {
    alert(
      "Herzlichen Glückwunsch, du hast das rote Viereck in das Zielgebiet gebracht."
    );
    checkCollision = true;
    question = prompt(
      "Möchtest du das Spiel von vorne spielen dann tippe die 1 oder möchtest du das Spiel beenden dann tippe die 2."
    );

    if (question === "1") {
      player.level = 1;
      saveGame();
      drawFirstLevel();
    } else {
      player.level = 1;
      saveGame();
      alert("Das Spiel ist zu Ende.");
      drawNull();
    }
  }

  /*if (
    redDice.startX + redDice.width >= obstacleLevelOne[0].startX &&
    redDice.startY + redDice.height >= obstacleLevelOne[0].startY &&
    redDice.startX <= obstacleLevelOne[0].startX + obstacleLevelOne[0].width &&
    redDice.startX + redDice.width >= obstacleLevelOne[1].startX &&
    redDice.startX <= obstacleLevelOne[1].startX + obstacleLevelOne[1].width &&
    redDice.startX + redDice.width >= obstacleLevelOne[2].startX &&
    redDice.startY <= obstacleLevelOne[2].startY + obstacleLevelOne[2].height &&
    redDice.startX <= obstacleLevelOne[2].startX + obstacleLevelOne[2].width
  ) {
    alert("Sie haben das Hindernis berührt, das Spiel beginnt von vorn.");
    restGame();
  }*/

  if (
    redDice.startX + redDice.width >= obstacleLevelTwo[0].startX &&
    redDice.startY + redDice.height >= obstacleLevelTwo[0].startY &&
    redDice.startX <= obstacleLevelTwo[0].startX + obstacleLevelTwo[0].width &&
    redDice.startX + redDice.width >= obstacleLevelTwo[1].startX &&
    redDice.startX <= obstacleLevelTwo[1].startX + obstacleLevelTwo[1].width &&
    redDice.startX + redDice.width >= obstacleLevelTwo[2].startX &&
    redDice.startX <= obstacleLevelTwo[2].startX + obstacleLevelTwo[2].width
  ) {
    alert("Sie haben das Hindernis berührt, das Spiel beginnt von vorn.");
    restGame();
  }

  if (
    redDice.startX + redDice.width >= obstacleLevelTwo[3].startX &&
    redDice.startX <= obstacleLevelTwo[3].startX + obstacleLevelTwo[3].width &&
    redDice.startX + redDice.width >= obstacleLevelTwo[4].startX &&
    redDice.startX <= obstacleLevelTwo[4].startX + obstacleLevelTwo[4].width &&
    redDice.startX + redDice.startX >= obstacleLevelTwo[5].startX &&
    redDice.startY <= obstacleLevelTwo[5].startY + obstacleLevelTwo[5].height &&
    redDice.startX <= obstacleLevelTwo[5].startX + obstacleLevelTwo[5].width
  ) {
    alert("Sie haben das Hindernis berührt, das Spiel beginnt von vorn.");
    restGame();
  }

  /*if (
      redDice.startY + redDice.height >= goalDice.startX &&
      checkCollision === false
    ) {
      alert(
        "Herzlichen Glückwunsch, du hast die Vierecke kollidieren lassen. Das Spiel ist zu Ende."
      );
     
      checkCollision = true;
    }*/

  if (
    redDice.startX <= 0 ||
    redDice.startY <= 0 ||
    redDice.startY + redDice.height >= canvasProperties.endY ||
    redDice.startX + redDice.width >= canvasProperties.endX
  ) {
    alert("Sie verlassen das Spiel. Das Spiel beginnt von vorn.");
    restGame();
  }

  if (direction === "right") {
    ctx.fillStyle = redDice.color;
    ctx.fillRect(
      (redDice.startX = redDice.startX - 1.5),
      redDice.startY,
      redDice.width,
      redDice.height
    );
  }

  if (direction === "up") {
    ctx.fillStyle = redDice.color;
    ctx.fillRect(
      redDice.startX,
      (redDice.startY = redDice.startY - 1.5),
      redDice.width,
      redDice.height
    );
  }

  if (direction === "left") {
    ctx.fillStyle = redDice.color;
    ctx.fillRect(
      (redDice.startX = redDice.startX + 1.5),
      redDice.startY,
      redDice.width,
      redDice.height
    );
  }

  if (direction === "down") {
    ctx.fillStyle = redDice.color;
    ctx.fillRect(
      redDice.startX,
      (redDice.startY = redDice.startY + 1.5),
      redDice.width,
      redDice.height
    );
  }
}

/*if (
    redDice.startX > goalDice.startX &&
    redDice.startX < goalDice.startX + goalDice.width &&
    redDice.startY > goalDice.startY &&
    redDice.startY < goalDice.startY + goalDice.height
  ) {
    alert("Kolliosion");
  }*/

/*if (redDice.startX > goalDice.startY + goalDice.height) {
    alert();
  }*/

function restGame() {
  if (player.level === 1) {
    ctx.fillStyle = canvasProperties.color;
    ctx.fillRect(0, 0, innerWidth, innerHeight);

    ctx.strokeRect(500, goalDice.startY, goalDice.width, goalDice.height);

    drawObstacleLevelOne();

    redDice.startX = 50;
    redDice.startY = 150;

    ctx.fillStyle = redDice.color;
    ctx.fillRect(redDice.startX, redDice.startY, 75, 75);

    checkCollision = false;
  }

  if (player.level === 2) {
    ctx.fillStyle = canvasProperties.color;
    ctx.fillRect(0, 0, innerWidth, innerHeight);

    ctx.strokeRect(600, goalDice.startY, goalDice.width, goalDice.height);

    drawObstacleLevelTwo();

    redDice.startX = 50;
    redDice.startY = 150;

    ctx.fillStyle = redDice.color;
    ctx.fillRect(redDice.startX, redDice.startY, 75, 75);

    checkCollision = false;
  }
}

function drawNull() {
  ctx.fillStyle = canvasProperties.color;
  ctx.fillRect(
    canvasProperties.startX,
    canvasProperties.startY,
    canvasProperties.endX,
    canvasProperties.endY
  );
}

function saveGame() {
  localStorage.setItem(localStoragePlayerKey, JSON.stringify(player));
  alert("Das Spiel wurde gespeichert.");
}

/*function action() {
  ctx.fillStyle = "white";
  ctx.fillRect(
    copyRedDice.currentPositionX,
    copyRedDice.currentPositionY,
    80,
    80
  );
}*/

//window.move = move;
//window.move2 = move2;
//window.stopMove = stopMove;
