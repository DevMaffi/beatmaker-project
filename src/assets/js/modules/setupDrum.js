// Modules

import { DrumKit } from '@model'

// DrumKit setup

function setupDrum() {
  const drumKit = new DrumKit()

  // Event listeners

  drumKit.muteBtns.forEach(btn => btn.addEventListener('click', drumKit.mute))

  drumKit.selects.forEach(select =>
    select.addEventListener('change', drumKit.changeSound)
  )

  drumKit.pads.forEach(pad => {
    // this refers to pad
    pad.addEventListener('click', drumKit.activePad)
    pad.addEventListener('animationend', function () {
      this.style.animation = ''
    })
  })

  // this refers to drumKit
  drumKit.playBtn.addEventListener('click', drumKit.start)

  drumKit.tempoSlider.addEventListener('input', drumKit.changeTempo)

  drumKit.tempoSlider.addEventListener('change', drumKit.updateTempo)
}

export default setupDrum
