let currentMode; // 0 for chat, 1 for room, 2 upon program running for start screen

function setup() {
    createCanvas(1024, 768);
    frameRate(60);
    currentMode = 1;
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

