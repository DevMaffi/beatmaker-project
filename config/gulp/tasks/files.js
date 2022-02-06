// Modules

// gulp
import gulp from 'gulp'

// entries
import entries from '../entries.js'

// Task

const { dest, src } = gulp

const files = () => src(entries.src.files).pipe(dest(entries.build.files))

// Exports

export default files
