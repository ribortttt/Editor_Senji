document.querySelector(".Reels-vid").classList.add("loaded");{

    const video = document.getElementById("my-video");
    const playBtn = document.getElementById("play-btn");
    const frames = document.querySelectorAll("iframe");
    const container = document.querySelector(".Reels-vid");
    const cards = document.querySelectorAll(".card");

    video.addEventListener("loadeddata", () => {
    container.classList.add("loaded");
});
    playBtn.addEventListener("click", () => {

    if(video.paused){
        video.play();
        playBtn.textContent = "❚❚";
    } else {
        video.pause();
        playBtn.textContent = "▶";
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

};
