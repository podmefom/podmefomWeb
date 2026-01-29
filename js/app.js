const playBtn = document.querySelectorAll('.play-btn');

const audio = new Audio("assets/audio/1.mp3");

playBtn.forEach(btn => {
    btn.addEventListener('click', function(){
        audio.play();
    })
});
