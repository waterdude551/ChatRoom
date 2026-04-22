let biosfont;
let logo;


//this is for loading screen stuff

function loadLoading(){
    logo = loadImage('images/crLogo.png')
}


function drawLoading() {
  
    
    let index = 0;
    let speed = 5;  
      
    
    
    background(0); 
    image(logo,0,0,543,178);
  // text( `x:  ${mouseX} y: ${mouseY}`, 60,60); 

    
    //have typing effect load the bios info
    fill(255)
    textFont(boldFont); 
    biosText = "Award Modular BIOS v45 PG, An Energy Star Ally\nCopywrite (C)2026\n\nTEMPNAME P5 ACPI BIOS Beta\n80372782 CPU at 80MHz\nAward Plug and Play BIOS Extension v1.0a\nSerial Number 00011837\nSystem Date 0/1/2222\n\n";
    startText = "Press F10 to enter\nPress F2 to exit";
    totalText = biosText + startText;
    textSize(27)
    text(totalText, 18,200, 1024,768)


    
    //figure out typewriter effect later after loading scr done
    /*
    text(totalText.substring(0, index + 1),15, 190, 1024,768);
    index++;
    if(pos > totalText.length + speed) {  //text runs as each letter is loaded
        index = 0;
    }
        */
    

}

function loadingKeyPressed(){
    print(key);
    if (key == 'F10') {
        currentMode = 0;
    }
}







