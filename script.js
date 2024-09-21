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
