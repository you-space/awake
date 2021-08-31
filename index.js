const page = require('./pages/index')

class Index {
    async render(url){

        return page()
    }
}

module.exports = Index