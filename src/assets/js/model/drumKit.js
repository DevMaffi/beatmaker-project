class DrumKit {
  #index = 0

  constructor() {
    this.pads = document.querySelectorAll('.pad')
    this.playBtn = document.querySelector('.play')
    this.kickAudio = document.querySelector('.kick-sound')
    this.snareAudio = document.querySelector('.snare-sound')
    this.hihatAudio = document.querySelector('.hihat-sound')
    this.bpm = 40
  }

  activePad() {
    this.classList.toggle('active')
  }

  #repeat = () => {
    const step = this.#index % 8

    const activeBars = document.querySelectorAll(`.b${step}`)
    console.log(activeBars)

    this.#index++
  }

  start = () => {
    const interval = (60 / this.bpm) * 1000
    setInterval(() => this.#repeat(), interval)
  }
}

export default DrumKit