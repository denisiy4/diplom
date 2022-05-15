class Storage {
  #operations = {
    '+': 'Додавання',
    '-': 'Віднімання',
    '*': 'Множення',
    '/': 'Ділення'
  }

  #key = 'young-math'

  set(value) {
    localStorage.setItem(this.#key, JSON.stringify(value))
  }

  get() {
    return JSON.parse(localStorage.getItem(this.#key))
  }

  updateResult({ operation, score }) {
    const value = this.get()
    const target = value[operation]

    if (target) {
      if (target.score < score) {
        value[operation].score = score
      }
    } else {
      value[operation] = {
        score,
        title: this.#operations[operation],
      }
    }


    this.set(value)
  }

  init() {
    const is = localStorage.getItem(this.#key)

    if (!is) {
      this.set({})
    }
  }
}

export const storage = new Storage()
