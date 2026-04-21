let lines = [
  "user@system:~$ rm -rf /home/u/dat",
  "user@system:~$ rm -rf /home/u/rsc",
  "user@system:~$ rm -rf /home/u/log",
  "user@system:~$ rm -rf /home/u/bin",
  "user@system:~$ sudo kill --all",
  "user@system:~$ clearing cache......",
  "user@system:~$ deleting memory.data",
  "user@system:~$ system shutdown initiated",
  ".\n",
  ".\n",
  ".\n",
  ".\n",
  ".\n",
  ".\n",
  ".\n",
  ".\n",
  "<A>@system:~$ thank you for chatting",
  "<A>@system:~$ goodbye",
  "========= This experience was created by: =========",
  "<CoCo_Benas>@system:~$ hhhhhhhhhhmmmmmm",
  "<Harold_Fu>@system:~$ i don't even use linux"
];

let index = 0; //next cmd terminalline
let counter = 0;

function loadEnding() {
  frameRate(60);
  textFont(font);
}

function drawEnding() {
  background(0);

  //top bar from temrinal
  fill(30);
  rect(0, 0, width, 30);

  fill(255);
  textSize(14);
  text("> PLAYER.DATA", 10, 20);
  counter++;//start count

  if (counter % 30 === 0 && index < lines.length) {
    index++;
    
  }
  
  //draw lines
    textSize(20);

  for (let i = 0; i < index; i++) {
    if (i > 17) {
        fill(120);
    } else {
        fill(255, 253, 163)
    }
    text(lines[i], 20, 60 + i * 25); //spacing for text reminder, 60+i changes y position of text, 25 is spacing between lines
  }
}