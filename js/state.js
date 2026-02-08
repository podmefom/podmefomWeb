const tracks = [
    {
        id: 1,
        title: "1",
        artist: "1",
        url: "assets/audio/1.mp3",
        duration: 1
    },
    {
        id: 2,
        title: "2",
        artist: "2",
        url: "assets/audio/2.mp3",
        duration: 2
    },
    {
        id: 3,
        title: "хуй",
        artist: "хуй",
        url: "assets/audio/3.mp3",
        duration: 3
    }
];

const state = {
    allTracks: tracks,
    currentTrackIndex: 0,
    volume: 1,
    isPlaying: false
};

export default state;