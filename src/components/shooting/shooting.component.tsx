import React from 'react';
import { RouteChildrenProps } from 'react-router-dom';
import './shooting.component.css';
import 'antd/dist/antd.css';
import Photo from '../../models/photo.model';
import { Modal, Icon, Tooltip, Button, Upload, notification, Spin } from 'antd';
import ShootingsService from '../../services/shootings.service';
import Dragger from 'antd/lib/upload/Dragger';
import { RcCustomRequestOptions, UploadChangeParam, UploadFile } from 'antd/lib/upload/interface';
import PhotoCard from '../photo-card/photo-card.component';
import { connect } from 'react-redux';

interface ShootingParams {
    shootingName: string;
}

class Shooting extends React.Component<RouteChildrenProps<ShootingParams>, any> {

    state = {
        photos: Array<Photo>(),
        previewVisible: false,
        previewImage: '',
        isLoading: true
    };

    private shootingsService: ShootingsService;

    private shootingName: string;

    constructor(props: any) {
        super(props);

        if (!this.props.match?.params?.shootingName) {
            throw new Error();
        }

        this.shootingsService = new ShootingsService();
        this.shootingName = this.props.match.params.shootingName;

        props.dispatch({ type: 'SHOOTING_SELECTED', value: this.shootingName });
    }

    componentDidMount() {
        this.refreshPhotosListAsync();
    }

    public async refreshPhotosListAsync() {
        this.setState({ isLoading: true });

        const photos = await this.shootingsService.getShootingPhotosAsync(this.shootingName);

        this.setState({ isLoading: false, photos });
    }

    upload = async (options: RcCustomRequestOptions) => {
        try {
            await this.shootingsService.AddPhotoAsync(this.shootingName, options.file);
        } catch (error) {
            options.onError(error);
            return;
        }

        options.onSuccess({}, options.file);

        this.refreshPhotosListAsync();
    }

    handleChange = (change: UploadChangeParam<UploadFile<any>>) => {
        const uploadedFilesCount = change.fileList.filter(f => f.status === 'done').length;
        notification.info({
            key: 'infos',
            message: 'Envoie des photos',
            duration: null,
            description:
                `${uploadedFilesCount} / ${change.fileList.length} fichiers envoyés.`
        });

        if (uploadedFilesCount === change.fileList.length) {
            setTimeout(() => notification.close('infos'), 1000);
        }
    }

    handleCancel = () => {

    }

    deletePhoto = async (photo: Photo) => {
        await this.shootingsService.DeletePhotoAsync(this.shootingName, photo.name);
        this.refreshPhotosListAsync();
    }

    render() {
        return (
            <div className='shooting-root'>
                <div className='shooting-photos-grid'>
                    {this.state.photos.map((photo: Photo, index: number) =>
                        <PhotoCard
                            key={index}
                            shootingName={this.props.match?.params?.shootingName}
                            photo={photo}
                            onDeletePhoto={this.deletePhoto}
                        />)}
                </div>
                {!this.state.isLoading && this.state.photos.length === 0 && (
                    <div className='dragger-container'>
                        <Dragger
                            onChange={this.handleChange}
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
                )}
                {!this.state.isLoading && (
                    <React.Fragment>
                        <Upload
                            onChange={this.handleChange}
                            customRequest={this.upload}
                            showUploadList={false}
                            multiple={true}>
                            <Tooltip
                                placement='topLeft'
                                title='Ajouter des photos'>
                                <Button
                                    className='main-button'
                                    type='primary'
                                    shape='circle'
                                    icon='plus' />
                            </Tooltip>
                        </Upload>
                        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                            <img alt='example' style={{ width: '100%' }} src={this.state.previewImage} />
                        </Modal>
                    </React.Fragment>
                )}
                <Spin
                    size='large'
                    spinning={this.state.isLoading}
                    className='shooting-spin' />
            </div>
        );
    }
}

export default connect()(Shooting);
