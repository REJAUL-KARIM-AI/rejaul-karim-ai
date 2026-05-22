/* LIVE CLOCK */

setInterval(()=>{

let d = new Date();

document.getElementById(
"clock"
).innerHTML =
d.toLocaleTimeString();

},1000);


/* REAL CHATGPT AI */

async function askAI(){

let q =
document.getElementById(
"question"
).value;

if(q==""){

document.getElementById(
"answer"
).innerHTML =
"Please ask something";

return;

}

document.getElementById(
"answer"
).innerHTML =
"Thinking...";


/* LANGUAGE */

let lang =
document.getElementById(
"language"
).value;


try{

/* OPENAI API */

const response =
await fetch(

"https://api.openai.com/v1/chat/completions",

{

method:"POST",

headers:{

"Content-Type":
"application/json",

"Authorization":

"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"

},

body:JSON.stringify({

model:"gpt-3.5-turbo",

messages:[

{

role:"system",

content:

"You are Mohammed Rejaul Karim AI, a polite Assamese male AI assistant who speaks Assamese, English, Hindi and Bangla."

},

{

role:"user",

content:q

}

]

})

}

);


/* GET AI DATA */

const data =
await response.json();


/* AI ANSWER */

let ans =
data.choices[0]
.message.content;


/* SHOW ANSWER */

document.getElementById(
"answer"
).innerHTML = ans;


/* AI VOICE */

let speech =
new SpeechSynthesisUtterance();

speech.text = ans;

speech.lang = lang;

speech.rate = 0.85;

speech.pitch = 0.6;

speech.volume = 1;


/* VOICE SELECTION */

let voices =
window.speechSynthesis
.getVoices();

speech.voice =

voices.find(v =>
v.lang.includes(
lang.split("-")[0]
))

||

voices[0];


/* STOP OLD VOICE */

window.speechSynthesis
.cancel();


/* SPEAK */

window.speechSynthesis
.speak(speech);

}catch(error){

document.getElementById(
"answer"
).innerHTML =

"API Error, Internet Problem or Invalid API Key";

}

}


/* VOICE INPUT */

function startVoice(){

if(
'webkitSpeechRecognition'
in window
){

let recognition =
new webkitSpeechRecognition();

recognition.lang="en-US";

recognition.start();


recognition.onresult =
function(event){

let text =
event.results[0][0]
.transcript;

document.getElementById(
"question"
).value = text;

askAI();

};

}else{

alert(
"Voice recognition not supported"
);

}

}