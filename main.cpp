#include <iostream>
#include <string>
#include <array>
#include <random>
#include <iomanip>

using namespace std;

string getClasificacion();
string getDesc();
void print_element(string&&, string&&, bool = false);

default_random_engine eng;

int main()
{
    cout << setprecision(2);
    cout << std::fixed;
    //cout << getRandom(vector<string>{"f", "g"});
    cout << "[" << endl;

    for (size_t i = 0; i < 80; ++i){
        cout << "\t{" << endl;
        print_element("clave", to_string(i));
        print_element("descripcion", getDesc());
        print_element("precio", to_string(double(uniform_int_distribution<int>(0, 10000)(eng)) / 100));
        print_element("clasificacion", getClasificacion());
        print_element("cantidad_disponible", to_string(uniform_int_distribution<>(100, 500)(eng)));
        print_element("existencia_minima", to_string(uniform_int_distribution<>(10, 100)(eng)));
        print_element("existencia_maxima", to_string(uniform_int_distribution<>(500, 590)(eng)), true);
        cout << "\t}," << endl;
    }

    cout << "]" << endl;
    return 0;
}

template<typename T> T getRandom(const vector<T>& vec){
    return vec[uniform_int_distribution<size_t>(0, vec.size() - 1)(eng)];
}

string getClasificacion(){
    const static vector<string> clasific = {"mexicanos", "noruegos", "suizos", "alemanes", "ingleses", "italianos"};

    return getRandom(clasific);
}

string getDesc(){
    const static vector<string> objetos = {"Huevos", "Jamones", "Carnes", "Maruchans", "Salchichas", "Quesos", "Panes", "Arrozes"};
    const static vector<string> colores = {"rojos", "verdes", "azules", "morados", "amarillos", "púrpuras", "magentas", "grises", "negros", "blancos"};
    const static vector<string> recipientes = {"enlatados", "en cajas", "embolsados"};

    return getRandom(objetos) + " " + getRandom(colores) + " " + getRandom(recipientes);
}

void print_element(string&& nombre, string&& valor, bool last){
    try {
        stod(valor);
    } catch (std::invalid_argument&){
        valor = "\"" + valor + "\"";
    }
    cout << "\t\t\"" << nombre << "\": " << valor;
    if (!last)
        cout << ",";
     cout << endl;
}

