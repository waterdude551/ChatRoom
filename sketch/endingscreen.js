let endingbg;
let endingText;





function loadEnding(){
   endingbg = createVideo('images/endingbg.mp4')
   endingbg.hide();
   endingbg.loop();
}


function drawEnding(){

    console.log('ending should come up');
      image(endingbg, 0, 0);
    endingText =
        "This is just a demo ending screen for the project, but later there will be commentary and varying effects depending on the ending.";

 

    fill(BLACK);
    textSize(30);
    textFont(roomFont);

    text(endingText, 20, 20);
}