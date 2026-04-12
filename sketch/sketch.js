let currentMode; // 0 for chat, 1 for room
let WHITE;
let BLACK;

function preload() {

}

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
    loadFonts();
    loadDialogue();
    
    frameRate(60);
    currentMode = 0;
    // prints show up in Inspect Element -> Console
    print("hello world!");
}


function draw() {
    switch (currentMode) {
        case 0: // chat
            drawChat();
            break;
        case 1: // room

            break;
        default:
            print("unexpected mode: " + currentMode + " should be 0 or 1");
    }

}

