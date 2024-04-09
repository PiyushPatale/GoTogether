/* footer component */
import React, { Component } from 'react';
import '../styles/footer.css';

export default class footer extends Component {
    render() {
        return (
            <div className="footer-parent">
                <div className="footer">
                    <p>Email us: <a href="mailto:mza@carshare.com">gotogether@gmail.com</a></p>
                    <p>Call us: +91 6969696969</p>
                    <p>Headquartes: Bongora, Guwahati, Assam</p>
                </div>
            </div>
        )
    }
}
