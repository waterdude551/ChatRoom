let WHITE = color(204, 204, 204);
let BLACK = color(10,10,10);
let FRAMES_BETWEEN_CHARS = 5;
let MARGIN_SIZE = 40;

class Choice {
    constructor(action, message) {
        this.index = index;
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
        this.height = ;
    }

    
}

function displayChoices() {
    print("called displayChoices");
    
}



function drawChatScreen() {
    background(BLACK);
}

function drawChat() {

}