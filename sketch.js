var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);

  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY = 2;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  
  invisibleBlockGroup = new Group();
  climbersGroup = new Group();
  doorsGroup = new Group();
}

function draw(){
  background(0);
if (gameState == "play") { 
  if (tower.y > 400) {
    tower.y = 300;    
  }
  
  if (keyDown("space")) {
    ghost.velocityY = -10;
  }
  
  if (keyDown(LEFT_ARROW)) {
    ghost.x = ghost.x - 3;
  }

  if (keyDown(RIGHT_ARROW)) {
    ghost.x = ghost.x + 3;
  }
  
  if (ghost.isTouching(invisibleBlockGroup)) {
    ghost.velocityY = 0;
  }
    
  ghost.velocityY = ghost.velocityY + 0.5;
  
    spawnDoors();
  
  
  if (ghost.y > 600 || ghost.isTouching(invisibleBlockGroup)) {
    gameState = "end";
  }
    drawSprites();
}
  if (gameState == "end") {
    stroke("yellow");
    fill("yellow");
    textSize(40);
    text("Game Over!", 200, 200);
    ghost.destroy();
  }
  }
  
  

function spawnDoors() {
  //write code here to spawn the doors in the tower
 if (frameCount % 240 == 0) {
    var door = createSprite(200, -50);
    door.x = Math.round(122, 400);
    door.addImage(doorImg);
    door.velocityY = 2;
    door.depth = ghost.depth - 1;
    doorsGroup.add(door);
    door.lifetime = 250;
    var climber = createSprite(200,10);
    climber.addImage(climberImg);
    climber.velocityY = 2;
    climber.x = door.x
    climber.depth = ghost.depth - 1;
    climbersGroup.add(climber);
    climber.lifetime = 250;
    var invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.velocityY = 2;
    invisibleBlock.x = door.x
    invisibleBlock.visible = false;
    invisibleBlockGroup.add(invisibleBlock);
    invisibleBlock.lifetime = 250;
 }  
}

