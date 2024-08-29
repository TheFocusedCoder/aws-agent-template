import {Handler } from 'aws-lambda'

export const createHandler = (handlerFn: (event: any) => Promise<any>): Handler => {
    return async (event) => {
      const response = await handlerFn(event);
      return response;
    };
};
