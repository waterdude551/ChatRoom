let bed, bookshelf, desk, room_outline
let sprite
let spriteImg
let door
let escapeDoor
let speed = 3;


function preload(){
    bed = loadImage('images/room_assets/bed.png')
    bookshelf = loadImage('images/room_assets/bookshelf.png')
    desk = loadImage('images/room_assets/desk.png')
    room_outline = loadImage('images/room_assets/room_outline.png')
    spriteImg = loadImage('images/room_assets/sprite.png')
    door = loadImage('images/room_assets/door.png')
    sprite = new Sprite(0,0) //SPRITE PRE LOADS HERE!

   
}

function setup(){
    createCanvas(1024, 768);
    frameRate(50);
}



function drawRoom(){
    background(255)
    //draw stuff in room
    image(room_outline, 0, 0)
    image(bed,0,0)
    image(bookshelf, 0,0)
    image(desk,0,0)
    image(door,0,0)
    if(escapeDoor){
        image(door,0,0); //true for prototype purposes
    
    }
    console.log("sprite:", sprite)
    sprite.move()
    sprite.display()

}

class Sprite { 
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

move(){
    if(keyIsDown(LEFT_ARROW)){
        this.x -= speed 
    }

    if(keyIsDown(RIGHT_ARROW)){
        this.x += speed
    }
    
    if(keyIsDown(UP_ARROW)){ 
        this.y -= speed
    }
    if(keyIsDown(DOWN_ARROW)){ 
        this.y += speed
    }
}

display(){
    image(spriteImg, this.x, this.y)
}


}


