import odmClient from '../utils/odmClient';
import { ICallback } from '../types/functionTypes';
import { GetItemInput, GetItemOutput } from 'aws-sdk/clients/dynamodb';

const headers = {
  'Content-Type': 'application/json',
};

const TableName = 'books';

export const handler = async (event: any, context: any, callback: ICallback) => {
  const uuid = event.pathParameters.id;

  const params: GetItemInput = {
    TableName,
    Key: {
      uuid,
    },
  };

  try {
    const promise: GetItemOutput = await odmClient.get(params).promise();
    const response = {
      statusCode: 200,
      headers,
      body: JSON.stringify(promise),
    };
    callback(null, response);
  } catch (error) {
    const response = {
      statusCode: error.statusCode || 501,
      headers,
      body: JSON.stringify(error),
    };
    callback(null, response);
  }
};
