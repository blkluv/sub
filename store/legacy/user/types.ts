export interface User {
  avatar: string;
  "custom:firstName": string;
  "custom:lastName": string;
  email: string;
  email_verified: boolean;
  featureFlags: { [key: string]: boolean };
  sub: string;
  scheduledToBeCancelledAt: string | null;
}

export interface UserState {
  user: User | null;
}

export const LOAD_USER = "LOAD_USER";
