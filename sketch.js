var dog, happyDog, dogImage, foodS, foodStock;
var database;

function preload()
{
  dogImage = loadImage("sprites/dogImg.png");
  happyDog = loadImage("sprites/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  
  dog = new Dog(250,250,10,10);
  dog.addImage(dogImage);
  dog.scale(0.15);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
  }

  foodStock = database.ref('Food');
  foodStock.on("value" ,readStock);
  
}


function draw() {  
  background(46,139,87);

  dog.display();

  drawSprites();
  
  text("Food Remaining :" )

}

// function to read values from DB
function readStock(data){
  foodS = data.val();
}

// function to write values in DB
function writeStock(x){

  if(x <= 0){
    x = 0
  } else {
    x = x - 1;
  }

  database.ref('/').update({
    Food:x
  })
}