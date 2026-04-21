class roomDesc {
    constructor(bedDesc, bookshelfDesc, computerDesc) {
        this.bedDesc = bedDesc;
        this.bookshelfDesc = bookshelfDesc;
        this.computerDesc = computerDesc;
    }
}

let roomDescs = []

//1.1
roomDesc[1] = new roomDesc(
    "> It's your bed. You didn't get up from it,\n so maybe you were sleeping\nin your chair.", 
    "> It's a bookshelf filled with books.",
    "> It's the computer you were chatting on." //how to implement the follow up prompt to log back in, the "now that youve looked around" desc
); 
//1.2
roomDesc[2] = new roomDesc(
    "> It's your bed. Go to sleep?", 
    "> None of these books seem interesting.\nYou're tired, anyways.", 
    "> No more messages today."
)
//2.1
roomDesc[3] = new roomDesc(
    "> You're about half-sleepy.\nNot bedtime yet.", 
    "> There's a thin book of jokes you\ndidn't notice before. Most of them suck.", 
    "> Log back on?"
)
//2.2
roomDesc[4] = new roomDesc(
    "> You were interrupted by that kick message,\nso you're only three-quarters tired.", 
    "> There's an untitled book.\nInside is just a bunch of text\nrepeated over and over again.", 
    "> A new message has arrived."
)
//3.0
roomDesc[5] = new roomDesc(
    "> Tragically, interrupted from sleep yet again.\n You are wide awake.", 
    "> There's half a book. As in, cut along the spine,\nmissing the latter half.", 
    "> That user probably managed to get back in\nagain."
);
//3.1
roomDesc[6] = new roomDesc(
    "> TO ADD ", 
    "> The book is done, but the ending was unsatisfying.", 
    "> TO ADD"
);

//3.2
roomDesc[6] = new roomDesc(
    "> TO ADD ", 
    "> TO ADD", 
    "> TO ADD"
);




function getPopUpText(){ 
    switch(currentObject) {
        case "bed":
            return roomDescs[currentChat].bedDesc;
        case "bookshelf":
            return roomDescs[currentChat].bookshelfDesc;
        case "computer":
            return roomDescs[currentChat].computerDesc; //wonder how this function will work with follow up dialogue e.g. computer log on or bed sleep option ?
    }
}
