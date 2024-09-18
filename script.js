const apiUrl = 'https://ihatecors.gglvxd.workers.dev/?q=https://radioapi.fryde.id.lv/api/ggradio';
let isPlaying = false;

async function fetchSongData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Log the fetched data for debugging purposes
        console.log('Fetched song data:', data);

        // Check if the image URL is valid and update the widget
        const coverArt = document.getElementById('cover-art');
        coverArt.src = data.image;
        coverArt.onload = () => console.log('Cover art loaded successfully');
        coverArt.onerror = () => {
            console.error('Failed to load cover art. Using placeholder image.');
            coverArt.src = 'https://via.placeholder.com/300x300.png?text=No+Image'; // Placeholder image
        };

        document.getElementById('song-title').textContent = data.title;
        document.getElementById('song-author').textContent = data.author;

        // Handle playback state if needed
        // Add logic to play/pause audio here if integrated with a player
    } catch (error) {
        console.error('Error fetching song data:', error);
    }
}

// Play/Pause button logic
document.getElementById('play-pause').addEventListener('click', () => {
    isPlaying = !isPlaying;
    document.getElementById('play-pause').textContent = isPlaying ? 'Pause' : 'Play';
    // Add code here to control actual playback if integrated with a media player
});

// Volume slider logic
document.getElementById('volume-slider').addEventListener('input', (event) => {
    const volume = event.target.value;
    // Add code here to adjust the volume of the player
    console.log(`Volume set to: ${volume}`);
});

// Fetch song data every 10 seconds
setInterval(fetchSongData, 10000); 
fetchSongData(); // Initial fetch
