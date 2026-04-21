let bed, bookshelf, desk, room_outline
let sprite
let spriteImg
let door
let escapeDoor
let speed = 3;
let roomFont;

let hoveredObject = null;
let popUpText = "";

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

let justHidButtons = false;



//few chats -> bed then new day with more chatting
//if user tries to sleep before chats are done show dialogue that reminds to keep chatting
//can sleep turns true after chats are complete for that day 

function loadRoom(){
    // loadImage('images/room_assets/door.png');

    spriteImg = loadImage('images/room_assets/sprite.png');
    roombg = loadImage('images/room_assets/roombg.png');
    roomFont = loadFont('assets/fonts/UbuntuMono-Regular.ttf');
    sprite = new Sprite(400,400); //SPRITE PRE LOADS HERE!
   
    cursorImg = loadImage('images/LMB.png');
}
function drawRoom(){
    
    background(255);
    
 
        
    image(roombg,0,0)
    if (popUpText == "") { 
        sprite.move(); // only allow movement outside text
    }
    sprite.display();
    
       
    
   //for sleep to trigger end scr
    if (!buttonsInitialized) {
        yesButton = createButton("> Sleep");
        noButton = createButton("> Look around");

        yesButton.position(340, 650);
        noButton.position(600, 650);

        yesButton.mousePressed(() => {

            if(canSleep){
                currentMode = 3; // TODO : fade to black, advance to allow next chat
                hideButtons();
            }
            else {
                clearOldPopUp();
                popUpText = "> You still have chats to finish.";
                hideButtons();
            }
        });

        noButton.mousePressed(() => {
            popUpText = "";
            hideButtons();
        });

        yesButton.hide();
        noButton.hide();

        buttonsInitialized = true;
    }

    hoveredObject = getHoveredObject();
    if (popUpText != "") { //if not null show popup
        fill(WHITE);
        rect(220, 540, 600, 180);
        if (typeIndex < popUpText.length) {
            typeCounter++;

            if (typeCounter % typeSpeed === 0) {
                typeTextShown += popUpText[typeIndex];
                typeIndex++;
            }
        }
        if (hoveredObject === "bed" && typeIndex >= popUpText.length && !buttonsShown) { //would this indicate popup is here, how to clear it 
            //set popupshown here to true, then how to clear this rectangle when reminder of still needing to chat 
            showButtons();
            buttonsShown = true;
        }
        fill(BLACK);
        textSize(30);
        textFont(roomFont);
        text(typeTextShown, 235, 575, 570);
    }

    if (justHidButtons) {
        justHidButtons = false;
    }
    drawMouseIfHover();
}




class Sprite { 
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }

    move(){
        if(keyIsDown(65)) {
            if(this.x > 0) {
            this.x -= speed 
            }
        }

        if(keyIsDown(68)) {
            if(this.x < width - spriteImg.width) {
            this.x += speed
            }
        }
        
        if(keyIsDown(87)) {  
            if(this.y > 0){
            this.y -= speed
            }
        }
        if(keyIsDown(83)) { 
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
    // When click
    if (justHidButtons) {
        // don't do anything if you just came out of buttons
        return;
    }
    if(popUpText != "") {
        // if a box is already up
        if (hoveredObject == "bed") {
            return; // and it's the bed, delegate to buttons
        }
        if (popUpText == typeTextShown) {
            // and it's done, remove the box
            print("hiding popup");
            typeTextShown = "";
            typeIndex = 0;
            typeCounter = 0;
            popUpText = "";
            return;
        } else {
            // and it's still typing, finish it
            typeTextShown = popUpText;
            typeIndex = popUpText.length;
            return;
        }
    }
    hoveredObject = getHoveredObject();
    switch (hoveredObject) {
        case ("bookshelf"):
            popUpText = getPopUpText();
            typeTextShown = "";
            typeIndex = 0;
            typeCounter = 0;
            break;
        case ("bed"):
            popUpText = getPopUpText();
            bedQuestionShown = true;
            typeTextShown = "";
            typeIndex = 0;
            typeCounter = 0;
            buttonsShown = false;
            hideButtons();
            break;
        case ("desk"):
            popUpText = getPopUpText();
            typeTextShown = "";
            typeIndex = 0;
            typeCounter = 0;
            break;
        default:
            typeTextShown = "";
            typeIndex = 0;
            typeCounter = 0;
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

function drawMouseIfHover(){
    if (hoveredObject) {
        // print("drawing mouse");
        image(cursorImg, sprite.x, sprite.y, 30, 41);
    }
}
    
 

function showButtons() {
    yesButton.show();
    noButton.show();
}

function hideButtons() {
    yesButton.hide();
    noButton.hide();
    justHidButtons = true;
}


function clearOldPopUp() {
    popUpText = "";
    typeTextShown = "";
    typeIndex = 0;
    typeCounter = 0;
}