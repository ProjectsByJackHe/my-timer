
const audioPlayer = document.getElementById("audio-player")
const storedSong = localStorage.getItem("song") 

if (storedSong !== null) {
    document.getElementById("song").value = storedSong;
}

document.getElementById("start-timer").onclick = () => {
    let duration = document.getElementById("duration").value 
    let song = document.getElementById("song").value 
    localStorage.setItem("song", song);
    audioPlayer.src = "/my-timer/" + song
    document.title = "active timer - " + song
    let seconds = duration * 60;
    let future = new Date().getTime() + (duration * 1000 * 60)
    let timerPtr = setInterval(() => {
        document.getElementById("label").innerHTML = String(seconds) + " Seconds Remaining"
        seconds -= 1;
    }, 1000);

    function on() {
        if(document.hidden) {
            // tab is now inactive
            // temporarily clear timer using clearInterval() / clearTimeout()
            clearInterval(timerPtr)
        }
        else {
            // tab is active again
            // restart timers
            // update duration
            let now = new Date().getTime()
            let diff = future - now 
            seconds = Math.floor(diff / 1000)
            timerPtr = setInterval(() => {
                document.getElementById("label").innerHTML = String(seconds) + " Seconds Remaining"
                seconds -= 1;
            }, 1000)
        }
    }
    
    document.addEventListener('visibilitychange', on);

    setTimeout(() => {
        audioPlayer.play()
        clearInterval(timerPtr)
        document.title = "timer" 
        document.getElementById("label").innerHTML = "0 Seconds Remaining"
        document.removeEventListener("visibilitychange", on)
    }, duration * 1000 * 60);
}
