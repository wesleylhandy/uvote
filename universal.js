const path = require('path')
const fs = require('fs')

const React = require('react')

const { renderToString } = require('react-dom/server')
const { StaticRouter, matchPath } = require('react-router-dom')


const { default: App } = require('./client/src/App');

module.exports = function universalLoader(req, res) {
    const filePath = path.resolve(__dirname, '..', 'build', 'index.html')

    fs.readFile(filePath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('read err', err)
            return res.status(404).end()
        }
        const context={}

        /*const match = matchPath(req.url, {
            path: '/polls/single/:id/:title'
        });*/

        const markup = renderToString( 
            <StaticRouter location = { req.url } context={context}>
                <App />
            </StaticRouter> 
        )

        if (context.url) {
            // Somewhere a `<Redirect>` was rendered
            res.redirect(301, context.url)
        } else {
            // we're good, send the response
            const RenderedApp = htmlData.replace('{{SSR}}', markup);
            res.send(RenderedApp);
        }
    })
}