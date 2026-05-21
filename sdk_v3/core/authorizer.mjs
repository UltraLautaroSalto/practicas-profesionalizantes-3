import { getSession } from './sessionManager.mjs';

const permissions = {

    '/print': true,
    '/log': true,
    '/help': true,

    '/sayHello': false,
    '/sayBye': false
};

export function authorize(request) {

    const token = request.headers['authorization'];

    if (!token) {
        return false;
    }

    const session = getSession(token);

    if (!session) {
        return false;
    }

    const allowed = permissions[request.url];

    return allowed === true;
}