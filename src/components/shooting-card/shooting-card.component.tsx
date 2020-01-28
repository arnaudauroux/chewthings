import React from 'react';
import { Card, Icon, Avatar, Popconfirm } from 'antd';
import './shooting-card.component.css';
import 'antd/dist/antd.css';

const { Meta } = Card;

class ShootingCard extends React.Component<any> {
    onShootingSelected = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        this.props.onShootingSelected(this.props.shooting);
    }

    onDelete = async (event: any) => {
        this.props.onDeleteShooting(this.props.shooting);
    }

    render() {
        return (
            <Card
                className='shooting-card'
                hoverable
                cover={
                    <img
                        onClick={this.onShootingSelected}
                        className='shooting-card-default'
                        alt='example'
                        src='https://cdn.pixabay.com/photo/2017/08/06/09/52/black-and-white-2590810_1280.jpg' />
                }
                actions={[
                    <Icon type='setting' key='setting' />,
                    <Icon type='edit' key='edit' />,
                    <Popconfirm
                        placement='top'
                        title='Êtes-vous sûr de vouloir supprimer ce shooting ?'
                        onConfirm={this.onDelete}
                        okText='Yes'
                        cancelText='No'>
                        <Icon type='delete' key='delete' />
                    </Popconfirm>
                ]}>
                <div onClick={this.onShootingSelected}>
                    <Meta
                        avatar={<Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />}
                        title={this.props.shooting.name}
                        description={this.props.shooting.lastModified.toDateString()} />
                </div>
            </Card>
        );
    }
}

export default ShootingCard;
