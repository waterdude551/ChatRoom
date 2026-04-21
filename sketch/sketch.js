let currentMode; // 0 for chat, 1 for room, 2 for start, 3 for end
let WHITE;
let BLACK;

function loadFonts() {
    font = loadFont("assets/fonts/UbuntuMono-Regular.ttf");
    boldFont = loadFont("assets/fonts/UbuntuMono-Bold.ttf");
    italicFont = loadFont("assets/fonts/UbuntuMono-Italic.ttf");
    boldItalicFont = loadFont("assets/fonts/UbuntuMono-BoldItalic.ttf");
    // print("loaded fonts!");
}

function setup() {
    WHITE = color(204);
    BLACK = color(10);
    createCanvas(1024, 768);
    loadLoading();
    loadDialogue();
    loadDescriptions();
    loadRoom();
    loadFonts();
    
    loadEnding();
    frameRate(60);
    currentMode = 2; // CHANGE TO 2 FOR PROD :)
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
        case 3: // ending 
            drawEnding();
            break;

        default:
            print("unexpected mode: " + currentMode + " should be 0 or 1 or 2 or 3");
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
        case 3: //ending
            break;
        default:
            print("unexpected mode: " + currentMode + " should be 0 or 1 or 2 or 3");
    }
}

function mousePressed() {
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
        case 3: // ending
            if (index >= lines.length)
                window.location.reload();
            break;
        default:
            print("unexpected mode: " + currentMode + " should be 0 or 1 or 2 or 3");
    }
}

function goToStart() {
    currentMode = 2;
}

function goToChat() {
    currentMode = 0;
    initChat(currentChat);
}

function goToRoom() {
    currentMode = 1;
    buttonsShown = false;
    buttonsInitialized = false; 
    bedQuestionShown = false;
    popUpShown = false;
    popUpText = "";
    if (currentChat == chatsCanSleep) {
        print("must sleep now")
        canChat = false;
        canSleep = true;
    }
}

function goToEnd() {
    currentMode = 3;
}