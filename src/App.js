import React, { Component } from 'react';
import { TimelineLite, Power2 } from 'gsap';
import logo from './logo.svg';
import './App.css';
import volumeOff from './volume_off.svg';
import volumeOn from './volume_on.svg';


class App extends Component {
  constructor(props){
    super(props);
    this.intro = React.createRef();
    this.logo = React.createRef();
    this.content = React.createRef();
    this.audio = React.createRef();

    this.state = {
    muted: true 
  };
}
  componentDidMount() {
    const tl = new TimelineLite();
    tl
      .to(this.intro.current, 4.5, {opacity: 1, delay: 1})
      .to(this.intro.current, 1.5, {
        opacity: 0, 
        onComplete: () => {
          this.audio.current.play();
        }
    })
      .set(this.logo.current, {opacity: 1, scale: 2.75, delay: 0.5})
      .to(this.logo.current, 8, {
        scale: 0.05, 
        ease: Power2.easeOut
      })
      .to(this.logo.current, 1.5, {opacity: 0}, '-=1.5')
      .to(this.content.current, 200, {top: '-170%'});
  }
  onVolumeClick = () => {
    if (this.state.muted) {
      this.audio.current.muted = false; 
    } else {
      this.audio.current.muted = true;
    }
    this.setState({muted: !this.state.muted});
  }
  render() {
    return (
      <div className="container">
        <section className='intro' ref={this.intro}>
          <p>A long time ago, in a galaxy far, <br/> far away...</p>
        </section>
        <section className='logo' ref={this.logo}>
          <img src={logo} alt='code wars logo' />
        </section>
        <section className='crawl'>
          <div className='content' ref={this.content}>
            <h1 className='title'>Episode 7</h1>
            <h2 className='subtitle'>THE APP AWAKENS</h2>
            <p>The Development Team Lead has vanished. In her absence, the sinister FUNCTIONAL BUG has risen from the ashes of the CI Tool and will not rest until the last developer has been destroyed.</p>
            <p>The Developer has sent his most daring editor theme on a secret mission to the production branch, where an old ally has discovered a clue to the Lead's whereabouts....</p>
          </div>
        </section>
        <audio ref = {this.audio} muted>
          <source type ="audio/mpeg" src="https://ia801307.us.archive.org/28/items/JohnWilliamsStarWarsMainThemeFULL/John%20Williams%20-%20Star%20Wars%20Main%20Theme%20(FULL).mp3"/>
          </audio>
          <button className="volume" type="button" onClick={this.onVolumeClick}>
          {this.state.muted ? (<img src={volumeOff} alt='Volume is Off' />) : (<img src={volumeOn} alt='Volume Is On' /> )}
          </button>
      </div>
    );
  }
}

export default App;
