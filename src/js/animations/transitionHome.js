import gsap from 'gsap'

const transitionHomeAnimateIn = (container) => {
  const timeline = gsap.timeline()

  timeline
    .fromTo(
      container.querySelector('.products-list'),
      {
        yPercent: 10,
      },
      {
        duration: 2,
        yPercent: 0,
        ease: 'power3.out',
      }
    )
    .fromTo(
      container.querySelector('.products__background'),
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        duration: 2,
      },
      0
    )

  return timeline
}

const transitionHomeAnimateOut = (container) => {
  const timeline = gsap.timeline()

  timeline.to(container.querySelector('.page'), {
    autoAlpha: 0,
    duration: 0.5,
  })

  return timeline
}

export { transitionHomeAnimateIn, transitionHomeAnimateOut }
