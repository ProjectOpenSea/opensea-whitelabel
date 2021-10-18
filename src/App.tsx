import React from "react";
import { ASSET_URL, CHOSEN_THEME } from "./constants";
import logo from "./static/images/logo.png";
import "./static/styles/App.css";
import footer from "./static/images/footer.png";
import { iframeResizer } from "iframe-resizer";
import "./static/styles/App.css";

const embeddedUrl = `${ASSET_URL}?embed=${CHOSEN_THEME}`;

class App extends React.Component {
    // componentDidMount() {
    //     iframeResizer({ log: false }, "#opensea-iframe");
    // }

    render() {
        return (
            <>
                <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                    <div className='container-fluid'>
                        <a className='navbar-brand' href='#'>
                            Navbar
                        </a>
                    </div>
                </nav>

                <iframe
                    id='opensea-iframe'
                    className='h-100'
                    title='Embedded OpenSea Marketplace'
                    src={embeddedUrl}
                    width='100%'
                    height='100%'
                    frameBorder='0'
                    allowFullScreen
                ></iframe>
            </>
        );
    }
}

export default App;
