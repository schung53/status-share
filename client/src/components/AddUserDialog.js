import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

// MUI components
import {
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField
} from '@mui/material'
import {
  Add as AddIcon,
  Close as CloseIcon
} from '@mui/icons-material'

// Redux stuff
import { connect } from 'react-redux'
import { addUserAsync } from '../redux/slices/usersSlice'

const styles = {
  closeButton: {
    textAlign: 'center',
    position: 'absolute',
    left: '90%',
    marginTop: 7
  },
  icon: {
    margin: 'auto 5px auto auto'
  },
  dialogContent: {
    textAlign: 'center',
    height: 250
  },
  memo: {
    marginTop: 30
  },
  otherText: {
    marginTop: 8
  }
}

export class AddUserDialog extends Component {
  state = {
    open: false,
    name: '',
    email: '',
    phone: '',
    team: '',
    teamId: '',
    priority: '1'
  }

  handleOpen = () => {
    this.setState({ open: true, team: this.props.teamName, teamId: this.props.teamId })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const newUserData = {
      name: this.state.name.trim(),
      email: this.state.email.trim(),
      phone: this.state.phone.trim(),
      team: this.state.team.trim(),
      teamId: this.state.teamId.trim(),
      priority: parseInt(this.state.priority.trim())
    }
    this.props.addUserAsync(newUserData)
    this.handleClose()
    this.setState({
      open: false,
      name: '',
      email: '',
      phone: '',
      team: '',
      teamId: '',
      priority: ''
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render () {
    const { teamName } = this.props
    return (
      <>
        <IconButton onClick={this.handleOpen} size='small'>
          <AddIcon />
        </IconButton>
        <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth='xs'>
          <IconButton onClick={this.handleClose} sx={styles.closeButton} size='small'>
            <CloseIcon />
          </IconButton>
          <DialogTitle>
            Add new user to {teamName}
          </DialogTitle>
          <form>
            <DialogContent sx={styles.dialogContent}>
              <TextField
                required
                id='name'
                name='name'
                type='name'
                label='Name'
                value={this.state.name}
                onChange={this.handleChange}
                sx={styles.otherText}
                fullWidth
              />
              <TextField
                id='email'
                name='email'
                type='email'
                label='Email'
                value={this.state.email}
                onChange={this.handleChange}
                sx={styles.otherText}
                fullWidth
              />
              <TextField
                id='phone'
                name='phone'
                type='phone'
                label='Phone'
                value={this.state.phone}
                onChange={this.handleChange}
                sx={styles.otherText}
                fullWidth
              />
              <TextField
                required
                id='priority'
                name='priority'
                type='priority'
                label='Priority'
                value={this.state.priority}
                onChange={this.handleChange}
                sx={styles.otherText}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleSubmit} variant='outlined' color='secondary' type='submit'>
                <AddIcon sx={styles.icon} />create user
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </>
    )
  };
}

const mapActionsToProps = {
  addUserAsync
}

AddUserDialog.propTypes = {
  addUserAsync: PropTypes.func.isRequired,
  teamId: PropTypes.string.isRequired,
  teamName: PropTypes.string.isRequired
}

export default connect(null, mapActionsToProps)(AddUserDialog)
