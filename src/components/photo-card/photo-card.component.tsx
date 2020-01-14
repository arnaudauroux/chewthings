import React from 'react';
import { Card, Icon, Popconfirm } from 'antd';
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
    onSetting = (event: any) => {

    }

    onDelete = async (event: any) => {
        this.props.onDeletePhoto(this.props.photo);
    }

    render() {
        return (
            <Card
                className='photo-card'
                hoverable
                actions={[
                    <Icon type='setting' key='setting' />,
                    <Popconfirm
                        placement='top'
                        title='Êtes-vous sûr de vouloir supprimer cette photo ?'
                        onConfirm={this.onDelete}
                        okText='Yes'
                        cancelText='No'>
                        <Icon type='delete' key='delete' />
                    </Popconfirm>
                ]}>
                <img
                    alt='example'
                    src={this.props.photo.url} />
            </Card>
        );
    }
}

export default withRouter(PhotoCard);
