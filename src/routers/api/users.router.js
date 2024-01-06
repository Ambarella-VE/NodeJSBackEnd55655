/* -------------------------------------------- */
/*             //* users.router.js              */
/* -------------------------------------------- */
import express from 'express';
import usersManager from '../../data/memory/users.js'; // Import your user manager module
import { cliError, cliMsg, cliSuccess } from '../../lib/functions/cliLogs.js';

const router = express.Router();

// getAll
router.get('/', (req, res) => {
  usersManager
    .getAll()
    .then((users) => {
      if (users.length > 0) {
        cliSuccess(`${users.length} Users found`);
        res.json({
          success: true,
          statusCode: 200,
          message: `${users.length} Users found`,
          data: users,
        });
        cliMsg('Users sent to requester');
      } else {
        cliError('No users found');
        res.json({
          success: false,
          statusCode: 404,
          message: 'No users found',
        });
        cliMsg('Response sent to requester');
      }
    })
    .catch((err) => {
      cliError(err.message);
      res.json({
        statusCode: 500,
        message: err.message,
      });
      cliMsg('Response sent to requester');
    });
});

// add
router.post('/', (req, res) => {
  const newUser = req.body; // Assuming the new user data is in the request body
  usersManager
    .add(newUser)
    .then((createdUser) => {
      cliSuccess(`User added with id ${createdUser.id}`);
      res.json({
        statusCode: 201,
        response: createdUser
      });
      cliMsg('Response sent to requester');
    })
    .catch((err) => {
      cliError(err.message);
      res.json({
        statusCode: 400,
        message: err.message,
      });
      cliMsg('Response sent to requester');
    });
});

router.put('/:uid', (req, res) => {
  const userId = req.params.uid;
  const newUserData = req.body;
  usersManager
    .update(userId, newUserData)
    .then(updatedUser => {
      cliSuccess(`User with id ${updatedUser.id} updated`);
      res.json({
        statusCode: 200,
        response: updatedUser
      });
      cliMsg('Response sent to requester');
    })
    .catch((err) => {
      cliError(err.message);
      res.json({
        statusCode: 400,
        message: err.message
      });
      cliMsg('Response sent to requester');
    });
});

// get by ID
router.get('/:uid', (req, res) => {
  const userId = req.params.uid;
  usersManager
    .get(userId)
    .then((user) => {
      cliSuccess(`User with ID ${userId} found`);
      res.json({
        statusCode: 200,
        message: `User with ID ${userId} found`,
        data: user,
      });
      cliMsg('Response sent to requester');
    })
    .catch((err) => {
      cliError(err.message);
      res.json({
        statusCode: 404,
        response: err.message,
      });
      cliMsg('Response sent to requester');
    });
});

// delete by ID
router.delete('/:uid', (req, res) => {
  const userId = req.params.uid;
  usersManager
    .delete(userId)
    .then(() => {
      cliSuccess(`User with ID ${userId} deleted`);
      res.json({
        statusCode: 204,
        response: `User with ID ${userId} deleted`,
      });
      cliMsg('Response sent to requester');
    })
    .catch((err) => {
      cliError(err.message);
      res.json({
        statusCode: 404,
        response: err.message,
      });
      cliMsg('Response sent to requester');
    });
});

export default router;
