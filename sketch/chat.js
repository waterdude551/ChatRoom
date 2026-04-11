let FRAMES_BETWEEN_CHARS = 5;
let MARGIN_SIZE = 40;
let FONT_SIZE = 28;
let c1;
let c2;
let awaitingInput = false;
let messages = [];
let messagesBottomY;

class Choice {
    constructor(action, message) {
        this.action = action;
        this.message = message;

        this.messageShowing = "";
        this.isHoveredOver = false;
        this.framesUntilChar = FRAMES_BETWEEN_CHARS;
        // how typed the action is (begin increment on creation)
        this.actionIndex = 0; 
        // how typed the message is (increment on hover, reset when off)
        this.messageIndex = 0; 

        this.x = MARGIN_SIZE;
        this.y;
        this.width = width - 2 * MARGIN_SIZE;
        this.height;
    }
}

class Message {
    constructor(sender, message) {
        this.content = "<" + sender + ">: " + message;
        this.x = MARGIN_SIZE;
        this.y;
        this.width = width - 2 * MARGIN_SIZE;
        this.height;
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
        hoverChoice(choice);
    } else if (choice.isHoveredOver) {
        // print("stopped hover");
        choice.isHoveredOver = false;
        choice.messageIndex = 0;
        choice.messageShowing = "";
    }
}

function hoverChoice(choice) {
    // print("hovering");
    // print(choice.framesUntilChar);
    typeMessage(choice);
}

// MESSAGE

function mouseClicked() {
    let message;
    if (c1.isHoveredOver) {
        print("chose 1");
        message = new Message("u", c1.message);
        messages.push(message);
    } else if (c2.isHoveredOver) {
        print("chose 2");
        message = new Message("u", c2.message);
        messages.push(message);
    }
}

// message pushing :)
// function keyPressed() {
//     if (key === 's') {
//         messages.push(new Message("A", "Hello."));
//     }
// }

function displayMessages() {
    let y = MARGIN_SIZE;
    for (var i = 0; i < messages.length; i++) {

        messages[i].y = y;
        messages[i].height = FONT_SIZE*1.25;
        y += messages[i].height;
        fill(WHITE);
        text(messages[i].content, messages[i].x, messages[i].y);
        if (y > .78*height) {
            messages = messages.slice(1);
            i--;
        }
    }
}

// DRAW

function drawChat() {
    background(BLACK);

    textFont(font);
    textSize(FONT_SIZE);

    if (!awaitingInput) {
        awaitingInput = true;
        c1 = new Choice("(Action 1)", "Message message message 1.");
        c2 = new Choice("(Action 2)", "Message message message 2.");
    }

    if (awaitingInput) {
        displayChoices(c1, c2);
        checkHoverChoice(c1);
        checkHoverChoice(c2);
    }
    displayMessages();
}