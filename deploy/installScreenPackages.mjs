import { execSync } from 'node:child_process'
import { readFileSync, rmSync, writeFileSync } from 'node:fs'

const screenPackages = [
  'react',
  'react-dom',
  'qrcode',
  '@fontsource/bricolage-grotesque',
  '@fontsource/instrument-sans',
  '@fontsource/jetbrains-mono',
  'vite',
  '@vitejs/plugin-react'
]

const project = JSON.parse(readFileSync('package.json', 'utf8'))
const versions = { ...project.dependencies, ...project.devDependencies }
project.dependencies = Object.fromEntries(screenPackages.map((name) => [name, versions[name]]))
delete project.devDependencies
writeFileSync('package.json', JSON.stringify(project, null, 2))
rmSync('package-lock.json', { force: true })
execSync('npm install --ignore-scripts --no-audit --no-fund', { stdio: 'inherit' })
