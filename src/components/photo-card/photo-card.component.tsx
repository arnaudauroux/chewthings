import React from 'react';
import { Card, Icon } from 'antd';
import { withRouter } from 'react-router';
import './photo-card.component.css';
import 'antd/dist/antd.css';
import ShootingsService from '../../services/shootings.service';

class PhotoCard extends React.Component<any> {
    private shootingsService: ShootingsService;

    constructor(props: any) {
        super(props);

        this.shootingsService = new ShootingsService();
    }

    render() {
        return (
            <Card
                className='shooting-card'
                hoverable
                actions={[
                    <Icon type='setting' key='setting' />,
                    <Icon type='delete' key='delete' />
                ]}>
                <img
                    className='shooting-card-default'
                    alt='example'
                    src={this.props.photo.url} />
            </Card>
        );
    }
}

export default withRouter(PhotoCard);
