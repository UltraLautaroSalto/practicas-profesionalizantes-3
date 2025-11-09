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
    void RedirectUser(string &UserActualRol, string &UserActualName, string &UserActualPassword);

    /////////////////////////////////////////////// MENUS PARA CADA TIPO DE USUARIO ///////////////////////////////////////////////
    // Opciones de Cliente
    void ClientOptions(string &UserActualName);
    void SearchStore(string &UserActualName, string &query);
    void ShowStoreProducts(const string &UserActualName, int &store_selectt);
    
    // Opciones Manager
    void ManagerOptions(string &UserActualName, string &UserActualPassword);
    void SeeProducts(string &UserActualName, string &query, string &ManagerActualStore, string &UserActualPassword);
    void AddProduct(string &UserActualName, string &query, string &ManagerActualStore, string &UserActualPassword);
    void ModifyProduct(string &UserActualName, string &query, string &ManagerActualStore, string &UserActualPassword);
    void DeleteProduct(string &UserActualName, string &query, string &ManagerActualStore, string &UserActualPassword);
    

    void AdminOptions(string &UserActualName);
};

#endif