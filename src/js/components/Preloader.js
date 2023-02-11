import gsap from 'gsap'

export default class Preloader {
  constructor() {
    this.preloader = document.querySelector('.preloader')

    this.timeline = gsap.timeline()
  }

  animateOut() {
    return this.timeline.to(this.preloader, {
      autoAlpha: 0,
      duration: 1,
      delay: 0.4,
    })
  }
}
