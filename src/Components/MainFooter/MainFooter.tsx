import React from 'react'
import './MainFooter.scss'
import { IoIosAirplane } from 'react-icons/io';
import { SiFacebook, SiGithub, SiInstagram, SiLinkedin } from 'react-icons/si';



function MainFooter() {

    return (

        <div className="main-footer" >


            <footer className="footer-distributed">
                <div className="footer-left">
                    <h3>Traveleasy <IoIosAirplane /></h3>
                    <p className="footer-company-name"> &copy;{new Date().getFullYear()} James Dev. | All rights reserved.</p>
                </div>
                <div className="footer-right">
                    <div className="footer-icons">
                        <p>Find us on:</p>
                        <a href="/#"><i className="facebook-icon icons"><SiFacebook /> </i></a>
                        <a href="/#"><i className="instagram-icon icons"><SiInstagram /></i></a>
                        <a href="/#"><i className="linkedin-icon icons"><SiLinkedin /></i></a>
                        <a href="/#"><i className="github-icon icons"><SiGithub /></i></a>
                    </div>
                </div>
            </footer>
        </div>
    )

}

export default MainFooter

