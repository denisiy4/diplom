import { randomNumber } from '../lib/random-number';

export class ExpressionGenerator {
  #operator = null

  #border = 50

  #config = {
    firstOperand: null,
    secondOperand: null,
    correctResult: null,
    operator: this.#operator
  }

  #allowedOperators = {
    'plus': '+',
    'minus': '-',
    'multiple': '*',
    'division': '/'
  }

  constructor(operator) {
    this.#setOperator(operator)
  }

  #setOperator(operator) {
    this.#operator = this.#allowedOperators[operator]
  }

  #isFloat(n){
    return Number(n) === n && n % 1 !== 0;
  }

  #generateVariants(correctResult) {
    const variants = []
    const ln = 3

    while(variants.length !== ln) {
      const n = randomNumber(this.#border)
      if (n !== correctResult) {
        variants.push(n)
      }
    }

    const pos = randomNumber(ln - 1)
  
    variants[pos] = correctResult

    return variants
  }

  #generateForPlus() {
    const firstOperand = randomNumber(this.#border)
    const secondOperand = randomNumber(this.#border)
    const correctResult = firstOperand + secondOperand

    this.#config = {
      firstOperand,
      secondOperand,
      correctResult,
      operator: this.#operator,
      variants: this.#generateVariants(correctResult)
    }

    return this.#config
  }

 

  #generateForMinus() {
    const firstOperand = randomNumber(this.#border)
    let secondOperand = randomNumber(this.#border)

    while(secondOperand > firstOperand) {
      secondOperand = randomNumber(this.#border)
    }

    const correctResult = firstOperand - secondOperand

    this.#config = {
      firstOperand,
      secondOperand,
      correctResult,
      operator: this.#operator,
      variants: this.#generateVariants(correctResult)
    }

    return this.#config
  }

  #generateForMultiple() {
    const firstOperand = randomNumber(this.#border)
    const secondOperand = randomNumber(this.#border)
    const correctResult = firstOperand * secondOperand

    this.#config = {
      firstOperand,
      secondOperand,
      correctResult,
      operator: this.#operator,
      variants: this.#generateVariants(correctResult)
    }

    return this.#config
  }

  #generateForDivision() {
    let firstOperand = randomNumber(this.#border)
    let secondOperand = randomNumber(this.#border)

    while (true) {
      if (this.#isFloat(firstOperand / secondOperand)) {
        firstOperand = randomNumber(this.#border)
        secondOperand = randomNumber(this.#border)
      } else {
        if (secondOperand !== 0) {
          break;
        }
      }
    }

    const correctResult = firstOperand / secondOperand

    this.#config = {
      firstOperand,
      secondOperand,
      correctResult,
      operator: this.#operator,
      variants: this.#generateVariants(correctResult)
    }

    return this.#config
  }

  generate() {
    switch (this.#operator) {
      case '+': {
        return this.#generateForPlus()
      }
      case '-': {
        return this.#generateForMinus()
      }
      case '*': {
        return this.#generateForMultiple()
      }
      case '/': {
        return this.#generateForDivision()
      }
    }
  }

  check(variant) {
    return variant === this.#config.correctResult
  }
}
