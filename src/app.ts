import client, { IResponsePromise } from './client';
import calculation from './calculation';

const GET_URL = 'https://interview.adpeai.com/api/v1/get-task';
const POST_URL = 'https://interview.adpeai.com/api/v1/submit-task';

interface IParsedData {
  id: string;
  operation: string;
  left: number;
  right: number;
}

const app = async () => {
  try {
    const { status, data } = (await client(GET_URL, 'GET')) as IResponsePromise;
    if (status !== 200) {
      return {
        status: status,
        message: 'No response, check please connection.',
      };
    }
    const { id, operation, left, right } = JSON.parse(data) as IParsedData;

    if (!id) {
      return {
        status: 404,
        message: 'ID cannot be found',
      };
    }

    const result = calculation[operation](left, right);

    if (!result) {
      return {
        status: 404,
        message: 'Operation cannot be found',
      };
    }

    const sendPackage = JSON.stringify({ id, result });
    const response = (await client(POST_URL, 'POST', sendPackage)) as IResponsePromise;
    return {
      status: response.status,
      message: response.data,
    };
  } catch (error) {
    throw error;
  }
};

app().then(console.log);

export default app;
