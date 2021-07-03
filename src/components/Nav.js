import React, { useState, useEffect } from 'react'
import "../styles/Nav.css"
const Nav = () => {
    const [show, handleShow] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                handleShow(true);
            } else handleShow(false);
        });
        return () => {
            window.removeEventListener("scroll");
        };
    }, []);

    return (
        <div className={`nav ${show && "nav_black"}`}>
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
                alt="Netflix Logo"
                className="nav_logo" />
            <img
                src="https://occ-0-3215-3663.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABYwtVRcxdjO0a5WgtYBBo6jBjf_VIz0Z_HDIy0EinUgtrVQ-p1Z1aiaQUxt6gBO6A1qRNeBQ9cnqdEgq-jEI_y4.png?r=2de"
                alt="Avatar Logo"
                className="avatar_logo" />

        </div>
    )
}

export default Nav
