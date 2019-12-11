import React from 'react';
import { RouteChildrenProps } from 'react-router-dom';
import './shooting.component.css';
import 'antd/dist/antd.css';
import Photo from '../../models/photo.model';
import { Empty, Tooltip, Button, Modal, Input, Upload, Icon } from 'antd';
import ShootingsService from '../../services/shootings.service';
import { UploadFile } from 'antd/lib/upload/interface';

interface ShootingParams {
    shootingName: string;
}

class Shooting extends React.Component<RouteChildrenProps<ShootingParams>, any> {

    state = {
        photos: Array<Photo>(),
        previewVisible: false,
        previewImage: ''
    };
    shootingsService: ShootingsService;

    constructor(props: RouteChildrenProps<ShootingParams>) {
        super(props);

        this.shootingsService = new ShootingsService();
        this.refreshPhotosList();
    }

    public refreshPhotosList() {
        if (this.props.match) {
            const photos = this.shootingsService.getShootingPhotosAsync(this.props.match.params.shootingName);
            this.setState({ photos });
        }
    }

    handleChange = () => {

    }
    handlePreview = () => {

    }
    handleCancel = () => {

    }

    render() {
        return (
            <React.Fragment>
                {/* <div className='shooting-photos-grid'>
                    {this.state.photos.map((value, index) => {
                        return <div></div>;
                    })}
                </div> */}
                <Upload
                    listType='picture-card'
                    fileList={this.state.photos.map(p => p as UploadFile)}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                >
                    <div>
                        <Icon type='plus' />
                        <div className='ant-upload-text'>Upload</div>
                    </div>
                </Upload>
                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt='example' style={{ width: '100%' }} src={this.state.previewImage} />
                </Modal>
                {this.state.photos.length === 0 ? <Empty className='empty-status' description='Aucune photo' /> : null}
            </React.Fragment >
        );
    }
}

export default Shooting;
