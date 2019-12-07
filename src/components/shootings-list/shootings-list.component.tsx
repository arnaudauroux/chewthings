import React from 'react';
import './shootings-list.component.css';
import 'antd/dist/antd.css';
import { Tooltip, Button, Modal, Empty, Input, Card, Spin, Icon, Avatar } from 'antd';
import * as AzureStorageBlob from '@azure/storage-blob';

const { Meta } = Card;

class ShootingsList extends React.Component {

    state = {
        visible: false,
        creatingShooting: false,
        newShootingName: '',
        shootings: Array<AzureStorageBlob.BlobItem>()
    };

    containerClient: AzureStorageBlob.ContainerClient;

    constructor(props: Readonly<{}>) {
        super(props);

        const blobServiceClient = new AzureStorageBlob.BlobServiceClient(
            'https://clickr.blob.core.windows.net/?sv=2019-02-02&ss=bfqt&srt=sco&sp=rwdlacup&se=2021-01-01T18:23:46Z&st=2019-12-07T10:23:46Z&spr=https&sig=mFvQ2fehDGKDFnLmaU0cZuWkFd%2BoglHL7lxPRLBfzk4%3D');

        this.containerClient = blobServiceClient.getContainerClient('shootings');

        this.refreshShootingsList();
    }

    showModal = () => {
        this.setState({
            visible: true
        });
    }

    handleOk = async () => {
        this.setState({ creatingShooting: true });

        const content = 'hello';

        const blobClient = this.containerClient.getBlobClient(this.state.newShootingName);
        const blockBlobClient = blobClient.getBlockBlobClient();
        const uploadBlobResponse = await blockBlobClient.upload(content, content.length);

        this.setState({
            creatingShooting: false,
            visible: false
        });

        this.refreshShootingsList();
    }

    handleCancel = () => {
        this.setState({
            visible: false,
            creatingShooting: false,
            newShootingName: ''
        });
    }

    onShootingNameChanged = (event: any) => {
        this.setState({
            newShootingName: event.target.value
        });
    }

    async refreshShootingsList() {

        const shootings: Array<AzureStorageBlob.BlobItem> = [];

        for await (const blob of this.containerClient.listBlobsFlat()) {
            shootings.push(blob);
        }

        this.setState({
            shootings
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className='grid'>
                    {this.state.shootings.map((value, index) => {
                        return (
                            <Card
                                className='shooting-card'
                                key={index}
                                hoverable
                                style={{ width: 300 }}
                                cover={
                                    <img
                                        alt='example'
                                        src='https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png' />
                                }
                                actions={[
                                    <Icon type='setting' key='setting' />,
                                    <Icon type='edit' key='edit' />,
                                    <Icon type='ellipsis' key='ellipsis' />,
                                ]}>
                                <Meta
                                    avatar={<Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />}
                                    title={value.name}
                                    description={value.properties.lastModified.toDateString()} />
                            </Card>
                        );
                    })}
                </div>
                <Tooltip
                    placement='topLeft'
                    title='Ajouter un shooting'>
                    <Button
                        className='main-button'
                        type='primary'
                        shape='circle'
                        icon='plus'
                        onClick={this.showModal} />
                </Tooltip>
                <Modal
                    title='Ajouter un shooting'
                    visible={this.state.visible}
                    cancelText='Annuler'
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}>
                    <Input
                        hidden={this.state.creatingShooting}
                        placeholder='Nom du shooting'
                        onChange={this.onShootingNameChanged} />
                    <Spin
                        tip='Création en cours...'
                        className='shooting-spin'
                        spinning={this.state.creatingShooting} />
                </Modal>
                {this.state.shootings.length === 0 ? <Empty className='empty-status' description='Aucun shooting' /> : null}
            </React.Fragment>
        );
    }
}

export default ShootingsList;