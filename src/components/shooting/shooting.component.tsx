import React from 'react';
import { RouteChildrenProps } from 'react-router-dom';
import './shooting.component.css';
import 'antd/dist/antd.css';
import Photo from '../../models/photo.model';
import { Modal, Icon } from 'antd';
import ShootingsService from '../../services/shootings.service';
import Dragger from 'antd/lib/upload/Dragger';
import { RcCustomRequestOptions } from 'antd/lib/upload/interface';

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

    public async refreshPhotosList() {
        if (this.props.match) {
            this.shootingsService.getShootingPhotosAsync(this.props.match.params.shootingName).then(photos => {
                this.setState({ photos });
            });
        }
    }

    upload = async (options: RcCustomRequestOptions) => {
        if (this.props.match) {
            await this.shootingsService.AddPhotoAsync(
                this.props.match.params.shootingName,
                'test',
                options.file
            );
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
                <div className='shooting-photos-grid'>
                    {this.state.photos.map((photo: Photo, inde: number) => {
                        return <div>{photo.name}</div>;
                    })}
                </div>
                <div className='dragger-container'>
                    <Dragger
                        customRequest={this.upload}
                        className='dragger'
                        showUploadList={false}
                        name='file'
                        multiple={true}>
                        <p className='ant-upload-drag-icon'>
                            <Icon type='inbox' />
                        </p>
                        <p className='ant-upload-text'>Click or drag file to this area to upload</p>
                        <p className='ant-upload-hint'>
                            Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                            band files
                    </p>
                    </Dragger>
                </div>
                <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt='example' style={{ width: '100%' }} src={this.state.previewImage} />
                </Modal>
            </React.Fragment >
        );
    }
}

export default Shooting;
