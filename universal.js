const fs = require('fs')
const path = require('path');
const React = require('react');

const { renderToString } = require('react-dom/server')
const { StaticRouter } = require('react-router-dom')

const { App } = require('./client/src/App');

module.exports = function universalLoader(req, res) {
    
    const filePath = path.join(__dirname, 'client/build/index.html');
    
    console.log(filePath);

    fs.readFile(filePath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('read err', err)
            return res.status(404).end()
        }
        const context={};
        console.log('success reading file');

        let user = '', isAuth = false;
        if (req.isAuthenticated()) {
            user = req.user, isAuth = !req.session.guest;
        } else {
            user = req.session.username, isAuth = !req.session.guest;
        }

        const markup = renderToString(<StaticRouter location={req.url} context={context}><App userId={user} isAuth={isAuth}/></StaticRouter>)

        if (context.url) {
            // Somewhere a `<Redirect>` was rendered
            res.redirect(301, context.url);
        } else {
            // we're good, send the response
            const RenderedApp = htmlData.replace(/({{)((.|\n|\r|\t)*)(}})/gm, markup);
            res.sendFile(RenderedApp);
        }
    })
}