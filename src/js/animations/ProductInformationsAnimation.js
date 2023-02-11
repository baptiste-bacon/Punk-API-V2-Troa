import Animation from './Animation'

import gsap from 'gsap'

export default class ProductInformationsAnimation extends Animation {
  constructor(element) {
    super(element)
    this.element = element

    this.title = element.querySelector('.product__informations-title')
    this.tagline = element.querySelector('.product__informations-tagline')
    this.description = element.querySelector('.product__informations-description')

    this.specifications = element.querySelector('.product__specifications')

    this.ingredients = element.querySelector('.product__ingredients')

    this.timeline = gsap.timeline({ defaults: { ease: 'power2.out' } })
    this.initAnimations()
  }

  start() {
    this.intersectionObserver.observe(this.element)
  }

  initAnimations() {
    gsap.set(this.title, {
      y: 25,
      autoAlpha: 0,
    })
    gsap.set(this.tagline, {
      y: 25,
      autoAlpha: 0,
    })
    gsap.set(this.description, {
      y: 25,
      autoAlpha: 0,
    })
    gsap.set(this.specifications, {
      y: 25,
      autoAlpha: 0,
    })
    gsap.set(this.ingredients, {
      y: 25,
      autoAlpha: 0,
    })
  }

  animateIn() {
    this.timeline
      .to(this.title, {
        duration: 1,
        y: 0,
        autoAlpha: 1,
        delay: 0.5,
      })
      .to(
        this.tagline,
        {
          duration: 1,
          y: 0,
          autoAlpha: 1,
        },
        '<0.4'
      )
      .to(
        this.description,
        {
          duration: 1,
          y: 0,
          autoAlpha: 1,
        },
        '<0.4'
      )
      .to(
        this.specifications,
        {
          duration: 1,
          y: 0,
          autoAlpha: 1,
        },
        '<0.6'
      )
      .to(
        this.ingredients,
        {
          duration: 1,
          y: 0,
          autoAlpha: 1,
        },
        '<0.6'
      )
  }
}
