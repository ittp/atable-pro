import axios from "axios";
let cj = require("csvtojson");

// let t = axios.get("http://46.32.88.99/ticket.csv").then((r) => r);

let options = {};

let data = [
  { id: 1, key: "444000", ticket: {}, status: 1, customer: {}, excutor: {} },
  { id: 2, key: "444001", ticket: {}, status: 1, customer: {}, excutor: {} }
];

module.exports = { data };

// let d = new Date();
// let time = d.getTime(),
//   date = d.getDate();

// let otobo = axios.get("https://iogv-support.iac.spb.ru/otobo/index.pl", {
//   headers: {}
// });

// try {
//   console.log("try");
// } catch (error) {
//   console.log();
//   console.log(error);
// }
