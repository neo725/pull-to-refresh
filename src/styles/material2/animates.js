const animates = {
  pulling(d, opts) {
    if (!opts.elControl) opts.elControl = opts.container.querySelector('.pull-to-refresh-material2__control')

    const { container, threshold, elControl } = opts

    let p = d / threshold
    if (p > 1) p = 1
    else p = p * p * p

    const y = d / 2.5
    container.style.transform = y ? `translate3d(0, ${y}px, 0)` : ''
    elControl.style.opacity = p
    elControl.style.transform = `translate3d(-50%, 0, 0) rotate(${360 * p}deg)`
  },

  refreshing({ container, threshold, fixTopWhenRefreshing }) {
    let container_top = fixTopWhenRefreshing ? fixTopWhenRefreshing : threshold / 2.5
    
    container.style.transition = 'transform 0.2s'
    //container.style.transform = `translate3d(0, ${threshold / 2.5}px, 0)`
    container.style.transform = `translate3d(0, ${container_top}px, 0)`
  },

  restoring({ container }) {
    return new Promise(resolve => {
      if (container.style.transform) {
        container.style.transition = 'transform 0.3s'
        container.style.transform = 'translate3d(0, 0, 0)'
        container.addEventListener('transitionend', () => {
          container.style.transition = ''
          resolve()
        })
      } else {
        resolve()
      }
    })
  }
}

animates.aborting = animates.restoring

export default animates
