import { AWSError } from 'aws-sdk';

interface IResult {
  statusCode: number;
  headers: {
    'Content-Type': string;
  };
  body: string;
}

export interface IEvent {
  pathParameters: {
    bookUuid: string;
  };
  body: string;
}

export interface ICallback {
  (error: AWSError | null, data: IResult): void;
}

export interface IDynamoDBParams {
  TableName: string;
  Item?: {};
  Key?: {};
}

export interface IBook {
  uuid: string;
  name: string;
  authorName: string;
  releaseDate: number;
  updatedAt: number;
}
