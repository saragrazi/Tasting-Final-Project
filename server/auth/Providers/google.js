const { OAuth2Client } = require("google-auth-library");
const config = require("config");

const clientId = config.get("GOOGLE_CLIENT_ID");
const client = new OAuth2Client(clientId);

const verifyGoogleToken = async (credential) => {
    const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: clientId,
    });
    return ticket.getPayload();
};

exports.verifyGoogleToken = verifyGoogleToken;
