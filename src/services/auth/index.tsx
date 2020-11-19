import { Auth, API } from "aws-amplify";

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

export const getUserList = async () => {
    try {
        const apiName = 'AdminQueries';
        const path = '/listUsers';
        const myInit = {
            headers: {
                'Content-Type' : 'application/json',
                Authorization: `${(await Auth.currentSession()).getAccessToken().getJwtToken()}`
            }
        }
        return await API.get(apiName, path, myInit);
    } catch (e) {
        return e
    }
}

export const updateCurrentUserAttributes = async (userAttributes: any) => {
    try {
        const thing = await getCurrentAuthUser();
        return await Auth.updateUserAttributes(thing, userAttributes);
    } catch (e) {
        return e
    }
}

export const getCurrentUserAttributes = async () => {
    try {
        const thing = await getCurrentAuthUser();
        return await Auth.userAttributes(thing);
    } catch (e) {
        return e
    }
}


