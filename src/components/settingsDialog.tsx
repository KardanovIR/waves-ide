import * as React from "react"
import {RouteComponentProps} from 'react-router'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import {connect} from "react-redux"
import {IAppState, IEnvironmentState} from '../state'
import {settingsChange} from "../actions";

export class SettingsDialogComponent extends React.Component<RouteComponentProps & { env: IEnvironmentState, handleChange: (field, value) => void }> {

    handleClose = () => this.props.history.push('/');

    render() {
        const actions =  <Button
            children="ok"
            color="primary"
            onClick={this.handleClose}
        />

        return (
            <Dialog
                open={true}
                fullWidth={true}
                //onClose={this.handleClose}
            >
                <DialogTitle children="Settings"/>
                <DialogContent>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <div style={{flex: 2}}>
                            <TextField
                                label="env.SEED"
                                value={this.props.env.SEED}
                                // floatingLabelFixed={true}
                                rows={2}
                                fullWidth={true}
                                multiline
                                onChange={(e) => {
                                    this.props.handleChange('SEED', (e.nativeEvent.target as any).value)
                                }}
                            /><br/>
                            <TextField
                                label="env.API_BASE"
                                value={this.props.env.API_BASE}
                                //floatingLabelFixed={true}
                                fullWidth={true}
                                onChange={(e) => {
                                    this.props.handleChange('API_BASE', (e.nativeEvent.target as any).value)
                                }}
                            /><br/>
                            <TextField
                                label="env.CHAIN_ID"
                                value={this.props.env.CHAIN_ID}
                                //floatingLabelFixed={true}
                                onChange={(e) => {
                                    this.props.handleChange('CHAIN_ID', (e.nativeEvent.target as any).value)
                                }}
                            />
                        </div>
                        <i style={{paddingTop: '27px'}} className="material-icons">info</i>
                        <p style={{padding: '15px', flex: 1}}>
                            Here you can set environment variables like your <b>SEED</b> and <b>chainId </b>
                            that other crypto dependant functions will use as default.
                            Every parameter is available through <b>env</b> object.
                            <br/><br/>
                            You can also change this via console at the bottom.<br/><br/>
                            <i style={{fontSize: '12px'}}>env.SEED = 'my new hack proof seed'</i>
                        </p>
                    </div>
                </DialogContent>
                <DialogActions children={actions}/>
            </Dialog>
        )
    }
}


export const SettingsDialog = connect((state: IAppState) => ({env: state.env}),
    (dispatch) => ({
        handleChange: (field, value) => {
            dispatch(settingsChange(field, value))
        }
    }))(SettingsDialogComponent)

