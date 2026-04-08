let biosfont;
let letterToDisplay;
let textarr = []; 
let logo;

//this is for loading screen stuff

function preload(){
    biosfont = ('assets/fonts/bios_font.ttf')
    logo = loadImage('fimages/fakemotherboard.png')
}

function setup() {
    createCanvas(1024, 768);
}


function draw() {
  
    
    background(0); 
    image(logo,0,0);
  // text( `x:  ${mouseX} y: ${mouseY}`, 60,60); 

    textFont('biosfont');
    //have typing effect load the bios info
    fill(255)
  //
    biosText = "Award Modular BIOS v45 PG, An Energy   Star Ally\nCopywrite (C)2026\n\nTEMPNAME P5 ACPI BIOS Beta\n80372782 CPU at 80MHz\nAward Plug and Play BIOS Extension v1.0a\nSerial Number 00011837\nSystem Date 0/1/2222\n";
    startText = "Press F12 to enter\nPress F2 to exit";
    textSize(27)
    text(biosText, 15, 190, 1024,768);
   // typeText(totalText, 0);
}

/*
function typeText(text, index){
    if(index < text.length) {
        text.charAt(index);
        
        setTimeout(function () {
            typeText(text, index + 1);
        }, 1000);
    }
}
    */




