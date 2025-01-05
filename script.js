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

  if (coordinateX < prevValueX && player.level === 1) {
    playFirstLevel("right");
    prevValueX = coordinateX;
  }

  if (coordinateX > prevValueX && player.level === 1) {
    playFirstLevel("left");
    prevValueX = coordinateX;
  }

  if (coordinateY < prevValueY && player.level === 1) {
    playFirstLevel("up");
    prevValueY = coordinateY;
  }

  if (coordinateY > prevValueY && player.level === 1) {
    playFirstLevel("down");
    prevValueY = coordinateY;
  }

  if (coordinateX < prevValueX && player.level === 2) {
    playSecondLevel("right");
    prevValueX = coordinateX;
  }

  if (coordinateX > prevValueX && player.level === 2) {
    playSecondLevel("left");
    prevValueX = coordinateX;
  }

  if (coordinateY < prevValueY && player.level === 2) {
    playSecondLevel("up");
    prevValueY = coordinateY;
  }

  if (coordinateY > prevValueY && player.level === 2) {
    playSecondLevel("down");
    prevValueY = coordinateY;
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
  alert("Das Spiel wirde gespeichert.");
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
