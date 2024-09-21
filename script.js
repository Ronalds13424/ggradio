const apiUrl = 'https://ihatecors.gglvxd.workers.dev/?q=https://radioapi.fryde.id.lv/api/ggradio';
const audioPlayer = document.getElementById('audio-player');
let isPlaying = false;

async function fetchSongData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        document.getElementById('song-title').textContent = data.title || 'Unknown Title';
        document.getElementById('song-author').textContent = data.author || 'Unknown Author';
    } catch (error) {
        console.error('Error fetching song data:', error);
    }
}

document.getElementById('play-pause').addEventListener('click', () => {
    if (isPlaying) {
        audioPlayer.pause();
        document.getElementById('play-pause').textContent = 'Play';
    } else {
        audioPlayer.play();
        document.getElementById('play-pause').textContent = 'Pause';
    }
    isPlaying = !isPlaying;
});

document.getElementById('volume-slider').addEventListener('input', (event) => {
    audioPlayer.volume = event.target.value;
});

// Theme switching logic
const themeSelector = document.getElementById('themes');
const settingsIcon = document.getElementById('settings-icon');
const themeSelectorDiv = document.getElementById('theme-selector');

settingsIcon.addEventListener('click', () => {
    themeSelectorDiv.style.display = themeSelectorDiv.style.display === 'block' ? 'none' : 'block';
});

themeSelector.addEventListener('change', (event) => {
    document.body.className = ''; // Reset classes
    const selectedTheme = event.target.value;
    document.body.classList.add(selectedTheme);
    document.querySelector('.container').className = `container ${selectedTheme}`;
});

// Fetch song data every 10 seconds
setInterval(fetchSongData, 10000);
fetchSongData(); // Initial fetch
