import { homedir } from 'node:os'
import { join } from 'node:path'

export const qvacModelsFolder = join(homedir(), '.qvac', 'models')
