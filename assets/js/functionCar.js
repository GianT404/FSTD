
let car;

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(144);

  car = new Car(width/2, 500, 0);
}

function draw() {
  background(127);  

  car.update();
  car.show();


  // Keep car onscreen. Car displacement (position) is stored in vector: car.d
  if(car.d.x > width){
    car.d.x = 0;
  } else if(car.d.x < 0) {
    car.d.x = width;
  }
  if(car.d.y > height) {
    car.d.y = 0;
  } else if(car.d.y < 0) {
    car.d.y = height;
  }

}