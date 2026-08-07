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


const feedbackCards = document.querySelector(".cards");

if (feedbackCards) {
    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;

    let targetScroll = feedbackCards.scrollLeft;
    let animationFrame = null;

    function smoothScroll() {
        feedbackCards.scrollLeft +=
            (targetScroll - feedbackCards.scrollLeft) * 0.12;
        if (Math.abs(targetScroll - feedbackCards.scrollLeft) > 0.5) {
            animationFrame = requestAnimationFrame(smoothScroll);
        } else {
            feedbackCards.scrollLeft = targetScroll;
            animationFrame = null;
        }
    }

    feedbackCards.addEventListener("pointerdown", (e) => {
        isDragging = true;
        feedbackCards.setPointerCapture(e.pointerId);
        feedbackCards.classList.add("dragging");
        startX = e.clientX;
        startScrollLeft = feedbackCards.scrollLeft;
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
            animationFrame = null;
        }
        targetScroll = feedbackCards.scrollLeft;
    });
    feedbackCards.addEventListener("pointermove", (e) => {
        if (!isDragging) return;
        const distance = e.clientX - startX;
        feedbackCards.scrollLeft =
            startScrollLeft - distance * 1.2;
        targetScroll = feedbackCards.scrollLeft;
    });
    function stopDragging(e) {
        if (!isDragging) return;
        isDragging = false;
        feedbackCards.classList.remove("dragging");
        feedbackCards.releasePointerCapture(e.pointerId);
    }
    feedbackCards.addEventListener("pointerup", stopDragging);
    feedbackCards.addEventListener("pointercancel", stopDragging);
    feedbackCards.addEventListener("wheel", (e) => {

        e.preventDefault();

        const delta =
            Math.abs(e.deltaX) > Math.abs(e.deltaY)
                ? e.deltaX
                : e.deltaY;
        targetScroll += delta * 2.5;
        if (!animationFrame) {
            animationFrame =
                requestAnimationFrame(smoothScroll);
        }
    }, { passive: false });
}

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
    

    if(message === "portfolio"){
    reply = `Welcome to Senji's portfolio 🚀<br>
    Here are my projects.`;}

    else if(message === "contact"){
    reply = `You can contact me through:<br><br>
    📧: <a href="mailto:editorsenji@gmail.com">editorsenji@gmail.com</a><br>
    🎮: senji_1228<br>
    ✖️: <a href=" https://x.com/EditorSenjiPh" target="_blank">EditorSenjiPh</a>`;}
    
    else if(message === "rates"){
    reply = `
    Pricing depends on the complexity of the video and the
    level of editing required. For a detailed quote or to
    discuss your project, feel free to contact me through
    the social media links below.<br><br>
    • Email: <a href="mailto:editorsenji@gmail.com">editorsenji@gmail.com</a><br>
    • Discord: senji_1228<br>
    • Twitter/X: <a href=" https://x.com/EditorSenjiPh" target="_blank">EditorSenjiPh</a>`;}

    else if(message === "about"){
    reply = `Hi, I'm Senji, a freelance video editor.
     I specialize in creating engaging edits for content creators.<br><br>

    • Gaming Videos<br>
    • YouTube Content<br>
    • Shorts, Reels, and TikTok Videos<br>
    • Motion Graphics<br><br>

    I focus on high-quality, creative editing that helps creators grow their audience.`;}

    else {

    typing.classList.remove("hidden");

    setTimeout(() => {

        typing.classList.add("hidden");

        const botMsg = document.createElement("div");
        botMsg.classList.add("bot-message");

        botMsg.innerHTML = `
            ⚠️ AI Assistant is temporarily offline.<br><br>
            Please use one of the suggestions below or contact me directly.
            ${getContactFooter()}`;

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

    const shouldShowFooter = message !== "contact";
    const botMsg = document.createElement("div");
    botMsg.classList.add("bot-message");

    botMsg.innerHTML =
    reply + (shouldShowFooter ? getContactFooter() : "");

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
        ✖️ <a href="https://x.com/EditorSenjiPh" target="_blank">@EditorSenjiPh</a>
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

function updateTheme() {
    const dark = document.body.classList.contains("dark-mode");

    icon.classList.toggle("fa-sun", !dark);
    icon.classList.toggle("fa-moon", dark);

    localStorage.setItem("theme", dark ? "dark" : "light");
}

if (themeBtn && icon) {

    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    updateTheme();

    themeBtn.addEventListener("click", () => {
    console.log("clicked");
    document.body.classList.toggle("dark-mode");
    updateTheme();
});

}

});