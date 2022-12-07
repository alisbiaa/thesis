import dotenv from "dotenv";
dotenv.config();
const {
    CLIENT_ID,
    TENANT_ID
} = process.env;

const config  = {
    "credentials": {
        "tenantID": TENANT_ID,
        "clientID": CLIENT_ID
    },
    "metadata": {
        "authority": "login.microsoftonline.com",
        "discovery": ".well-known/openid-configuration",
        "version": "v2.0"
    },
    "settings": {
        "validateIssuer": true,
        "passReqToCallback": false,
        "loggingLevel": "info"
    },
    "protectedRoutes": {
        "hello": {
            "endpoint": "/",
            "scopes": ["access_as_user"]
        }
    }
}

// sso
export const options : any = {
    identityMetadata: `https://${config.metadata.authority}/${config.credentials.tenantID}/${config.metadata.version}/${config.metadata.discovery}`,
    issuer: `https://${config.metadata.authority}/${config.credentials.tenantID}/${config.metadata.version}`,
    clientID: config.credentials.clientID,
    audience: config.credentials.clientID, // audience is this application
    validateIssuer: config.settings.validateIssuer,
    passReqToCallback: config.settings.passReqToCallback,
    // loggingLevel: config.settings.loggingLevel,
    scope: config.protectedRoutes.hello.scopes
};

