import React from 'react';
import './header.component.css';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    render() {
        return (
            <Link to='/'>
                <div className='headerRoot'>
                    <div className='logo' />
                    <span>ChewThings</span>
                </div>
            </Link>
        );
    }
}

export default Header;
