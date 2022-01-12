// Select all the elements in the HTML page
// and assign them to a variable
let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
document.querySelector(".next-track");
document.querySelector(".prev-track");
let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

// Specify globally used values
let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create the audio element for the player
let curr_track = document.createElement('audio');

// Define the list of tracks that have to be played
let track_list = [
	{
		name: "No Name",
		artist: "NF",
		image: "https://i.ytimg.com/vi/CJzaYLc4pPY/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCLdswmnnVue-tztNXikHzUDIm4oQ",
		path: "NF - CLOUDS (THE MIXTAPE)\\No Name NF.mp3"
	},
	{
		name: "Clouds",
		artist: "NF",
		image: "https://th.bing.com/th/id/R.0e2dd238c7b28699d5504e4c9c32ec6d?rik=weYPh%2fab7MJhsA&riu=http%3a%2f%2fhiphop24x7.com%2fwp-content%2fuploads%2f2018%2f01%2fNew-Video-NF-NO-NAME.jpg&ehk=SpdKFgflbdVZUb%2fmft44W2C9RrtPaoKWlpSg0bXKW%2b4%3d&risl=&pid=ImgRaw&r=0",
		path: "NF - CLOUDS (THE MIXTAPE)\\11 CLOUDS (Edit).mp3"
	},
	{
		name: "Mansion",
		artist: "NF",
		image: "https://i.ytimg.com/vi/N9c-CatjuK8/maxresdefault.jpg",
		path: "NF - CLOUDS (THE MIXTAPE)\\NF  Mansion Audio ft Fleurie.mp3",
	},
	{
		name: "Lie",
		artist: "NF",
		image: "https://i1.sndcdn.com/artworks-000331582743-1gbjmj-t500x500.jpg",
		path: "NF - CLOUDS (THE MIXTAPE)\\NF  Lie Audio.mp3"
	},
	{
		name: "That's A Joke",
		artist: "NF",
		image: "https://t2.genius.com/unsafe/406x406/https%3A%2F%2Fimages.genius.com%2Fdb2726320bd445e480d1b5032dc67f6a.1000x1000x1.jpg",
		path: "NF - CLOUDS (THE MIXTAPE)\\02 THAT'S A JOKE.mp3"
	},
	{
		name: "Just Like You",
		artist: "NF",
		image: "https://i.ytimg.com/vi/Yh-qbCsFrFI/maxresdefault.jpg",
		path: "NF - CLOUDS (THE MIXTAPE)\\03 JUST LIKE YOU.mp3"
	},
	{
		name: "Story",
		artist: "NF",
		image: "https://i.ytimg.com/vi/iI_E-pi6_1w/maxresdefault.jpg",
		path: "NF - CLOUDS (THE MIXTAPE)\\04 STORY.mp3"
	},
	{
		name: "Prideful",
		artist: "NF",
		image: "https://i.ytimg.com/vi/NkwtXtCKSQw/maxresdefault.jpg",
		path: "NF - CLOUDS (THE MIXTAPE)\\05 PRIDEFUL.mp3"
	},
	{
		name: "Lost",
		artist: "NF",
		image: "https://i.ytimg.com/vi/MK3-Xzzog6k/maxresdefault.jpg",
		path: "NF - CLOUDS (THE MIXTAPE)\\06 LOST (feat_ Hopsin).mp3"
	},
	{
		name: "Layers",
		artist: "NF",
		image: "https://i.ytimg.com/vi/bflKrH4W_iw/maxresdefault.jpg",
		path: "NF - CLOUDS (THE MIXTAPE)\\07 LAYERS.mp3"
	},
	{
		name: "Drifting",
		artist: "NF",
		image: "https://i.ytimg.com/vi/OSuPJF_1IB8/maxresdefault.jpg",
		path: "NF - CLOUDS (THE MIXTAPE)\\08 DRIFTING.mp3"
	},
	{
		name: "Trust",
		artist: "NF",
		image: "https://e6q6j4m4.stackpathcdn.com/wp-content/uploads/2021/03/NF-Trust-1536x864.jpg",
		path: "NF - CLOUDS (THE MIXTAPE)\\09 TRUST (feat_ Tech N9ne).mp3"
	},
	{
		name: "PAID MY DUES",
		artist: "NF",
		image: "https://jesusful.com/wp-content/uploads/2019/12/NF-Paid-My-Dues-Video-and-Lyrics.jpg",
		path: "NF - CLOUDS (THE MIXTAPE)\\10 PAID MY DUES.mp3"
	}

];

function loadTrack(track_index) {
// Clear the previous seek timer
	clearInterval(updateTimer);
	resetValues();

// Load a new track
	curr_track.src = track_list[track_index].path;
	curr_track.load();

// Update details of the track
	track_art.style.backgroundImage =
		"url(" + track_list[track_index].image + ")";
	track_name.textContent = track_list[track_index].name;
	track_artist.textContent = track_list[track_index].artist;
	now_playing.textContent =
		"PLAYING " + (track_index + 1) + " OF " + track_list.length;

// Set an interval of 1000 milliseconds
// for updating the seek slider
	updateTimer = setInterval(seekUpdate, 1000);

// Move to the next track if the current finishes playing
// using the 'ended' event
	curr_track.addEventListener("ended", nextTrack);

// Apply a random background color
	random_bg_color();
}

function random_bg_color() {
// Get a random number between 64 and 256
// (for getting lighter colors)
	let red = Math.floor(Math.random() * 256) + 64;
	let green = Math.floor(Math.random() * 256) + 64;
	let blue = Math.floor(Math.random() * 256) + 64;

// Construct a color with the given values
	let bgColor;
	bgColor = "rgb(" + red + ", " + green + ", " + blue + ")";

// Set the background to the new color
	document.body.style.background = bgColor;
}

// Function to reset all values to their default
function resetValues() {
	curr_time.textContent = "00:00";
	total_duration.textContent = "00:00";
	seek_slider.value = 0;
}

function playpauseTrack() {
// Switch between playing and pausing
// depending on the current state
	if (!isPlaying) playTrack();
	else pauseTrack();
}

function playTrack() {
// Play the loaded track
	curr_track.play().then()
	isPlaying = true;

// Replace icon with the pause icon
	playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-2x"></i>';
}

function pauseTrack() {
// Pause the loaded track
	curr_track.pause();
	isPlaying = false;

// Replace icon with the play icon
	playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-2x"></i>';
}

function nextTrack() {
// Go back to the first track if the
// current one is the last in the track list
	if (track_index < track_list.length - 1)
		track_index += 1;
	else track_index = 0;

// Load and play the new track
	loadTrack(track_index);
	pauseTrack();

}

function prevTrack() {
// Go back to the last track if the
// current one is the first in the track list
	if (track_index > 0)
		track_index -= 1;
	else track_index = track_list.length - 1;

// Load and play the new track
	loadTrack(track_index);
	pauseTrack();
}

function seekTo() {

// Calculate the seek position by the
// percentage of the seek slider
// and get the relative duration to the track
	let seekto;
	seekto = curr_track.duration * (seek_slider.value / 100); // Set the current track position to the calculated seek position
	curr_track.currentTime = seekto;
}

function setVolume() {
// Set the volume according to the
// percentage of the volume slider set
	curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
	let seekPosition = 0;

// Check if the current track duration is a legible number
	if (!isNaN(curr_track.duration)) {
		seekPosition = curr_track.currentTime * (100 / curr_track.duration);
		seek_slider.value = seekPosition;

		// Calculate the time left and the total duration
		let currentMinutes = Math.floor(curr_track.currentTime / 60);
		let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
		let durationMinutes = Math.floor(curr_track.duration / 60);
		let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

		// Add a zero to the single digit time values
		if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
		if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
		if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
		if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

		// Display the updated duration
		curr_time.textContent = currentMinutes + ":" + currentSeconds;
		total_duration.textContent = durationMinutes + ":" + durationSeconds;
	}
}
// Load the first track in the track list
loadTrack(track_index);
