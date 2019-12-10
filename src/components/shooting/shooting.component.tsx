import React from 'react';
import { RouteChildrenProps } from 'react-router-dom';
import './shooting.component.css';
import 'antd/dist/antd.css';

interface ShootingParams {
    shootingName: string;
}

class Shooting extends React.Component<RouteChildrenProps<ShootingParams>, any> {

    render() {
        return <div>Hello {this.props.match ? this.props.match.params.shootingName : null}</div>;
    }
}

export default Shooting;
