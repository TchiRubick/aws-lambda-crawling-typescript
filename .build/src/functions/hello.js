"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = async (_event) => {
    try {
        const response = {
            statusCode: 200,
            body: process.env.IS_OFFLINE || 'Not Found',
        };
        return response;
    }
    catch (err) {
        return {
            statusCode: 500,
            body: 'An error occured',
        };
    }
};
exports.handler = handler;
