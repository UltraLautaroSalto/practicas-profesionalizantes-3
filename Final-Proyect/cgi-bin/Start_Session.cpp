#include <iostream>
#include <string>
#include <cstdlib>
#include <fstream>
#include <filesystem>
#include <cstring> // Necesario para usar strlen()
#include "../include/UserOptions.hpp"

using namespace std;
namespace fs = std::filesystem;

// ======= CONFIGURACIÓN =======
const int N = 3;
const int MAX_ATTEMPTS = 3;

// ======= DATOS AUTORIZADOS =======
string Auth_Name[N]     = {"Jeremy", "Carlos", "Thomas"};
string Auth_Password[N] = {"Client1234", "Manager4321", "Admin1111"}; 
string Auth_Role[N]     = {"Cliente", "Manager", "Admin"};

// ======= VARIABLES GLOBALES =======
bool Acces = false;

// Sanitiza el nombre de usuario para crear archivos seguros
string sanitizeFilename(const string& s) {
    string out;
    for (char c : s) {
        if (isalnum(c)) out += c;
        else out += '_';
    }
    return out;
}

// Devuelve la ruta del directorio "attempts"
fs::path attemptsDirPath() {
    const char* scriptFilename = getenv("SCRIPT_FILENAME");
    if (scriptFilename && strlen(scriptFilename) > 0) {
        fs::path scriptPath(scriptFilename);
        fs::path dir = scriptPath.parent_path();  
        fs::path attempts = dir / "attempts";
        return attempts;
    }
    return fs::path("attempts");
}

// Lee el número de intentos fallidos
int readAttempts(const string& user) {
    try {
        fs::path dir = attemptsDirPath();
        if (!fs::exists(dir)) fs::create_directories(dir);
        fs::path file = dir / (sanitizeFilename(user) + ".txt");

        if (!fs::exists(file)) return 0;
        ifstream f(file);
        int val = 0; f >> val;
        return val;
    } catch (...) {
        return 0;
    }
}

// Guarda el número de intentos fallidos
void writeAttempts(const string& user, int attempts) {
    try {
        fs::path dir = attemptsDirPath();
        if (!fs::exists(dir)) fs::create_directories(dir);
        fs::path file = dir / (sanitizeFilename(user) + ".txt");
        ofstream f(file, ios::trunc);
        f << attempts;
    } catch (...) {}
}

// Elimina el registro de intentos (si el login fue exitoso)
void resetAttempts(const string& user) {
    try {
        fs::path dir = attemptsDirPath();
        fs::path file = dir / (sanitizeFilename(user) + ".txt");
        if (fs::exists(file)) fs::remove(file);
    } catch (...) {}
}

// ======= AUTENTICACIÓN =======
bool Authentication(const string& UserName, const string& UserPassword, string& UserRole) {
    for (int i = 0; i < N; i++) {
        if (Auth_Name[i] == UserName && Auth_Password[i] == UserPassword) {
            UserRole = Auth_Role[i];
            return true;
        }
    }
    return false;
}

// ======= INICIO DE SESIÓN CGI =======
void Start_Session() {
    cout << "Content-type: text/html\n\n";
    cout << "<html><body>";
    cout << "<h2>Resultado del inicio de sesión</h2>";

    
    UserOptions UserOpt; // ya lo tenés creado más arriba
    // Obtener los datos enviados desde el formulario
    string query = getenv("QUERY_STRING") ? getenv("QUERY_STRING") : "";
    string user = UserOpt.getValue(query, "user");
    string pass = UserOpt.getValue(query, "pass");
    string role = UserOpt.getValue(query, "role");
    string option = UserOpt.getValue(query, "option");

    // ✅ Primera entrada al script → no mostrar error
    if (query.empty()) {
        cout << "<p>Ingrese sus credenciales para continuar.</p>";
        cout << "<p><a href='/login.html'>Ir al Login</a></p></body></html>";
        return;
    }

    // 🔹 Nuevo: si ya viene con rol, significa que ya inició sesión.
    if (!role.empty() && role == "Cliente") {
        UserOpt.RedirectUser(role, user);
        return;
    }


    if (user.empty() || pass.empty()) {
        cout << "<p style='color:orange;'>⚠️ Por favor complete ambos campos.</p>";
        cout << "<p><a href='/login.html'>Volver</a></p></body></html>";
        return;
    }

    // Leer número de intentos anteriores
    int attempts = readAttempts(user);

    if (attempts >= MAX_ATTEMPTS) {
        cout << "<p style='color:red;'>⛔ Acceso bloqueado. Superaste el máximo de intentos (" << MAX_ATTEMPTS << ").</p>";
        cout << "<p>Contacte al administrador para desbloquear su cuenta.</p>";
        cout << "<p><a href='/login.html'>Volver</a></p></body></html>";
        return;
    }

    // Verificar credenciales
    if (Authentication(user, pass, role)) {
        resetAttempts(user);  // login exitoso → reset intentos
        Acces = true;

        // Redirigir según el rol
        UserOpt.RedirectUser(role, user);

        cout << "<p><a href='/login.html'>Cerrar sesión</a></p>";
    } else {
        attempts++;
        writeAttempts(user, attempts);

        cout << "<p style='color:red;'>❌ Usuario o contraseña incorrectos.</p>";
        cout << "<p>Intento " << attempts << " de " << MAX_ATTEMPTS << ".</p>";
        cout << "<p><a href='/login.html'>Volver</a></p>";
    }

    cout << "</body></html>";
}

// ======= FUNCIÓN PRINCIPAL CGI =======
int main() {
    Start_Session();
    return 0;
}