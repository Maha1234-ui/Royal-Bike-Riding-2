var bgImg, Bg;
var playerImg, player;
var edges;
var vehicle, amb1Img;
var amb2Img, citybusImg, coinImg, redcarImg,sclbusImg;
var vehicleGroup;
var bluecarImg, bluecar;
var score = 0;
var coin, coinGroup;
var gameState = "play";
var gameoverImg, gameover;
var distance = 0;

function preload(){
resetImg = loadImage("reset.png");
coinSound = loadSound("coin.mp3");
GOSound = loadSound("gameend.m4a");
fantSound = loadSound("fantastic.m4a");
goodSound = loadSound("good.m4a");
gbSound = loadSound("greatjob.m4a");
hitSound = loadSound("metal.mp3");
goImg = loadImage("gameover.png");
sckImg = loadImage("sck.png")
bgImg = loadImage("8.webp");
gameoverImg = loadImage("gameover.png")
playerImg = loadImage("player.png");  
amb1Img = loadImage("ambulance 1.png");  
citybusImg = loadImage("citybus.png");
coinImg = loadImage("coin.png");
redcarImg = loadImage("red car.png");
sclbusImg = loadImage("scl bus.png");
bluecarImg = loadImage("bluecar.png");
wonderSound = loadSound("wonderful.m4a")
bgmusic = loadSound("bgmusic.mp3");
}

function setup(){
createCanvas(1000,800);

//background Animation of the game
Bg = createSprite(500,400,800,800);
Bg.addAnimation("moving", bgImg);
Bg.scale = 1.5;
//Bg.velocityY = 2;

//Player Character
player = createSprite(515,670,20,20);
player.addImage(playerImg);
player.scale = 0.4;
//player.debug = "true";
player.setCollider("rectangle", 0,0,200,400);

edges = createEdgeSprites();

//Display reset button
reset = createSprite(500,500,20,20);
reset.addImage(resetImg);
reset.scale = 0.5
reset.visible = false;

//Display gameover button
gameover = createSprite(500,200,20,20);
gameover.addImage(gameoverImg);
gameover.visible = false;
gameover.scale = 0.3;

//create groups for the vehicle and the coin
vehicleGroup = new Group();
coinGroup = new Group();
bgmusic.loop();

}

function draw(){
   background("black");

//  play state
if(gameState === "play"){

// Control the player
if(keyDown("RIGHT_ARROW")){
   player.x = player.x+5;

}

if(keyDown("LEFT_ARROW")){
   player.x = player.x-5;
}

//To make the player stay inside the canvas
player.bounceOff(edges);

// To calculate the distance, covered by the player
distance = distance+Math.round(getFrameRate()/60)

//To add the sounds for particular distance
if(distance === 400){
   goodSound.play();

}
if(distance === 800){
   goodSound.play();
}

if(distance === 1200){
   gbSound.play();
}

if(distance === 1600){
   gbSound.play();
}

if(distance === 2000){
   fantSound.play();
}
if(distance === 2400){
   fantSound.play();
}
if(distance === 2800){
   wonderSound.play();
}
if(distance === 3200){
   wonderSound.play();
}

//display coin and vehicle function
  Coin();
  spawnVehicles();

//To increase the score
  if(coinGroup.isTouching(player)){
     score++;
     coinSound.play();
     coinGroup.destroyEach();
  }
  
  // To End the game
  if(vehicleGroup.isTouching(player)){
     gameState = "end";
     GOSound.play();
     bgmusic.stop();

  }
}
// End state
 else if(gameState === "end"){
   reset.visible = true
   gameover.visible = true
   // background("black");
    vehicleGroup.destroyEach();
    coinGroup.destroyEach();
    Bg.visible = false
    player.visible = false
     
//to restart the game
if(mousePressedOver(reset)){
   gameState = "play";
   bgmusic.play();
   Reset();
}
  }

  drawSprites();
  fill("white")
  textSize(15)
  text("Right",600,670);
  text("Left",400,670)
  fill("#ffff00");
  textSize(30);
  textFont('showcard gothic')
  text("Score : "+score,790,90 );
  text("Distance : "+distance,140,90);

}

function spawnVehicles(){
if(frameCount % 125 === 0){
   vehicle = createSprite(515,400,40,40);
   //vehicle.debug = "true";
   vehicle.velocityY = 2;
   Math.round(getFrameRate()/60);
    vehicle.velocityY = (2 + 1*score/5);
   vehicle.setCollider("rectangle",0,0,200,200);
   vehicle.x = Math.round(random(200,800));
   var rand = Math.round(random(1,6));
   switch(rand){
      case 1: vehicle.addImage(amb1Img);
      break;
      case 2: vehicle.addImage(sckImg);
      break;
      case 3: vehicle.addImage(citybusImg);
      break;
      case 4: vehicle.addImage(sclbusImg);
      break;
      case 5: vehicle.addImage(redcarImg);
      break;
      case 6: vehicle.addImage(bluecarImg);
      break;
default:break
   }
   vehicle.scale = 0.5
   vehicleGroup.add(vehicle);
   vehicle.lifetime = 200;
}

}

function Coin(){
if(frameCount % 117 === 0){
 coin = createSprite(515,400,40,40);
 coin.velocityY = 2.5;
 coin.x = Math.round(random(200,750));
 coin.addImage(coinImg);
 coin.scale = 0.1
 coin.lifetime = 200;
 coinGroup.add(coin);

}
}

function Reset(){

gameState = "play";
gameover.visible = false;
reset.visible = false;
coinGroup.destroyEach();
vehicleGroup.destroyEach();
score = 0;
distance = 0;
player.visible = true;
Bg.visible = true;



}



