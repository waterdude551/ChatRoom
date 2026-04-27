let biosfont;
let logo;

index = 0;
counter = 0;

let index2 = 0;
let counter2 = 0;




//this is for loading screen stuff

function loadLoading(){
    logo = loadImage('images/crLogo.png')
}


function drawLoading() {
  
    let grey = color(128,128,128);
    let white = color(255,255,255);
    
    background(0); 
    image(logo,0,0,543,178);
  // text( `x:  ${mouseX} y: ${mouseY}`, 60,60); 
    let lines = [
        "Award Modular BIOS v45 PG, An Energy Star Ally",
        "Copyright (C) 2026",
        "CHATROOM OS P5 ACPI BIOS Beta",
        "80372782 CPU at 80MHz",
        "Award Plug and Play BIOS Extension v1.0a",
        "Serial Number 01010011 01001111 01010011",
        "System Date 0/1/2222",
        "Parsing chats...\n",
        "Placing furniture....\n",
        " \n",
        " \n"
    ]

    let loadingBar = ("█ "); //i will get to this later 

   let startPrompt = [
        ["Press ", grey],
        ["F10 ", white],
        ["to enter or ", grey],
        ["F2 ", white],
        ["to exit", grey]];
        
    textSize(25);
    

      counter++;//start count to begin text load

  if (counter % 50 === 0 && index < lines.length) {
    index++;
  }

  //THIS LOOP IS FOR MAIN BIOS TEXT
  for (let i = 0; i < index; i++) {
    if (i > lines.length) {
        fill(0); 
    } else {
        fill(grey) 
    }
    text(lines[i], 70, 250 + i * 40); //spacing for text reminder, 60+i changes y position of text, 25 is spacing between lines
  }


    if(index >= lines.length) {

counter2++;//old loop done start this one to color
if(counter2 % 50 === 0 && index2 < startPrompt.length) {
    index2++;
  }
  //THIS LOOP IS FOR START TEXT!

  for(let j = 0; j < index2; j++) {
    if(j > startPrompt.length) {
        fill(0);
    } else {
           colorText(70, 250 + (lines.length + j) * 40, startPrompt);
           break; 
        }
    }
}
}




function loadingKeyPressed(){
    print(key);
    if (key == 'F10') {
        currentMode = 0;
    }
}

function colorText(x, y, input) {
    let currentX = x;
    for(let i = 0; i < input.length; i++) {
        let part = input[i];
        fill(part[1]);
        text(part[0], currentX, y);
        currentX += textWidth(part[0]);
    }
}





