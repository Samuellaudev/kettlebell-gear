import { apiSlice } from './apiSlice';
import { EMAILS_URL } from '../utils/constants';
import { VerifyEmailRequest, VerifyEmailResponse } from './emailsApiSlice.types';

export const emailsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    verifyEmail: builder.mutation<VerifyEmailResponse, VerifyEmailRequest>({
      query: (verificationString) => ({
        url: `${ EMAILS_URL }/verify-email`,
        method: 'PUT',
        body: verificationString
      })
    })
  })
})

export const {
  useVerifyEmailMutation
} = emailsApiSlice;