let bed, bookshelf, desk, room_outline
let sprite
let spriteImg
let door
let escapeDoor
let speed = 3;
let roomFont;

let currentObject = null;
let hoveredObject = null;
let popUpText;

let yesButton;
let noButton;
let buttonsShown = false;
let buttonsInitialized = false;

let bedQuestionShown = false;
let popUpShown = false;


//for typewriter effect
let typeTextShown = "";
let typeIndex = 0;
let typeCounter = 0;
let typeSpeed = 3;

//bounds for object hitboxes

let bedMinX = 570, bedMaxX = 950, bedMinY = 65, bedMaxY = 320

let bookshelfMinX = 600, bookshelfMaxX = 970, bookshelfMinY = 510, bookshelfMaxY = 750

let deskMinX = 70, deskMaxX = 330, deskMinY = 90, deskMaxY = 370

let canSleep = false; //can only sleep after chatting is done for the day
let days; 



//few chats -> bed then new day with more chatting
//if user tries to sleep before chats are done show dialogue that reminds to keep chatting
//can sleep turns true after chats are complete for that day 

function loadRoom(){
   loadImage('images/room_assets/door.png')
    
  

    spriteImg = loadImage('images/room_assets/sprite.png')
    roombg = loadImage('images/room_assets/roombg.png')
    roomFont = loadFont('assets/fonts/UbuntuMono-Regular.ttf')
    sprite = new Sprite(400,400) //SPRITE PRE LOADS HERE!
   
    cursorClick = loadImage('images/clickable.png')
    cursorDefault = loadImage('images/defaultCursor.png')

   
}
function drawRoom(){
    
    background(255)
    cursorChange();
    
 
        
    image(roombg,0,0)
    console.log("sprite:", sprite)
    sprite.move()
    sprite.display()
    
       
    
   //for sleep to trigger end scr
    if (!buttonsInitialized) {
    yesButton = createButton("> Sleep");
    noButton = createButton(" > Look around");

    yesButton.position(340, 600);
    noButton.position(600, 600);

    yesButton.mousePressed(() => {

        if(canSleep){
        currentMode = 3;
        hideButtons();
        }
        else {
            clearOldPopUp();
            popUpText = "> You still have chats to finish.";
            hideButtons();
        }
    });

    noButton.mousePressed(() => {
        currentObject = null;
        popUpText = "";
        hideButtons();
    });

    yesButton.hide();
    noButton.hide();

    buttonsInitialized = true;
}

    hoveredObject = getHoveredObject();
    if (currentObject) {//if not null show popup
        fill(WHITE);
        rect(260, 540, 520, 180);
        if (currentObject && typeIndex < popUpText.length) {
            typeCounter++;

            if (typeCounter % typeSpeed === 0) {
                typeTextShown += popUpText[typeIndex];
                typeIndex++;
            }
        }
        if (currentObject === "bed" && typeIndex >= popUpText.length && !buttonsShown) { //would this indicate popup is here, how to clear it 
        //set popupshown here to true, then how to clear this rectangle when reminder of still needing to chat 
        showButtons();
        buttonsShown = true;
}
        fill(BLACK);
        textSize(30);
        textFont(roomFont);
        text(typeTextShown, 275, 575);
    }
}




class Sprite { 
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    move(){
    if(keyIsDown(65)){
        if(this.x > 0) {
        this.x -= speed 
        }
    }

    if(keyIsDown(68)){
        if(this.x < width - spriteImg.width) {
        this.x += speed
        }
    }
    
    if(keyIsDown(87)){  
        if(this.y > 0){
        this.y -= speed
        }
    }
    if(keyIsDown(83)){ 
        if(this.y < height - spriteImg.height) {
        this.y += speed
        }
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


function roomMousePressed() {
    let chats = 2; //tracker 
    if(bedQuestionShown) {
        return; 
    }
    if (hoveredObject) {
        currentObject = hoveredObject;

        if (currentObject === "bookshelf") {
            switch(chats){ 
                case 1: popUpText = "> It's a bookshelf\n filled with books.";
                case 2: popUpText = "> You see a book about jokes.\nMost of them suck.";
            }
             typeTextShown = "";
             typeIndex = 0;
            typeCounter = 0;
        }

        if (currentObject === "bed") {
            popUpText = "> It's your bed. Go to sleep?";
            bedQuestionShown = true;
             typeTextShown = "";
             typeIndex = 0;
            typeCounter = 0;
            buttonsShown = false;
            hideButtons();
           
        }

        if (currentObject === "desk") {
            popUpText = "> It's your computer.";
             typeTextShown = "";
             typeIndex = 0;
            typeCounter = 0;
        }
    } else {
             typeTextShown = "";
             typeIndex = 0;
            typeCounter = 0;
            currentObject = null;
        popUpText = ""; //close popup
    }
}
/*
function changeCursor(){
    if(hoveredObject) {
        cursor(cursorClick);
    }
    else{
        cursor(cursorDefault);
    }
}   
    */


function getHoveredObject() {//store what uur in range of
    if (
        inRange(sprite.x, bookshelfMinX, bookshelfMaxX) &&
        inRange(sprite.y, bookshelfMinY, bookshelfMaxY)
    ) {
        cursor(cursorClick)
        return "bookshelf";
    }

    if (
        inRange(sprite.x, bedMinX, bedMaxX) &&
        inRange(sprite.y, bedMinY, bedMaxY)
    ) {
        cursor(cursorClick)
        return "bed";
    }

    if (
        inRange(sprite.x, deskMinX, deskMaxX) &&
        inRange(sprite.y, deskMinY, deskMaxY)
    ) {
        cursor(cursorClick)
        return "desk";
    }
    cursor(cursorDefault);
    return null;
}

function cursorChange(){
    if(inRange(mouseX, bookshelfMinX, bookshelfMaxX) &&
    inRange(mouseY, bookshelfMinY, bookshelfMaxY) || 
    inRange(mouseX, bedMinX, bedMaxX) &&
    inRange(mouseY, bedMinY, bedMaxY) || 
    inRange(mouseX, deskMinX, deskMaxX) &&
    inRange(mouseY, deskMinY, deskMaxY)){
        cursor(HAND);
    }
    else{
        cursor(ARROW);
    }
}
    
 

function showButtons() {
    yesButton.show();
    noButton.show();
}

function hideButtons() {
    yesButton.hide();
    noButton.hide();
}


function clearOldPopUp() {
    popUpText = "";
    typeTextShown = "";
    typeIndex = 0;
    typeCounter = 0;
}