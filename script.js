const azkaar = [
    {
        arabic: "سُبْحَانَ اللّٰهِ",
        name: "SubhanAllah"
    },
    {
        arabic: "اَلْحَمْدُ لِلّٰهِ",
        name: "Alhamdulillah"
    },
    {
        arabic: "اَللّٰهُ أَكْبَر",
        name: "Allahu Akbar"
    }
];

let currentZikr = 0;
let count = 0;
const target = 33;

function updateDisplay() {
    document.getElementById("arabic").innerText =
        azkaar[currentZikr].arabic;

    document.getElementById("zikr-name").innerText =
        azkaar[currentZikr].name;

    document.getElementById("display").innerText =
        String(count).padStart(2, "0");

    document.getElementById("progress-bar").style.width =
        (count / target * 100) + "%";
}

function increaseCount() {
    if (count >= target) return;
    playClickSound();

    count++;

    if (count === target) {
        document.getElementById("message").innerText =
            "MashaAllah! Zikr completed ✨";

        currentZikr++;

        if (currentZikr >= azkaar.length) {
            currentZikr = 0;
        }

        count = 0;

        setTimeout(() => {
            updateDisplay();
            document.getElementById("message").innerText =
                "Begin your remembrance";
        }, 900);

    } else {
        document.getElementById("message").innerText =
            "Keep remembering Allah";
    }

    updateDisplay();
}

function resetCount() {
    count = 0;
    updateDisplay();

    document.getElementById("message").innerText =
        "Counter reset";
}

updateDisplay();
// Background Music
function toggleMusic() {
    const music = document.getElementById("bgMusic");

    if (music.paused) {
        music.play();
    } else {
        music.pause();
    }
}

// Soft Count Sound
function playClickSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const volume = audioContext.createGain();

    oscillator.connect(volume);
    volume.connect(audioContext.destination);

    oscillator.frequency.value = 850;
    volume.gain.value = 0.08;

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.07);
}