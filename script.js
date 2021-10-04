
const audioPlayer = document.getElementById("audio-player")
const storedSong = localStorage.getItem("song") 

if (storedSong !== null) {
    document.getElementById("song").value = storedSong;
    audioPlayer.src = "/my-timer/" + storedSong;
}

let button = document.getElementById("start-timer") 

function stopTimer(timeoutPtr, timerPtr) {
    clearInterval(timeoutPtr) 
    clearInterval(timerPtr)
    button.onclick = startTimer
    document.getElementById("label").innerHTML = "0 hrs : 0 min : 0 sec"
    document.title = "timer"
    button.className = "btn btn-success" 
    button.innerHTML = "start timer"
}

function startTimer() {
    // timer logic
    let duration = document.getElementById("duration").value 
    let song = document.getElementById("song").value 
    localStorage.setItem("song", song);
    audioPlayer.src = "/my-timer/" + song
    document.title = "active timer - " + song
    let seconds = duration * 60;
    let future = new Date().getTime() + (duration * 1000 * 60)
    let timerPtr = setInterval(() => {
        let hours = Math.floor(seconds / 3600) % 24
        let minutes = Math.floor(seconds / 60) % 60
        let seconds_ = seconds % 60 
        hours = String(hours) 
        minutes = String(minutes) 
        seconds_ = String(seconds_)
        document.getElementById("label").innerHTML = `${hours} hrs : ${minutes} min : ${seconds_} sec`
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
                let hours = Math.floor(seconds / 3600) % 24
                let minutes = Math.floor(seconds / 60) % 60
                let seconds_ = seconds % 60 
                hours = String(hours) 
                minutes = String(minutes) 
                seconds_ = String(seconds_)
                document.getElementById("label").innerHTML = `${hours} hrs : ${minutes} min : ${seconds_} sec`
                seconds -= 1;
            }, 1000)
        }
    }
    
    document.addEventListener('visibilitychange', on);

    let timeoutPtr = setTimeout(() => {
        audioPlayer.play()
        clearInterval(timerPtr)
        document.title = "timer" 
        document.getElementById("label").innerHTML = "0 hrs : 0 min : 0 sec"
        document.removeEventListener("visibilitychange", on)
        button.className = "btn btn-success"
        button.innerHTML = "start timer"
        button.onclick = startTimer
    }, duration * 1000 * 60);

    // button logic
    button.onclick = () => { stopTimer(timeoutPtr, timerPtr) } 
    button.className = "btn btn-danger"
    button.innerHTML = "stop timer"
}

button.onclick = startTimer