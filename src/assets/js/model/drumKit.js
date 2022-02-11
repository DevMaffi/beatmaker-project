// Modules

// kick
import kickClassic from '@files/sounds/kick-classic.wav'
import kick808 from '@files/sounds/kick-808.wav'
import kickHeavy from '@files/sounds/kick-heavy.wav'

// snare
import snareAcoustic from '@files/sounds/snare-acoustic01.wav'
import snare808 from '@files/sounds/snare-808.wav'
import snareVinyl from '@files/sounds/snare-vinyl02.wav'

// hihat
import hihatAcoustic from '@files/sounds/hihat-acoustic01.wav'
import hihat808 from '@files/sounds/hihat-808.wav'

// DrumKit

class DrumKit {
  #index = 0
  #isPlaying = null

  constructor() {
    this.pads = document.querySelectorAll('.pad')
    this.playBtn = document.querySelector('.play')
    this.kickAudio = document.querySelector('.kick-sound')
    this.snareAudio = document.querySelector('.snare-sound')
    this.hihatAudio = document.querySelector('.hihat-sound')
    this.selects = document.querySelectorAll('select')
    this.muteBtns = document.querySelectorAll('.mute')
    this.bpm = 250
  }

  activePad() {
    this.classList.toggle('active')
  }

  mute = e => {
    e.target.classList.toggle('active')

    const muteIndex = e.target.getAttribute('data-track')
    const isActive = +!e.target.classList.contains('active')

    switch (muteIndex) {
      case '0':
        this.kickAudio.volume = isActive
        break
      case '1':
        this.snareAudio.volume = isActive
        break
      case '2':
        this.hihatAudio.volume = isActive
        break

      default:
        console.error('ERROR:drumKit.mute()')
    }
  }

  #handleSound = type => {
    const soundsMap = {
      'kick-classic': kickClassic,
      'kick-808': kick808,
      'kick-heavy': kickHeavy,
      'snare-acoustic01': snareAcoustic,
      'snare-808': snare808,
      'snare-vinyl02': snareVinyl,
      'hihat-acoustic01': hihatAcoustic,
      'hihat-808': hihat808,
    }

    return soundsMap[type]
  }

  changeSound = e => {
    const selectionName = e.target.name
    const selectionValue = e.target.value

    switch (selectionName) {
      case 'kick-select':
        this.kickAudio.src = this.#handleSound(selectionValue)
        break
      case 'snare-select':
        this.snareAudio.src = this.#handleSound(selectionValue)
        break
      case 'hihat-select':
        this.hihatAudio.src = this.#handleSound(selectionValue)
        break
      default:
        console.error('ERROR:drumKit.changeSound()')
    }
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

  #updateBtn = () => {
    this.playBtn.classList.toggle('active')

    if (!this.#isPlaying) {
      this.playBtn.innerText = 'Stop'
      return
    }

    this.playBtn.innerText = 'Play'
  }

  start = () => {
    const interval = (60 / this.bpm) * 1000

    this.#updateBtn()

    // check if it`s playing
    if (!this.#isPlaying) {
      this.#isPlaying = setInterval(() => this.#repeat(), interval)
      return
    }

    // clear interval
    clearInterval(this.#isPlaying)
    this.#isPlaying = null
  }
}

export default DrumKit
