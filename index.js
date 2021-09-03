const { join } = require('path')
const fs = require('fs')

const assets = new Map()
const scripts = new Map()

assets.set('script.js', join(__dirname, 'assets', 'script.js'))

scripts.set('build', ['npm', 'install'])
module.exports = class Awake {
    assets = assets
    scripts = scripts
    async render(args){

        if (!fs.existsSync(join(__dirname, 'node_modules'))) {
            return 'Please build the theme before use'
        }

        return require('./render')({
            ...args,
            type: this.type,
            item: this.item,
        })
    }
}
