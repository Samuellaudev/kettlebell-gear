import { UserInfo } from '../shared.types'

export interface OauthUrlResponse { 
  url: string;
}

export interface OauthCallbackRequest { 
  code: string;
}

export type OauthCallbackResponse = UserInfo