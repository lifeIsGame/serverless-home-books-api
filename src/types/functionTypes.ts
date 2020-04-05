import { AWSError } from 'aws-sdk';

interface IResult {
  statusCode: number;
  headers: {
    'Content-Type': string;
  };
  body: string;
}

export interface ICallback {
  (error: AWSError | null, result: IResult): void;
}

export interface IDynamoDBParams {
  TableName: string;
  Item?: {};
  Key?: {};
}
