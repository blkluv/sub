export const awsauth = {
  domain: process.env.NEXT_PUBLIC_AWS_AUTH_URL,
  scope: ["email", "profile", "openid", "aws.cognito.signin.user.admin"],
  redirectSignIn: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}${process.env.NEXT_PUBLIC_LOGIN_REDIRECT}`,
  redirectSignOut: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}${process.env.NEXT_PUBLIC_SIGNOUT_REDIRECT}`,
  responseType: "code",
};
