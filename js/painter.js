class SushiPainter {
  constructor(window, paintElement, console, options = {}) {
    const defaultOptions = {
      speed: 1,
      color: '#fff',
    }
    this.options = {
      ...defaultOptions,
      ...options,
    }

    this.window = window
    this.app = paintElement
    this.count = this.computeSushiCount(this.window)
    this.duration = this.computeDuration(this.count, this.options.speed)
    this.console = console

    this.init()
  }

  init() {
    this.app.style.setProperty('--background-color', this.options.color)
  }

  resize() {
    this.count = this.computeSushiCount(this.window)
    this.duration = this.computeDuration(this.count, this.options.speed)
    this.paint()
  }

  computeSushiCount(window) {
    const windowWidth = window.innerWidth
    const sushiWidth = 15.5
    return Math.floor(windowWidth / sushiWidth)
  }

  computeDuration(count, speed) {
    return `${Math.floor(count / (4 * speed))}s`
  }

  paint() {
    this.clearApp(this.app)
    this.setCssAnimationVars()
    this.insertSushis()
  }

  clearApp() {
    while (this.app.firstChild) {
      this.app.removeChild(this.app.firstChild)
    }
  }

  setCssAnimationVars() {
    this.app.style.setProperty('--duration', this.duration)
    this.app.style.setProperty('--total', this.count)
  }

  insertSushis() {
    const sushis = [...Array(this.count).keys()].map(this.createSushi)
    const fragment = document.createDocumentFragment();
    sushis.forEach(sushi => fragment.appendChild(sushi))
    this.app.appendChild(fragment);
  }

  createSushi(index) {
    const sushi = document.createElement('li')
    sushi.innerText = '🍣'
    sushi.style.animationDelay = `calc((${index} - var(--total)) * (var(--duration) / var(--total)))`
    return sushi
  }
}

export default SushiPainter
