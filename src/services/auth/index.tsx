import { Auth } from "aws-amplify";

export const userLogin = async (email: string, password: string) => {
    try {
        return Auth.signIn(email, password)
    } catch (e) {
        return e;
    }
}

export const authChallenge = async (password: any, cognitoUser: any) => {
    try {
        return Auth.completeNewPassword(cognitoUser, password, {});
    } catch (e) {
        return e;
    }
}

export const getCurrentAuthUser = async () => {
    try {
        return await Auth.currentAuthenticatedUser({
            bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
        }).then(user => user)
            .catch(err => err);
    } catch (e) {
        console.log('Error checking for authenticated user: ', e)
    }
}

export const userLogout = async () => {
    return await Auth.signOut().catch(e => e);
}
