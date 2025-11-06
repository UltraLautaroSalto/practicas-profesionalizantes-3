#include "../include/UserOptions.hpp"

struct Products {
    string nombre;
    int precio;
    int stock;
}; 

const int B = 3;

Products Bullwinkle_Store[B] = {
{"Gaseosa Coca Cola 1L", 1200, 300},
{"Cereal 100 Gramos", 600, 240},
{"Pan de Maiz 1KG", 700, 390}
};

Products ElChips_Store[B] = {
{"Papitas Sabor Jamon 500g",1400,200},
{"Gaseosa Sprite 1L",1800,300},
{"Coles de Brucela 1Kg", 700, 390}
};

Products Rustis_Store[B] = {
{"Hamburguesa Familiar 1u",3500,500},
{"Pan Artesanal 1Kg",800,200},
{"Bolsa de Porotos 500g", 700, 390}
};

// Redirige al menú correcto según el rol
void UserOptions::RedirectUser(string &UserActualRol, string &UserActualName) {
    if (UserActualRol == "Cliente") {
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

//////////////////////////////////////////////////////// OPCIONES DE CLIENTE ////////////////////////////////////////////////////////
void UserOptions::ClientOptions(string &UserActualName){
    string query = getenv("QUERY_STRING") ? getenv("QUERY_STRING") : "";
    cout << "<p style='color:red;'>" << query << "</p>";
    string option = getValue(query, "option");

    cout << "<div style='font-family:Arial;'>";
    cout << "<h2 style='color:green;'> Bienvenido Cliente <b>" << UserActualName << "</b>!</h2>";
    cout << "<hr>";

    if (option.empty()){
        cout << "<h3 style='color:#ffaa00;'>===== OPCIONES DE USUARIO =====</h3>";
        cout << "<form action='/cgi-bin/Start_Session.cgi' method='GET'>";
        cout << "<p><input type='radio' name='option' value='buscar_tienda'> Buscar Tienda</p>";
        cout << "<p><input type='radio' name='option' value='salir'> Salir</p>";
        cout << "<input type='hidden' name='user' value='" << UserActualName << "'>";
        cout << "<input type='hidden' name='role' value='Cliente'>";
        cout << "<br><input type='submit' value='Seleccionar Opción'>";
        cout << "</form>";
    } else {
        if (option == "buscar_tienda"){
            SearchStore(UserActualName, query);
            cout << "</div>";
        } else if (option == "salir") {
            cout << "<p> Gracias por usar la aplicación. ¡Hasta pronto!</p>";
        } else {
            cout << "<p style='color:red;'> Opción inválida.</p>";
        }
    }
}

void UserOptions::SearchStore(string &UserActualName, string &query){
    string store_select = getValue(query, "store_select");

    cout << "<h3 style='color:#ffaa00;'>===== OPCIONES DE USUARIO =====</h3>";
    cout << "<form action='/cgi-bin/Start_Session.cgi' method='GET'>";
    cout << "<p><input type='radio' name='store_select' value='1'> Bullwinkle Ecologic Store </p>";
    cout << "<p><input type='radio' name='store_select' value='2'> El Chips 24/7 </p>";
    cout << "<p><input type='radio' name='store_select' value='3'> Rustis Family Mall </p>";
    cout << "<p><input type='radio' name='store_select' value='4'> Volver a Opciones</p>";
    cout << "<input type='hidden' name='user' value='" << UserActualName << "'>";
    cout << "<input type='hidden' name='role' value='Cliente'>";
    cout << "<input type='hidden' name='option' value='buscar_tienda'>";
    cout << "<br><input type='submit' value='Seleccionar Opción Tienda'>";
    cout << "<p><a href='/login.html'>Cerrar sesión</a></p>";
    cout << "</form>";
    if (!store_select.empty() && store_select != "4"){
        int store_selectt = stoi(store_select);
        ShowStoreProducts(UserActualName, store_selectt);
        cout << "</div>";
    } else if (store_select == "4") {
        // Volver a ClientOptions
        cout << "Content-Type: text/html\n\n";
        cout << "<meta http-equiv='refresh' content='0; url=/cgi-bin/Start_Session.cgi?role=Cliente&user=" 
            << UserActualName << "'>";
        return;
    } else {
        cout << "<p style='color:red;'> Opción inválida.</p>";
    }
}

void UserOptions::ShowStoreProducts(const string &UserActualName, int &store_selectt){
    string query = getenv("QUERY_STRING") ? getenv("QUERY_STRING") : "";
    string buy = getValue(query, "buy");

    vector<Products> productos;

    cout << "<div style='font-family:Arial;'>";
    cout << "<h3 style='color:#ffaa00;'>===== PRODUCTOS DE TIENDA =====</h3>";

    if(store_selectt == 1){
        cout << "<h3 style='color:#ffaa00;'> 'El Chips 24/7'</h3>"; 
        for(int i = 0; i < B; i++){
            cout << "- PRODUCTO: " << Bullwinkle_Store[i].nombre << "<br>- STOCK:" << Bullwinkle_Store[i].stock << "<br>- PRECIO:" << Bullwinkle_Store[i].precio << "<br><br>";
        }
    } else if (store_selectt == 2){
        cout << "<h3 style='color:#ffaa00;'> 'Bullwinkle Ecologic Store'</h3>"; 
        for(int i = 0; i < B; i++){
            cout << "- PRODUCTO: " << ElChips_Store[i].nombre  << "<br>- STOCK:" << ElChips_Store[i].stock  << "<br>- PRECIO:" << ElChips_Store[i].precio << "<br><br>";
        }
    } else if(store_selectt == 3){
        cout << "<h3 style='color:#ffaa00;'> 'Rustis Family Mall'</h3>";
        for(int i = 0; i < B; i++){
            cout << "- PRODUCTO: " << Rustis_Store[i].nombre << "<br>- STOCK:" << Rustis_Store[i].stock << "<br>- PRECIO:" << Rustis_Store[i].precio << "<br><br>";
        }
    } else {
        cout << "Opcion Seleccionada Invalida" << endl;
    }
}

//////////////////////////////////////////////////////// OPCIONES DE MANAGER ////////////////////////////////////////////////////////

void UserOptions::ManagerOptions(string &UserActualName){
    cout << "Trabajando en esta funcion" << endl;
}

//////////////////////////////////////////////////////// OPCIONES DE ADMIN ////////////////////////////////////////////////////////

void UserOptions::AdminOptions(string &UserActualName){
    cout << "Seguimos Trabajando Acá, no viste la señal de antes?" << endl;
}