var sw = 20,//方格子宽
    sh = 20,//方格子高
    tr = 30,//行
    td = 30,//列
    food = null,
    snak = null,
    move = null,
    die = null,
    eat = null,
    game;
function Block(x, y, classname) {
    this.x = x * sw;
    this.y = y * sh;
    this.elem = document.createElement('div');
    this.parent = document.getElementById('content');
    this.elem.className = classname;
}
Block.prototype.creat = function () {
    this.elem.style.position = 'absolute';
    this.elem.style.height = sh + 'px';
    this.elem.style.width = sw + 'px';
    this.elem.style.left = this.x + 'px';
    this.elem.style.top = this.y + 'px';
    this.parent.appendChild(this.elem);
};
Block.prototype.reMove = function () {
    this.parent.removeChild(this.elem);
};

function Snake() {
    this.head = null;
    this.tail = null;
    this.pos = [];
    this.directions = {
        right: {
            x: 1,
            y: 0,
            rotate: 0
        },
        left: {
            x: -1,
            y: 0,
            rotate: 180
        },
        up: {
            x: 0,
            y: -1,
            rotate: -90
        },
        down: {
            x: 0,
            y: 1,
            rotate: 90
        }
    }
}
Snake.prototype.init = function () {
    var snakeHead = new Block(2, 0, 'snakeHead');
    
    snakeHead.creat();
    this.head = snakeHead;
    this.pos.push([2, 0]);
    

    var snakeBody1 = new Block(1, 0, 'snakeBody');
    snakeBody1.creat();
    this.pos.push([1, 0]);

    var snakeBody2 = new Block(0, 0, 'snakeBody');
    snakeBody2.creat();
    this.tail = snakeBody2;
    this.pos.push([0, 0]);

    snakeHead.next = null;
    snakeHead.last = snakeBody1;

    snakeBody1.next = snakeHead;
    snakeBody1.last = snakeBody2;

    snakeBody2.next = snakeBody1;
    snakeBody2.last = null;

    this.direction = this.directions.right;
}
Snake.prototype.getNextPos = function () {
    var nextPos = [this.head.x / sw + this.direction.x, this.head.y / sh + this.direction.y];

    var isSelf = false;
    this.pos.forEach(function (value) {
        if (value[0] == nextPos[0] && value[1] == nextPos[1]) {
            ifSelf = true;
        }
    });
    if (isSelf) {
        game.over();;
        return;
    }

    if (nextPos[0] < 0 || nextPos[0] > tr-1 || nextPos[1] < 0 || nextPos[1] > td-1) {
        game.over();
        return;
    }
    if(food && food.pos[0] == nextPos[0] && food.pos[1] == nextPos[1]){
        this.nextDoing.eat.call(this);
		return;
    }

    this.nextDoing.move.call(this);
}
Snake.prototype.nextDoing = {
    move: function(format){
       var newBody = new Block(this.head.x / sw,this.head.y / sh,'snakeBody');
       newBody.last = this.head.last;
        newBody.last.next = newBody;
        newBody.next = null;
        this.head.reMove();
        newBody.creat();
        console.log(this.direction.x,this.direction.y);
        var newHead = new Block(this.head.x / sw + this.direction.x,this.head.y/sh + this.direction.y,'snakeHead');
        newHead.next = null;
        newHead.last = newBody;
        newBody.next = newHead;
        newHead.elem.style.transform = 'rotate(' + this.direction.rotate + 'deg)';
        newHead.creat();

        this.pos.splice(0,0,[this.head.x / sw + this.direction.x,this.head.y/sh + this.direction.y]);
        this.head = newHead;

        if(!format){
            this.tail.reMove();
            this.tail = this.tail.next;
            this.pos.pop();
        }
    },
    eat: function(){
        this.nextDoing.move.call(this,true);
        creatFood();
        game.score ++;
    },
    die: function(){
        game.over();
    }
};
snake = new Snake();
function creatFood() {
    var foodX = null,
        foodY = null,
        isSelf = true;
    while (isSelf) {
        foodX = Math.round(Math.random() * (tr - 1));
        foodY = Math.round(Math.random() * (td - 1));
        snake.pos.forEach(function (value) {
            if (value[0] != foodX && value[1] != foodY) {
                isSelf = false;
            }
        });
    }
    food = new Block(foodX, foodY, 'food');
    food.pos = [foodX, foodY];

    var foodDom = document.querySelector('.food');
    if (foodDom) {
		foodDom.style.left = foodX * sw + 'px';
		foodDom.style.top = foodY * sh + 'px';
	} else {
		food.creat();
	}
}
function Game() {
    this.timer = null;
    this.score = 0;
}

Game.prototype.init = function () {
    snake.init();
    creatFood();
    document.onkeydown = function (ev) {
        if (ev.which == 37 && snake.direction != snake.directions.right) {
            snake.direction = snake.directions.left;
        } else if (ev.which == 38 && snake.direction != snake.directions.down) {
            snake.direction = snake.directions.up;
        } else if (ev.which == 39 && snake.direction != snake.directions.left) {
            snake.direction = snake.directions.right;
        }
        else if (ev.which == 40 && snake.direction != snake.directions.up) {
            snake.direction = snake.directions.down;
        }
    }
    this.start();
}
Game.prototype.start = function () {
    // this.timer = setTimeout(function () {
    this.timer = setInterval(function () {
        snake.getNextPos();
    }, 300);
}
Game.prototype.pause = function () {
    clearInterval(this.timer);
}
Game.prototype.over = function(){
    clearInterval(this.timer);
    alert('你的得分为：' + this.score);
    var snakeCont = document.getElementById('content');
    snakeCont.innerHTML = '';
    snake = new Snake();
    game = new Game();
    var startBtn = document.querySelector('.start button');
    startBtn.style.dispaly = 'block';
}
game = new Game();
//开始
var startBtn = document.querySelector('.start button');
    startBtn.onclick = function(){
        startBtn.parentNode.style.display = 'none';
        game.init();
    }
//暂停
var stopCont = document.querySelector('#content');
var stopBtn = document.querySelector('.stop button');
    stopCont.onclick = function(){
        stopBtn.parentNode.style.dispaly = "block";
        game.pause();;
    }
    stopBtn.onclick = function(){
        stopBtn.parentNode.style.display = 'none';
        game.start();
    }
