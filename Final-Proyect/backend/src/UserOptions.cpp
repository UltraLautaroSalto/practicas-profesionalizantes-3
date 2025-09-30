#include "../include/UserOptions.hpp"


void UserOptions::RedirectUser (string &UserActualRol, string &UserActualName){
    if(UserActualRol == "Client"){
        ClientOptions(UserActualName);
    } else if(UserActualRol == "Manager"){
        ManagerOptions(UserActualName);
    } else if(UserActualRol == "Admin"){
        AdminOptions(UserActualName);
    }
}

// Nota para mi Yo de Mañana: Falta Crear las Opciones de cada Usuario.
void UserOptions::ClientOptions(string &UserActualName){
    int OptionClient = 0;
    cout << "Hola '" << UserActualName << "', Bienvenido! Que Deseas Hacer Hoy?" << endl;
    cout << "===== OPCIONES DE USUARIO =====" << endl;
    cout << "1 - Buscar Tienda" << endl;
    cout << "2 - Salir" << endl;
    cin >> OptionClient;

    switch (OptionClient)
    {
    case 1:
        cout << "Esta Opcion aun No esta Disponible (Cliente)" << endl;
        break;
    case 2:
        cout << "Gracias por Usar la Aplicacion, Que tenga un Buen Dia/Tarde/Noche :) (Cliente)" << endl;
        break;
    default:
        break;
    }
}

void UserOptions::ManagerOptions (string &UserActualName){
    int OptionManager = 0;
    cout << "Hola '" << UserActualName << "', Bienvenido! Que Deseas Hacer Hoy?" << endl;
    cout << "===== OPCIONES DE MANAGER =====" << endl;
    cout << "1 - Administrar Tienda" << endl;
    cout << "2 - Añadir Producto" << endl;
    cout << "3 - Modificar Producto" << endl;
    cout << "4 - Eliminar Producto" << endl;
    cout << "5 - Activar/Desactivar Evento Especial" << endl;
    cout << "6 - Salir" << endl;
    cin >> OptionManager;

    switch (OptionManager)
    {
    case 1:
        cout << "Esta Opcion aun No esta Disponible (Manager1)" << endl;
        break;
    case 2:
        cout << "Esta Opcion aun No esta Disponible (Manager2)" << endl;
        break;
    case 3:
        cout << "Esta Opcion aun No esta Disponible (Manager3)" << endl;
        break;
    case 4:
        cout << "Esta Opcion aun No esta Disponible (Manager4)" << endl;
        break;
    case 5:
        cout << "Esta Opcion aun No esta Disponible (Manager5)" << endl;
        break;
    case 6:
        cout << "Gracias por Usar la Aplicacion, Que tenga un Buen Dia/Tarde/Noche :) (Manager)" << endl;
    default:
        break;
    }
}

void UserOptions::AdminOptions (string &UserActualName){
    int OptionAdmin = 0;
    cout << "Hola '" << UserActualName << "', Bienvenido! Que Deseas Hacer Hoy?" << endl;
    cout << "===== OPCIONES DE ADMIN =====" << endl;
    cout << "1 - Administrar Tienda Especifica" << endl;
    cout << "2 - Cambiar Nombre/Password/Rol de X Cuenta" << endl;
    cout << "3 - Salir" << endl;
    cin >> OptionAdmin;

    switch (OptionAdmin)
    {
    case 1:
        cout << "Esta Opcion aun No esta Disponible (Admin1)" << endl;
        break;
    case 2:
        cout << "Esta Opcion aun No esta Disponible (Admin2)" << endl;
        break;
    case 3:
        cout << "Gracias por Usar la Aplicacion, Que tenga un Buen Dia/Tarde/Noche :) (Admin)" << endl;
        break;
    default:
        break;
    }
}