#include "../include/UserOptions.hpp"

// Estructura auxiliar para guardar los productos
struct Products {
    string nombre;
    int precio;
    int stock;
};

// Redirige al menú correcto según el rol
void UserOptions::RedirectUser(string &UserActualRol, string &UserActualName) {
    if (UserActualRol == "Cliente" || UserActualRol == "Client") {
        ClientOptions(UserActualName);
    } else if (UserActualRol == "Manager") {
        ManagerOptions(UserActualName);
    } else if (UserActualRol == "Admin") {
        AdminOptions(UserActualName);
    } else {
        cout << "<p style='color:red;'>⚠️ Rol desconocido. No se puede redirigir al menú.</p>";
    }
}

// Función auxiliar para obtener valores de GET (reutiliza tu estilo)
string UserOptions::getValue(const string& data, const string& key) {
    size_t start = data.find(key + "=");
    if (start == string::npos) return "";
    start += key.size() + 1;
    size_t end = data.find("&", start);
    return data.substr(start, end - start);
}

// ===================== CLIENTE =====================
string decodeURL(const string &s) {
    string result;
    char ch;
    int i, ii;
    for (i=0; i<s.length(); i++) {
        if (int(s[i])==37) { // %
            sscanf(s.substr(i+1,2).c_str(), "%x", &ii);
            ch=static_cast<char>(ii);
            result+=ch;
            i=i+2;
        } else {
            result+=s[i];
        }
    }
    return result;
}

void UserOptions::ClientOptions(string &UserActualName) {
    string query = getenv("QUERY_STRING") ? getenv("QUERY_STRING") : "";
    string option = getValue(query, "option");
    string store_option = getValue(query, "store_option");

    store_option = decodeURL(store_option);


    cout << "<div style='font-family:Arial;'>";
    cout << "<h2 style='color:green;'> Bienvenido Cliente <b>" << UserActualName << "</b>!</h2>";
    cout << "<hr>";

    if (option.empty()) {
        cout << "<h3 style='color:#ffaa00;'>===== OPCIONES DE USUARIO =====</h3>";
        cout << "<form action='/cgi-bin/Start_Session.cgi' method='GET'>";
        cout << "<p><input type='radio' name='option' value='1'> Buscar Tienda</p>";
        cout << "<p><input type='radio' name='option' value='2'> Salir</p>";
        cout << "<input type='hidden' name='user' value='" << UserActualName << "'>";
        cout << "<input type='hidden' name='role' value='Cliente'>";
        cout << "<br><input type='submit' value='Seleccionar Opción'>";
        cout << "</form>";
    } else {
        if (option == "1" && store_option.empty()) {
        // Primera vez: mostrar las tiendas
        cout << "<h3 style='color:#ffaa00;'>===== Elige un Local =====</h3>";
        cout << "<form action='/cgi-bin/Start_Session.cgi' method='GET'>";
        cout << "<p><input type='radio' name='store_option' value='Bullwinkle'> Bullwinkle Ecologic Store </p>";
        cout << "<p><input type='radio' name='store_option' value='Chips'> El Chips 24/7 </p>";
        cout << "<p><input type='radio' name='store_option' value='Rustis'> Rustis Family Mall </p>";
        cout << "<input type='hidden' name='user' value='" << UserActualName << "'>";
        cout << "<input type='hidden' name='role' value='Cliente'>";
        cout << "<input type='hidden' name='option' value='1'>"; // mantiene el contexto
        cout << "<br><input type='submit' value='Seleccionar Opción Tienda'>";
        cout << "</form>";
        } else if (option == "1" && !store_option.empty()) {
            // Segunda vez: ya se eligió una tienda
            ShowStoreProducts(UserActualName, store_option);
            return; // Detener ejecución tras mostrar productos
        } else if (option == "2") {
            cout << "<p> Gracias por usar la aplicación. ¡Hasta pronto!</p>";
        } else {
            cout << "<p style='color:red;'> Opción inválida.</p>";
        }

    cout << "<p><a href='/login.html'>Volver al Inicio</a></p>";
    cout << "</div>";
    }
}

//Mostrar Productos de Tienda
void UserOptions::ShowStoreProducts(string &UserActualName, string &store_option){
    string query = getenv("QUERY_STRING") ? getenv("QUERY_STRING") : "";
    string buy = getValue(query, "buy");

    vector<Products> productos;
    ifstream file;

    if (store_option == "Bullwinkle"){
        file.open("../data/Bullwinkle_Ecologic_Store.txt");
    } else if (store_option == "Chips"){
        file.open("../data/El_Chips_24_7.txt");
    } else if (store_option == "Rustis"){
        file.open("../data/Rustis_Family_Mall.txt");
    }

    cout << "<p>Ruta del archivo intentando abrir: ";
    if (store_option == "Bullwinkle") cout << "data/Bullwinkle_Ecologic_Store.txt";
    else if (store_option == "Chips") cout << "data/El_Chips_24_7.txt";
    else if (store_option == "Rustis") cout << "data/Rustis_Family_Mall.txt";
    cout << "</p>";

    cout << "<div style='font-family:Arial;'>";

    if (!file.is_open()) {
        cout << "<p style='color:red;'>No se pudo abrir el archivo de productos.</p>";
        cout << "<p><a href='/cgi-bin/Start_Session.cgi?user=" << UserActualName
             << "&role=Cliente'>Volver al menú</a></p></div>";
        return;
    }


    // Leer productos del archivo
    string linea;
    while (getline(file, linea)) {
        stringstream ss(linea);
        string nombre, precioStr, stockStr;
        getline(ss, nombre, ',');
        getline(ss, precioStr, ',');
        getline(ss, stockStr, ',');

        if (!nombre.empty() && !precioStr.empty() && !stockStr.empty()) {
            Products p;
            p.nombre = nombre;
            p.precio = stoi(precioStr);
            p.stock = stoi(stockStr);
            productos.push_back(p);
        }
    }
    file.close();

    // Mostrar tabla o mensaje
    if (buy.empty()) {
        cout << "<h2>🛍️ Productos disponibles en tienda</h2>";
        if (productos.empty()) {
            cout << "<p>No hay productos disponibles en este momento.</p>";
        } else {
            cout << "<table border='1' cellpadding='5' cellspacing='0'>"
                 << "<tr><th>Producto</th><th>Precio</th><th>Stock</th><th>Acción</th></tr>";

            for (auto &p : productos) {
                cout << "<tr>"
                     << "<td>" << p.nombre << "</td>"
                     << "<td>$" << p.precio << "</td>"
                     << "<td>" << p.stock << "</td>"
                     << "<td><a href='/cgi-bin/Start_Session.cgi?user=" << UserActualName
                     << "&role=Cliente&option=1&buy=" << p.nombre << "'>Comprar</a></td>"
                     << "</tr>";
            }

            cout << "</table>";
        }

        cout << "<hr><p><a href='/cgi-bin/Start_Session.cgi?user=" << UserActualName
             << "&role=Cliente'>Volver al menú</a></p>";
    } else {
        cout << "<h3>🛒 Compra realizada:</h3>";
        cout << "<p>Has elegido comprar el producto: <b>" << buy << "</b></p>";
        cout << "<p>Gracias por tu compra!</p>";
        cout << "<p><a href='/cgi-bin/Start_Session.cgi?user=" << UserActualName
             << "&role=Cliente'>Volver al menú</a></p>";
    }

    cout << "</div>";
}

// ===================== MANAGER =====================
void UserOptions::ManagerOptions(string &UserActualName) {
    string query = getenv("QUERY_STRING") ? getenv("QUERY_STRING") : "";
    string option = getValue(query, "option");

    cout << "<div style='font-family:Arial;'>";
    cout << "<h2 style='color:green;'>✅ Bienvenido Manager <b>" << UserActualName << "</b>!</h2>";
    cout << "<hr>";

    if (option.empty()) {
        cout << "<h3 style='color:#ffaa00;'>===== OPCIONES DE MANAGER =====</h3>";
        cout << "<form action='/cgi-bin/Start_Session.cgi' method='GET'>";
        cout << "<p><input type='radio' name='option' value='1'> Administrar Tienda</p>";
        cout << "<p><input type='radio' name='option' value='2'> Añadir Producto</p>";
        cout << "<p><input type='radio' name='option' value='3'> Modificar Producto</p>";
        cout << "<p><input type='radio' name='option' value='4'> Eliminar Producto</p>";
        cout << "<p><input type='radio' name='option' value='5'> Activar/Desactivar Evento Especial</p>";
        cout << "<p><input type='radio' name='option' value='6'> Salir</p>";
        cout << "<input type='hidden' name='user' value='" << UserActualName << "'>";
        cout << "<input type='hidden' name='role' value='Manager'>";
        cout << "<br><input type='submit' value='Seleccionar Opción'>";
        cout << "</form>";
    } else {
        cout << "<h3>Resultado:</h3>";
        if (option == "1") cout << "<p>⚙️ Administrar Tienda aún no disponible.</p>";
        else if (option == "2") cout << "<p>🧩 Añadir Producto aún no disponible.</p>";
        else if (option == "3") cout << "<p>✏️ Modificar Producto aún no disponible.</p>";
        else if (option == "4") cout << "<p>🗑️ Eliminar Producto aún no disponible.</p>";
        else if (option == "5") cout << "<p>🎉 Evento Especial aún no disponible.</p>";
        else if (option == "6") cout << "<p>👋 Gracias por usar la aplicación. ¡Hasta pronto!</p>";
        else cout << "<p style='color:red;'>❌ Opción inválida.</p>";

        cout << "<p><a href='/cgi-bin/Start_Session.cgi?user=" << UserActualName
             << "&role=Manager'>Volver al menú</a></p>";
    }

    cout << "<p><a href='/login.html'>Volver al Inicio</a></p>";
    cout << "</div>";
}

// ===================== ADMIN =====================
void UserOptions::AdminOptions(string &UserActualName) {
    string query = getenv("QUERY_STRING") ? getenv("QUERY_STRING") : "";
    string option = getValue(query, "option");

    cout << "<div style='font-family:Arial;'>";
    cout << "<h2 style='color:green;'>✅ Bienvenido Administrador <b>" << UserActualName << "</b>!</h2>";
    cout << "<hr>";

    if (option.empty()) {
        cout << "<h3 style='color:#ffaa00;'>===== OPCIONES DE ADMINISTRACIÓN =====</h3>";
        cout << "<form action='/cgi-bin/Start_Session.cgi' method='GET'>";
        cout << "<p><input type='radio' name='option' value='1'> Administrar Tienda Específica</p>";
        cout << "<p><input type='radio' name='option' value='2'> Cambiar Nombre/Password/Rol de una Cuenta</p>";
        cout << "<p><input type='radio' name='option' value='3'> Salir</p>";
        cout << "<input type='hidden' name='user' value='" << UserActualName << "'>";
        cout << "<input type='hidden' name='role' value='Admin'>";
        cout << "<br><input type='submit' value='Seleccionar Opción'>";
        cout << "</form>";
    } else {
        cout << "<h3>Resultado:</h3>";
        if (option == "1") cout << "<p>🏪 Administración de tienda específica aún no disponible.</p>";
        else if (option == "2") cout << "<p>👤 Edición de cuentas aún no disponible.</p>";
        else if (option == "3") cout << "<p>👋 Gracias por usar la aplicación. ¡Hasta pronto!</p>";
        else cout << "<p style='color:red;'>❌ Opción inválida.</p>";

        cout << "<p><a href='/cgi-bin/Start_Session.cgi?user=" << UserActualName
             << "&role=Admin'>Volver al menú</a></p>";
    }

    cout << "<p><a href='/login.html'>Volver al Inicio</a></p>";
    cout << "</div>";
}
