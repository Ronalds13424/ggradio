const apiUrl = 'https://ihatecors.gglvxd.workers.dev/?q=https://radioapi.fryde.id.lv/api/ggradio';
const audioPlayer = document.getElementById('audio-player');
let isPlaying = false;

async function fetchSongData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Log the fetched data for debugging purposes
        console.log('Fetched song data:', data);

        const coverArt = document.getElementById('cover-art');
        coverArt.src = data.image || 'https://via.placeholder.com/250x250?text=No+Image'; // Fallback image

        coverArt.onerror = () => {
            coverArt.src = 'https://via.placeholder.com/250x250?text=No+Image'; // Ensure a placeholder on error
        };

        document.getElementById('song-title').textContent = data.title;
        document.getElementById('song-author').textContent = data.author;

        // Ensure audio plays instantly
        if (!isPlaying) {
            audioPlayer.play();
            isPlaying = true;
            document.getElementById('play-pause').textContent = 'Pause';
        }
    } catch (error) {
        console.error('Error fetching song data:', error);
    }
}

// Play/Pause button logic
document.getElementById('play-pause').addEventListener('click', () => {
    if (isPlaying) {
        audioPlayer.pause();
        document.getElementById('play-pause').textContent = 'Play';
    } else {
        audioPlayer.pause(); // Stop the current stream
        audioPlayer.load();  // Reload to start from live
        audioPlayer.play();  // Play the live stream
        document.getElementById('play-pause').textContent = 'Pause';
    }
    isPlaying = !isPlaying;
});

// Volume slider logic
document.getElementById('volume-slider').addEventListener('input', (event) => {
    const volume = event.target.value;
    audioPlayer.volume = volume;
});

// Fetch song data every 10 seconds
setInterval(fetchSongData, 10000);
fetchSongData(); // Initial fetch
