import https = require('https');

type OptionsType = {
  [key: string]: (data?: string) => https.RequestOptions;
};

const getOptions: OptionsType = {
  GET: () => ({
    method: 'GET',
  }),
  POST: (data: string = '') => ({
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(data),
    },
  }),
};

export interface IResponsePromise {
  status?: number;
  data: string;
}

const client = (url: string, method: string, sendData?: string): Promise<Error | IResponsePromise> =>
  new Promise((resolve, reject) => {
    const options = getOptions[method](sendData);
    const req = https.request(url, options, (res) => {
      let resData = '';

      res.on('data', (chunk) => {
        resData += chunk;
      });

      res.on('end', function () {
        resolve({
          status: res.statusCode,
          data: resData,
        });
      });
    });

    req.on('error', (error: Error) => {
      reject(error);
    });

    if (sendData) {
      req.write(sendData);
    }

    req.end();
  });

export default client;
