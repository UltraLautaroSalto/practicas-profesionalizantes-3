#include "../include/UserOptions.hpp"

struct Products {
    string nombre;
    int stock;
    int precio;
};

const int B = 50;

std::vector<Products> Bullwinkle_Store = {
    {"Gaseosa Coca Cola 1L", 1200, 300},
    {"Cereal 100 Gramos", 600, 240},
    {"Pan de Maiz 1KG", 700, 390}
};

std::vector<Products> ElChips_Store = {
    {"Papitas Sabor Jamon 500g",1400,200},
    {"Gaseosa Sprite 1L",1800,300},
    {"Coles de Brucela 1Kg", 700, 390}
};

std::vector<Products> Rustis_Store = {
    {"Hamburguesa Familiar 1u",3500,500},
    {"Pan Artesanal 1Kg",800,200},
    {"Bolsa de Porotos 500g", 700, 390}
};

// Redirige al menú correcto según el rol
void UserOptions::RedirectUser(string &UserActualRol, string &UserActualName, string &UserActualPassword) {
    if (UserActualRol == "Cliente") {
        ClientOptions(UserActualName);
    } else if (UserActualRol == "Manager") {
        ManagerOptions(UserActualName, UserActualPassword);
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
        cout << "</div>";
        ShowStoreProducts(UserActualName, store_selectt);
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

    cout << "<div style='font-family:Arial;'>";
    cout << "<h3 style='color:#ffaa00;'>===== PRODUCTOS DE TIENDA =====</h3>";

    if(store_selectt == 1){
        cout << "<h3 style='color:#ffaa00;'> 'Bullwinkle Ecologic Store'</h3>"; 
        for(const auto &p : Bullwinkle_Store){
            cout << "- PRODUCTO: " << p.nombre << "<br>- STOCK:" << p.stock << "<br>- PRECIO:" << p.precio << "<br><br>";
        }
    } else if (store_selectt == 2){
        for(const auto &p : ElChips_Store){
            cout << "- PRODUCTO: " << p.nombre << "<br>- STOCK:" << p.stock << "<br>- PRECIO:" << p.precio << "<br><br>";
        }
    } else if(store_selectt == 3){
        cout << "<h3 style='color:#ffaa00;'> 'Rustis Family Mall'</h3>";
        for(const auto &p : Rustis_Store){
            cout << "- PRODUCTO: " << p.nombre << "<br>- STOCK:" << p.stock << "<br>- PRECIO:" << p.precio << "<br><br>";
        }
    } else {
        cout << "Opcion Seleccionada Invalida" << endl;
    }
}
//////////////////////////////////////////////////////// OPCIONES DE MANAGER ////////////////////////////////////////////////////////

void UserOptions::ManagerOptions(string &UserActualName, string &UserActualPassword){
    string query = getenv("QUERY_STRING") ? getenv("QUERY_STRING") : "";
    cout << "<p style='color:red;'>" << query << "</p>";
    string option = getValue(query, "option");
    string ManagerActualStore;

    if (UserActualName == "Carlos"){
        ManagerActualStore = "bullwinkle";
        cout << "<div style='font-family:Arial;'>";
        cout << "<h2 style='color:green;'> Bienvenido Manager <b>" << UserActualName << "</b>!</h2>";
        cout << "<h3 'style='color:blue;'> Tienda en la que Trabajas: Bullwinkle Ecologic Store </h3>";
        cout << "<hr>";
    }  else if (UserActualName == "Raul"){
        ManagerActualStore = "elchips";
        cout << "<div style='font-family:Arial;'>";
        cout << "<h2 style='color:green;'> Bienvenido Manager <b>" << UserActualName << "</b>!</h2>";
        cout << "<h3 'style='color:blue;'> Tienda en la que Trabajas: El Chips 24/7 </h3>";
        cout << "<hr>";
    } else if (UserActualName == "Mike"){
        ManagerActualStore = "rustis";
        cout << "<div style='font-family:Arial;'>";
        cout << "<h2 style='color:green;'> Bienvenido Manager <b>" << UserActualName << "</b>!</h2>";
        cout << "<h3 'style='color:blue;'> Tienda en la que Trabajas: Rustis Family Mall </h3>";
        cout << "<hr>";
    } else {
        cout << "<p style='color:red;'> Manager Sin Vinculo a Ninguna Tienda Existente. </p>";
    }

    if (option.empty()){
        cout << "<h3 style='color:#ffaa00;'>===== OPCIONES DE MANAGER =====</h3>";
        cout << "<form action='/cgi-bin/Start_Session.cgi' method='GET'>";
        cout << "<p><input type='radio' name='option' value='ver_producto'> Ver Productos</p>";
        cout << "<p><input type='radio' name='option' value='add_producto'> Introducir Producto</p>";
        cout << "<p><input type='radio' name='option' value='modificar_producto'> Modificar Producto</p>";
        cout << "<p><input type='radio' name='option' value='eliminar_producto'> Eliminar Producto</p>";
        cout << "<p><input type='radio' name='option' value='salir'> Salir</p>";
        cout << "<input type='hidden' name='user' value='" << UserActualName << "'>";
        cout << "<input type='hidden' name='pass' value='" << UserActualPassword << "'>";
        cout << "<input type='hidden' name='role' value='Manager'>";
        cout << "<br><input type='submit' value='Seleccionar Opción'>";
        cout << "</form>";
    } else {
        if (option == "ver_producto"){
            SeeProducts(UserActualName, query, ManagerActualStore, UserActualPassword);
            cout << "</div>";
        } else if (option == "add_producto"){
            AddProduct(UserActualName, query, ManagerActualStore, UserActualPassword);
            cout << "</div>";
        } else if (option == "modificar_producto"){
            ModifyProduct(UserActualName, query, ManagerActualStore,UserActualPassword);
            cout << "</div>";
        } else if (option == "eliminar_producto") {
            DeleteProduct(UserActualName, query, ManagerActualStore, UserActualPassword);
            cout << "</div>";
        } else if (option == "salir") {
            cout << "<p> Gracias por usar la aplicación. ¡Hasta pronto!</p>";
        } else {
            cout << "<p style='color:red;'> Opción inválida.</p>";
        }
    }
}

void UserOptions::AddProduct(string &UserActualName, string &query, string &ManagerActualStore, string &UserActualPassword){
    string nombreStr = getValue(query, "nombreStr");
    string precioStr = getValue(query, "precioStr");
    string stockStr = getValue(query, "stockStr");

    cout << "<div style='font-family:Arial;'>";
    cout << "<h3 style='color:#ffaa00;'>===== INTRODUCIR PRODUCTO =====</h3>";
    cout << "<form action='/cgi-bin/Start_Session.cgi' method='GET'>";
    cout << "<p>Nombre: <input type='text' name='nombreStr'></p><br>";
    cout << "<p>Precio: <input type='text' name='precioStr'></p><br>";
    cout << "<p>Stock: <input type='text' name='stockStr'><br></p><br>";
    cout << "<input type='hidden' name='role' value='Manager'>";
    cout << "<input type='hidden' name='user' value='" << UserActualName << "'>";
    cout << "<input type='hidden' name='pass' value='" << UserActualPassword << "'>";
    cout << "<input type='hidden' name='option' value='add_producto'>";
    cout << "<br><input type='submit' value='Agregar Producto'>";
    cout << "</form>";

    if (nombreStr.empty() && precioStr.empty() && stockStr.empty()){
        cout << "</div>";
        return;
    }

    if (nombreStr.empty() || precioStr.empty() || stockStr.empty()){
        cout << "<h3 style='color:orange;'>Faltan campos por completar.</h3>";
        cout << "</div>";
        return;
    }

    int precio, stock;
    try {
        precio = stoi(precioStr);
        stock = stoi(stockStr);
    } catch (...) {
        cout << "<h3 style='color:red;'>Precio o stock inválido. Ingrese números.</h3>";
        cout << "</div>";
        return;
    }

    std::vector<Products>* storeVector = nullptr;

    if (ManagerActualStore == "bullwinkle"){
        storeVector = &Bullwinkle_Store;
    } else if (ManagerActualStore == "elchips"){
        storeVector = &ElChips_Store;
    } else if (ManagerActualStore == "rustis"){
        storeVector = &Rustis_Store;
    } else {
        cout << "<h3 style='color:red;'>Error: Tienda desconocida.</h3></div>";
        return;
    }

    storeVector->push_back({nombreStr, stock, precio});

    cout << "Content-Type: text/html\n\n";
    cout << "<meta http-equiv='refresh' content='0; url=/cgi-bin/Start_Session.cgi?role=Manager&user=" 
         << UserActualName << "'>";
}

void UserOptions::ModifyProduct(string &UserActualName, string &query, string &ManagerActualStore, string &UserActualPassword){
    string nombreProductSearch = getValue(query, "nombreProductSearch");
    string nombre = getValue(query, "nombre");
    string precioNew = getValue(query, "precioNew");
    string stockNew = getValue(query, "stockNew");

    cout << "<div style='font-family:Arial;'>";
    cout << "<h3 style='color:#ffaa00;'>===== MODIFICAR PRODUCTO =====</h3>";

    // Si aún no buscaron el producto, mostrar primer formulario
    if (nombreProductSearch.empty()) {
        cout << "<form action='/cgi-bin/Start_Session.cgi' method='GET'>";
        cout << "<p>Nombre del producto a modificar: <input type='text' name='nombreProductSearch'></p>";
        cout << "<input type='submit' value='Buscar'>";
        cout << "</form>";
        return;
    }

    // Elegimos el vector según tienda
    vector<Products> *store = nullptr;

    if (ManagerActualStore == "bullwinkle") store = &Bullwinkle_Store;
    else if (ManagerActualStore == "elchips") store = &ElChips_Store;
    else if (ManagerActualStore == "rustis") store = &Rustis_Store;
    else {
        cout << "Tienda desconocida.";
        return;
    }

    // Buscar producto
    for (auto &p : *store) {
        if (p.nombre == nombreProductSearch) {

            // Si aún no cargó los datos nuevos → mostrar formulario
            if (nombre.empty() || precioNew.empty() || stockNew.empty()) {
                cout << "<h3 style='color:green;'>Producto encontrado: " << p.nombre << "</h3>";
                cout << "<form action='/cgi-bin/Start_Session.cgi' method='GET'>";
                cout << "<input type='hidden' name='nombreProductSearch' value='" << nombreProductSearch << "'>";
                cout << "Nuevo nombre: <input type='text' name='nombre'><br>";
                cout << "Nuevo precio: <input type='text' name='precioNew'><br>";
                cout << "Nuevo stock: <input type='text' name='stockNew'><br><br>";
                cout << "<input type='submit' value='Modificar'>";
                cout << "</form>";
                return;
            }

            // Aquí ya tenemos los datos → modificar
            p.nombre = nombre;
            p.precio = stoi(precioNew);
            p.stock = stoi(stockNew);

            cout << "<h2>Producto modificado correctamente.</h2>";
            cout << "<p>Nuevo nombre: " << p.nombre << "</p>";
            cout << "<p>Nuevo precio: " << p.precio << "</p>";
            cout << "<p>Nuevo stock: " << p.stock << "</p>";
            return;
        }
    }

    cout << "<h3 style='color:red;'>Producto no encontrado.</h3>";
}

void UserOptions::DeleteProduct(string &UserActualName, string &query, string &ManagerActualStore, string &UserActualPassword){

}

void UserOptions::SeeProducts(string &UserActualName, string &query, string &ManagerActualStore, string &UserActualPassword){
    cout << "<div style='font-family:Arial;'>";
    cout << "<h3 style='color:#ffaa00;'>===== PRODUCTOS DE TIENDA =====</h3>";

    if(ManagerActualStore == "bullwinkle"){
        cout << "<h3 style='color:#ffaa00;'> 'Bullwinkle Ecologic Store'</h3>"; 
        for(const auto &p : Bullwinkle_Store){
            cout << "- PRODUCTO: " << p.nombre << "<br>- STOCK:" << p.stock << "<br>- PRECIO:" << p.precio << "<br><br>";
        }
    } else if (ManagerActualStore == "elchips"){
        for(const auto &p : ElChips_Store){
            cout << "- PRODUCTO: " << p.nombre << "<br>- STOCK:" << p.stock << "<br>- PRECIO:" << p.precio << "<br><br>";
        }
    } else if(ManagerActualStore == "rustis"){
        cout << "<h3 style='color:#ffaa00;'> 'Rustis Family Mall'</h3>";
        for(const auto &p : Rustis_Store){
            cout << "- PRODUCTO: " << p.nombre << "<br>- STOCK:" << p.stock << "<br>- PRECIO:" << p.precio << "<br><br>";
        }
    } else {
        cout << "Opcion Seleccionada Invalida" << endl;
    }
}

//////////////////////////////////////////////////////// OPCIONES DE ADMIN ////////////////////////////////////////////////////////

void UserOptions::AdminOptions(string &UserActualName){
    cout << "Seguimos Trabajando Acá, no viste la señal de antes?" << endl;
}