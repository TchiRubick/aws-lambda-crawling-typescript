"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const handler = async (event) => {
    try {
        const parsedBody = JSON.parse(event.body || '');
        return {
            statusCode: 200,
            body: `Goodbye ${parsedBody?.name}`,
        };
    }
    catch (err) {
        return {
            statusCode: 500,
            body: 'An error occured',
        };
    }
};
exports.handler = handler;
