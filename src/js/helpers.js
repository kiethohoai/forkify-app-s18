import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(`${url}`), timeout(TIMEOUT_SEC)]);
    if (!res.ok) throw new Error(`${res.statusText} ${res.status}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(`Error at getJSON (helpers.js): `, err);
    throw err;
  }
};
