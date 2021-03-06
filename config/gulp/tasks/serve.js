// Modules

// plugins
import browserSync from 'browser-sync'

// base utils
import { routes } from '../../utils/utils.js'

// Task

const { distDir } = routes.baseDirs

const serve = () =>
  browserSync.init({
    notify: false,
    port: 5501, // default: 3001
    server: {
      baseDir: distDir,
    },
  })

// Exports

export default serve
