import axios from "axios";

const instance = axios.create({
  // THE API (cloud function) URL
  baseURL: "http://localhost:5001/clone-e2087/us-central1/api",
});

export default instance;

// can't deploy the backend as have to subscribe the Blaze Plan of firebase
