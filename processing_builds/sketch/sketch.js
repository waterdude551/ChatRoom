let FRAMES_BETWEEN_CHARS = 5;
let MARGIN_SIZE = 40;
let FONT_SIZE = 28;
let choice1;
let choice2;
let awaitingInput = false;
let messages = [];
let npcMessageQueue = [];
let currentChat = 0;
let canExit = false;// debug

function chatKeyPressed() {
    if (key === 's') {
        print(
            "choice1: " + choice1.message 
            + "\nchoice2: " + choice2.message 
            + "\nawaiting input: " + awaitingInput
            + "\ncanExit: " + canExit
        );
    }
}

class Choice {
    constructor(action, message, npcReply) {
        this.type = "Choice";
        this.action = action;
        this.message = message;

        this.messageShowing = "";
        this.isHoveredOver = false;
        this.framesUntilChar = FRAMES_BETWEEN_CHARS;
        // how typed the message is (increment on hover, reset when off)
        this.messageIndex = 0; 

        this.x = MARGIN_SIZE;
        this.y;
        this.width = width - 2 * MARGIN_SIZE;
        this.height;

        this.npcReply = npcReply;
    }
}

class Prompt {
    // prompt
    constructor(sender, message, choice1Index, choice2Index) {
        this.type = "Prompt";
        this.sender = "<" + sender + ">";
        this.content = "<" + sender + ">: " + message;
        this.x = MARGIN_SIZE;
        this.y;
        this.width = width - 2 * MARGIN_SIZE;
        this.height;
        this.framesUntilSend = message.length * FRAMES_BETWEEN_CHARS + 5;
        this.c1 = choice1Index;
        this.c2 = choice2Index;
    }
}

class Message {
    // prompt
    constructor(sender, message, next) {
        this.type = "Message";
        this.sender = "<" + sender + ">";
        this.content = "<" + sender + ">: " + message;
        this.x = MARGIN_SIZE;
        this.y;
        this.width = width - 2 * MARGIN_SIZE;
        this.height;
        this.framesUntilSend = message.length * FRAMES_BETWEEN_CHARS;
        this.next = next;
    }
}

// CHOICE

function displayChoices(...choices) { // variable length Choice array
    // print("called displayChoices");
    let y = height - MARGIN_SIZE - choices.length*FONT_SIZE;
    for (var i = choices.length - 1; i >= 0; i--) {
        choices[i].y = y
        choices[i].height = FONT_SIZE*2.5;
        y -= choices[i].height;
        if (choices[i].isHoveredOver) {
            fill(WHITE);
            rect(choices[i].x-MARGIN_SIZE/3, choices[i].y, choices[i].width+MARGIN_SIZE/3, choices[i].height);
            fill(BLACK);
            text(choices[i].action, choices[i].x, choices[i].y+FONT_SIZE);
        } else {
            fill(WHITE);
            text(choices[i].action, choices[i].x, choices[i].y+FONT_SIZE);
        }
    }
}

function typeMessage(choice) {
    // print("typing message");
    // print(choice.messageShowing);
    choice.messageShowing = choice.message.slice(0, choice.messageIndex + 1);
    fill(BLACK);
    text(choice.messageShowing, choice.x, choice.y+2*FONT_SIZE)
    
    if (choice.messageIndex >= choice.message.length - 1) {
        return;
    }
    choice.framesUntilChar--;
    if (choice.framesUntilChar <= 1) {
        choice.framesUntilChar = FRAMES_BETWEEN_CHARS;
        choice.messageIndex++;
    }
}

function checkHoverChoice(choice) {
    if (mouseX > choice.x && mouseX < choice.x + choice.width && mouseY > choice.y && mouseY < choice.y + choice.height) {
        choice.isHoveredOver = true;
        typeMessage(choice);
    } else if (choice.isHoveredOver) {
        // print("stopped hover");
        choice.isHoveredOver = false;
        choice.messageIndex = 0;
        choice.messageShowing = "";
    }
}
// MESSAGE

function chatMouseClicked() {
    print("clicked at " + mouseX, mouseY);
    if (choice1 && choice2) {
        choiceClick();
    }
    if (canExit && mouseX > width-MARGIN_SIZE-32 && mouseY > MARGIN_SIZE && mouseX < width-MARGIN_SIZE && mouseY < MARGIN_SIZE + 32) {
        print("exiting chat");
        currentMode = 1;
    }
}

function choiceClick() {
    let message;
    if (!awaitingInput) {
        return;
    }
    if (choice1.isHoveredOver) {
        print("chose 1");
        message = new Prompt("u", choice1.message);
        messages.push(message);
        npcMessageQueue.push(getMsg(choice1.npcReply));
        awaitingInput = false;
    } else if (choice2.isHoveredOver) {
        print("chose 2");
        message = new Prompt("u", choice2.message);
        messages.push(message);
        npcMessageQueue.push(getMsg(choice2.npcReply));
        awaitingInput = false;
    }
}

function displayMessages() {
    let y = MARGIN_SIZE;
    for (var i = 0; i < messages.length; i++) {

        messages[i].y = y;
        messages[i].height = FONT_SIZE*1.25;
        y += messages[i].height;
        fill(WHITE);
        text(messages[i].content, messages[i].x, messages[i].y);
        if (y > .70*height) {
            messages = messages.slice(1);
            i--;
        }
    }
}

// called every frame that it's the npc's turn to chat
function npcMessage() {
    if (npcMessageQueue[0] == undefined) {
        // no more npc messages
        print("no more npc messages: set awaitingInput to true");
        awaitingInput = true;
        return;
    }
    if (npcMessageQueue[0].framesUntilSend > 0) {
        // typing message
        // print(npcMessageQueue[0].framesUntilSend);
        npcMessageQueue[0].framesUntilSend--;
        text(npcMessageQueue[0].sender + " is typing...", MARGIN_SIZE, .74*height);
    } else {
        // send message
        let m = npcMessageQueue[0]
        npcMessageQueue = npcMessageQueue.slice(1);
        messages.push(m);
        if (m.type == "Prompt") {
            print("last message is prompt: set awaitingInput to true");
            awaitingInput = true;
            choice1 = getMsg(m.c1);
            choice2 = getMsg(m.c2);
        }
        if (m.type == "Message") {
            if (m.next) {
                npcMessageQueue.push(getMsg(m.next));
            } else {
                choice1 = null;
                choice2 = null;
                canExit = true;
                return;
            }
        }
    }
    if (npcMessageQueue.length == 0) {
        // no more npc messages
        print("no more npc messages: set awaitingInput to true");
        awaitingInput = true;
        return;
    }
}

function getMsg(index) {
    return chats[currentChat][index];
}

function updateExitButton() {
    fill(WHITE);
    rect(width-MARGIN_SIZE-32,MARGIN_SIZE,32,32);
    fill(BLACK);
    text("X", width-MARGIN_SIZE-24, MARGIN_SIZE+FONT_SIZE-4);
}

// DRAW

function drawChat() {
    background(BLACK);

    textFont(font);
    textSize(FONT_SIZE);

    // if (!awaitingInput) {
    //     awaitingInput = true;
    //     c1 = new Choice("(Action 1)", "Message message message 1.");
    //     c2 = new Choice("(Action 2)", "Message message message 2.");
    // }
    displayMessages();
    // initiate chat
    if (messages.length == 0 && npcMessageQueue.length == 0 && !awaitingInput) {
        print("initiating chat");
        npcMessageQueue.push(getMsg(0));
    }

    if (canExit) {
        updateExitButton();
    }

    if (awaitingInput) {
        // player's turn
        if (choice1 && choice2) {
            displayChoices(choice1, choice2);
            checkHoverChoice(choice1);
            checkHoverChoice(choice2);
        }
    } else {
        // npc's turn
        npcMessage();
    }
}
let currentMode; // 0 for chat, 1 for room
let WHITE;
let BLACK;

function loadFonts() {
    font = loadFont("/sketch/assets/fonts/UbuntuMono-Regular.ttf");
    boldFont = loadFont("/sketch/assets/fonts/UbuntuMono-Bold.ttf");
    italicFont = loadFont("/sketch/assets/fonts/UbuntuMono-Italic.ttf");
    boldItalicFont = loadFont("/sketch/assets/fonts/UbuntuMono-BoldItalic.ttf");
    // print("loaded fonts!");
}

function setup() {
    WHITE = color(204);
    BLACK = color(10);
    createCanvas(1024, 768);
    loadLoading();
    loadDialogue();
    loadRoom();
    loadFonts();
    
    frameRate(60);
    currentMode = 2;
    // prints show up in Inspect Element -> Console
    print("hello world!");
}


function draw() {
    switch (currentMode) {
        case 0: // chat
            drawChat();
            break;
        case 1: // room
            drawRoom();
            break;
        case 2: // loading
            drawLoading(); 
            break;
        default:
            print("unexpected mode: " + currentMode + " should be 0 or 1 or 2");
    }

}

function keyPressed() {
    switch (currentMode) {
        case 0: // chat
            chatKeyPressed();
            break;
        case 1: // room
            
            break;
        case 2: // loading
            loadingKeyPressed(); 
            break;
        default:
            print("unexpected mode: " + currentMode + " should be 0 or 1 or 2");
    }
}

function mouseClicked() {
    switch (currentMode) {
        case 0: // chat
            chatMouseClicked();
            break;
        case 1: // room
            roomMousePressed();
            break;
        case 2: // loading
            drawLoading(); 
            break;
        default:
            print("unexpected mode: " + currentMode + " should be 0 or 1 or 2");
    }
}
let biosfont;
let logo;


//this is for loading screen stuff

function loadLoading(){
    logo = loadImage('images/fakemotherboard.png')
}


function drawLoading() {
  
    
    let index = 0;
    let speed = 5;  
      
    
    
    background(0); 
    image(logo,0,0);
  // text( `x:  ${mouseX} y: ${mouseY}`, 60,60); 

    
    //have typing effect load the bios info
    fill(255)
    textFont(boldFont); 
    biosText = "Award Modular BIOS v45 PG, An Energy Star Ally\nCopywrite (C)2026\n\nTEMPNAME P5 ACPI BIOS Beta\n80372782 CPU at 80MHz\nAward Plug and Play BIOS Extension v1.0a\nSerial Number 00011837\nSystem Date 0/1/2222\n\n";
    startText = "Press F12 to enter\nPress F2 to exit";
    totalText = biosText + startText;
    textSize(27)
    text(totalText, 18,200, 1024,768)


    
    //figure out typewriter effect later after loading scr done
    /*
    text(totalText.substring(0, index + 1),15, 190, 1024,768);
    index++;
    if(pos > totalText.length + speed) {  //text runs as each letter is loaded
        index = 0;
    }
        */
    

}

function loadingKeyPressed(){
    print(key);
    if (key == 'F12') {
        currentMode = 0;
    }
}







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
let offsetX = 10;

//for typewriter effect
let typeTextShown = "";
let typeIndex = 0;
let typeCounter = 0;
let typeSpeed = 3;

//bounds for object hitboxes

let bedMinX = 570, bedMaxX = 950, bedMinY = 65, bedMaxY = 320

let bookshelfMinX = 600, bookshelfMaxX = 970, bookshelfMinY = 510, bookshelfMaxY = 750

let deskMinX = 80, deskMaxX = 330, deskMinY = 90, deskMaxY = 350

function loadRoom(){
    /*
    bed = loadImage('images/room_assets/bed.png')
    bookshelf = loadImage('images/room_assets/bookshelf.png')
    desk = loadImage('images/room_assets/desk.png')
    room_outline = loadImage('images/room_assets/room_outline.png')
    door = loadImage('images/room_assets/door.png')
    */
    
    spriteImg = loadImage('images/room_assets/sprite.png')
    roombg = loadImage('images/room_assets/roombg.png')
    roomFont = loadFont('assets/fonts/UbuntuMono-Regular.ttf')
    sprite = new Sprite(400,400) //SPRITE PRE LOADS HERE!

   
}
function drawRoom(){
    
    background(255)
    
    //draw stuff in room
    /*
    image(room_outline, 0, 0)
    image(bed,0,0)
    image(bookshelf, 0,0)
    image(desk,0,0)
    image(door,0,0)
    if(escapeDoor){
        image(door,0,0); //true for prototype purposes
    
    }
        */
        
    image(roombg,0,0)
    console.log("sprite:", sprite)
    sprite.move()
    sprite.display()
    
       
    /*
    sprite.x = constrain(sprite.x, 0, width) how do i constrain 
    sprite.y = constrain(sprite.y, 0 ,height)
    */

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


function roomMousePressed() {
    if (hoveredObject) {
        currentObject = hoveredObject;

        if (currentObject === "bookshelf") {
            popUpText = "> It's a bookshelf filled with\n books.";
             typeTextShown = "";
             typeIndex = 0;
            typeCounter = 0;
        }

        if (currentObject === "bed") {
            popUpText = "> It's your bed.";
             typeTextShown = "";
             typeIndex = 0;
            typeCounter = 0;
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
    
    
    


    


let chats = [];



function loadDialogue() {
    chats[0] = [
        new Prompt("A", "hello?", 1, 3), // 0
        new Choice("(Respond)", "Hello.", 2),
        new Message("A", "it's nice to meet you!", 5),
        new Choice("(Question)", "Who are you?", 4),
        new Message("A", "oh, let me ask first", 5),

        new Prompt("A", "can you introduce yourself?", 6, 8), // 5
        new Choice("(Answer)", "I'm <u>. What's your name?", 7),
        new Message("A", "you can call me A. it doesn't stand for anything", 10),
        new Choice("(State Confusion)", "I'm not sure, do you know anything?", 9),
        new Message("A", "your name is <u>. are you alright?", 10),

        new Prompt("A", "how are you feeling?", 11, 13), // 10
        new Choice("(Neutral)", "Fine for the moment. Nothing wrong in particular.", 12),
        new Message("A", "that's good, you just woke up so i was expecting worse", 15),
        new Choice("(Nervous)", "Feeling worried, should I know anything about where I am?", 14),
        new Message("A", "try to stay calm. you just woke up, so get your bearings", 15),

        new Message("A", "take a look around your room. we can talk after :)")
    ]
}
