import WaveSurfer from 'https://unpkg.com/wavesurfer.js@7/dist/wavesurfer.esm.js';
import state from './state.js'

let currentActiveInstance;


const wavesurferOptions = {
    waveColor: '#4F4A85',
    progressColor: '#6c5ce7',
    height: 40,
    barWidth: 2,
    cursorWidth: 0,
};

function updateBottomPlayer(track) {
    const title = document.querySelector('.current-track-title');
    const artist = document.querySelector('.current-track-artist');
    const titleContainer = document.querySelector('.track-title-container');
    if (track) {
        title.textContent = track.title;
        title.setAttribute('data-text', track.title)
        artist.textContent = track.artist;
        if (title.scrollWidth > titleContainer.offsetWidth) {
        title.classList.add('scrolling');
        } else {
        title.classList.remove('scrolling');
        }
    }
}

function formatTime(seconds) {
    if (!seconds) return "0:00";
    const minutes = Math.floor(seconds / 60);
    const secondsRemainder = Math.floor(seconds % 60);
    const s = secondsRemainder < 10 ? '0' + secondsRemainder : secondsRemainder;
    return minutes + ':' + s;
}

function initAudioPlayers() {
    const playButtons = document.querySelectorAll('.play-btn');

    playButtons.forEach(btn => {
        const card = btn.closest('.track-card, .beat-card');
        if (!card) return;

        const container = card.querySelector('.waveform-container');
        const audioUrl = btn.getAttribute('data-audio');
        const icon = btn.querySelector('i');
        const durationBox = card.querySelector('.card-duration');
        const likeButton = card.querySelector('.like-stat');

        if (!container || !audioUrl) return;

        const wavesurfer = WaveSurfer.create({
            ...wavesurferOptions,
            container: container,
            url: audioUrl,
        });


        
        if (likeButton) {
            likeButton.addEventListener('click', (e) => {
                e.stopPropagation();
                const likeIcon = likeButton.querySelector('i');
                const countDisplay = likeButton.querySelector('span');
                let currentCount = parseInt(countDisplay.textContent) || 0;

                const isLiked = likeIcon.classList.toggle('fa-solid');
                likeIcon.classList.toggle('fa-regular');
                
                countDisplay.textContent = isLiked ? currentCount + 1 : Math.max(0, currentCount - 1);
            });
        }

        btn.addEventListener('click', () => {
            if (currentActiveInstance && currentActiveInstance !== wavesurfer) {
                currentActiveInstance.stop();
            }
            wavesurfer.playPause();
            currentActiveInstance = wavesurfer;

            
            const trackInfo = state.allTracks.find(t => t.url === audioUrl);
            if (trackInfo) {
                state.currentTrackIndex = state.allTracks.indexOf(trackInfo);
                state.isPlaying = true;
                updateBottomPlayer(trackInfo);
            }

            currentActiveInstance.setVolume(globalVolume.value); 
        });

        wavesurfer.on('play', () => {
            icon.classList.replace('fa-play', 'fa-pause');
            const mainIcon = document.querySelector('#main-play-btn i');
            if (mainIcon) mainIcon.classList.replace('fa-play', 'fa-pause');
        });

        wavesurfer.on('pause', () => {
            icon.classList.replace('fa-pause', 'fa-play');
            const mainIcon = document.querySelector('#main-play-btn i');
            if (mainIcon) mainIcon.classList.replace('fa-pause', 'fa-play');
        });

        wavesurfer.on('timeupdate', (currentTime) => {
            const currentDisplay = document.querySelector('.current-time');
            if (currentDisplay) currentDisplay.textContent = formatTime(currentTime);
        });

        wavesurfer.on('ready', () => {
            if (durationBox) durationBox.textContent = formatTime(wavesurfer.getDuration());
            const totalDisplay = document.querySelector('.total-duration');
            if (totalDisplay) totalDisplay.textContent = formatTime(wavesurfer.getDuration());
        });

        wavesurfer.on('finish' , () => {
            state.currentTrackIndex = (state.currentTrackIndex + 1) % state.allTracks.length;
            const targetTrack = state.allTracks[state.currentTrackIndex];
            const targetBtn = document.querySelector(`[data-audio="${targetTrack.url}"]`);
            targetBtn?.click();
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    initAudioPlayers();

    const titleBtnTrack = document.getElementById('tab-tracks');
    const titleBtnBeats = document.getElementById('tab-beats');
    const tracksList = document.getElementById('tracks-list');
    const beatsList = document.getElementById('beats-list');

    const prevBtn = document.getElementById('prev-btn');
    const mainBtn = document.getElementById('main-play-btn');
    const nextBtn = document.getElementById('next-btn');

    const globalVolume = document.getElementById('global-volume');

    globalVolume.addEventListener('input', (e) => {
        if (currentActiveInstance){
            currentActiveInstance.setVolume(e.target.value);
        };
    });
    
    function switchToTracks() {
        if (tracksList && beatsList) {
            tracksList.style.display = "flex";
            beatsList.style.display = "none";
            titleBtnTrack?.classList.add('active');
            titleBtnBeats?.classList.remove('active');
        }
    }

    function switchToBeats() {
        if (tracksList && beatsList) {
            beatsList.style.display = "flex";
            tracksList.style.display = "none";
            titleBtnBeats?.classList.add('active');
            titleBtnTrack?.classList.remove('active');
        }
    }

    titleBtnTrack?.addEventListener('click', switchToTracks);
    titleBtnBeats?.addEventListener('click', switchToBeats);

    prevBtn?.addEventListener('click', () => {
        state.currentTrackIndex = (state.currentTrackIndex - 1 + state.allTracks.length) % state.allTracks.length;
        const targetTrack = state.allTracks[state.currentTrackIndex];
        const targetBtn = document.querySelector(`[data-audio="${targetTrack.url}"]`);
        targetBtn?.click();
    });

    mainBtn?.addEventListener('click', () => {
        if (currentActiveInstance) {
            currentActiveInstance.playPause();
        } else {
            const firstPlayBtn = document.querySelector('.play-btn');
            if (firstPlayBtn) {
                firstPlayBtn.click();
            };
        }
    });

    nextBtn?.addEventListener('click', () => {
        state.currentTrackIndex = (state.currentTrackIndex + 1) % state.allTracks.length;
        const targetTrack = state.allTracks[state.currentTrackIndex];
        const targetBtn = document.querySelector(`[data-audio="${targetTrack.url}"]`);
        targetBtn?.click();
    });

    switchToTracks();
});