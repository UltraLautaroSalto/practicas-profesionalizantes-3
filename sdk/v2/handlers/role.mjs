import {

    createRole,

    getRoles,

    getRole,

    updateRole,

    deleteRole,

    assignRole,

    removeRole,

    getUserRoles

} from "../services/roleService.mjs";


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

            roleId: params.get("roleId")

        });

        });

    });

}



// ==========================================
// Handler
// ==========================================

export async function roleHandler(request, response, db) {

    try {

        const input = await parseBody(request);

        let output = null;

        switch (input.action) {

            case "create":

                output = createRole(
                    db,
                    input.name
                );

                break;

            case "get":

                output = getRole(
                    db,
                    Number(input.id)
                );

                break;

            case "getAll":

                output = getRoles(db);

                break;

            case "update":

                output = updateRole(
                    db,
                    Number(input.id),
                    input.name
                );

                break;

            case "delete":

                output = deleteRole(
                    db,
                    Number(input.id)
                );

                break;

            case "assign":

                output = assignRole(

                    db,

                    Number(input.id),

                    Number(input.roleId)

                );

                break;



            case "remove":

                output = removeRole(

                    db,

                    Number(input.id),

                    Number(input.roleId)

                );

                break;



            case "getUserRoles":

                output = getUserRoles(

                    db,

                    Number(input.id)

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