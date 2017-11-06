const fs = require('fs')

const React = require('react');

const { renderToString } = require('react-dom/server')
const { StaticRouter, matchPath } = require('react-router-dom')

const { default: App } = require('./client/src/App');

require('./config/middleware');

module.exports = function universalLoader(req, res) {

    fs.readFile('./client/build/index.html', 'utf8', (err, htmlData) => {
        if (err) {
            console.error('read err', err)
            return res.status(404).end()
        }
        const context={};
        console.log('success reading file');

        /*const match = matchPath(req.url, {
            path: '/polls/single/:id/:title'
        });*/
        let user = '', isAuth = false;
        if (req.isAuthenticated()) {
            user = req.user, isAuth = !req.session.guest;
        } else {
            user = req.session.username, isAuth = !req.session.guest;
        }

        const markup = renderToString( 
            <StaticRouter location = { req.url } context={ context }>
                <App userId={ user } isAuth={ isAuth }/>
            </StaticRouter>)

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