/* -------------------------------------------- */
/*                 //* cliLogs.js               */
/* -------------------------------------------- */
import clc from 'cli-color';
import * as emoji from 'node-emoji';

/* -------------- //# cliError.js ------------- */
export function cliError (message){
  console.log(clc.white.bgRed(`${emoji.get('boom')} ${message}`))
}

/* ------------- //# cliNotices.js ------------ */
export function cliNotice (message) {
  console.log(clc.blue.italic(`${emoji.get('loudspeaker')} ${message}`))
}

/* ------------- //# cliSuccess.js ------------ */
export function cliSuccess (message) {
  console.log(clc.green.bold(`${emoji.get('tada')} ${message}`))
}

/* -------------- //# cliWarn.js -------------- */
export function cliWarn (message) {
  console.log(clc.yellow.blink(`${emoji.get('warning')}  ${message}`))
}
