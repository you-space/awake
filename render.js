const { join } = require('path')

const edge = require('edge.js').default
const moment = require('moment')

async function render({ path, type, item, query, site, params }){

    edge.mount(join(__dirname, 'views'))

    edge.global('moment', moment)

    edge.global('query', query)

    edge.global('site', site)
    
    edge.global('server', { item, type })

    
    if (path === '/') {
        return edge.render('home')
    }

    if (path === '/youtube') {
        return edge.render('archive-youtube-videos')
    }
    
    if (/\/youtube\/*/.test(path)) {
        const item = await type.find('youtube-videos', {
            search: query.search,
            id: params[1]
        })

        if (!item) {
            return edge.render('404')
        }
        
        return edge.render('single-youtube-videos', {
            video: item,
        })
    }

    if (path === '/local') {
        return edge.render('archive-local-videos')
    }

    if (/\/local\/*/.test(path)) {
        const item = await type.find('local-videos', {
            search: query.search,
            id: params[1]
        })

        if (!item) {
            return edge.render('404')
        }

        return edge.render('single-local-videos', {
            video: item,
        })
    }

    
    return edge.render('404')
}

module.exports = render