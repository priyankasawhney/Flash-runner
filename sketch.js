var bg,bgimg;
var start,startimg;
var gameover,gameoverimg;
var logo,logoimg;
var flash,flashimg;
var V1,V1img;
var V2,V2img;
var V3,V3img;
var V4,V4img;
var V5,V5img;
var restart,restartimg;
var Vgroup;
var gameState=PLAY;
var PLAY=1;
var END=0;
var score=0;

function preload(){
    bgimg=loadImage("background.jpg");
    startimg=loadImage("Start.png");
    gameoverimg=loadImage("Gameover.png");
    logoimg=loadImage("Logo.png");
    flashimg=loadImage("flash2.png");
    V1img=loadImage("V1.png");
    V2img=loadImage("V2.png");
    V3img=loadImage("V3.png");
    V4img=loadImage("V4.png");
    V5img=loadImage("V5.png");
    restartimg=loadImage("restart.png");
}

function setup(){
createCanvas(windowWidth,windowHeight);
bg=createSprite(0,0,windowWidth,windowHeight);
bg.addImage(bgimg);
//bg.x=bg.width/2;
bg.velocityX=-9;
bg.scale=3;

flash=createSprite(90,580,40,40);
flash.addImage("flash",flashimg);
flash.scale=0.4;
flash.setCollider("circle",0,0,100);
flash.debug=true;

ground=createSprite(width/2,600,windowWidth,10);
//ground.x=ground.width/2;
//ground.velocityX=-10
ground.visible=false;

logo=createSprite(680,300,60,60);
logo.addImage(logoimg)
logo.scale=0.4;

start=createSprite(700,460,50,50);
start.addImage(startimg);
start.scale=0.4;

gameover=createSprite(720,300,60,60);
gameover.addImage(gameoverimg);
gameover.scale=0.4;

restart=createSprite(720,450,60,60);
restart.addImage(restartimg);
restart.scale=0.4;

gameover.visible=false;
restart.visible=false;

Vgroup=new Group();

score=0;

}
function draw(){
  
  if(mousePressedOver(start)){
      gameState=PLAY;
      bg.velocityX=-9;
      start.visible=false;
      logo.visible=false;  
      flash.velocityY=-20;
  }
  if(gameState===PLAY){
   
    bg.velocityX=-9;
   score=score+Math.round(getFrameRate()/60);
  

   if(bg.x<0){
      bg.x=bg.width/2
  }
  
 // if(ground.x<0){
  //ground.x=ground.width/2;
  //}
  
  if(touches.length>0||keyDown("space")&& flash.y>=300){
   flash.velocityY=-20;
   touches=[];
 }
flash.velocityY=flash.velocityY+1.5;

 //flash.collide(ground); 

 if(Vgroup.isTouching(flash)){
  gameState=END
}

obs();

}
else if(gameState===END){
flash.x=90;
flash.y=600;
gameover.visible=true;
restart.visible=true;
flash.velocityX=0;
flash.velocityY=0;
bg.velocityX=0;
ground.velocityX=0;
Vgroup.setVelocityXEach(0);
Vgroup.setVelocityYEach(0);
Vgroup.destroyEach();
}

if(touches.length>0||mousePressedOver(restart)){
reset();
touches=[];
  
}
flash.collide(ground); 

drawSprites();
textSize(30);
fill("blue");
text("SCORE:"+score,width-280,40);
}
function reset(){
  gameState=PLAY;
  score=0;
  flash.x=90;
  flash.y=600;
  gameover.visible=false;
  restart.visible=false;
}
function obs(){
  if(frameCount%60 === 0){  
var villain=createSprite(windowWidth,600,50,70);
  villain.velocityX=-9;
  var rand=Math.round(random(1,5));
switch(rand){
  case 1:villain.addImage(V1img);
  villain.scale=0.3;
  break;
  case 2:villain.addImage(V2img);
  villain.scale=0.3;
  break;
  case 3:villain.addImage(V3img);
  villain.scale=0.3;
  break;
  case 4:villain.addImage(V4img);
  villain.scale=0.3;
  break;
  case 5:villain.addImage(V5img);
  villain.scale=0.7;
  break;
}
Vgroup.add(villain);
}

}
