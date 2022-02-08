// Modules

import { DrumKit } from '@model'

// DrumKit setup

function setupDrum() {
  const drumKit = new DrumKit()

  drumKit.pads.forEach(pad => {
    // this refers to pad
    pad.addEventListener('click', drumKit.activePad)
  })

  // this refers to drumKit
  drumKit.playBtn.addEventListener('click', drumKit.start)
}

export default setupDrum
