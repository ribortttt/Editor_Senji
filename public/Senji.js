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
    const icon = themeBtn.querySelector("i");
   




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
                "Hi👋! What would you like to know about me?";

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
closeChat.addEventListener("click", () => {
    chatBox.classList.remove("active");
    document.querySelector(".chat-container").classList.remove("active");
});
function formatAI(text) {
    return text
        .split("\n")
        .map(line => {
            line = line.trim();
            line = line.replace(
                /\*\*(.*?)\*\*/g,
                "<strong>$1</strong>"
            );
            if (line.startsWith("•")) {
                return `<div class="bullet">${line}</div>`;
            }
            return `<div>${line}</div>`;
        })
        .join("");
}
async function getGeminiResponse(userText) {
     try {

    const API_KEY = "AQ.Ab8RN6Ivq6Qynv9ASLjCRKD-MMkAuM21Kvdf49PlVJkBcd54FA";

    const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
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
                                text: `
                                You are Senji's Portfolio Assistant.

                                IMPORTANT RULES:
                                - Never use Markdown.
                                - Never use **bold**
                                - Never use # headings
                                - Use plain text only.
                                - For lists, use only "•" bullet points.
                                - Put each bullet on a new line.

                                Information:

                                Name: Senji
                                Role: Video Editor

                                Services:
                                • Gaming Videos
                                • YouTube Editing
                                • Shorts/Reels/TikTok Editing
                                • Motion Graphics

                                Contact:
                                Email: editorsenji@gmail.com
                                Discord: senji_1228
                                Twitter/X: https://x.com/EditorSenjiPh

                                Rates:
                                Pricing depends on the complexity of the video and the 
                                level of editing required. For a detailed quote or to 
                                discuss your project, feel free to contact me through 
                                the social media links below.

                                • Email: editorsenji@gmail.com
                                • Discord: senji_1228
                                • Twitter/X: https://x.com/EditorSenjiPh

                                FAQ:
                                Q: How can I contact Senji?
                                A: Through email, Discord, or Twitter.

                                Q: What are the editing rates?
                                A: Depends on project scope.

                                Always answer based on the information above.
                                If the user asks something unrelated, answer normally.
                                User Question: ${userText}`
                            }
                        ]
                    }
                ]
            })
        }
    );

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
    if (response.status === 429) {
        throw new Error(
            "The AI service is temporarily unavailable because the quota limit has been reached. Please try again later."
        );
    }
    throw new Error(
        data.error?.message || "Unknown API Error"
    );
    }

    return data.candidates?.[0]?.content?.parts?.[0]?.text ||
       "No response received.";

    } catch (err) {
    console.error(err);
    return `Error: ${err.message}`;
    }
}

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
    } else {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    }
});
};
