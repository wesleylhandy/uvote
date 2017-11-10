# uVote - a place for polling your friends :bowtie:

This application is built upon a Node/Express Server, with support by MongoDB on the backend,  React to display the front end, and Passport/BCrypt to handle user authentication.

## What does it do? 

Any visitor to the [site](https://u-vote.herokuapp.com) can :eyes: view all published polls and :radio_button: vote on any single poll once. They can also :pushpin: share a poll via twitter web-intents embedded on each poll.

Authenticated users get to have all the fun! :fire:

After creating an account, authenticated users can create, save, and publish polls to be shared with their friends. They can also view the status of any one of their published polls.

## What Were Some Challenges In Completing This Project?

* Data Architecture 
	Since I chose to use `Passport.js` for user authentication and also chose a local strategy, I decided to use the `Mongoose` package instead of the standard `MongoDB` client. Moreover, I wanted to be able to aggregate all published polls and yet keep the power of MongoDB as a document-oriented database. As such, I chose to have only one data model - the user - with nested subdocument models for Polls and nested another level down for Inputs on each Poll. 
	The documentation for Mongoose is not altogether clear on best practices for creating, updating and deleting subdocs and subsubdocs, (especially compared to how to query data through MongoDB directly). After hours of reading, a stack overflow question, and much trial and error, I found that everytime you update anything on a subdocument or a subsubdocument, you have to tell Mongoose via `user.markModified('polls')` what subdoc you changed before saving, where `user` is the document returned from my query, and `'polls'` or it's next-level-down equivalent is the name of the key I defined in my model.

* Server-Side Rendering
	Since this application is a `React` application, and since I am utilizing the power of `React Router 4`, I faced a significant challenge in creating links to polls created by users. I am updating the browser history through `BrowserRouter` which is a `React` component. This means that if I tried to open a page within my application without going through the application root, since my components, and hence my routes, are not loaded within the browser, my express router is not set up to serve client-side routes and users would get an ugly unmanaged `404 message`.
	To solve this, I read extensively on how to accomplish Server-Side Rendering with an application built via `create-react-app` using `React Router 4`. I learned that I can use `babel-register` to compile all my js files, not just the client, and that I can use a little trick to stringify all my components and insert them into `index.html` in my client build folder - see `universal.js` in my root folder. 
	This worked great in development. But when I pushed into production naively, my app crashed repeatedly with a litany of errors I found very difficult to debug. Solving one error led to new errors. What I learned through more research on this problem is that `babel-register` is a great solution - for development - but it cannot be used in production. This made me realize I had to remove `babel-node` from my startup scripts as well. But I found that without `babel-register` I was getting errors related to import statements on my components. What? Was my build failing? No.
	Server-Side Rendering makes load time on `React` applications super fast. It works only if the all my `React` components are compiled. So I created a build script on my server side to do two things: (1) Compile `universal.js` and (2) link `universal.js` to a complied version of my entire `src` directory, saved in new location `client/lib`. 
	This solved the issue. Now, any endpoint that is open to nonauthorized users can be accessed via a direct link since my entire application is served to the browser on the server-side.