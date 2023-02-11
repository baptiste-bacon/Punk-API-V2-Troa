import barba from '@barba/core'
import gsap from 'gsap'

import '@/styles/index.scss'

import Preloader from './js/components/Preloader'

import Home from './js/pages/Home'
import Product from './js/pages/Product'

import {
  transitionProductAnimateIn,
  transitionProductAnimateOut,
} from './js/animations/transitionProduct'

import { transitionHomeAnimateIn, transitionHomeAnimateOut } from './js/animations/transitionHome'

class App {
  constructor() {
    this.productsList = []
    this.timeline = gsap.timeline({ defaults: { overwrite: true } })

    this.initApp()
  }

  initApp() {
    this.getData()
    this.preloader = new Preloader()
  }

  async getData() {
    await fetch('https://api.punkapi.com/v2/beers')
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        // this.createHomepageContent(data)
        data.forEach((product) => {
          this.productsList.push(product)
        })
      })
      .then(() => {
        this.initBarba()
      })
  }

  initBarba() {
    const App = this

    barba.init({
      transitions: [
        {
          name: 'home-transition',
          from: {
            namespace: ['home'],
          },
          leave(data) {
            const done = this.async()

            transitionProductAnimateIn().then((_) => {
              done()
            })
          },
          enter(data) {
            transitionProductAnimateOut().then((_) => {
              App.product.startAnimations()
            })
          },
        },
        {
          name: 'product-transition',
          from: {
            namespace: ['product'],
          },
          leave(data) {
            const done = this.async()
            transitionHomeAnimateOut(data.current.container).then((_) => {
              done()
            })
          },
          enter(data) {
            transitionHomeAnimateIn(data.next.container).then((_) => {
              App.home.startAnimations()
            })
          },
        },
        {
          name: 'default-transition',
          to: {
            namespace: ['home', 'product'],
          },
          once(data) {
            App.preloader.animateOut().then((_) => {
              if (data.next.namespace === 'home') {
                App.home.startAnimations()
              } else {
                App.product.startAnimations()
              }
            })
          },
        },
      ],
      views: [
        {
          namespace: 'home',
          beforeEnter(data) {
            App.initHome(data)
          },
        },
        {
          namespace: 'product',
          beforeEnter(data) {
            App.initProduct(data)
          },
        },
      ],
    })

    barba.hooks.enter(() => {
      window.scrollTo(0, 0)
    })
  }

  initHome(data) {
    this.home = new Home(data.next.container, this.productsList)
  }

  initProduct(data) {
    this.currentProduct = this.productsList[11]

    if (data.trigger != 'barba') {
      this.currentProduct = this.productsList[data.trigger.dataset.id]
    }

    this.product = new Product(data.next.container, this.currentProduct)
  }
}

new App()
