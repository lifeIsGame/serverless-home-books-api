import odmClient from '../utils/odmClient';
import { ICallback } from '../types/functionTypes';
import { DeleteItemInput, DeleteItemOutput } from 'aws-sdk/clients/dynamodb';

const headers = {
  'Content-Type': 'application/json',
};

const TableName = 'books';

export const handler = async (event: any, context: any, callback: ICallback) => {
  const uuid = event.pathParameters.id;

  const params: DeleteItemInput = {
    TableName,
    Key: {
      uuid,
    },
  };

  const response = {
    statusCode: 0,
    headers,
    body: '',
  };

  try {
    const promise: DeleteItemOutput = await odmClient.delete(params).promise();
    const CapacityUnits: number | undefined = promise?.ConsumedCapacity?.CapacityUnits;
    
    if (CapacityUnits) {
      response.statusCode = 404;
      response.body = '';
      callback(null, response);
      return;
    }

    response.statusCode = 200;
    response.body = JSON.stringify(promise);

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
