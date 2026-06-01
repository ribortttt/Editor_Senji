document.querySelector(".Reels-vid").classList.add("loaded");{

    const video = document.getElementById("my-video");
    const container = document.querySelector(".Reels-vid");
    const playBtn = document.getElementById("play-btn");
    const volumeBtn = document.getElementById("volume-btn");
    const volumeSlider = document.getElementById("volume-slider");
    const frames = document.querySelectorAll("iframe");
    const cards = document.querySelectorAll(".card");
    const aboutContainer = document.querySelector(".about-container");
    const chatBtn = document.getElementById("chatBtn");
    const closeChat = document.getElementById("closeChat");
    const sendBtn = document.getElementById("sendBtn");

    const chatBox = document.getElementById("chatBox");
    const userInput = document.getElementById("userInput");
    const chatBody = document.getElementById("chatBody");
    const typing = document.getElementById("typing");
    const themeBtn = document.getElementById("theme-toggle");
    




    let hideTimeout

    video.addEventListener("loadeddata", () => {
    container.classList.add("loaded");
});

function showIcon(type){

    if(type === "play"){
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    } else {
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
    playBtn.classList.add("show");
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
        playBtn.classList.remove("show");
    }, 800);
}

video.addEventListener("click", () => {

    if(video.paused){
        video.play();
        showIcon("pause");
    } else {
        video.pause();
        showIcon("play");
    }
});

volumeSlider.addEventListener("input", () => {
    video.muted = false;
    video.volume = volumeSlider.value;

    if(video.volume == 0){
        volumeBtn.innerHTML =
        '<i class="fa-solid fa-volume-xmark"></i>';
    } else {
        volumeBtn.innerHTML =
        '<i class="fa-solid fa-volume-high"></i>';
    }
});

volumeBtn.addEventListener("click", () => {

    video.muted = !video.muted;

    if(video.muted){

        volumeBtn.innerHTML =
        '<i class="fa-solid fa-volume-xmark"></i>';

        volumeSlider.value = 0;

    } else {

        volumeBtn.innerHTML =
        '<i class="fa-solid fa-volume-high"></i>';

        volumeSlider.value = 1;
        video.volume = 1;
    }

});

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }});}, {
    threshold: 0.2
});
frames.forEach(frame => {
    observer.observe(frame);
});
frames.forEach((frame, index) => {
    frame.style.transitionDelay = `${index * 0.1}s`;
});

cards.forEach(card => {
    card.addEventListener("mousemove", (e) => {

        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -12;
        const rotateY = ((x - centerX) / centerX) * 12;

        card.style.transform = `
            perspective(1200px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale(1.05)
        `;
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = `
            perspective(1200px)
            rotateX(0deg)
            rotateY(0deg)
            scale(1)
        `;
    });

});

window.addEventListener("scroll", () => {
  const triggerBottom = window.innerHeight * 0.85;

  const containerTop = aboutContainer.getBoundingClientRect().top;

  if (containerTop < triggerBottom) {
    aboutContainer.classList.add("show");
  }
});

sendBtn.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        sendMessage();
    }
});

async function sendMessage(){

    
    let text = userInput.value.trim();
    if(text === "") return;

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
    reply = `You can contact me through:<br>
    📧: <a href="mailto:editorsenji@gmail.com">editorsenji@gmail.com</a><br>
    🎮: senji_1228<br>
    ✖️: <a href=" https://x.com/EditorSenjiPh" target="_blank">EditorSenjiPh</a>`;}

    else {
    typing.classList.remove("hidden");

    const aiReply = await getGeminiResponse(text);

    typing.classList.add("hidden");

    const botMsg = document.createElement("div");
    botMsg.classList.add("bot-message");

    botMsg.innerHTML = formatAI(aiReply) + getContactFooter();

    chatBody.appendChild(botMsg);
    chatBody.scrollTop = chatBody.scrollHeight;

    showSuggestions();
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

    }, 800);
}
let greeted = false;
chatBtn.addEventListener("click", () => {
    chatBox.classList.add("active");
    document.querySelector(".chat-container").classList.add("active");

    if(!greeted){

        greeted = true;

        typing.classList.remove("hidden");

        setTimeout(() => {

            typing.classList.add("hidden");

            const botMsg = document.createElement("div");
            botMsg.classList.add("bot-message");

            botMsg.textContent =
                "👋 Hi! What would you like to know about me?";

            chatBody.appendChild(botMsg);
            showSuggestions();
        }, 1200);
    }
});

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
        <button class="suggestion">Contact</button>`;

    chatBody.appendChild(suggestionBox);

    suggestionBox.querySelectorAll(".suggestion").forEach(btn => {
        btn.addEventListener("click", () => {
            userInput.value = btn.textContent;
            sendMessage();
        });
    });

    chatBody.scrollTop = chatBody.scrollHeight;
}
closeChat.addEventListener("click", () => {
    chatBox.classList.remove("active");
    document.querySelector(".chat-container").classList.remove("active");
});
function formatAI(text) {
    if (!text.includes("•")) return text;

    return text
        .split("•")
        .filter(t => t.trim())
        .map(t => `<div>• ${t.trim()}</div>`)
        .join("");
}
async function getGeminiResponse(userText) {
     try {

    const API_KEY = "AQ.Ab8RN6JVl_adJpyqDYtCtyPUmU12dGdPOmhEuuiD7y6AD9iFQQ";

    const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-goog-api-key": API_KEY
            },
            body: JSON.stringify({
                contents: [
                    {
                        role: "user",
                        parts: [
                            {
                                text: `You are Senji's portfolio assistant.

                                Rules:
                                - If the answer is a normal explanation → write normal paragraph (no bullets)
                                - If the answer is steps, instructions, or multiple items → use bullet points
                                - Each bullet must be on a NEW LINE (never in one line)
                                - Always start bullets with "• "
                                - Never combine multiple bullets in one line
                                - Keep answers clean and easy to read
                                - No emojis

                                User: ${userText}`
                            }
                        ]
                    }
                ]
            })
        }
    );

    const data = await response.json();

        console.log("API FULL RESPONSE:", data);

        if (userText.length < 2) {
        return "Please type a longer message.";
        }

        if (!response.ok) {
        return "⚠️ API Error";
        }

        if (!data.candidates || !data.candidates[0]) {
        return "⚠️ No AI response (check API quota or request format)";
        }

        return data.candidates[0].content.parts[0].text;

    } catch (err) {
        console.log("CATCH ERROR:", err);
        return "⚠️ Network error or API blocked";
    }
}

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
};
