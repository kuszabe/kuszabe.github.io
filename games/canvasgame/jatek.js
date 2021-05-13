function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

let gombok = {jobb:false, bal:false, fel:false, le:false}

function move(gomb) {
	switch (gomb) {
		case 37:
			gombok.bal = true
		break;
		
		case 38:
			gombok.fel = true
		break;
		
		case 39:
			gombok.jobb = true
		break;
		
		case 40:
			gombok.le = true
		break;
		
		case -37:
			gombok.bal = false
		break;
		
		case -38:
			gombok.fel = false
		break;
		
		case -39:
			gombok.jobb = false
		break;
		
		case -40:
			gombok.le = false
		break;
		
	}
}

function changeGravity(ertek) {
	myGamePiece.gravity += ertek
}

function changeSpeed(ertek) {
	myGamePiece.speed += ertek
	console.log(myGamePiece.speed)
	console.log(player.boosts.speed)
}

function everyinterval(n) {
  if ((myGameArea.szamlalo / n) % 1 == 0) {return true;}
  return false;
}

function newCoin(x, y) {
	let id = akadalyok.length
	pluszok.coins.push({indexId:id});
	akadalyok.push(new component(myGameArea.meret * 10, myGameArea.meret * 10, "coin.png", x, y, "image", id));
}

function newStopBoost(x, y) {
	let id = akadalyok.length
	pluszok.stopboosts.push({indexId:id});
	akadalyok.push(new component(myGameArea.meret * 10, myGameArea.meret * 10, "stopboost.png", x, y, "image", id));
}

function newGravBoost(x, y) {
	let id = akadalyok.length
	pluszok.gravityboosts.push({indexId:id});
	akadalyok.push(new component(myGameArea.meret * 10, myGameArea.meret * 10, "gravboost.png", x, y, "image", id));
}

function newSpeedBoost(x, y) {
	let id = akadalyok.length
	pluszok.speedboosts.push({indexId:id});
	akadalyok.push(new component(myGameArea.meret * 10, myGameArea.meret * 10, "speedboost.png", x, y, "image", id));
}


let myGamePiece,akadalyok,akadalyimg,falimg,speedactive,gravityactive,stopactive;
let pluszok = {
	coins:[],
	speedboosts:[],
	gravityboosts:[],
	stopboosts:[],
	erinted: function() {
		pluszok.coins.forEach(function (item, index) {
			if (myGamePiece.crashWith(akadalyok[item.indexId])) {
				console.log("találtam coint")
				akadalyok.splice(item.indexId, 1)
				pluszok.coins.splice(index, 1)
				player.coins++
			}
		})
		
		pluszok.speedboosts.forEach(function (item, index) {
			if (myGamePiece.crashWith(akadalyok[item.indexId])) {
				console.log("vizsgálom a speedeket")
				akadalyok.splice(item.indexId, 1)
				pluszok.speedboosts.splice(index, 1)
				player.boosts.speed++
			}
		})
		
		pluszok.stopboosts.forEach(function (item, index) {
			if (myGamePiece.crashWith(akadalyok[item.indexId])) {
				akadalyok.splice(item.indexId, 1)
				console.log("vizsgálom a stopokat")
				pluszok.stopboosts.splice(index, 1)
				player.boosts.stop++
			}	
		})		
				
		pluszok.gravityboosts.forEach(function (item, index) {
			if (myGamePiece.crashWith(akadalyok[item.indexId])) {
				console.log("vizsgálom a gravityket")
				akadalyok.splice(item.indexId, 1)
				pluszok.gravityboosts.splice(index, 1)
				player.boosts.gravity++
			}
		})
		
	},
	ujboost: function(x,y) {
		switch (getRandom(1,10)) {
					case 1:
						newCoin(x,y-20);
						newCoin(x+20,y-20);
						newCoin(x+40,y-20);
					break;
					case 2:
						newCoin(x,y-20);
						newCoin(x+20,y-20);
						newCoin(x+40,y-20);
					break;
					case 3:
						newCoin(x,y-20);
						newCoin(x+20,y-20);
						newCoin(x+40,y-20);
					break;
					case 4:
						newCoin(x,y-20);
						newCoin(x+20,y-20);
						newCoin(x+40,y-20);
					break;
					case 5:
						newCoin(x,y-20);
						newCoin(x+20,y-20);
						newCoin(x+40,y-20);
					break;
					case 6:
						newCoin(x,y-20);
						newCoin(x+20,y-20);
						newCoin(x+40,y-20);
					break;
					case 7:
						newSpeedBoost(x,y-20);
					break;
					case 8:
						newSpeedBoost(x,y-20);
					break;
					case 9:
						newGravBoost(x,y-20);
					break;
					case 10:
						newStopBoost(x,y-20);
					break;
					
				}
	}
}

let player = {
	boosts: {
		speed:3,
		gravity:2,
		stop:1
	},
	coins:0,
	highscrore:0,
	medals:[],
	costum:[
	{type:"player", name:"Starter", src:"starterplayer.jpg", selected:true},
	{type:"lap", name:"Lava stage", src:"lavast.png", selected:false},
	{type:"lap", name:"Common stage", src:"fulap.jpg", selected:true},
	{type:"fal", name:"Common block", src:"foldkocka.jpg", selected:true},
	]
	
}

function startGame() {
	let playerimg = player.costum.find(function (item) {
		return item.type=="player" && item.selected == true
	})
	akadalyimg = player.costum.find(function (item) {
		return item.type=="lap" && item.selected == true
	})
	falimg = player.costum.find(function (item) {
		return item.type=="fal" && item.selected == true
	})
	
	akadalyok = []
    myGamePiece = new component(myGameArea.meret * 10, myGameArea.meret * 20, playerimg.src, 50, 2, "image");
    akadalyok.push(new component(myGameArea.meret * 200, myGameArea.meret * 10, akadalyimg.src, 200, 240, "image", "player"));
    akadalyok.push(new component(myGameArea.meret * 200, myGameArea.meret * 10, akadalyimg.src, 100, 180, "image", akadalyok.length));
	akadalyok.push(new component(myGameArea.meret * 200, myGameArea.meret * 10, akadalyimg.src, 200, 50, "image", akadalyok.length));
    akadalyok.push(new component(myGameArea.meret * 200, myGameArea.meret * 10, akadalyimg.src, 300, 115, "image", akadalyok.length));
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 500 * this.meret;
        this.canvas.height = 300 * this.meret;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
		window.addEventListener('keydown', function (e) {
            move(e.keyCode);
			myGameArea.key = e.keyCode
        })
        window.addEventListener('keyup', function (e) {
            move(-e.keyCode);
			myGameArea.key = false
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
	stop : function() {
		clearInterval(this.interval);
		this.clear()
		console.log("megálltam")
	},
	szamlalo:0,
	meret:1.5
}

function component(width, height, color, x, y, type, indexid) {
	this.indexId = indexid
	if (akadalyok.findIndex(function (item) {
		return item.indexId == this.indexId
	})) {
		this.type = type;
		if (type == "image") {
				this.image = new Image();
				this.image.src = color;
		}
		this.width = width;
		this.height = height;
		this.speedX = 0;
		this.speedY = 0;
		this.x = x;
		this.indexId = akadalyok.length
		this.y = y;
		this.speed = 3
		this.gravity = 0.045;
		this.gravitySpeed = 0;
		this.update = function() {
			ctx = myGameArea.context;
			if (type == "image") {
				ctx.drawImage(this.image,
				this.x,
				this.y,
				this.width, this.height);
			} else {
				ctx.fillStyle = color;
				ctx.fillRect(this.x, this.y, this.width, this.height);
			}
		}
		this.newPos = function() {
			this.gravitySpeed += this.gravity;
			this.x += this.speedX;
			this.y += this.speedY + this.gravitySpeed;
			this.hitBottom();
			akadalyok.forEach(function (item) {
				myGamePiece.onObject(item)
			})
		}  
		this.hitBottom = function() {
			var rockbottom = myGameArea.canvas.height;
			if (this.y > rockbottom) {
				myGameArea.stop()
			}
		}
		this.crashWith = function(otherobj) {
			var myleft = this.x;
			var myright = this.x + (this.width);
			var mytop = this.y;
			var mybottom = this.y + (this.height);
			var otherleft = otherobj.x;
			var otherright = otherobj.x + (otherobj.width);
			var othertop = otherobj.y;
			var otherbottom = otherobj.y + (otherobj.height);
			var crash = true;
			if ((mybottom < othertop) ||
			(mytop > otherbottom) ||
			(myright < otherleft) ||
			(myleft > otherright)) {
			  crash = false;
			}
			return crash;
		}
		
		this.onObject = function(otherobj) {
			var myleft = this.x;
			var myright = this.x + (this.width);
			var mytop = this.y;
			var mybottom = this.y + (this.height);
			var otherleft = otherobj.x;
			var otherright = otherobj.x + (otherobj.width);
			var othertop = otherobj.y;
			var otherbottom = otherobj.y + (otherobj.height);
			if ((othertop < mytop) && this.crashWith(otherobj)) {
				this.y = otherbottom
			} else if ((mybottom > othertop) && this.crashWith(otherobj) && (othertop > mytop)) {
				this.y = othertop - (this.height);
				this.gravitySpeed = 0
			}
		}	
	} else {console.error("nem jöttem létre😒")}
}

function updateGameArea() {
	pluszok.erinted()
	myGameArea.clear();
	myGamePiece.speedX = 0;
	myGamePiece.speedY = 0;
	if (gombok.bal) {myGamePiece.speedX = -myGamePiece.speed; }
	if (gombok.jobb) {myGamePiece.speedX = myGamePiece.speed; }
	if (gombok.fel) {myGamePiece.speedY = -myGamePiece.speed; }
	if (gombok.le) {myGamePiece.speedY = myGamePiece.speed; }
	if (myGameArea.key && myGameArea.key == 66 && !speedactive) {
		if (player.boosts.speed > 0) {
			player.boosts.speed += -1
			changeSpeed(1)
			speedactive = true
			setTimeout(function(){speedactive = false}, 500)
			setTimeout(function(){changeSpeed(-1)}, 7000)
		}
	}
	if (myGameArea.key && myGameArea.key == 71 && !gravityactive) {
		if (player.boosts.gravity > 0) {
			player.boosts.gravity += -1
			changeGravity(-0.04)
			gravityactive = true
			setTimeout(function(){gravityactive = false}, 500)
			setTimeout(function(){changeGravity(0.04)}, 7000)
		}
	}
	if (myGameArea.key && myGameArea.key == 78 && !stopactive) {
		if (player.boosts.stop > 0) {
			player.boosts.stop += -1
			stopactive = true
			setTimeout(function(){stopactive = false}, 7000)
		}
	}
	myGamePiece.newPos();
	myGamePiece.update()
	if (!stopactive) {
		myGamePiece.x += -0.5
		myGameArea.szamlalo++
	}
		akadalyok.forEach(function (item) {
				if (!stopactive) {
					item.x += -0.5
				}
				item.update()
		})
	document.getElementById("szamlalo").innerText = myGameArea.szamlalo         
	document.getElementById("speed").innerText = myGamePiece.gravity         
	document.getElementById("speedactive").innerText = gravityactive         
	if (myGameArea.szamlalo == 1 || everyinterval(myGameArea.meret * 150)) {
		x = myGameArea.canvas.width;
		y = getRandom(30, myGameArea.canvas.height - 20)
		switch (getRandom(1,5)) {
			case 1:
				akadalyok.push(new component(myGameArea.meret * 50, myGameArea.meret * 10, akadalyimg.src, x, y, "image", akadalyok.length));
			break;
			
			case 2:
				akadalyok.push(new component(myGameArea.meret * 100, myGameArea.meret * 20, akadalyimg.src, x, y, "image", akadalyok.length));
			break;
			
			case 3:
				console.log(akadalyok.length)
				akadalyok.push(new component(myGameArea.meret * 50, myGameArea.meret * 10, akadalyimg.src, x, y, "image", akadalyok.length));
				console.log(akadalyok.length)
				pluszok.ujboost(x,y)
				console.log(akadalyok.length)
			break;
			
			case 4:
				akadalyok.push(new component(myGameArea.meret * 75, myGameArea.meret * 75, falimg.src, x, y, "image", akadalyok.length));
			break;
			
			case 5:
				akadalyok.push(new component(myGameArea.meret * 50, myGameArea.meret * 10, akadalyimg.src, x, y-30, "image", akadalyok.length));
				akadalyok.push(new component(myGameArea.meret * 10, myGameArea.meret * 50, falimg.src, x+40, y-20, "image", akadalyok.length));
				akadalyok.push(new component(myGameArea.meret * 50, myGameArea.meret * 10, akadalyimg.src, x, y+20, "image", akadalyok.length));
			break;
		}
	}
}