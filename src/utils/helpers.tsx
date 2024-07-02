import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import Message from '../components/Message';

export const originalImageName = (imageName = '') => {
  if (imageName.includes('&img=')) {
    return imageName.split('&img=')[1];
  }

  return imageName;
};

/**
 * Type safe error handling:
 * https://redux-toolkit.js.org/rtk-query/usage-with-typescript#type-safe-error-handling
 */

export const errorMessage = (error: FetchBaseQueryError | SerializedError) => {
  if ('status' in error) {
    const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)

    return <Message variant='error'>{errMsg}</Message>
  } else {
    return <Message variant='error'>{error.message}</Message>
  }
}

// Type predicate to narrow an unknown error to `FetchBaseQueryError`
export function isFetchBaseQueryError(
  error: unknown,
): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error
}

// Type predicate to narrow an unknown error to an object with a string 'message' property
export function isErrorWithMessage(
  error: unknown,
): error is { message: string } {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof (error as any).message === 'string'
  )
}