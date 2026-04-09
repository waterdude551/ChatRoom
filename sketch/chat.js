let FRAMES_BETWEEN_CHARS = 5;
let MARGIN_SIZE = 40;
let FONT_SIZE = 28;
let showingChoices = false;
let c1;
let c2;

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

function drawChatScreen() {
    background(BLACK);

    textFont(font);
    textSize(FONT_SIZE);

    if (!showingChoices) {
        showingChoices = true;
    }

    if (!c1) c1 = new Choice("(Action 1)", "Message message message 1.");
    if (!c2) c2 = new Choice("(Action 2)", "Message message message 2.");
    displayChoices(c1, c2);
    checkHoverChoice(c1);
    checkHoverChoice(c2);
}

function drawChat() {
    drawChatScreen();
}