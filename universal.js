import fs from 'fs'
import path from 'path'
import React from 'react';

import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

import App from './client/lib/App.js';

module.exports = function universalLoader(req, res) {

    const filePath = path.join(__dirname, 'client/build/index.html');

    fs.readFile(filePath, 'utf8', (err, htmlData) => {
        if (err) {
            console.error('read err', err)
            return res.status(404).end()
        }
        const context = {};

        let user = '',
            isAuth = false;
        if (req.isAuthenticated()) {
            user = req.user, isAuth = true;
        } else {
            user = req.session.username, isAuth = false;
        }

        console.log({ App });

        const markup = renderToString( <StaticRouter location={ req.url } context={ context }>
            <App userId={ user } isAuth={ isAuth }/> </StaticRouter>
        );

        if (context.url) {
            // Somewhere a `<Redirect>` was rendered
            res.redirect(301, context.url);
        } else {
            // we're good, send the response
            const RenderedApp = htmlData.replace(/({{)((.|\n|\r|\t)*)(}})/gm, markup);
            res.send(RenderedApp);
        }
    })
}