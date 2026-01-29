import WaveSurfer from 'https://cdn.jsdelivr.net/npm/wavesurfer.js@7/dist/wavesurfer.esm.js'
// 1. Создаем экземпляр WaveSurfer
const wavesurfer = WaveSurfer.create({
    container: '#waveform',   // ID контейнера из HTML
    waveColor: '#4F4A85',     // Цвет незаполненной волны
    progressColor: '#383351', // Цвет прогресса воспроизведения
    url: 'assets/audio/1.mp3', // Путь к файлу
    height: 50,               // Высота в пикселях
    barWidth: 2,              // Ширина столбиков (как на сайте)
    barGap: 3,                // Расстояние между ними
    barRadius: 3,             // Скругление столбиков
});

// 2. Оживляем кнопку
const playBtn = document.querySelector('.play-btn');
const icon = playBtn.querySelector('i');

playBtn.addEventListener('click', () => {
    wavesurfer.playPause(); // Магия: сама переключает плей/паузу
});

// 3. Меняем иконку при проигрывании
wavesurfer.on('play', () => {
    icon.classList.replace('fa-play', 'fa-pause');
});

wavesurfer.on('pause', () => {
    icon.classList.replace('fa-pause', 'fa-play');
});