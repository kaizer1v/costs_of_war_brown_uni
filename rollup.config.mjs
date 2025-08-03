export default {
  input: './scripts/main.js',
  output: {
    file: 'bundle.js',
    format: 'iife', // Immediately Invoked Function Expression
    name: 'typewriter' // Global variable name for the bundle
  },
  plugins: [
    // Add any Rollup plugins here if needed
  ]
}