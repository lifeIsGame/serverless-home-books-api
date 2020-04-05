import { v1 } from 'uuid';
import { ICallback, IBook, IEvent } from '../types/functionTypes';
import odmClient from '../utils/odmClient';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const headers = {
  'Content-Type': 'application/json',
};

const validateMessage = 'missing required parameters';

export const handler = async (event: IEvent, context: any, callback: ICallback) => {
  const timestamp: number = new Date().getTime();
  const data: IBook = JSON.parse(event.body);

  const params: DocumentClient.PutItemInput = {
    TableName: 'books',
    Item: {
      uuid: v1(),
      name: data.name,
      authorName: data.authorName,
      releaseDate: timestamp,
      updatedAt: timestamp,
    } as IBook,
  };

  if (!data.name || !data.authorName) {
    const response = {
      statusCode: 400,
      headers,
      body: JSON.stringify({ result: null, errors: [validateMessage] }),
    };
    callback(null, response);
  }

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
