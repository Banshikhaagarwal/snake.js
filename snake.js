size = innerHeight * 0.9;
// gameOn = false;
startGame = false;
game_over = false;
function init() {
  canvas = document.getElementById("mycanvas");
  W = H = canvas.width = canvas.height = size;
  ctx = canvas.getContext("2d");
  cs = size / 20;
  score = 5;
  game_over = false;

  food_img = new Image();
  food_img.src = "Assets/apple.png";

  trophy_img = new Image();
  trophy_img.src = "Assets/trophy.png";

  food = getRandomFood();
  snake = {
    init_len: 5,
    color: "blue",
    cells: [],
    direction: "right",
    cs: 66,

    createSnake: function () {
      //   console.log("hehe");
      for (var i = this.init_len; i > 0; i--) {
        this.cells.push({ x: i, y: 0 });
      }
    },
    drawSnake: function () {
      //   console.log("hehesda");
      for (var i = 0; i < this.cells.length; i++) {
        ctx.fillStyle = this.color;
        ctx.fillRect(
          this.cells[i].x * cs,
          this.cells[i].y * cs,
          cs - 2,
          cs - 2
        );
      }
    },
    updateSnake: function () {
      var headX = this.cells[0].x;
      var headY = this.cells[0].y;

      if (headX == food.x && headY == food.y) {
        food = getRandomFood();
        score++;
      } else {
        this.cells.pop();
      }

      var nextX, nextY;

      if (this.direction == "right") {
        nextX = headX + 1;
        nextY = headY;
      } else if (this.direction == "left") {
        nextX = headX - 1;
        nextY = headY;
      } else if (this.direction == "up") {
        nextX = headX;
        nextY = headY - 1;
      } else {
        nextX = headX;
        nextY = headY + 1;
      }

      this.cells.unshift({ x: nextX, y: nextY });
      var last_x = Math.round(W / cs);
      var last_y = Math.round(H / cs);
      console.log(
        this.cells[0].y < 0 ||
          this.cells[0].x < 0 ||
          this.cells[0].x > last_x ||
          this.cells[0].y > last_y
      );

      if (
        this.cells[0].y < 0 ||
        this.cells[0].x < 0 ||
        this.cells[0].x > last_x ||
        this.cells[0].y > last_y
      ) {
        game_over = true;
      }
    },
  };
  snake.createSnake();
  function keyPressed(e) {
    if (e.key == "ArrowRight") {
      snake.direction = "right";
    } else if (e.key == "ArrowLeft") {
      snake.direction = "left";
    } else if (e.key == "ArrowDown") {
      snake.direction = "down";
    } else if (e.key == "ArrowUp") {
      snake.direction = "up";
    }
  }
  document.addEventListener("keydown", keyPressed);
}

function draw() {
  ctx.clearRect(0, 0, W, H);
  snake.drawSnake();
  ctx.fillStyle = food.color;
  ctx.drawImage(food_img, food.x * cs, food.y * cs, cs, cs);
  ctx.drawImage(trophy_img, 18, 20, cs, cs);
  ctx.fillStyle = "Blue";
  ctx.font = "20px Roboto";
  ctx.fillText(score, 50, 50);
}

function getRandomFood() {
  var foodX = Math.round((Math.random() * (W - cs)) / cs);
  var foodY = Math.round((Math.random() * (H - cs)) / cs);

  var food = {
    x: foodX,
    y: foodY,
    color: "red",
  };
  return food;
}
function gameloop() {
  size = innerHeight * 0.9;
  cs = size / 20;
  canvas.width = canvas.height = size;
  draw();

  if (startGame) {
    if (game_over == true) {
      clearInterval(f);
      alert("Game Over");
      return;
    }
    // draw();
    snake.updateSnake();
  }
}

init();

var f = setInterval(gameloop, 100);

document.addEventListener("keydown", function (event) {
  if (event.code === "Space") {
    // Run the game here
    startGame = true;
  }
});
