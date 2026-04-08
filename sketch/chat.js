let FRAMES_BETWEEN_CHARS = 5;
let MARGIN_SIZE = 40;
let FONT_SIZE = 28;
let showingChoices = false;

class Choice {
    constructor(action, message) {
        this.action = action;
        this.message = message;
        this.messageShowing = "";
        this.isHoveredOver = false;
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
    print("called displayChoices");
    let y = height - MARGIN_SIZE - choices.length*FONT_SIZE/2;
    for (var i = choices.length - 1; i >= 0; i--) {
        choices[i].y = y
        choices[i].height = FONT_SIZE*2.5;
        y -= choices[i].height;
        text(choices[i].action, choices[i].x, choices[i].y);
    }
}

function typeText() {

}


function drawChatScreen() {
    background(BLACK);

    fill(WHITE);
    textFont(font);
    textSize(FONT_SIZE);
    if (!showingChoices) {
        
        showingChoices = true;
    }
    displayChoices(new Choice("(Action 1)", "Message message message 1."), new Choice("(Action 2)", "Message message message 2."));
}

function drawChat() {
    drawChatScreen();
}