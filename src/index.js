/**
 * @file: index.js
 * @author: Jorge Quitério
 * @copyright (c) 2022 Jorge Quitério
 * @license: MIT
 */

import { newClient, addTopic, subscribe, publish, getMessages } from "./client";

module.exports.newClient = newClient;
module.exports.addTopic = addTopic;
module.exports.subscribe = subscribe;
module.exports.publish = publish;
module.exports.getMessages = getMessages;
