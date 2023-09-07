//Synthesis API
const synth = window.speechSynthesis
const form = document.querySelector("form")
const selectVoice = document.querySelector("#selectVoice")
const text = document.querySelector("#text")
const pitch = document.querySelector("#pitch")
const rate = document.querySelector("#rate")
const rate_value = document.querySelector("#rate_value")
const pitch_value = document.querySelector("#pitch_value")
const img = document.querySelector("img")






//Init Voices

let voices = []

const getVoices = () => {
    voices = synth.getVoices();

    voices.forEach((voice)=>{
        const option = document.createElement("option")

        option.textContent = voice.name
        option.setAttribute("data-lang", voice.lang)
        option.setAttribute("data-name", voice.name)
        selectVoice.appendChild(option)    
    })

}

getVoices();

if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged = getVoices
}

const speak = () =>{
    if(synth.speaking || text.value === ""){
        console.error("speaking!!!!!")
        return;
    }

    const speakText = new SpeechSynthesisUtterance(text.value);

    speakText.onstart=()=>{
        
            img.setAttribute("src", "play.gif")
        
    }

    speakText.onend = e =>{
        img.setAttribute("src", "speech.webp")
        console.log("speaking enddd")
    }

    speakText.onerror = e =>{
        console.error("something went wrong")
    }

    const selectedVoice = selectVoice.selectedOptions[0].getAttribute("data-name")

    voices.forEach(voice =>{
        if(voice.name === selectedVoice){
            speakText.voice = voice
        }
    })

    speakText.rate = rate.value;
    speakText.pitch = pitch.value

    synth.speak(speakText)
};

rate.addEventListener("change", (e)=>{
    rate_value.innerText = rate.value
})

pitch.addEventListener("change", (e)=>{
    pitch_value.innerText = pitch.value
})

//Event Listeners
form.addEventListener("submit", (e)=>{
    e.preventDefault()
    speak()
})

