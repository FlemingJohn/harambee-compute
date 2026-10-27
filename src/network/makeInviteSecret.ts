import { randomInt } from 'node:crypto'

const readableCharacters = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ'

export function makeInviteSecret(): string {
  const characters = Array.from({ length: 8 }, () => readableCharacters[randomInt(readableCharacters.length)])
  return `${characters.slice(0, 4).join('')}-${characters.slice(4).join('')}`
}
