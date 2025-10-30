#ifndef USEROPTIONS_HPP
#define USEROPTIONS_HPP

#include <iostream>
#include <string>
#include <cstdlib> // Para getenv()
#include <fstream>
#include <sstream>
#include <vector>
using namespace std;

class UserOptions 
{
private:
    string UserRol;
    string UserName;

public:
    // Función auxiliar interna para obtener valores del QUERY_STRING
    string getValue(const string& data, const string& key); // para leer parámetros CGI

    // Redirige al menú según el rol
    void RedirectUser(string &UserActualRol, string &UserActualName);

    // Menús para cada tipo de usuario
    // Opciones de Cliente
    void ClientOptions(string &UserActualName);
    void ShowStoreProducts(string &UserActualName, string &store_option);

    void ManagerOptions(string &UserActualName);
    void AdminOptions(string &UserActualName);
};

#endif