import axios from 'axios';
import { API } from '../helpers/constants';
import { v1 } from 'uuid';
import { IBook } from '../../src/types/functionTypes';

const url = '/dev/books/add';
const timestamp: number = new Date().getTime();

describe('Create book', () => {
  test('should create book', async () => {
    const body: IBook = {
      uuid: v1(),
      name: 'Test Book',
      authorName: 'Test Author',
      releaseDate: timestamp,
      updatedAt: timestamp,
    };
    try {
      const response = await axios.post(API + url, body);
      expect(response.status).toBe(201);
      expect(response.data).toHaveProperty('Item');
      expect(response.data).toHaveProperty('Item.name', body.name);
      expect(response.data).toHaveProperty('Item.authorName', body.authorName);
    } catch (error) {
      expect(error).not.toBeInstanceOf(Error);
    }
  });

  test('should return error', async () => {
    const body = {
      uuid: v1(),
      name: 'Test Book',
      releaseDate: timestamp,
      updatedAt: timestamp,
    };

    try {
      await axios.post(API + url, body);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.response.status).toBe(400);
      expect(error.response.data).toHaveProperty('errors');
    }
  });
});
