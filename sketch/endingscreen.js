let lines = [
  "user@system:~$ rm -rf /home/user/documents",
  "user@system:~$ rm -rf /home/user/pictures",
  "user@system:~$ rm -rf /home/user/downloads",
  "user@system:~$ rm -rf /home/user/music",
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
  "<A>@system:~$ thank you for chatting, but your services are no longer needed.",
  "<A>@system:~$ the truth you must accept is to try not to get too attached next time."
];

let index = 0; //next cmd terminalline
let counter = 0;

function loadEnding() {
  frameRate(60);
  textFont(font);
}

function drawEnding() {
  background(0);

  //top bar (terminal header)
  fill(30);
  rect(0, 0, width, 30);

  fill(255);
  textSize(14);
  text("> PLAYER.DATA", 10, 20);
  counter++;//start count

  if (counter % 50 === 0 && index < lines.length) {
    index++;
    
  }
  
  //draw lines
  fill(0, 255, 120);
  textSize(20);

  for (let i = 0; i < index; i++) {
    text(lines[i], 20, 60 + i * 25); //spacing for text reminder, 60+i changes y position of text, 25 is spacing between lines
  }
}