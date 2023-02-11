import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

import productImage from '@/images/beerImage.png'
import HomeProductAnimation from '../animations/HomeProductAnimation'

export default class Home {
  constructor(container, data) {
    this.container = container
    this.data = data

    this.animations = container.querySelectorAll('[data-animate]')

    this.init()
  }

  createProduct() {
    this.productElement = document.createElement('div')
    this.productElement.classList.add('product')

    this.productTextElement = document.createElement('div')
    this.productTextElement.classList.add('product__text')
    this.productTextElement.dataset.animate = 'home-text'
  }

  createTitle() {
    this.productTitleElement = document.createElement('h2')
    this.productTitleElement.classList.add('product__title')
    this.productTitleElement.innerHTML = this.name
  }

  createTagline() {
    this.productTaglineElement = document.createElement('h3')
    this.productTaglineElement.classList.add('product__tagline')
    this.productTaglineElement.innerHTML = this.tagline
  }

  createLink() {
    this.productLinkElement = document.createElement('a')
    this.productLinkElement.classList.add('product__link')
    this.productLinkElement.href = '/product.html'
    this.productLinkElement.dataset.id = this.id - 1

    this.productInnerLinkElement = document.createElement('div')
    this.productInnerLinkElement.classList.add('product__link-inner')

    this.productLinkTextElement = document.createElement('p')
    this.productLinkTextElement.innerHTML = 'SEE MORE'

    this.productLinkSvg = document.createElement('div')
    this.productLinkSvg.classList.add('product__wrapper-svg')
    this.productLinkSvg.innerHTML =
      '<svg class="product__link-svg" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.69565 7.30435V12H7.30435V7.30435H12V4.69565H7.30435V0H4.69565V4.69565H0V7.30435H4.69565Z" fill="black"/></svg>'

    this.productInnerLinkElement.append(this.productLinkTextElement, this.productLinkSvg)
    this.productLinkElement.appendChild(this.productInnerLinkElement)
  }

  createImage() {
    this.productImageElement = document.createElement('img')
    this.productImageElement.src = productImage
    this.productImageElement.alt = this.name
    this.productImageElement.classList.add('product__image')
  }

  addContentToPage() {
    this.productsListElement = document.querySelector('.products-list')

    this.productTextElement.append(
      this.productTitleElement,
      this.productTaglineElement,
      this.productLinkElement
    )

    this.productElement.append(this.productTextElement, this.productImageElement)

    this.productsListElement.appendChild(this.productElement)
  }

  initAnimations() {
    this.animationsList = []

    this.animations.forEach((animation) => {
      this.dataAttribute = animation.dataset.animate

      if (this.dataAttribute === 'home-text') {
        this.animation = new HomeProductAnimation(animation)
      }

      this.animationsList.push(this.animation)
    })
  }

  startAnimations() {
    this.animationsList.forEach((animation) => {
      animation.start()
    })
  }

  init() {
    this.data.forEach((product) => {
      this.id = product.id
      this.name = product.name
      this.tagline = product.tagline

      this.createProduct()
      this.createTitle()
      this.createTagline()
      this.createLink()
      this.createImage()
      this.addContentToPage()

      this.animations = document.querySelectorAll('[data-animate]')

      this.initAnimations()
    })
  }
}
