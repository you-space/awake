const { join } = require('path')
const edge = require('edge.js').default
const moment = require('moment')
module.exports = class Awake {
    async render({ path, query, site }){

        edge.mount(join(__dirname, 'views'))

        edge.global('query', query)

        edge.global('site', site)

        edge.global('moment', moment)
        
        if (path === '/') {
            const { data, meta } = await this.type.fetchItems('youtube-videos', {
                page: query.page,
                limit: 8
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
