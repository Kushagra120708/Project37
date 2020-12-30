//Create variables here
var database;
var dog,dogImg,happyDogImg,deadDogImg,lazyDogImg,runningDogImg;
var foodS,foodStockRef;
var FedTime,lastFed;
var foodObj;
var gameState = "Hungry",readState,getGameState,update;
var bedroomImg,washroomImg,gardenImg;
var input,button;
var feed,addFood;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/Happy.png");
  deadDogImg = loadImage("images/deadDog.png");
  lazyDogImg = loadImage("images/Lazy.png");
  runningDogImg = loadImage("images/running.png");

  bedroomImg = loadImage("images/Bed Room.png");
  washroomImg = loadImage("images/Wash Room.png");
  gardenImg = loadImage("images/Garden.png");

}

function setup() {
  database = firebase.database();
  createCanvas(500, 600);

  foodObj = new Food();
  
  dog = createSprite(270,430);
  dog.addAnimation("Hungry",dogImg);
  dog.addAnimation("Happy",happyDogImg);
  dog.addAnimation("Sleeping",lazyDogImg);
  dog.addAnimation("Running",runningDogImg);
  dog.scale = 0.4;

  getGameState();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  });

  feed = createButton("Feed The Dog");
  feed.position(400,60)
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(400,80)
  addFood.mousePressed(addFoods);

  input = createInput("Pet Name")
  input.position(550,100);

  button = createButton("Confirm")
  button.position(550,125)
  button.mousePressed(createName)
}


function draw() {  
  background(46,139,87);

  //add styles here

fedTime = database.ref("FeedTime");
fedTime.on("value",function(data){
  lastFed = data.val();
})

currentTime = hour();

if (currentTime==(lastFed+1)) {
  update("Playing");
  foodObj.garden();
}
else if(currentTime==(lastFed+2)) {
  update("Sleeping");
  foodObj.bedroom();
}
else if(currentTime>(lastFed+2) && currentTime<=(lastFed+4)) {
  update("Bathing");
  foodObj.washroom();
}
else{
  update("Hungry");
  foodObj.display();
}

foodObj.getFoodStock();
getGameState();

if (gameState!=="Hungry") {
  feed.hide();
  addFood.hide();
  dog.remove();
}
else{
  feed.show();
  addFood.show();
  dog.addImage(dogImg)
}

  fill(255,255,254)
  textSize(25)
  if (lastFed>=12) {
    text("Last Feed:" + lastFed%12 + "PM",200,30);
  } else if(lastFed==0) {
    text("Last Fed:12 AM",200,30);
  }else{
    text("Last Feed:" + lastFed + "AM",200,30);
  }
  
  drawSprites();
}

function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog() {
  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function createName() {
  input.hide();
  button.hide();

  name = input.value();
  var greeting = createElement('h3');
  greeting.html("Pet's Name: " + name);
  greeting.position(500, 0);
}

function getGameState() {
  gameStateRef = database.ref('gameState');
  gameStateRef.on("value",function(data) {
    gameState = data.val();
  })
}

function addFoods() {
   foodS++
   database.ref('/').update({
     Food:foodS
   })
}

function update(gameState) {
  database.ref('/').update({
    gameState:gameState
  });
}



