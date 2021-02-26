var backImage,backgr;
var player, player_running;
var ground,ground_img, bananaIMG, obstacleIMG, gameOverIMG;
var foodGroup;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score = 0;

function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaIMG = loadImage("banana.png");
  obstacleIMG = loadImage("stone.png");
  gameOverIMG = loadImage("gameOver.png");
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  foodGroup = new Group();
  obstacleGroup = new Group();

  score = 0;
  
}

function draw() { 
  background(0);
  drawSprites();
  
  text("Score: "+score, 500, 50);

  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space")) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);

    spawnFood();
    spawnObstacles();

    if(foodGroup.isTouching(player)){
      foodGroup.destroyEach();
      score+=1;

      player.scale+= +0.05;
    }

    if(obstacleGroup.isTouching(player)){
      gameState = END;
    }
  }

  else if(gameState === END){
    backgr.velocityX=0;
    player.visible=false;

    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    
    textSize(30);
    fill(255);
    text("Game Over", 300, 220);
  }

}

function spawnFood(){
  if(frameCount%50===0){
     var banana = createSprite(600, 250, 40, 10);
     banana.y=random(120, 180);
     banana.addImage(bananaIMG);
     banana.scale=0.05;
     banana.velocityX=-5;

     banana.lifetime = 300;
     player.depth = banana.depth+1;
     foodGroup.add(banana);
  }

}

function spawnObstacles(){
  if(frameCount%100===0){
     var obstacles = createSprite(600, 350, 40, 10);
     obstacles.addImage(obstacleIMG);
     obstacles.scale=0.2;
     obstacles.velocityX=-(5+2*score/100);

     obstacles.lifetime = 300;
     obstacleGroup.add(obstacles);
  }

}