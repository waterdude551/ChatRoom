let endingbg;

function loadEnding() {
    endingbg = createVideo(['images/endingbg.mp4']);
    endingbg.hide();
    endingbg.loop();
}

function drawEnding() {
    console.log('ending should come up');

    image(endingbg, 0, 0, width, height);
}