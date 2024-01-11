/* -------------------------------------------- */
/*                 //* cliLogs.js               */
/* -------------------------------------------- */
import clc from 'cli-color';
import * as emoji from 'node-emoji';

/* -------------- //# common function --------- */
function logWithDelay(logFunction, message, delay) {
  return setTimeout(() => {
    logFunction(message);
  }, delay);
}

/* -------------- //# cliError ---------------- */
export function cliError(message, delay = 1000) {
  return logWithDelay(
    (msg) => {
      console.log(
        clc.white.bold.bgRed(
          `${emoji.get('boom')} ${msg} ${emoji.get('boom')}`,
        ),
      );
    },
    message,
    delay,
  );
}

/* ------------- //# cliNotice ---------------- */
export function cliNotice(message, delay = 1000) {
  return logWithDelay(
    (msg) => {
      console.log(clc.blue.italic(`${emoji.get('loudspeaker')} ${msg}`));
    },
    message,
    delay,
  );
}

/* ------------- //# cliSuccess --------------- */
export function cliSuccess(message, delay = 1000) {
  return logWithDelay(
    (msg) => {
      console.log(clc.green.bold(`${emoji.get('tada')} ${msg}`));
    },
    message,
    delay,
  );
}

/* -------------- //# cliWarn ----------------- */
export function cliWarn(message, delay = 1000) {
  return logWithDelay(
    (msg) => {
      console.log(
        clc.yellow.blink(
          `${emoji.get('warning')}  ${msg} ${emoji.get('warning')} `,
        ),
      );
    },
    message,
    delay,
  );
}

/* ----------------- //# cliMsg --------------- */
export function cliMsg(message, delay = 1000) {
  return logWithDelay(
    (msg) => {
      console.log(clc.magenta.bold(` ${msg}`));
    },
    message,
    delay,
  );
}
