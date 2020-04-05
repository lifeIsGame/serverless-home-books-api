import AWS from 'aws-sdk';

const IS_OFFLINE = process.env.IS_OFFLINE;
let options = {};

// if (IS_OFFLINE) {
options = {
  region: 'localhost',
  endpoint: 'http://localhost:8000',
};
// }

const odmClient = new AWS.DynamoDB.DocumentClient(options);

export default odmClient;
