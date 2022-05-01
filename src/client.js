/**
 * @file: client.js
 * @author: Jorge Quitério
 * @copyright (c) 2022 Jorge Quitério
 * @license: MIT
 */

import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// client
/*
{
  huaddr: "http://localhost:8080",
  clientId: uuidv4(),
  conn: httpClient
}
*/

const newClient = (hubaddr, secure = false) => {
  const httpClient = axios.create({
    baseURL: hubaddr,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 5000,
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
      name: "hubclient",
    }),
  });

  return {
    hub_addr: hubaddr,
    ready: true,
    client_id: uuidv4(),
    conn: httpClient,
    topics: [],
  };
};

// Add Topic to an existing client
// @param {string} topic
// @param {object} client_id
const addTopic = (client, topic) => {
  client = { ...client };
  client.topics.push(topic);
  client = { ...client };
  return client;
};

// Subscribe Topcs of an Existing Client. Client must have topics
// @param {object} client
const subscribe = (client, topics) => {
  client = { ...client };
  conn = client.conn;
  conn.defaults.headers.common = {
    "X-Subscriber-ID": client.client_id,
    "Content-Type": "application/json",
  };
  client.topics.forEach((topic) => {
    conn.post("/subscribe", topic);
  });
};

const publish = (client, topic, msg) => {
  client = { ...client };
  conn = client.conn;
  conn.defaults.headers.common = {
    "X-Publisher-ID": client.client_id,
    "Content-Type": "application/json",
  };
  const pub_msg = {
    subscriber_id: client.client_id,
    id: uuidv4(),
    topic: topic,
    type: "publish",
    data: msg,
  };
  conn.post("/publish", pub_msg);
};

async function getMessages(client) {
  const response = await client.conn.get("/", {
    responseType: "stream",
  });
  const stream = response.data;
  stream.on("data", (data) => {
    data = JSON.stringify(data);
    console.log(data);
  });
}

export { newClient, addTopic, subscribe, getMessages, publish };
