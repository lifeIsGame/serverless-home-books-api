import odmClient from '../utils/odmClient';
import { ICallback, IEvent, IBook } from '../types/functionTypes';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const headers = {
  'Content-Type': 'application/json',
};

const TableName = 'books';
const UpdateExpression = 'set #bookName=:name, updatedAt=:updatedAt';
const ReturnValues = 'UPDATED_NEW';

export const handler = async (event: IEvent, context: any, callback: ICallback) => {
  const uuid = event.pathParameters.bookUuid;
  const timestamp = new Date().getTime();
  const data: IBook = JSON.parse(event.body);

  const params: DocumentClient.UpdateItemInput = {
    TableName,
    Key: {
      uuid,
    },
    ExpressionAttributeNames: {
      '#bookName': 'name',
    },
    ExpressionAttributeValues: {
      ':name': data.name,
      ':updatedAt': timestamp,
    },
    UpdateExpression,
    ReturnValues,
  };

  try {
    const promise: DocumentClient.UpdateItemOutput = await odmClient.update(params).promise();
    const response = {
      statusCode: 201,
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
