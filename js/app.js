import WaveSurfer from 'https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js';

function initAudioPlayers() {
    const playButtons = document.querySelectorAll('.play-btn');

    playButtons.forEach(btn => {
        const card = btn.closest('.track-card, .beat-card');
        if (!card) return;

        const container = card.querySelector('.waveform-container');
        const audioUrl = btn.getAttribute('data-audio');
        const icon = btn.querySelector('i'); 

        if (!container || !audioUrl) return;

        const wavesurfer = WaveSurfer.create({
            container: container,
            waveColor: '#4F4A85',
            progressColor: '#383351',
            url: audioUrl,
            height: 50,
            barWidth: 2,
            cursorWidth: 0, 
        });

        btn.addEventListener('click', () => {
            wavesurfer.playPause();
        });

        wavesurfer.on('play', () => {
            icon.classList.replace('fa-play', 'fa-pause');
        });

        wavesurfer.on('pause', () => {
            icon.classList.replace('fa-pause', 'fa-play');
        });
        
        wavesurfer.on('error', (err) => {
            console.error('WaveSurfer error:', audioUrl, err);
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initAudioPlayers();

    const titleBtnTrack = document.querySelector('.block-title-tracks');
    const titleBtnBeats = document.querySelector('.block-title-beats');
    const trackCards = document.querySelectorAll('.track-card');
    const beatCards = document.querySelectorAll('.beat-card');

    function switchToTracks() {
        trackCards.forEach(c => c.style.display = "flex");
        beatCards.forEach(c => c.style.display = "none");
        titleBtnTrack?.classList.add('active');
        titleBtnBeats?.classList.remove('active');
    }

    function switchToBeats() {
        beatCards.forEach(c => c.style.display = "flex");
        trackCards.forEach(c => c.style.display = "none");
        titleBtnBeats?.classList.add('active');
        titleBtnTrack?.classList.remove('active');
    }

    titleBtnTrack?.addEventListener('click', switchToTracks);
    titleBtnBeats?.addEventListener('click', switchToBeats);

    switchToTracks();
});