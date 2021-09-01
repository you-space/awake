const { join } = require('path')
const edge = require('edge.js').default
module.exports = class Awake {
    start(){
        edge.mount(join(__dirname, 'views'))
    }
    async render({ path, query, site }){

        this.start()

        edge.global('query', query)

        edge.global('site', site)
        
        if (path === '/') {
            const { data, meta } = await this.type.fetchItems('youtube-videos', {
                page: query.page,
                limit: 5
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
