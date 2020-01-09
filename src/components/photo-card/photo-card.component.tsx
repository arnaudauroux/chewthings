import React from 'react';
import { Card, Icon, Avatar } from 'antd';
import { withRouter } from 'react-router';
import './photo-card.component.css';
import 'antd/dist/antd.css';
import ShootingsService from '../../services/shootings.service';

const { Meta } = Card;

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
                cover={
                    <img
                        className='shooting-card-default'
                        alt='example'
                        src={this.props.photo.url} />
                }
                actions={[
                    <Icon type='setting' key='setting' />,
                    <Icon type='edit' key='edit' />,
                    <Icon type='delete' key='delete' />
                ]}>
                <Meta
                    avatar={<Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />}
                    title={this.props.photo.name}
                    description={this.props.photo.lastModified.toDateString()} />
            </Card>
        );
    }
}

export default withRouter(PhotoCard);
