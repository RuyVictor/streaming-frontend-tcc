import { connect } from "socket.io-client";
const ENDPOINT = process.env.REACT_APP_SOCKET_HOST!;

export const socket = connect(ENDPOINT);