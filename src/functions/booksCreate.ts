import { v1 as uuidv1 } from 'uuid';
import { ICallback } from '../types/functionTypes';
import odmClient from '../utils/odmClient';

const headers = {
  'Content-Type': 'application/json',
};

export const handler = async (event: any, context: any, callback: ICallback) => {
  const timestamp: number = new Date().getTime();
  const data = JSON.parse(event.body);

  const params = {
    TableName: 'books',
    Item: {
      uuid: uuidv1(),
      name: data.name,
      authorName: data.authorName,
      releaseDate: timestamp,
      updatedAt: timestamp,
    },
  };

  try {
    await odmClient.put(params).promise();
    const response = {
      statusCode: 201,
      headers,
      body: JSON.stringify(params),
    };

    callback(null, response);
  } catch (error) {
    callback(null, {
      statusCode: error.statusCode || 501,
      headers,
      body: JSON.stringify({
        message: error.message,
      }),
    });
  }
};
