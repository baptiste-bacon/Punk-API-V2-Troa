import ProductMainAnimation from '../animations/ProductMainAnimation'
import ProductInformationsAnimation from '../animations/ProductInformationsAnimation'

export default class Product {
  constructor(container, data) {
    this.is = data.id
    this.name = data.name
    this.tagline = data.tagline
    this.description = data.description
    this.ingredients = data.ingredients
    this.specifications = [data.first_brewed, data.abv, data.ibu, data.ebc, data.srm]

    this.container = container

    this.animations = container.querySelectorAll('[data-animate]')

    this.init()
  }

  createTitle() {
    this.productTitleElement = document.querySelector('.product__informations-title')
    this.productMainTitleElement = document.querySelector('.product__main-title')

    this.productTitleElement.innerHTML = this.name
    this.productMainTitleElement.innerHTML = this.name
  }

  createTagline() {
    this.productTaglineElement = document.querySelector('.product__informations-tagline')
    this.productTaglineElement.innerHTML = this.tagline
  }

  createDescription() {
    this.productDescriptionElement = document.querySelector('.product__informations-description')
    this.productDescriptionElement.innerHTML = this.description
  }

  createSpecifications() {
    this.specificationsListElements = document.querySelectorAll('.specifications-list__item')

    this.specifications.forEach((el, key) => {
      if (key != this.specifications.length - 1) {
        this.specificationsItemValueElement = document.createElement('p')
        this.specificationsItemValueElement.classList.add('specifications-list__item-value')
        this.specificationsItemValueElement.innerHTML = el
        this.specificationsListElements[key].appendChild(this.specificationsItemValueElement)
      } else {
        this.specificationsItemValueElement.innerHTML += ` / ${el}`
      }
    })
  }

  createIngredients() {
    this.ingredientsListElement = document.querySelector('.product__ingredients-list')

    this.createIngredientsName()
  }

  createIngredientsName() {
    for (let [key, value] of Object.entries(this.ingredients)) {
      this.ingredientsItemElement = document.createElement('li')
      this.ingredientsItemElement.classList.add('ingredients-list__item')

      this.ingredientsTitleElement = document.createElement('h4')
      this.ingredientsTitleElement.classList.add('ingredients-list__item-title')
      this.ingredientsTitleElement.innerHTML = key

      this.ingredientsItemElement.appendChild(this.ingredientsTitleElement)

      this.createIngredientsTypesList(this.ingredients[key])
      this.ingredientsListElement.appendChild(this.ingredientsItemElement)
    }
  }

  createIngredientsTypesList(typesList) {
    this.ingredientsTypesList = []

    this.ingredientsTypesListElement = document.createElement('ul')
    this.ingredientsTypesListElement.classList.add('ingredients-list__types-list')

    if (typeof typesList === 'string') {
      this.ingredientsTypeElement = document.createElement('li')
      this.ingredientsTypeElement.classList.add('ingredients-list__types-item')
      this.ingredientsTypeElement.innerHTML = typesList

      this.ingredientsTypesListElement.appendChild(this.ingredientsTypeElement)
    } else {
      typesList.forEach((type, index) => {
        if (this.ingredientsTypesList.indexOf(type.name) === -1) {
          this.ingredientsTypesList.push(type.name)
          this.ingredientsTypeElement = document.createElement('li')
          this.ingredientsTypeElement.classList.add('ingredients-list__types-item')
          this.ingredientsTypeElement.innerHTML = type.name

          this.ingredientsTypesListElement.appendChild(this.ingredientsTypeElement)
        } else {
          return
        }
      })
    }

    this.ingredientsItemElement.appendChild(this.ingredientsTypesListElement)
  }

  initAnimations() {
    this.animationsList = []

    this.animations.forEach((animation) => {
      this.dataAttribute = animation.dataset.animate

      if (this.dataAttribute === 'product-main') {
        this.animation = new ProductMainAnimation(animation)
      } else if (this.dataAttribute === 'product-informations') {
        this.animation = new ProductInformationsAnimation(animation)
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
    this.createTitle()
    this.createTagline()
    this.createDescription()
    this.createSpecifications()
    this.createIngredients()

    this.initAnimations()
  }
}
