import Animation from './Animation'

import gsap from 'gsap'

export default class ProductMainAnimation extends Animation {
  constructor(element) {
    super(element)
    this.element = element

    this.media = element.querySelector('.product__main-media')
    this.title = element.querySelector('.product__main-title')

    this.navButton = document.querySelector('.nav__menu-close')

    this.timeline = gsap.timeline()
    this.initAnimations()
  }

  start() {
    this.intersectionObserver.observe(this.element)
  }

  initAnimations() {
    gsap.set(this.navButton, {
      autoAlpha: 0,
    })
    gsap.set(this.media, {
      yPercent: 20,
      autoAlpha: 0,
    })
    gsap.set(this.title, {
      autoAlpha: 0,
    })
  }

  animateIn() {
    this.timeline
      .to(this.title, {
        autoAlpha: 1,
        duration: 1,
      })
      .to(
        this.title,
        {
          duration: 2,
          ease: 'power1.out',
        },
        '<'
      )
      .to(
        this.media,
        {
          duration: 1,
          autoAlpha: 1,
          yPercent: 0,
          ease: 'power1.inOut',
        },
        '<'
      )
      .to(
        this.navButton,
        {
          autoAlpha: 1,
          duration: 1.5,
        },
        0
      )
  }
}
