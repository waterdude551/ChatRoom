let bed, bookshelf, desk, room_outline
let sprite
let spriteImg
let door
let escapeDoor
let speed = 3;
let roomFont;
//let popUpActive = false;
let currentObject = null;
let hoveredObject = null;
let popUpText;



//bounds for object hitboxes

let bedMinX = 570, bedMaxX = 950, bedMinY = 65, bedMaxY = 320

let bookshelfMinX = 630, bookshelfMaxX = 930, bookshelfMinY = 550, bookshelfMaxY = 720

let deskMinX = 80, deskMaxX = 330, deskMinY = 90, deskMaxY = 350

function preload(){
    bed = loadImage('images/room_assets/bed.png')
    bookshelf = loadImage('images/room_assets/bookshelf.png')
    desk = loadImage('images/room_assets/desk.png')
    room_outline = loadImage('images/room_assets/room_outline.png')
    spriteImg = loadImage('images/room_assets/sprite.png')
    door = loadImage('images/room_assets/door.png')
    roomFont = loadFont('assets/fonts/UbuntuMono-Regular.ttf')
    sprite = new Sprite(0,0) //SPRITE PRE LOADS HERE!

   
}

function setup(){
    createCanvas(1024, 768);
    frameRate(50);
    textFont(roomFont);
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
    
       
    /*
    sprite.x = constrain(sprite.x, 0, width) how do i constrain 
    sprite.y = constrain(sprite.y, 0 ,height)
    */

    hoveredObject = getHoveredObject();
    if (currentObject) {//if not null show popup
    rect(260, 540, 520, 180);
    textSize(30);
    text(popUpText, 275, 575);
    }
}




class Sprite { 
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

move(){
    if(keyIsDown(65)){
        this.x -= speed 
    }

    if(keyIsDown(68)){
        this.x += speed
    }
    
    if(keyIsDown(87)){ 
        this.y -= speed
    }
    if(keyIsDown(83)){ 
        this.y += speed
    }
    
}

display(){
    image(spriteImg, this.x, this.y)
    }
}



function inRange(value, min, max) {
    if(value >= min && value <= max) {
        return true;
    }
    return false;
}


function mousePressed() {
    if (hoveredObject) {
        currentObject = hoveredObject;

        if (currentObject === "bookshelf") {
            popUpText = "> It's a bookshelf filled with books.";
        }

        if (currentObject === "bed") {
            popUpText = "> It's your bed.";
        }

        if (currentObject === "desk") {
            popUpText = "> It's your computer.";
        }
    } else {
        currentObject = null;
        popUpText = ""; //close popup
    }
}

function getHoveredObject() {//store what uur in range of
    if (
        inRange(sprite.x, bookshelfMinX, bookshelfMaxX) &&
        inRange(sprite.y, bookshelfMinY, bookshelfMaxY)
    ) {
        return "bookshelf";
    }

    if (
        inRange(sprite.x, bedMinX, bedMaxX) &&
        inRange(sprite.y, bedMinY, bedMaxY)
    ) {
        return "bed";
    }

    if (
        inRange(sprite.x, deskMinX, deskMaxX) &&
        inRange(sprite.y, deskMinY, deskMaxY)
    ) {
        return "desk";
    }

    return null;
}
    
    


    


