import { connect } from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:3333";

export const socket = connect(ENDPOINT);