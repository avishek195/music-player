const image = document.querySelector("img");
const title = document.getElementById("title");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

//Music
const songs = [
  {
    name: "flowbo",
    displayName: "Prolodgy",
    artist: "Flowbo",
  },
  {
    name: "KR$NA",
    displayName: "Saza a moth",
    artist: "KR$NA",
  },
  {
    name: "NAZZ",
    displayName: "Gully Ka Sheer",
    artist: "NAZZ",
  },
  {
    name: "YOUNG GALIB",
    displayName: "All Night",
    artist: "YOUNG GALIB",
  },
];

//Check if Playing
let isPlaying = false;

//Play
function playSong() {
  isPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
  music.play();
}

//Pause
function pauseSong() {
  isPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  music.pause();
}

//Play or Pause Event Lintner
playBtn.addEventListener("click", () => (isPlaying ? pauseSong() : playSong()));

//Update DOM
function loadSong(song) {
  title.textContent = song.displayName;
  artist.textContent = song.artist;
  music.src = `./music/${song.name}.mp3`;
  image.src = `./img/${song.name}.jpg`;
}

// loadSong(songs[3]);
//Current Song
let songIndex = 0;

//Next Song
function nextSong() {
  songIndex++;
  if (songIndex === songs.length) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playSong();
}
//Prev Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}

//On Load Select First Song
loadSong(songs[songIndex]);

//Update Progress bar & time
function updateProgressBar(e) {
  if (isPlaying) {
    const { duration, currentTime } = e.srcElement;
    //Update Progress bar width
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    //Claculate display for duration
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    //Delay switching duration elment
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
    //Claculate display for current
    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

//Set ProgressBar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration, currentTime } = music;
  music.currentTime = (clickX / width) * duration;
}

//Event Listner
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
