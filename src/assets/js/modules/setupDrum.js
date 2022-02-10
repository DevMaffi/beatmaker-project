// Modules

import { DrumKit } from '@model'

// DrumKit setup

function setupDrum() {
  const drumKit = new DrumKit()

  // Event listeners

  drumKit.selects.forEach(select =>
    select.addEventListener('change', e => drumKit.changeSound(e))
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
}

export default setupDrum
