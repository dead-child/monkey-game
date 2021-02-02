
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup, bananaGroup
var insvisibleGround, ground
var forest, forestImg

var score = 0;
var survivalTime= 0;


function preload(){
  
  monkey_running =                       loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png",  "sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
 forestImg = loadImage("junglemonkey.jpg");
 
}



function setup() {
  createCanvas (600,400);

  monkey=createSprite(80,315,20,20);
  monkey. addAnimation ('moving',monkey_running);
  monkey.scale = 0.1;
  
  forest = createSprite(600,150,0,0);
  forest.addImage ('forest', forestImg);
  forest.scale = 1.9;
  
  banana = createSprite(600,150,35,20);
  banana.addImage("banana", bananaImage);
  banana.scale = 0.15;
  
  ground = createSprite(200,350,1000,150);
  ground.visible = false;
  
  obstacle = createSprite(660,250,35,5);
  obstacle.addImage("obstacle", obstacleImage);
  obstacle.scale = 0.15;
  
  invisibleGround = createSprite(200,315,1000,10);
  invisibleGround.visible = false;
  
  
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = false
}


function draw() {
  background(0);
  


    
  score.depth = forest.depth;
    score.depth = score.depth + 1;
  
    survivalTime.depth = forest.depth;
  survivalTime.depth = survivalTime.depth + 1;
   survivalTime = survivalTime + Math.round(getFrameRate()/60);
  
  
    if (forest.x < 10){
      forest.x = 600;
    }
    if(keyDown("space") && monkey.y >= 159) {
      monkey.velocityY = -12;
}
  
  
  monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(invisibleGround);
  
  
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if(monkey.isTouching(obstaclesGroup)){
    
    monkey.scale = 0.1
    
  }
  
  
  if (score > 100 ){
    
    monkey.scale =  0.2
  }
  
  
  monkey.collide(ground);
  monkey.depth = forest.depth;
  monkey.depth = monkey.depth + 1;
  
  
  banana.velocityX = -5;
  
  forest. velocityX = -3
  
  obstacle.velocityX = -4;
  
  
if(bananaGroup.isTouching(monkey)){
  
  score = score + 1;      
  bananaGroup.destroyEach();
  
  }
     spawnBanana();
    spawnObstacle();

  console.log(survivalTime);  
  
  drawSprites();
    
  stroke("yellow");
  textSize(17);
  fill("yellow");
  text("survivalTime = "+ survivalTime,100,50);
  
  
  
 stroke("white");
  textSize(17);
  fill("white");
  text("score  " + score, 500, 50);
}


  
function spawnBanana(){
    if(frameCount % 80 === 0) {
  var banana = createSprite(600,150,35,20);
   banana.velocityX = -(6 + 3*score/100);
      
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.15;
    banana.velocityX = -5;
  
      
     banana.lifetime = 300;
      
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
      
    bananaGroup.add(banana); 
    }
}


 function spawnObstacle(){
     if(frameCount % 300 === 0) {
  var obstacle = createSprite(660,250,35,5);
   obstacle.velocityX = -(3 + 1*score/100);
      
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -4;
  
      
     obstacle.lifetime = 300;
      
    obstacle.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
      
    obstaclesGroup.add(obstacle); 
    }     
    
    
    
    
  }




