const DEFAULT_SPEED_RANGE: [number, number] = [10, 25]

export class Writter {
  private memoWord: string | undefined
  private nextWord: string | undefined
  private word: string | null = null
  private eventQueue: Array<string>
  private dummyQueue: Array<string | undefined>
  private erasing: boolean | undefined
  private speedRange: [number, number]

  constructor(range?: [number, number]) {
    this.speedRange = range || DEFAULT_SPEED_RANGE
    this.dummyQueue = []
    this.eventQueue = []
  }

  public restartTypeWriter() {
    this.memoWord = this.nextWord
    this.eventQueue = this.nextWord ? this.nextWord.split('') : []
    this.erasing = false
    return ''
  }

  public typing() {
    // earsing to last character, start write next word
    if (this.erasing && !this.word) {
      return this.restartTypeWriter()
    }
    // earsing
    if (this.erasing && this.word) {
      return this.erase()
    }
    // write end
    if (this.word === this.memoWord) {
      return this.word
    }
    // writing
    const el = this.eventQueue.shift()
    this.dummyQueue.push(el)
    this.word = this.dummyQueue.join('')
    return this.word
  }

  public startTypeWord(str: string) {
    this.erasing = true
    this.nextWord = str
    this.dummyQueue.pop()
    this.word = this.dummyQueue.join('')
    return this.word
  }

  public erase() {
    this.dummyQueue = []
    this.word = ''
    return this.word
  }

  public rd(): number {
    const min = this.speedRange[0]
    const max = this.speedRange[1]

    return Math.random() * (max - min) + min
  }
}
