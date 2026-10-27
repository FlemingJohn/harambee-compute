declare module 'hypercore' {
  export default class Hypercore {
    length: number
    key: Buffer
    ready(): Promise<void>
    append(value: unknown): Promise<{ length: number }>
    get(index: number): Promise<unknown>
  }
}
