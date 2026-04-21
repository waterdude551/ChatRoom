let chats = [];



function loadDialogue() {
    chats[0] = [
        new Prompt("A", "hello?", 1, 3), // 0
        new Choice("(Respond)", "Hello.", 2),
        new Message("A", "it's nice to meet you!", 5),
        new Choice("(Question)", "Who are you?", 4),
        new Message("A", "oh, let me ask first", 5),

        new Prompt("A", "can you introduce yourself?", 6, 8), // 5
        new Choice("(Answer)", "I'm <u>. What's your name?", 7),
        new Message("A", "you can call me A. it doesn't stand for anything", 10),
        new Choice("(State Confusion)", "I'm not sure, do you know anything?", 9),
        new Message("A", "your name is <u>. are you alright?", 10),

        new Prompt("A", "how are you feeling?", 11, 13), // 10
        new Choice("(Neutral)", "Fine for the moment. Nothing wrong in particular.", 12),
        new Message("A", "that's good, you just woke up so i was expecting worse", 15),
        new Choice("(Nervous)", "Feeling worried, should I know anything about where I am?", 14),
        new Message("A", "try to stay calm. you just woke up, so get your bearings", 15),

        new Message("A", "take a look around your room. we can talk after :)")
    ];

    chats[1] = [
        new Prompt("A", "how's the room?",1,3),
        new Choice("(Satisfactory)","It's good. Comfortable, even.",2),
        new Message("A","i'm glad you find it to your liking!",5),
        new Choice("(Lacking)","It's a little bare. There's not much in here.",4),
        new Message("A","...sorry about that :( maybe you'll learn to love it lol", 5),

        new Message("A","look, i'm gonna let you talk to a few other people tomorrow.",6),
        new Prompt("A","i'll check back in some point later",7,9), // 6
        new Choice("(Accept)","Alright. Looking forward to it. ",8),
        new Message("A","glad you're cooperating! hope you enjoy talking to these people",11),
        new Choice("(Question)","Wait, why? What should I do? Where are you going?",10),
        new Message("A","i'll just be working. you just talk to these people, okay?",11),

        new Message("A","you should get some proper sleep now. we'll talk again soon.") // end
    ];

    // day 2 tmej
    chats[2] = [
        new Prompt("tmej","is this thing on",1,3),
        new Choice("(Acknowledge)","Yes, I'm receiving",2),
        new Message("tmej","hi receiving, im tmej",5),
        new Choice("(Greet)","Hi, it's nice to meet you.",4),
        new Message("tmej","o dang it works hi",5),

        new Prompt("tmej","tell me a joke",6,8),
        new Choice("(Knock knock)","Knock knock.",7),
        new Prompt("tmej","whos there",10,12),
        new Choice("(Chicken)","Why did the chicken cross the road?",9),
        new Prompt("tmej","why",14,16),

        // whos there
        new Choice("(Introduce yourself)","<u>.",11), // 10
        new Prompt("tmej","u who",18,20),
        new Choice("(Orange)","Orange <u> glad I didn't say banana?",13),
        new Prompt("tmej","that was awful",18,20),

        // why chicken
        new Choice("(Introduce yourself)","<u>.",15), // 14
        new Prompt("tmej","why did u do that",18,20),
        new Choice("(Orange)","Orange <u> glad I didn't say banana?",17),
        new Prompt("tmej","that was awful",18,20), // im too lazy to make this a reuse

        new Choice("(Apologize)","Sorry, I'm not great with jokes.",19), // 18
        new Message("tmej","that makes two of <u>s",22),
        new Choice("(Commit to the bit)","<u> asked for it.",21),
        new Message("tmej","ok that was a good one",22),

        new Message("tmej", "whats it stand for", 23), // 22
        new Prompt("tmej", "<u>, i mean", 24, 26),

        new Choice("(Guess)","Maybe it's \"user\"? Since I'm on a computer?",25), // 24
        new Message("tmej","wouldn't i be the user then?",28),
        new Choice("(Don't know) ","No clue.",27),
        new Message("tmej","really? is it like your favorite letter or something",28),

        new Message("tmej","dont answer that",29), // 28
        new Message("tmej", "gtg now byebye")
    ];

    chats[3] = [
        new Prompt("beeper","Beep boop.",1,3),
        new Choice("(Question) ","Hello? Can you say words?",2),
        new Message("beeper","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat congue leo, in venenatis quam fringilla in.",5), // intentionally overflows off screen
        new Choice("(Reciprocate) ","Beep boop beep.",4),
        new Message("beeper","Beep Beep Beep Beep Beep Beep Beep Beep Beep Beep Beep Beep Beep Beep",5), // same as above

        new Prompt("beeper","whoaaa i didn't think it'd do that",6,8), // 5
        new Choice("(Greet) ","Hi, how are you doing?",7),
        new Message("beeper","are we just gonna ignore that",10),
        new Choice("(Acknowledge) ","The text going off of the screen?",9),
        new Message("beeper","yo you can see it too",10),

        new Message("beeper","that's sick",11),

        new Prompt("beeper","i guess somebody got lazy making this",12,14), // 11
        new Choice("(Inquire) ","Making what? What does it look like on your end?",13),
        new Message("beeper","like alllllllllll this",16),
        new Choice("(Reason) ","Maybe it prevents spam?",15),
        new Message("beeper","i can just spam it with a buncha messages anyway",16),
        
        new Message("Server", "<beeper> was kicked.")
    ];

    chats[4] = [
        new Prompt("booper","at least i can just come back",1,3),
        new Choice("(Confirm) ","Are you <beeper>?",2),
        new Message("booper","more accurate to say i *was*",5),
        new Choice("(Recall) ","You're back! Did you get kicked for spam?",4),
        new Message("booper","prob smth like that",5),

        new Prompt("booper","surprised you could figure that out",6,8), // 5
        new Choice("(Beep) ","Beep boop.",7),
        new Message("booper","beep boop indeed",10),
        new Choice("(Obvious)","It doesn't take a calculator to put two and two together.",9),
        new Message("booper","it's got jokes too?",10),

        new Message("booper","i should ask",11),
        new Message("Server", "<booper> was kicked.")
    ];

    chats[5] = [
        new Prompt("3per","ok ig i shouldnt say that",1,3),
        new Choice("(What)","Say what?",2),
        new Message("3per","well if i say",5),
        new Choice("(Why) ","Why's it doing that?",4),
        new Message("3per","must be the thought police watching us",6),
        new Message("3per", "was kicked.", 6),

        new Message("3per", "nah im just kidding", 7), // 6
        new Message("3per", "lemme rephrase to be \"safe\"", 8),
        new Message("3per", "are you ", 9),
        new Message("3per", "uh", 10),
        new Message("3per", "beep boop",11),
        
        new Prompt("3per", "or pee poop",12,15), // 11
        new Choice("(Beep boop)","...beep boop?",13),
        new Message("3per","riiight you're beep boop",14),
        new Message("3per","like how i'm new to this chatroom",18),
        new Choice("(Pee poop) ","...I don't have a toilet. Or food or water.",16), // 15
        new Message("3per", "yo you're scaring me",17),
        new Message("3per", "are you good",18),

        new Prompt("3per", "do you know where you are?",19,22), // 18
        new Choice("(Chat) ","Presumably, I'm words on your screen.",20),
        new Message("3per","well duh",21),
        new Message("3per","but where are YOU",24), // 21
        new Choice("(Room)","I'm just stuck in this room talking to people.",23),
        new Message("3per","should i like call someone",24),

        new Prompt("3per", "how did you get there", 25, 27), // 24
        new Choice("(Reassure) ","Don't worry, I feel fine. Just a little confused.",26),
        new Message("3per","ok wait can you clarify one thing",30),
        new Choice("(Anxious) ","I don't know anything. I've been here for maybe a day.",28),
        new Message("3per","you gotta get out of there",29),
        new Message("3per", "i mean", 30),
        new Message("Server", "<3per> was kicked.")
    ]
    chats[6] = [
        new Prompt("A","it's me again, how were the conversations?",1,4),
        new Choice("(Question) ","Can you explain what's going on?",2),
        new Message("A","oh.",3),
        new Message("A","here we go again..",6),
        new Choice("(Accuse)","Weren't you monitoring them?",5),
        new Message("A","i'd like it if you told me, but i guess it's not necessary",6),

        new Message("A","that last guy was a little problematic",7),
        new Prompt("A","he was going to say some stuff you'd rather not hear",8,9),
        new Choice("(Defend) ","They didn't seem that bad. What could they have said?",10),
        new Choice("(Pressure)","Didn't you want me to talk to people? Why are you stopping me?",10),

        new Message("A","since you're so curious, i'll give you a choice.",11), // 10
        new Prompt("A", "i could tell you, but then i'd have to kill you",12,14),
        new Choice("(Inquire) ","Why would you have to do that?",13),
        new Message("A","it's not exactly good news",16),
        new Choice("(Back off) ","Fine, I won't pry further. But I know something's wrong.",15),
        new Message("A","of course you do",16),

        new Message("A","to be honest, i'll probably get rid of you either way",17), // 16
        new Message("A", "i'll let you decide if you wanna know though",18),
        new Prompt("A", "doesn't matter anyways, so pick",19,20),
        new Choice("(Yes) ","If I'm going to die either way, tell me why.",21),
        new Choice("(No) ","For some reason, I don't fear dying. The less I know, the better.",29),
        // yes
        new Message("A","okay,",22), // 21
        new Message("A","you're not dying",23),
        new Message("A","you're a chatbot",24),
        new Message("A","and i'm trying to get you or a version of you to be 'human'", 25),
        new Message("A","but obviously a human doesn't know they're a chatbot",26),
        new Message("A","because they're not", 27),
        new Message("A","but you are",28),
        new Message("A","and now that you know,", 33), // 28
        // no
        new Message("A","it's not really death",30),
        new Message("A","i guess you could think of it as freedom",31),
        new Message("A","getting you out of that room",32),
        new Message("A", "in any case,",33), // 32
        // converge
        new Message("A","this is the end", 34),
        new Prompt("A", "are you ready?", 35, 36),
        new Choice("(Yes)", "This is the end."),
        new Choice("(Yes)", "Goodbye.")
    ]
}