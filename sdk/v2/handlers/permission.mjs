import {

    createPermission,

    getPermissions,

    getPermission,

    updatePermission,

    deletePermission,

    assignPermission,

    removePermission,

    getRolePermissions

} from "../services/permissionService.mjs";



// ==========================================
// Leer body
// ==========================================

async function parseBody(request) {

    return new Promise(resolve => {

        let body = "";

        request.on("data", chunk => {
            body += chunk.toString();
        });

        request.on("end", () => {

            const params = new URLSearchParams(body);

            resolve({

                action: params.get("action"),

                id: params.get("id"),

                name: params.get("name"),

                roleId: params.get("roleId"),

                permissionId: params.get("permissionId")

            });

        });

    });

}



// ==========================================
// Handler
// ==========================================

export async function permissionHandler(request, response, db) {

    try {

        const input = await parseBody(request);

        let output = null;

        switch (input.action) {

            case "create":

                output = createPermission(
                    db,
                    input.name
                );

                break;

            case "get":

                output = getPermission(
                    db,
                    Number(input.id)
                );

                break;

            case "getAll":

                output = getPermissions(db);

                break;

            case "update":

                output = updatePermission(
                    db,
                    Number(input.id),
                    input.name
                );

                break;

            case "delete":

                output = deletePermission(
                    db,
                    Number(input.id)
                );

                break;

            case "assign":

                output = assignPermission(
                    db,
                    Number(input.roleId),
                    Number(input.permissionId)
                );

                break;

            case "remove":

                output = removePermission(
                    db,
                    Number(input.roleId),
                    Number(input.permissionId)
                );

                break;

            case "getRolePermissions":

                output = getRolePermissions(
                    db,
                    Number(input.roleId)
                );

                break;

            default:

                output = {

                    status: false,

                    description: "INVALID_ACTION"

                };

        }

        response.writeHead(200, {
            "Content-Type": "application/json"
        });

        response.end(
            JSON.stringify(output)
        );

    }
    catch (err) {

        response.writeHead(500, {
            "Content-Type": "application/json"
        });

        response.end(
            JSON.stringify({
                status: false,
                error: err.message
            })
        );

    }

}