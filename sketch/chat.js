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