const { join } = require('path')
const edge = require('edge.js').default
const moment = require('moment')

const assets = new Map()

assets.set('script.js', join(__dirname, 'assets', 'script.js'))
module.exports = class Awake {
    assets = assets
    async render({ path, query, site }){

        edge.mount(join(__dirname, 'views'))

        edge.global('query', query)

        edge.global('site', site)

        edge.global('moment', moment)
        
        if (path === '/') {
            const { data, meta } = await this.type.fetchItems('youtube-videos', {
                search: query.search,
                page: query.page,
                limit: 12
            })

            return edge.render('home', {
                items: data,
                meta
            })
        }

        if (path === '/youtube') {
            return 'youtube archive'
        }

        if (/\/youtube\/*/.test(path)) {
            return 'youtube single'
        }
        
        return '404'
    }
}
