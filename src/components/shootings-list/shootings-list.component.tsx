import React from 'react';
import { Tooltip, Button, Modal, Empty, Input, Spin, Icon, notification } from 'antd';
import ShootingCard from '../shooting-card/shooting-card.component';
import ShootingsService from '../../services/shootings.service';
import Shooting from '../../models/shooting.model';
import './shootings-list.component.css';
import 'antd/dist/antd.css';

class ShootingsList extends React.Component {

    state = {
        visible: false,
        creatingShooting: false,
        newShootingName: '',
        shootings: Array<Shooting>()
    };

    private shootingsService: ShootingsService;

    constructor(props: Readonly<{}>) {
        super(props);

        this.shootingsService = new ShootingsService();
        this.refreshShootingsList();
    }

    showModal = () => {
        this.setState({
            visible: true
        });
    }

    handleOk = async () => {
        this.setState({ creatingShooting: true });

        await this.shootingsService.createShootingAsync(this.state.newShootingName);

        this.setState({
            creatingShooting: false,
            visible: false
        });

        this.openNotification();
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

    openNotification = () => {
        notification.open({
            message: 'Shooting créé',
            description:
                `Le dossier du shooting ${this.state.newShootingName} a été correctement créé !`,
            icon: <Icon type='smile' style={{ color: '#108ee9' }} />
        });
    }

    async refreshShootingsList() {
        const shootings = await this.shootingsService.getShootingsAsync();

        this.setState({ shootings });
    }

    render() {
        return (
            <React.Fragment>
                <div className='grid'>
                    {this.state.shootings.map((value, index) => {
                        return (
                            <ShootingCard key={index} shooting={value} />
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
