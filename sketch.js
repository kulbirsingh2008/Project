const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine,world;
var wall,wall_img;
var player,player_img;
var ground,ground_img;
var point,point_img;
var wallGroup,pointGroup,IgroundGroup;
var gameOver,GO_img;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score=0;

function preload() {

  wall_img = loadImage("wall.jpg");
  player_img = loadImage("player.png");
  ground_img = loadImage("forest2.jpg");
  point_img = loadImage("points.jpg");
  GO_img = loadImage("gameOver.png");

}

function setup() {
  createCanvas(1100,700);
  engine = Engine.create();
  world = engine.world;

  ground = createSprite(545,60,400,200);
  ground.addImage("ground",ground_img);
  ground.scale = 0.7
 
  player = createSprite(150,280,50,60);
  player.addImage("player",player_img);
  player.scale = 0.2

  gameOver = createSprite(550,350,10,10);
  gameOver.addImage("gameOver",GO_img);
  gameOver.visible = false;
 
  wallGroup = new Group();
  pointGroup = new Group();
  IgroundGroup = new Group();
  
}
 
function draw() {
  background(255,255,255);  
  Engine.update(engine);
  text("Score: "+ score, 500,280);

  if(gameState === PLAY){

  if(keyDown("space") && player.y > 400) {
    player.velocityY = -12;
  }

  player.velocityY = player.velocityY + 0.8
  
  Swall();
  Spoint();
  
  if(player.x<0){
    player.x = 150;
  }

  console.log(player.y)

  pointGroup.collide(player,invisible)

  player.collide(IgroundGroup)

  if(player.y > 700){
     gameState = END;
  }

 }else if(gameState === END) {
   wallGroup.velocityX = 0;
   IgroundGroup.velocityX = 0;
   pointGroup.velocityX = 0;
   gameOver.visible = true;
   if(keyDown("r")){
     reset();
   }
 }
  //if(keyCode===39){
  //  //Matter.Body.setPosition(player.body,{x:5,y:0};
  //   Matter.Body.applyForce(player.body,{x:0,y:0},{x:10,y:0})
  //   console.log("pressed")
 // }
 
  //if(keyCode===38){
 //   Matter.Body.applyForce(player.body,{x:0,y:0},{x:0,y:-50})
 // }

  //Matter.Body.setVelocity(player.body,{x:0,y:-2})//

  drawSprites();
}

function invisible() {
  point.visible = false;
  score = score+1;
  console.log(remove);
}

function Swall() {
  if(frameCount % 60 === 0) {
    var wall = createSprite(1100,550,110,310);
    wall.scale = 1.2;
    wall.velocityX = -3;
    wall.addImage(wall_img)
    imageMode(CENTER)

    var Iground = createSprite(1100,433,90,20);
    //Iground.visible = false;
    Iground.velocityX = -3;
    rectMode(CENTER)

   wall.lifetime = 400;
   Iground.lifetime = 400;

    wallGroup.add(wall);
    IgroundGroup.add(Iground);
  }
}

function Spoint() {
  if(frameCount % 180 === 0) {
    var point = createSprite(1100,350,110,310);
    point.scale = 0.05;
    point.velocityX = -3;
    imageMode(CENTER)
     point.addImage(point_img)
  
   point.lifetime = 400;

   pointGroup.add(point);
  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  wallGroup.destroyEach();
  IgroundGroup.destroyEach();
  pointGroup.destroyEach();
  player.x = 150;
  player.y = 280;
  score = 0;
}