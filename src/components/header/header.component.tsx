import React from 'react';
import './header.component.css';
import 'antd/dist/antd.css';

class Header extends React.Component {
    render() {
        return (
            <div className='headerRoot'>
                <div className='logo' />
                <span>ClickR</span>
            </div>
        );
    }
}

export default Header;
