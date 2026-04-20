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
        new Message("A","i'll just be working. your work is basically talking to these people!",11),

        new Message("A","you should get some proper sleep now. we'll talk again soon.")
    ];

    chats[2] = [
        new Prompt("","",,),
        new Choice("()","",),
        new Message("","",),
        new Choice("()","",),
        new Message("","",),

        new Prompt("","",,),
        new Choice("()","",),
        new Message("","",),
        new Choice("()","",),
        new Message("","",),

        new Prompt("","",,),
        new Choice("()","",),
        new Message("","",),
        new Choice("()","",),
        new Message("","",),
    ];
}
