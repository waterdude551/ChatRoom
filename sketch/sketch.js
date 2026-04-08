let currentMode; // 0 for chat, 1 for room

function setup() {
    createCanvas(1024, 768);
    frameRate(60);
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

