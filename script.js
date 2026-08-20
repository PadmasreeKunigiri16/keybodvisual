const suggestionsWords=[
"hello","hi","how","are","you","good","great","javascript","keyboard","project"
];

const emojis = [
"😀","😁","😂","🤣","😃","😄","😅","😆","😉","😊",
"😋","😎","😍","😘","🥰","😗","😙","😚","🙂","🤗",
"🤩","🤔","🤨","😐","😑","😶","🙄","😏","😣","😥",
"😮","🤐","😯","😪","😫","🥱","😴","😌","😛","😜",
"😝","🤤","😒","😓","😔","😕","🙃","🤑","😲","☹",
"🙁","😖","😞","😟","😤","😢","😭","😦","😧","😨",
"😩","🤯","😬","😰","😱","🥵","🥶","😳","🤪","😵",
"😡","😠","🤬","😷","🤒","🤕","🤢","🤮","🤧","😇",
"🥳","🥺","🤠","🤡","🤥","🤫","🤭","🧐","🤓","😈",
"👻","💀","👽","🤖","🎃","🔥","✨","💯","❤️","👍"
];

const Keyboard={

elements:{
main:null,
keysContainer:null
},

properties:{
value:"",
capsLock:false,
shift:false,
oninput:null,

keyLayout:[
"1","2","3","4","5","6","7","8","9","0","backspace",
"q","w","e","r","t","y","u","i","o","p",
"caps","a","s","d","f","g","h","j","k","l","enter",
"shift","z","x","c","v","b","n","m",
"emoji","space"
]

},

init(){

this.elements.main=document.createElement("div");
this.elements.main.classList.add("keyboard","keyboard--hidden");

this.elements.keysContainer=document.createElement("div");
this.elements.keysContainer.classList.add("keyboard__keys");

this.elements.main.appendChild(this.elements.keysContainer);
document.body.appendChild(this.elements.main);

this._createKeys();
this._createEmojiPanel();

document.querySelectorAll(".use-keyboard-input").forEach(element=>{
element.addEventListener("focus",()=>{
this.open(element.value,(currentValue)=>{
element.value=currentValue;
this._updateSuggestions();
});
});
});

},

_playSound(){
const sound=document.getElementById("keySound");
sound.currentTime=0;
sound.play();
},

_createEmojiPanel(){

const panel=document.createElement("div");
panel.classList.add("emoji-panel");
panel.id="emojiPanel";

emojis.forEach(e=>{
const span=document.createElement("span");
span.textContent=e;

span.addEventListener("click",()=>{
this.properties.value+=e;
this._triggerEvent("oninput");
});

panel.appendChild(span);
});

document.body.appendChild(panel);

},

_createKeys(){

const fragment=document.createDocumentFragment();

this.properties.keyLayout.forEach(key=>{

const keyElement=document.createElement("button");
keyElement.type="button";
keyElement.classList.add("keyboard__key");

switch(key){

case "backspace":

keyElement.innerHTML=`<span class="material-icons">backspace</span>`;

keyElement.addEventListener("click",()=>{
this.properties.value=this.properties.value.slice(0,-1);
this._triggerEvent("oninput");
this._updateSuggestions();
this._playSound();
});

break;

case "caps":

keyElement.innerHTML=`<span class="material-icons">keyboard_capslock</span>`;

keyElement.addEventListener("click",()=>{
this.properties.capsLock=!this.properties.capsLock;
keyElement.classList.toggle("keyboard__key--active");
});

break;

case "shift":

keyElement.innerHTML=`<span class="material-icons">north</span>`;

keyElement.addEventListener("click",()=>{
this.properties.shift=!this.properties.shift;
keyElement.classList.toggle("keyboard__key--active");
});

break;

case "enter":

keyElement.innerHTML=`<span class="material-icons">keyboard_return</span>`;

keyElement.addEventListener("click",()=>{
this.properties.value+="\n";
this._triggerEvent("oninput");
});

break;

case "space":

keyElement.classList.add("keyboard__key--extra-wide");
keyElement.textContent="Space";

keyElement.addEventListener("click",()=>{
this.properties.value+=" ";
this._triggerEvent("oninput");
});

break;

case "emoji":

keyElement.textContent="😊";

keyElement.addEventListener("click",()=>{
const panel=document.getElementById("emojiPanel");
panel.style.display=panel.style.display==="flex"?"none":"flex";
});

break;

default:

keyElement.textContent=key;

keyElement.addEventListener("click",()=>{

let char=key;

if(this.properties.capsLock || this.properties.shift)
char=key.toUpperCase();

this.properties.value+=char;

this._triggerEvent("oninput");
this._updateSuggestions();
this._playSound();

this.properties.shift=false;

});

}

fragment.appendChild(keyElement);

});

this.elements.keysContainer.appendChild(fragment);

},

_updateSuggestions(){

const box=document.getElementById("suggestions");
box.innerHTML="";

const lastWord=this.properties.value.split(" ").pop();

suggestionsWords.forEach(word=>{
if(word.startsWith(lastWord) && lastWord.length>0){

const span=document.createElement("span");
span.textContent=word;

span.addEventListener("click",()=>{
let words=this.properties.value.split(" ");
words.pop();
words.push(word);
this.properties.value=words.join(" ")+" ";
this._triggerEvent("oninput");
});

box.appendChild(span);

}

});

},

_triggerEvent(handlerName){

if(typeof this.properties[handlerName]=="function")
this.properties[handlerName](this.properties.value);

},

open(initialValue,oninput){

this.properties.value=initialValue||"";
this.properties.oninput=oninput;

this.elements.main.classList.remove("keyboard--hidden");

}

};

window.addEventListener("DOMContentLoaded",()=>{

Keyboard.init();

const btn=document.getElementById("themeToggle");

btn.addEventListener("click",()=>{

document.body.classList.toggle("dark");

btn.textContent=
document.body.classList.contains("dark")
?"☀ Light Mode"
:"🌙 Dark Mode";

});

});
let swipeWord = "";

document.addEventListener("mousemove",function(e){

if(e.buttons===1){

const key = document.elementFromPoint(e.clientX,e.clientY);

if(key && key.classList.contains("keyboard__key")){

const letter = key.innerText.toLowerCase();

if(letter.length === 1){
swipeWord += letter;
}

}

}

});

document.addEventListener("mouseup",function(){

if(swipeWord.length>2){

Keyboard.properties.value += swipeWord + " ";
Keyboard._triggerEvent("oninput");

}

swipeWord="";

});