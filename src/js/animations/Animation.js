export default class Animation {
  constructor(element) {
    this.initIntersectionObserver()
  }

  initIntersectionObserver() {
    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateIn()
        } else {
          return
        }
      })
    })
  }

  animateIn() {}
}
