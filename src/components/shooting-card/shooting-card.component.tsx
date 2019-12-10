import React from 'react';
import './shooting-card.component.css';
import 'antd/dist/antd.css';
import { Card, Icon, Avatar } from 'antd';
import { withRouter } from 'react-router';

const { Meta } = Card;

class ShootingCard extends React.Component<any> {
    redirectToShootingPage = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        this.props.history.push(`/${this.props.blob.name}`);
    }

    render() {
        return (
            <Card
                onClick={this.redirectToShootingPage}
                className='shooting-card'
                hoverable
                cover={
                    <img
                        className='shooting-card-default'
                        alt='example'
                        src='https://cdn.pixabay.com/photo/2017/08/06/09/52/black-and-white-2590810_1280.jpg' />
                }
                actions={[
                    <Icon type='setting' key='setting' />,
                    <Icon type='edit' key='edit' />,
                    <Icon type='delete' key='delete' />
                ]}>
                <Meta
                    avatar={<Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />}
                    title={this.props.blob.name}
                    description={this.props.blob.properties.lastModified.toDateString()} />
            </Card>
        );
    }
}

export default withRouter(ShootingCard);
