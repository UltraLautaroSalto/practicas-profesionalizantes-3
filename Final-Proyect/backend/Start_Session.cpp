#include <iostream>
#include <string>
#include "./src/UserOptions.cpp"
using namespace std;

const int N = 3;  // cantidad de usuarios cargados
int MaximumAttempts = 3;
bool Acces = false;

// Arrays de usuarios y contraseñas
string Auth_Name[N] = {"Jeremy", "Carlos", "Thomas"};
string Auth_Password[N] = {"Client1234", "Manager4321", "Admin1111"}; 
string Auth_Role[N] = {"Cliente", "Manger", "Admin"}; // Roles Asignados

// Función que autentica usuario y contraseña
void Authentication(const string& UserName, const string& UserPassword, string& UserRole) {
    for (int i = 0; i < N; i++) {
        if (Auth_Name[i] == UserName && Auth_Password[i] == UserPassword) {
            UserRole = Auth_Role[i]; // Guardamos el Rol Correspondiente
            Acces = true;
            return; // Salimos de la Función porque ya Autentificó
        }
    }
    cout << "Nombre o Contraseña incorrecto, vuelva a intentarlo." << endl;
}

// Función que pide los datos e intenta loguear
void Start_Session() {
    string name, password, Rol;
    int trys = 0;

    UserOptions UserOpt; // Crea una instancia de las Opciones

    cout << "===== SISTEMA DE INICIO DE SESION =====" << endl;

    while (trys < MaximumAttempts && !Acces) {
        cout << "\nIntento " << (trys + 1) << " de " << MaximumAttempts << endl;

        cout << "User: ";
        cin >> name;
        cout << "Password: ";
        cin >> password;

        Authentication(name, password, Rol);

        if (!Acces) {
            trys++;
        } else if (Acces){
            UserOpt.RedirectUser(Rol, name); // Anexo(?) Rol para que sea usado para Seleccionar la Serie de Opciones Correspondientes.
        } else {
            cout << "Error Desconocido, Porfavor Vuelva a Intentarlo";
        }
    }

    if (!Acces) {
        cout << "\n Acceso bloqueado. Superaste el maximo de intentos." << endl;
    }
}

// Está funcion es para Registrar cuentas nuevas, el Admin deberia ser capaz de cambiar el Rol de las Demas cuentas (Eso Incluye las Creadas Hace Poco).
void Registry_Account () {

}

// Funcion Para Elejir que hacer, si iniciar secion o Registrarse
void OptionSelection(){
    int Option;
    cout << "Que Desea Hacer Hoy?" << endl;
    cout << "1 - Iniciar Secion" << endl;
    cout << "2 - Registrarse" << endl;
    cin >> Option;

    switch (Option)
    {
    case 1:
        Start_Session();
        break;
    case 2:
        Registry_Account();
        break;
    default:
        cout << "ERROR: Valor Ingresado no Valido" << endl;
        break;
    }
}

// Programa principal
int main() {
    OptionSelection();
    return 0;
}