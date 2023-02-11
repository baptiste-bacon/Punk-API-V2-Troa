import Animation from './Animation'

import gsap from 'gsap'

export default class HomeProductAnimation extends Animation {
  constructor(element) {
    super(element)
    this.element = element

    this.title = element.querySelector('.product__title')
    this.tagline = element.querySelector('.product__tagline')
    this.link = element.querySelector('.product__link')

    this.timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
    this.initAnimations()
  }

  start() {
    this.intersectionObserver.observe(this.element)
  }

  initAnimations() {
    gsap.set(this.title, {
      y: 25,
      autoAlpha: 0,
      delay: 0.2,
    })
    gsap.set(this.tagline, {
      autoAlpha: 0,
    })
    gsap.set(this.link, {
      autoAlpha: 0,
    })
  }

  animateIn() {
    this.timeline
      .to(this.title, {
        duration: 1,
        y: 0,
        autoAlpha: 1,
      })
      .to(
        this.tagline,
        {
          duration: 1,
          autoAlpha: 1,
        },
        '<0.4'
      )
      .to(
        this.link,
        {
          duration: 1,
          autoAlpha: 1,
        },
        '>-0.5'
      )
  }
}
