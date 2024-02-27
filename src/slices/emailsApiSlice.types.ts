export interface VerifyEmailRequest {
  verificationString: string;
}

export interface VerifyEmailResponse { 
  isVerified: boolean;
}