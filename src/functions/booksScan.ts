import odmClient from '../utils/odmClient';
import { ICallback, IEvent } from '../types/functionTypes';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const headers = {
  'Content-Type': 'application/json',
};

const TableName = 'books';

export const handler = async (event: IEvent, context: any, callback: ICallback) => {
  const params: DocumentClient.ScanInput = {
    TableName,
  };

  try {
    const promise: DocumentClient.ScanOutput = await odmClient.scan(params).promise();

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
