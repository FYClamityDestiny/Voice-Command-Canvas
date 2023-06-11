let x = 0;
let y = 0;
let screenw = 0;
let screenh = 0;
let draw_apple = "";
let speak_data = "";
let to_number = "";
let appleImage = "";

const SpeechRecognition = window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

function preload(){
appleImage = loadImage("apple.png");
}
function start() {
  document.getElementById("status").innerHTML = "System is listening. Please speak.";
  recognition.start();
}

recognition.onresult = function (event) {
  console.log(event);
  const content = event.results[0][0].transcript;
  to_number = Number(content); // Update the global to_number variable
  if (Number.isInteger(to_number)) {
    document.getElementById("status").innerHTML = "The speech has been recognized: " + content;
    draw_apple = "set";
    speak_data = to_number + " apples drawn";
    speak();
  }
}

function setup() {
  screenw = window.innerWidth;
  screenh = window.innerHeight;
  myCanvas = createCanvas(screenw - 300, screenh - 225);
  myCanvas.center();
}

function draw() {
  if (draw_apple == "set") {
    for (let i = 1; i <= to_number; i++) {
      x = Math.floor(Math.random() * (width - 50)); // Adjusted x calculation
      y = Math.floor(Math.random() * (height - 50)); // Adjusted y calculation
      image(appleImage, x, y, 50, 50); // Updated variable name
    }
    document.getElementById("status").innerHTML = to_number + " Apples drawn";
    draw_apple = "";
  }
  
}

function speak() {
  const synth = window.speechSynthesis;
  const utterThis = new SpeechSynthesisUtterance(speak_data);
  synth.speak(utterThis);
}
