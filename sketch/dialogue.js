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
    ]
}
