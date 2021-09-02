const { join } = require('path')
const edge = require('edge.js').default
const moment = require('moment')

const assets = new Map()

assets.set('script.js', join(__dirname, 'assets', 'script.js'))
module.exports = class Awake {
    assets = assets
    async render({ path, query, site, params }){

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
        
        if (/\/youtube\/*/.test(path)) {
            const item = await this.type.find('youtube-videos', {
                search: query.search,
                id: params[1]
            })

            if (!item) {
                return edge.render('404')
            }

            const { data } = await this.type.fetchItems('youtube-videos', {
                limit: 4,
                random: true
            })
            
            return edge.render('single-youtube-videos', {
                video: item,
                otherVideos: data

            })
        }

        if (path === '/local') {
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

        if (/\/local\/*/.test(path)) {
            const item = await this.type.find('local-videos', {
                search: query.search,
                id: params[1]
            })

            if (!item) {
                return edge.render('404')
            }

            const { data } = await this.type.fetchItems('local-videos', {
                limit: 4,
                random: true
            })

            return edge.render('single-local-videos', {
                video: item,
                otherVideos: data
            })
        }

        
        return edge.render('404')
    }
}
