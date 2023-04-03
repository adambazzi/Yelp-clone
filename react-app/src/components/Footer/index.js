import React from 'react';
import './index.css'
import { Link } from 'react-router-dom';

export default function Footer() {
	return (
        <footer>
        <div className="footer-top">
            <div className="footer-column">
            <h3>About</h3>
            <ul>
                <li><Link to="/about">About VGAN</Link></li>
            </ul>
            </div>
            <div className="footer-column">
            {/* <h3>Discover</h3>
            <ul>
                <li><Link href="">Sign up!</Link></li>
            </ul> */}
            </div>
        </div>
        <div className='footer-bottom'>Copyright © 2004–2023 VGAN Inc. VGAN, VGAN logo, VGAN burst and related marks are registered trademarks of VGAN.</div>
        </footer>

	);
}
