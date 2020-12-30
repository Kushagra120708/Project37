class Food{
    constructor() {
        this.foodStock = 15;
        this.lastFed;
        this.image = loadImage("images/Milk.png");
    }
    updateFoodStock(foodStock) {
      this.foodStock = foodStock;
    }
    getFedTime(lastFed){
      this.lastFed = lastFed;
    }    
    detectFood() {
      if (this.foodStock > 0) {
          this.foodStock = this.foodStock - 1
      }
      return this.foodStock;
    }
    getFoodStock() {
      return this.foodStock;
    }
    bedroom() {
      background(bedroomImg,250,300);
    }
    garden() {
      background(gardenImg,250,300);
    }
    washroom() {
      background(washroomImg,250,300);
    }

    display() {
      var x = 80, y = 100;

     imageMode(CENTER)
     image(this.image,590,220,70,70);

     if (this.foodStock != 0) {
         for (var i=0; i<this.foodStock; i++) {
           if(i%10 == 0) {
               x = 80;
               y = y + 50
           }
           image(this.image,x,y,50,50)
           x = x + 30;
         }
     }
    }
}