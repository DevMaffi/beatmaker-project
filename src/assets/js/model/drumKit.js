class DrumKit {
  #index = 0

  constructor() {
    this.pads = document.querySelectorAll('.pad')
    this.playBtn = document.querySelector('.play')
    this.kickAudio = document.querySelector('.kick-sound')
    this.snareAudio = document.querySelector('.snare-sound')
    this.hihatAudio = document.querySelector('.hihat-sound')
    this.bpm = 250
  }

  activePad() {
    this.classList.toggle('active')
  }

  #playAudio = type => {
    this[type].currentTime = 0
    this[type].play()
  }

  #repeat = () => {
    const step = this.#index % 8
    const activeBars = document.querySelectorAll(`.b${step}`)

    // loop over pads
    activeBars.forEach(bar => {
      bar.style.animation = 'playTrack 0.3s alternate ease-in-out 2'

      // check if pads are active
      const isActive = bar.classList.contains('active')

      if (isActive && bar.classList.contains('kick-pad'))
        this.#playAudio('kickAudio')

      if (isActive && bar.classList.contains('snare-pad'))
        this.#playAudio('snareAudio')

      if (isActive && bar.classList.contains('hihat-pad'))
        this.#playAudio('hihatAudio')
    })

    this.#index++
  }

  start = () => {
    const interval = (60 / this.bpm) * 1000
    setInterval(() => this.#repeat(), interval)
  }
}

export default DrumKit
