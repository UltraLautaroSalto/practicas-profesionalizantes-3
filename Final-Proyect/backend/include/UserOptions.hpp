#ifndef USEROPTIONS_HPP
#define USEROPTIONS_HPP

#include <iostream> //Nota: No hace falta que los vuelva a Agregar en el CPP, Ya con Incluir el HPP se incluye tambien estos Include
#include <string> // Incluye la biblioteca de strings.
using namespace std;

class UserOptions 
{
    private:
        string UserRol;
        string UserName;
    public:
        void RedirectUser (string &UserActualRol, string &UserActualName);
        void ClientOptions(string &UserActualName);
        void ManagerOptions(string &UserActualName);
        void AdminOptions(string &UserActualName);
};

#endif