let FRAMES_BETWEEN_CHARS = 5;
let MARGIN_SIZE = 40;

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
    let y = height - MARGIN_SIZE;
    for (var i = 0; i < choices.length; i++) {

    }
}



function drawChatScreen() {
    background(BLACK);

    fill(WHITE);
    textFont(font);
    textSize(36);
    text("hello chat world!",MARGIN_SIZE,height-MARGIN_SIZE-12);
}

function drawChat() {
    drawChatScreen();
}