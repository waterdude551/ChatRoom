let font;
let boldFont;
let italicFont;
let boldItalicFont;

let glitchShader;

function preload() {
    glitchShader = loadShader('shader.vert', 'shader.frag');
}

function loadFonts() {
    font = loadFont("/assets/fonts/UbuntuMono-Regular.ttf");
    boldFont = loadFont("/assets/fonts/UbuntuMono-Bold.ttf");
    italicFont = loadFont("/assets/fonts/UbuntuMono-Italic.ttf");
    boldItalicFont = loadFont("/assets/fonts/UbuntuMono-BoldItalic.ttf");
}

function setup() {
    createCanvas(innerWidth, innerHeight, WEBGL);
    loadFonts();
    // prints show up in Inspect Element -> Console
    print("hello world!");
}


function draw() {
    textFont(font);
    textSize(24);
    background(20);
    
    text("Hello World!", -400, -200);
}

