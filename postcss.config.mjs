/**
 * PostCSS Configuration
 *
 * Tailwind CSS v3 requires postcss and autoprefixer plugins
 */
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default {
  plugins: [
    tailwindcss(),
    autoprefixer()
  ]
}
