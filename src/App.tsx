import React from 'react';
import { ASSET_URL, CHOSEN_THEME } from './constants'
import logo from './static/images/logo.png';
import './static/styles/App.css';
import footer from './static/images/footer.png';
import { iframeResizer } from 'iframe-resizer'
import './static/styles/App.css';

const embeddedUrl = `${ASSET_URL}?embed=${CHOSEN_THEME}`

class App extends React.Component {

  componentDidMount() {
    iframeResizer({ log: false }, '#opensea-iframe')
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            
          </p>
          <i className="material-icons right">menu</i>
        </header>
        <main className="App-main">
          <div className="App-hero">
            <div className="App-hero-image"></div>
            <p>
              My Marketplace
            </p>
            <small>Digital collectibles from my company</small>
          </div>
          <iframe id="opensea-iframe" title="Embedded OpenSea Marketplace" src={embeddedUrl} width='100%' height='100%' frameBorder='0' allowFullScreen></iframe>
        </main>
        <footer className="App-footer">
          {/* Placeholder image for footer */}
          <img style={{width: '100%'}} src={footer} className="footer" alt="footer" />
        </footer>
      </div>
    );
  }
}

export default App;
