import { apiSlice } from './apiSlice';
import { GOOGLE_URL } from '../utils/constants';
import {
  OauthUrlResponse,
  OauthCallbackRequest,
  OauthCallbackResponse
} from './googleApiSlice.types';

export const googleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGoogleOauthUrl: builder.query<OauthUrlResponse, void>({
      query: () => ({
        url: `${ GOOGLE_URL }/auth/url`,
      })
    }),
    googleOauthCallback: builder.mutation<OauthCallbackResponse, OauthCallbackRequest>({
      query: (code) => ({
        url: `${ GOOGLE_URL }/auth/callback`,
        method: 'POST',
        body: code
      })
    }),
    
  })
})

export const {
  useGetGoogleOauthUrlQuery,
  useGoogleOauthCallbackMutation
} = googleApiSlice;