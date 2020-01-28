import React from 'react';
import { Tooltip, Button, Modal, Empty, Input, Spin, notification } from 'antd';
import ShootingCard from '../shooting-card/shooting-card.component';
import ShootingsService from '../../services/shootings.service';
import Shooting from '../../models/shooting.model';
import './shootings-list.component.css';
import 'antd/dist/antd.css';
import { withRouter } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

class ShootingsList extends React.Component<RouteComponentProps> {

    state = {
        visible: false,
        creatingShooting: false,
        newShootingName: '',
        shootings: Array<Shooting>(),
        isLoading: true
    };

    private shootingsService: ShootingsService;

    constructor(props: any) {
        super(props);

        this.shootingsService = new ShootingsService();

        props.dispatch({ type: 'SHOOTING_SELECTED', value: null });
    }

    componentDidMount() {
        this.refreshShootingsList();
    }

    showModal = () => {
        this.setState({ visible: true });
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
        this.setState({ newShootingName: event.target.value });
    }

    openNotification = () => {
        notification.success({
            message: 'Shooting créé',
            duration: null,
            description:
                `Le dossier du shooting ${this.state.newShootingName} a été correctement créé !`
        });
    }

    async refreshShootingsList() {
        this.setState({ isLoading: true });

        const shootings = await this.shootingsService.getShootingsAsync();

        this.setState({ isLoading: false, shootings });
    }

    onDeleteShooting = async (shooting: Shooting) => {
        await this.shootingsService.DeleteShootingAsync(shooting.name);
        this.refreshShootingsList();
    }

    onShootingSelected = async (shooting: Shooting) => {
        this.props.history.push(`/${shooting.name}`);
    }

    render() {
        return (
            <div className='shootings-root'>
                <div className='grid'>
                    {this.state.shootings.map((value, index) =>
                        <ShootingCard
                            key={index}
                            shooting={value}
                            onShootingSelected={this.onShootingSelected}
                            onDeleteShooting={this.onDeleteShooting} />)}
                </div>
                {!this.state.isLoading && (
                    <React.Fragment>
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
                    </React.Fragment>
                )}
                <Spin
                    size='large'
                    spinning={this.state.isLoading}
                    className='shooting-spin' />
                {!this.state.isLoading && this.state.shootings.length === 0 ? <Empty className='empty-status' description='Aucun shooting' /> : null}
            </div>
        );
    }
}

export default connect()(withRouter(ShootingsList));
