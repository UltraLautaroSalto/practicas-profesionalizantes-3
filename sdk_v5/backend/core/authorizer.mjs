import { getSession } from './sessionManager.mjs';

const permissions = {

    '/print': true,
    '/log': true,
    '/help': true,

    '/sayHello': false,
    '/sayBye': false
};

import { getSession } from './sessionManager.mjs';

export function authorize(request)
{
    const token =
        request.headers['authorization'];

    const version =
        request.headers['x-api-version'];

    const user =
        request.headers['x-user-id'];

    const key =
        request.headers['x-api-key'];

    if (!token || !version)
    {
        return false;
    }

    const session =
        getSession(token.replace('Bearer ', ''));

    if (!session)
    {
        return false;
    }

    if (!user || !key)
    {
        return false;
    }

    return true;
}