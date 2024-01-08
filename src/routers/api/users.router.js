/* -------------------------------------------- */
/*             //* users.router.js              */
/* -------------------------------------------- */
import express from 'express';
import usersManager from '../../data/memory/users.js';
import { cliError, cliMsg, cliSuccess } from '../../lib/functions/cliLogs.js';

const router = express.Router();

//? getAll
router.get('/', (req, res) => {
  usersManager
    .getAll()
    .then((users) => {
      if (users.length > 0) {
        cliSuccess(`${users.length} users found`);
        res.json({
          statusCode: 200,
          response: users
        });
        cliMsg('Users sent to requester');
      } else {
        cliError('No users found');
        res.json({
          statusCode: 404,
          response: 'No users found',
        });
        cliMsg('Response sent to requester');
      }
    })
    .catch((err) => {
      cliError(err.message);
      res.json({
        statusCode: 500,
        response: err.message,
      });
      cliMsg('Response sent to requester');
    });
});

//? add
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
        response: err.message,
      });
      cliMsg('Response sent to requester');
    });
});

//? update
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
        response: err.message
      });
      cliMsg('Response sent to requester');
    });
});

//? get by ID
router.get('/:uid', (req, res) => {
  const userId = req.params.uid;
  usersManager
    .get(userId)
    .then((user) => {
      cliSuccess(`User with ID ${userId} found`);
      res.json({
        statusCode: 200,
        response: user
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

//? delete by ID
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
