# Boooks API

## Description

In this test, you will have to create an API that will provide the possibility to manage books in the libary.

API shoul provide five endpoints:

- POST /books/add - add a book to the libary
- PUT /books/{bookUuid}/update - update book details
- DELETE /books/{bookUuid}/delete - delete a book from the libary
- GET /books/{bookUuid} - get book details
- GET /books/ - get all books

## Book model

```
uuid: string
name: string
authorName: string
releaseDate: number
updatedAt: number
```

## Requrements

We have just a few mandatory requrements for this API:

1. Use ​Serverless​ framework with AWS cloud.
2. As the language please use Node.js 10+
3. As the DB use AWS DynamoDB service

You are free to implement it in any way you want - use a framework or not, build the best structure you can, etc.
After the task is finished please upload it to a ​Github/Gitlab/Bitbucket ​public repository. And send the link to ​alekh@impressit.io​

## How to install and run

To use your own provider, edit the `serverless.yml` as needed.
The endpoint for the tests to run against will also need to be set to be more specific to your provider.

### Getting up and running

First install `serverless` and get that up and running. documentation [here](https://serverless.com/framework/docs/providers/aws/guide/quick-start/).

You can use the standard `sls` commands or utilise the npm scripts in the project.

Then:

```
npm install
serverless dynamodb install
```

### Run service offline

```
serverless offline start
```

### Testing

This project uses Jest (Typescript) to run its tests.

To test, first run application on local environment:

```
serverless offline start
```

Then run

```
npm run test
```
