class roomDesc {
    constructor(bedDesc, bookshelfDesc, computerDesc) {
        this.bedDesc = bedDesc;
        this.bookshelfDesc = bookshelfDesc;
        this.computerDesc = computerDesc;
    }
}

let roomDescs = []

function loadDescriptions() {
    roomDescs[0] = new roomDesc(
        "DEBUG - Bed", 
        "DEBUG - Bookshelf",
        "DEBUG - Desk" 
    ); 
    //1.1
    roomDescs[1] = new roomDesc(
        "> It's your bed. You didn't get up from it, so maybe you were sleeping in your chair.", 
        "> It's a bookshelf filled with books.",
        "> It's the computer you were chatting on." //how to implement the follow up prompt to log back in, the "now that youve looked around" desc
    ); 
    //1.2
    roomDescs[2] = new roomDesc(
        "> It's your bed. Go to sleep?", 
        "> None of these books seem interesting. You're tired, anyways.", 
        "> There's someone in the chatroom!"
    )
    //2.1
    roomDescs[3] = new roomDesc(
        "> You're about a quarter-sleepy. Not bedtime yet.", 
        "> There's a thin book of jokes you didn't notice before. Most of them suck.", 
        "> Log back on?"
    )
    //2.2
    roomDescs[4] = new roomDesc(
        "> You were interrupted by that kick message, so you're only half tired.", 
        "> There's an untitled book. Inside is just a bunch of text repeated over and over again.", 
        "> A new message has arrived."
    )
    //3.0
    roomDescs[5] = new roomDesc(
        "> You still have a little energy left.", 
        "> There's half a book. As in, cut along the spine, missing the latter half.", 
        "> That user probably managed to get back in again."
    );
    //3.1
    roomDescs[6] = new roomDesc(
        "> Not yet.", 
        "> Something's missing.", 
        "> A message from a familiar name."
    );
}



function getPopUpText(){ 
    switch(hoveredObject) {
        case "bed":
            return roomDescs[currentChat].bedDesc;
        case "bookshelf":
            return roomDescs[currentChat].bookshelfDesc;
        case "desk":
            return roomDescs[currentChat].computerDesc; //wonder how this function will work with follow up dialogue e.g. computer log on or bed sleep option ?
    }
}
