import { connect } from 'mongoose';
import { cliError, cliNotice } from '../lib/functions/cliLogs.js';

export const connectDB = async () => {
  try {
    await connect(process.env.MONGO_URI);
    cliNotice('MongoDB connected');
  } catch (err) {
    cliError(err.message);
    process.exit(1);
  }
};
