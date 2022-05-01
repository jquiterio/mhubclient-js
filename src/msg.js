/**
 * @file: msg.js
 * @author: Jorge Quitério
 * @copyright (c) 2022 Jorge Quitério
 * @license: MIT
 */

const NewMessage = (subscriberId, topic, type, data) => {
  return {
    subscriberId,
    topic,
    type,
    data,
  };
};
