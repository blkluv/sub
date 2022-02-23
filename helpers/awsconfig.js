export const awsconfig = {
    Auth: {
        region: 'us-east-1',
        userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
        userPoolWebClientId: process.env.NEXT_PUBLIC_USER_POOL_WEB_CLIENT_ID,
        cookieStorage: {
            domain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN || "localhost",
            path: '/',
            expires: 20,
            secure: true
        },
        oauth: {
            domain: process.env.NEXT_PUBLIC_AWS_AUTH_URL,
            scope: ['email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
            redirectSignIn: process.env.NEXT_PUBLIC_LOGIN_REDIRECT,
            redirectSignOut: process.env.NEXT_PUBLIC_SIGNOUT_REDIRECT,
            responseType: 'code'
        }
    },
    API: {
        endpoints: [
            {
                name: 'Pinata API',
                endpoint: process.env.NEXT_PUBLIC_PINATA_API_URL
            }
        ]
    }
};
