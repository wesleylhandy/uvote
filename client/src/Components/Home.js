import React, { Component } from 'react';

export default class NoMatch extends Component{
  render() {
    return (
      <div className='home-page'>
        <div className="welcome__title">Welcome to uVote - Polls by You for the People</div>
        <ul className="welcome__intro">
          <li>Do you have a burning desire to know whether your friends prefer Tea over Coffee?</li>
          <li>Are you curious to find out if people like Cats more than Dogs?</li>
          <li>Or what is that profound question that you just need answered by the consensus of the masses?</li>
          
        </ul>
        <div className='welcome__title--small'>This app is for you.</div>
        <div className='welcome__intructions'>
          <div className="welcome__instructions--heading">How Does it Work?</div>
            <div className='welcome__instructions--text'>You can view all the previously created polls by any user by clicking on the <span>&ldquo;View All Polls&rdquo;</span> tab in the navigation bar at the top. This will produce a list of all current polls, any of which you can cast a vote for your favorite option.</div>
            <div className='welcome__instructions--text'>The <span>&ldquo;User Portal&rdquo;</span> expands the current navigation and allows you to create new polls, edit incomplete polls, and even delete polls. However, to access the portal, you must first register an account by clicking <span>&ldquo;Sign Up.&rdquo;</span></div>
            <div className='welcome__instructions--text'>Later, you can return to the site and <span>&ldquo;Log In&rdquo;</span> with your credentials.</div>
            <div className='welcome__instructions--text'>That's pretty much it.</div>
            <div className='welcome__instructions--text'>Have Fun and Happy Polling!</div>
        </div>
      </div>
    )
  }
}