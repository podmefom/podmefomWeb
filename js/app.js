document.addEventListener("DOMContentLoaded", function() {
    const playBtn = document.querySelectorAll('.play-btn');

    const audio = new Audio("assets/audio/1.mp3");

    playBtn.forEach(btn => {
        btn.addEventListener('click', function(){
            audio.play();
        })
    });


    const titleBtnTrack = document.querySelector('.block-title-tracks');
    const titleBtnBeats = document.querySelector('.block-title-beats');
    const trackCard = document.getElementById('track');
    const beatsCard = document.getElementById('beats');

    function switchToTracks() {
        if (trackCard) trackCard.style.display = "flex";
        if (beatsCard) beatsCard.style.display = "none";
        
        titleBtnTrack.classList.add('active');
        titleBtnBeats.classList.remove('active');
    }
    
    function switchToBeats() {
        if (beatsCard) beatsCard.style.display = "flex";
        if (trackCard) trackCard.style.display = "none";
        
        titleBtnBeats.classList.add('active');
        titleBtnTrack.classList.remove('active');
    }
    
    if (titleBtnTrack) {
        titleBtnTrack.addEventListener('click', switchToTracks);
    }
    
    if (titleBtnBeats) {
        titleBtnBeats.addEventListener('click', switchToBeats);
    }
    
    switchToTracks(); 
});
