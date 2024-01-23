/* -------------------------------------------- */
/*              //* socket.utils.js             */
/* -------------------------------------------- */
import { socketServer } from '../../server.js';
import products from '../data/memory/products.js';
import { cliError, cliMsg } from '../lib/functions/cliLogs.js'

export default async (socket) => {
  cliMsg(`Client ${socket.id} connected`)
  socket.emit('products', await products.getAll())
  socket.on('addProduct', async (data) => {
    products.add(data);
    socketServer.emit('products', await products.getAll())
    .catch((err) => cliError(err))
  })
};