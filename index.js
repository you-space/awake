const { join } = require('path')
const edge = require('edge.js').default
const moment = require('moment')

const assets = new Map()

assets.set('script.js', join(__dirname, 'assets', 'script.js'))
module.exports = class Awake {
    assets = assets
    async render({ path, query, site, fullPath }){

        edge.mount(join(__dirname, 'views'))

        edge.global('query', query)

        edge.global('site', site)

        edge.global('moment', moment)
        
        if (path === '/') {
            const { data, meta } = await this.item.fetchItems({
                search: query.search,
                page: query.page,
                limit: 12
            }, true)

            return edge.render('home', {
                items: data,
                meta
            })
        }

        if (path === '/youtube') {
            const { data, meta } = await this.type.fetchItems('youtube-videos', {
                search: query.search,
                page: query.page,
                limit: 12
            })

            return edge.render('archive-youtube-videos', {
                items: data,
                meta
            })
        }

        if (/\/local\/*/.test(path)) {
            const { data, meta } = await this.type.fetchItems('local-videos', {
                search: query.search,
                page: query.page,
                limit: 12
            })

            return edge.render('archive-local-videos', {
                items: data,
                meta
            })
        }

        if (/\/youtube\/*/.test(path)) {
            return 'youtube single'
        }

        
        return '404'
    }
}
