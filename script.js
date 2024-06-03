const inputs = document.querySelectorAll('.controls input');

    function handleUpdate() {
      const suffix = this.dataset.sizing || '';
      document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
    }

    inputs.forEach(input => input.addEventListener('change', handleUpdate));
    inputs.forEach(input => input.addEventListener('mousemove', handleUpdate));





// Get the elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const volume = player.querySelector('input[name="volume"]');
const playbackSpeed = player.querySelector('input[name="playbackSpeed"]');
const skipButtons = player.querySelectorAll('[data-skip]');

// Functions to handle functionality
function togglePlay() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

function updateButton() {
    const icon = video.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function handleRangeUpdate() {
    video[this.name] = this.value;
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

volume.addEventListener('input', handleRangeUpdate);
playbackSpeed.addEventListener('input', handleRangeUpdate);

skipButtons.forEach(button => button.addEventListener('click', skip));

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => e.buttons === 1 && scrub(e));
