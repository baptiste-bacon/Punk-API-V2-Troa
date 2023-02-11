import gsap from 'gsap'

const transitionProductAnimateIn = (_) => {
  const timeline = gsap.timeline()

  gsap.set('.transition__wrapper', {
    autoAlpha: 1,
  })

  timeline
    .fromTo(
      '.transition--yellow',
      {
        scale: 0,
      },
      {
        scale: 3,
        duration: 1.5,
        ease: 'power1.out',
      }
    )
    .fromTo(
      '.transition--white',
      { scale: 0 },
      {
        scale: 3,
        duration: 1.5,
        ease: 'power1.out',
      },
      '<0.5'
    )

  return timeline
}

const transitionProductAnimateOut = (_) => {
  const timeline = gsap.timeline()

  return timeline.to('.transition__wrapper', {
    autoAlpha: 0,
    duration: 0,
  })
}

export { transitionProductAnimateIn, transitionProductAnimateOut }
