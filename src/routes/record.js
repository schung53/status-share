const express = require('express');
const auth = require('./../util/auth');

// router is an instance of the Express router
// We use it to define our routes
// The router will be added as a middleware
const router = express.Router();

const {
  getUsers,
  getUser,
  postOneUser,
  updateUserDetails,
  updateUserStatus,
  updateUserMemo,
  updateUserPresence,
  updateUserCheckIn,
  deleteUser
} = require('../handlers/users');

const {
  getTeams,
  postOneTeam,
  deleteTeam,
  updateTeam
} = require('../handlers/teams');

const {
  getAppName,
  setAppName,
  login,
  refreshLogin,
  register
} = require('../handlers/app');

const {
  postOneMessage,
  deleteMessage,
  updateMessageReadStatus,
  updateMessage,
  getMessages
} = require('../handlers/mailbox');

// User routes
router.get('/users', auth, getUsers);
router.get('/user/:userId', auth, getUser);
router.post('/user', auth, postOneUser);
router.post('/user/:userId', auth, updateUserDetails);
router.post('/user/memo/:userId', auth, updateUserMemo);
router.post('/user/status/:userId', auth, updateUserStatus);
router.post('/user/presence/:userId', auth, updateUserPresence);
router.post('/user/checkin/:userId', auth, updateUserCheckIn);
router.delete('/user/:userId', auth, deleteUser);

// Team routes
router.get('/teams', getTeams);
router.post('/team', auth, postOneTeam);
router.delete('/team/:teamId', auth, deleteTeam);
router.post('/team/:teamId', auth, updateTeam);

// App routes
router.get('/appname', getAppName);
router.post('/appname', auth, setAppName);
router.post('/login', login);
router.post('/refreshlogin', auth, refreshLogin);
router.post('/register', auth, register);

// Mailbox routes
router.get('/mailbox/:userId', auth, getMessages);
router.post('/mailbox/:userId', auth, postOneMessage);
router.delete('/mailbox/:userId/:messageId', auth, deleteMessage);
router.post('/mailbox/read/:userId/:messageId', auth, updateMessageReadStatus);
router.post('/mailbox/update/:userId/:messageId', auth, updateMessage);

module.exports = router;
