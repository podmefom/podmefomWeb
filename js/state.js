const tracks = [
    {
        id: 1,
        title: "1",
        artist: "1",
        url: "1",
        duration: 1
    },
    {
        id: 2,
        title: "2",
        artist: "2",
        url: "2",
        duration: 2
    }
];

const state = {
    allTracks: tracks,
    currentTrackIndex: 0,
    volume: 1,
    isPlaying: false
};

export default state;