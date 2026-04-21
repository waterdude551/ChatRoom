class roomDesc {
    constructor(bedDesc, bookshelfDesc, computerDesc) {
        this.bedDesc = bedDesc;
        this.bookshelfDesc = bookshelfDesc;
        this.computerDesc = computerDesc;
    }
}

let roomDescs = []

roomDesc[1] = new roomDesc(
    "> You're about half-sleepy.\nNot bedtime yet.", 
    "> There's a thin book of jokes.\nMost of them suck.", 
    "> Log back on?"
);
roomDesc[2] = new roomDesc(
    "> You were interrupted by that kick message,\nso you're only three-quarters tired.", 
    "> There's an untitled book. Inside is just\na bunch of text repeated over and over again.", 
    "> A new message has arrived."
)
roomDesc[3] = new roomDesc(
    "> Tragically, interrupted from sleep yet again.\nYou're now wide awake.", 
    "> There's half a book.\nAs in, cut along the spine, missing the latter half.", 
    "> That user probably managed to get back in\nagain."
)
