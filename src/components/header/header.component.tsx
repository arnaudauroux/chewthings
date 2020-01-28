import React from 'react';
import './header.component.css';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends React.Component<any> {

    static mapStateToProps(state: any, ownProps?: any) {
        return {
          title: state?.shootingName
        };
    }

    render() {
        return (
            <Link to='/'>
                <div className='headerRoot'>
                    <div className='logo' />
                    <span className='appName'>ChewThings</span>
                    {this.props.title && <span className='title'>{this.props.title}</span>}
                </div>
            </Link>
        );
    }
}

export default connect(Header.mapStateToProps)(Header);
