let currentMode; // 0 for chat, 1 for room, 2 for start, 3 for end
let WHITE;
let BLACK;

let startupSound;
let roomSound
let endingSound;
let chatAmbience;

function loadFonts() {
    font = loadFont("assets/fonts/UbuntuMono-Regular.ttf");
    boldFont = loadFont("assets/fonts/UbuntuMono-Bold.ttf");
    italicFont = loadFont("assets/fonts/UbuntuMono-Italic.ttf");
    boldItalicFont = loadFont("assets/fonts/UbuntuMono-BoldItalic.ttf");

    // print("loaded fonts!");
}

function preload() {
    startupSound = loadSound('assets/sound/startupnoise.mp3');  
    startupSound.setVolume(.2); // Adjust the volume as needed

    roomSound = loadSound('assets/sound/roomnoise.mp3');
    roomSound.setVolume(.65);
    
    endingSound = loadSound('assets/sound/endingnoise.mp3');
    endingSound.setVolume(.1);

    chatAmbience = loadSound('assets/sound/chatnoise.wav');
    chatAmbience.setVolume(.5);

}

function setup() {
    

    WHITE = color(204);
    BLACK = color(10);
    var cnv = createCanvas(1024, 768);
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
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
            if(chatAmbience.isLoaded() && !chatAmbience.isPlaying()){
                roomSound.stop();
                endingSound.stop();
                startupSound.stop();
                chatAmbience.loop(); //i def couldve made a function for this now that i look at it again ooopps
            }
            drawChat();
            break;
        case 1: // room
            drawRoom();
            if(roomSound.isLoaded() && !roomSound.isPlaying()){
                chatAmbience.stop();
                endingSound.stop();
                startupSound.stop();
                roomSound.loop();
            }
            break;
        case 2: // loading
            drawLoading(); 
            if (startupSound.isLoaded() && !startupSound.isPlaying()) {
                chatAmbience.stop();
                endingSound.stop();
                roomSound.stop(); 
                startupSound.loop();// play once
            }
            break;
        case 3: // ending 
            drawEnding();
            if (endingSound.isLoaded() && !endingSound.isPlaying()) {
                chatAmbience.stop();
                startupSound.stop();
                roomSound.stop();
                endingSound.loop(); 
            }
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
            if (index1 >= lines.length)
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