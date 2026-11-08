document.addEventListener("DOMContentLoaded", () => {

    const frames = document.querySelectorAll("iframe");
    const aboutContainer = document.querySelector(".about-container");
    const chatBtn = document.getElementById("chatBtn");
    const closeChat = document.getElementById("closeChat");
    const sendBtn = document.getElementById("sendBtn");

    const chatBox = document.getElementById("chatBox");
    const userInput = document.getElementById("userInput");
    const chatBody = document.getElementById("chatBody");
    const typing = document.getElementById("typing");
    const themeBtn = document.getElementById("theme-toggle");
    const icon = themeBtn ? themeBtn.querySelector("i") : null;



const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }});}, {
    threshold: 0.2
});
[...frames].forEach((frame,index)=>{

    observer.observe(frame);

    frame.style.transitionDelay =
        `${index*0.1}s`;

});;

if(aboutContainer){

const aboutObserver =
new IntersectionObserver(entries=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            aboutContainer.classList.add("show");

        }

    });

},{
    threshold:0.2
});
aboutObserver.observe(aboutContainer);
}


if (sendBtn) {
    sendBtn.addEventListener("click", sendMessage);
}

if (userInput) {
userInput.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        sendMessage();
    }
});
}

document.querySelector(".chat-suggestions")
?.remove();
async function sendMessage(){

    
    let text = userInput.value.trim();

    if (text === "") return;

    sendBtn.disabled = true;
    userInput.disabled = true;

    const userMsg = document.createElement("div");
    userMsg.classList.add("user-message");
    userMsg.textContent = text;
    chatBody.appendChild(userMsg);

    chatBody.scrollTop = chatBody.scrollHeight;
    userInput.value = "";

    const message = text.toLowerCase();
    let reply = "";
    let showFooter = true;

    const has = (...words) =>
        words.some(w => new RegExp("\\b" + w + "\\b").test(message));
    

    if(has("portfolio", "projects", "samples", "examples")){
    reply = `Welcome to Senji's portfolio <br>
    Here are my projects.`;}

    else if(has("contact", "email", "discord", "twitter", "reach", "X", "ig")){
    reply = `You can contact me through:<br><br>
    📧: <a href="mailto:editorsenji@gmail.com">editorsenji@gmail.com</a><br>
    🎮: editorsenji<br>
    ✖️: <a href="https://x.com/editorsenji" target="_blank">@editorsenji</a><br>
    📷: <a href="https://www.instagram.com/editorsenji/" target="_blank">@editorsenji</a>`;
    showFooter = false;}
    
    else if(has("rates", "rate", "price", "pricing", "cost", "quote", "charge", "how much", "hm")){
    reply = `
    Pricing depends on the complexity of the video and the
    level of editing required. For a detailed quote or to
    discuss your project, feel free to contact me through
    the social media links below.<br><br>
    • Email: <a href="mailto:editorsenji@gmail.com">editorsenji@gmail.com</a><br>
    • Discord: editorsenji<br>
    • X: <a href=" https://x.com/editorsenji" target="_blank">@editorsenji</a><br>
    • Instagram: <a href=" https://www.instagram.com/editorsenji/" target="_blank">@editorsenji</a>`;}

    else if(has("about", "who", "services", "specialize", "what do you do")){
    reply = `Hi, I'm Senji, a freelance video editor.
     I specialize in creating engaging edits for content creators.<br><br>

    • Gaming Videos<br>
    • YouTube Content<br>
    • Shorts, Reels, and TikTok Videos<br>
    • Motion Graphics<br><br>

    I focus on high-quality, creative editing that helps creators grow their audience.`;}

    else if(has("hire", "book", "commission", "available", "availability")){
    reply = `Thanks for your interest! 🎬<br>
    Send me the details of your project through the links below
    and I'll get back to you.`;}

    else if(has("hi", "hello", "hey")){
    reply = `Hey there 👋<br>
    Ask me about my portfolio, rates, or how to contact me.`;
    showFooter = false;}

    else if(has("thanks", "thank you")){
    reply = `You're welcome! 😊`;
    showFooter = false;}

    else {

    typing.classList.remove("hidden");

    setTimeout(() => {

        typing.classList.add("hidden");

        const botMsg = document.createElement("div");
        botMsg.classList.add("bot-message");

        botMsg.innerHTML = `You can contact me through:<br><br>
            📧: <a href="mailto:editorsenji@gmail.com">editorsenji@gmail.com</a><br>
            🎮: editorsenji<br>
            ✖️: <a href="https://x.com/EditorSenjiPh" target="_blank">@editorsenji</a><br>
            📷: <a href="https://www.instagram.com/editorsenji/" target="_blank">@editorsenji</a>`;

        chatBody.appendChild(botMsg);
        chatBody.scrollTop = chatBody.scrollHeight;

        showSuggestions();

        sendBtn.disabled = false;
        userInput.disabled = false;

    }, 700);

    return;
}
    typing.classList.remove("hidden");

    setTimeout(() => {

    typing.classList.add("hidden");

    const botMsg = document.createElement("div");
    botMsg.classList.add("bot-message");

    botMsg.innerHTML =
    reply + (showFooter ? getContactFooter() : "");

    chatBody.appendChild(botMsg);
    chatBody.scrollTop = chatBody.scrollHeight;

    showSuggestions();
    sendBtn.disabled = false;
    userInput.disabled = false;

    }, 800);
}
let greeted = false;
if(chatBtn){

chatBtn.addEventListener("click", () => {
    chatBox.classList.add("active");
    document.querySelector(".chat-container").classList.add("active");

    if(!greeted){

        greeted = true;

        typing.classList.remove("hidden");

        setTimeout(() => {

            sendBtn.disabled = false;
            userInput.disabled = false;

            typing.classList.add("hidden");

            const botMsg = document.createElement("div");
            botMsg.classList.add("bot-message");

            botMsg.textContent =
                "Hi👋! What would you like to know about me?";

            chatBody.appendChild(botMsg);
            showSuggestions();
        }, 1200);
    }
});}

function getContactFooter() {
    return `
    <br><br>
    <hr>
    <small>
        📧 <a href="mailto:editorsenji@gmail.com">editorsenji@gmail.com</a><br>
        🎮 senji_1228<br>
        ✖️ <a href="https://x.com/EditorSenjiPh" target="_blank">@editorsenji</a><br>
        📷 <a href="https://www.instagram.com/editorsenji/" target="_blank">@editorsenji</a>
        </small>`;
}
function showSuggestions() {

    const old = document.querySelector(".chat-suggestions");
    if (old) old.remove();

    const suggestionBox = document.createElement("div");
    suggestionBox.classList.add("chat-suggestions");

    suggestionBox.innerHTML = `
        <button class="suggestion">Portfolio</button>
        <button class="suggestion">Contact</button>
        <button class="suggestion">Rates</button>
        <button class="suggestion">About</button>`;

    chatBody.appendChild(suggestionBox);

    suggestionBox.querySelectorAll(".suggestion").forEach(btn => {
        btn.addEventListener("click", () => {
            userInput.value = btn.textContent;
            sendMessage();
        });
    });

    chatBody.scrollTop = chatBody.scrollHeight;
}
if(closeChat){
closeChat.addEventListener("click", () => {
    chatBox.classList.remove("active");
    document.querySelector(".chat-container").classList.remove("active");
});
}

let themeTimer;

function applyTheme(isDark) {
    document.body.classList.toggle("dark-mode", isDark);

    icon.classList.toggle("fa-moon", isDark);
    icon.classList.toggle("fa-sun", !isDark);

    localStorage.setItem("theme", isDark ? "dark" : "light");
}

if (themeBtn && icon) {

    const savedTheme = localStorage.getItem("theme");
    applyTheme(savedTheme !== "light");

    themeBtn.addEventListener("click", () => {
        const root = document.documentElement;

        root.classList.add("theme-transition");
        applyTheme(!document.body.classList.contains("dark-mode"));

        clearTimeout(themeTimer);
        themeTimer = setTimeout(() => {
            root.classList.remove("theme-transition");
        }, 500);
    });

}

});