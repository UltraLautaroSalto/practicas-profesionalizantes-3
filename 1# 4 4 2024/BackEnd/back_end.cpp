#include <iostream>
#include <fstream>
#include <string.h>
#include <sstream>
#include <vector>

using namespace std;

void readfile();
////////////////////////////////////////////////////////////////////////////////////
struct nombre_latitud_longitud{
    int id1;
    string nombre;
    string latitud;
    string longitud;
};

struct municipio_localidad_provincia{
    int id2;
    string municipio;
    string localidad;
    string provincia;
};

struct codigo_uta_2020_2010{
    int id3;
    string codigouta2020;
    string codigouta2010;
};
////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////
vector<nombre_latitud_longitud> procesarCSV1(const string& filename){
    vector<nombre_latitud_longitud> datos1;

    ifstream archivo1(filename);
    if (!archivo1.is_open()) {
        cout << "No se pudo abrir el archivo." << endl;
        return datos1;
    }

    string linea1;
    int idinicial = 0;
    while (getline(archivo1, linea1)) {
        stringstream ss(linea1);
        string campo;

        nombre_latitud_longitud nuevo_nombre;
        nuevo_nombre.id1 = idinicial;

        // Parseamos la línea del CSV
        getline(ss, nuevo_nombre.nombre, ';');
        getline(ss, nuevo_nombre.latitud, ';');
        getline(ss, nuevo_nombre.longitud, ';');
        // Puedes agregar más líneas para procesar más campos si es necesario

        // Agregamos la localidad procesada al vector de datos
        datos1.push_back(nuevo_nombre);
        idinicial++;
    }
    archivo1.close();

    return datos1;
}
////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////
vector<municipio_localidad_provincia> procesarCSV2(const string& filename){
    vector<municipio_localidad_provincia> datos2;

    ifstream archivo2(filename);
    if (!archivo2.is_open()) {
        cout << "No se pudo abrir el archivo." << endl;
        return datos2;
    }

    string linea2;
    int idinicial2 = 0;
    while (getline(archivo2, linea2)) {
        stringstream ss(linea2);
        string campo;

        municipio_localidad_provincia nuevo_municipio;
        nuevo_municipio.id2 = idinicial2;

        // Parseamos la línea del CSV
        getline(ss, nuevo_municipio.municipio, ';');
        getline(ss, nuevo_municipio.localidad, ';');
        getline(ss, nuevo_municipio.provincia, ';');
        // Puedes agregar más líneas para procesar más campos si es necesario

        // Agregamos la localidad procesada al vector de datos
        datos2.push_back(nuevo_municipio);
        idinicial2++;
    }
    archivo2.close();

    return datos2;
}
////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////
vector<codigo_uta_2020_2010> procesarCSV3(const string& filename){
    vector<codigo_uta_2020_2010> datos3;

    ifstream archivo3(filename);
    if (!archivo3.is_open()) {
        cout << "No se pudo abrir el archivo." << endl;
        return datos3;
    }

    string linea3;
    int idinicial3 = 0;
    while (getline(archivo3, linea3)) {
        stringstream ss(linea3);
        string campo;

        codigo_uta_2020_2010 nuevo_codigo;
        nuevo_codigo.id3 = idinicial3;

        // Parseamos la línea del CSV
        getline(ss, nuevo_codigo.codigouta2020, ';');
        getline(ss, nuevo_codigo.codigouta2010, ';');
        // Puedes agregar más líneas para procesar más campos si es necesario

        // Agregamos la localidad procesada al vector de datos
        datos3.push_back(nuevo_codigo);
        idinicial3++;
    }
    archivo3.close();

    return datos3;
}
////////////////////////////////////////////////////////////////////////////////////

int main(){


    /*
    vector<nombre_latitud_longitud> datos1 = procesarCSV1("../excel_import/nombre_latitud_longitud.csv");

    // Imprimir los datos procesados
    for (const auto& loc1 : datos1) {
        cout << "ID: " << loc1.id1 << ", Nombre: " << loc1.nombre << ", Latitud: " << loc1.latitud << ", Longitud: " << loc1.longitud << endl;
    }
    
    vector<municipio_localidad_provincia> datos2 = procesarCSV2("../excel_import/municipio_localidad_provincia.csv");

    for (const auto& loc2 : datos2) {
        cout << "ID: " << loc2.id2 << ", Municipio: " << loc2.municipio << ", Localidad: " << loc2.localidad << ", provincia: " << loc2.provincia << endl;
    }

    vector<codigo_uta_2020_2010> datos3 = procesarCSV3("../excel_import/municipio_localidad_provincia.csv");

    for (const auto& loc3 : datos3) {
        cout << "ID: " << loc3.id3 << ", Codigo UTA 2010: " << loc3.codigouta2010 << ", Codigo UTA 2020: " << loc3.codigouta2020 << endl;
    }
    */
    return 0;
}