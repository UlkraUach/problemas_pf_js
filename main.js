var fs = require('fs');//importante!!

class ProcesadorDeDatos{

    constructor(archivo){
        let reader = fs.readFileSync(archivo, 'utf8');
        this.datos = JSON.parse(reader);

        let clasificaciones = new Array(0);

        this.datos.forEach(function(value){
            if (clasificaciones.indexOf(value.clasificacion) == -1)
                clasificaciones.push(value.clasificacion);
        });

        this.clasificaciones = clasificaciones;
    }

    printProductosEnRangoCantidad(de, hasta){
        console.log(this.datos.filter((p) => (p.cantidad_disponible > de && p.cantidad_disponible < hasta)));
    }

    printPrecioMayorAPorClasificacion(precio_minimo){
        let datos = this.datos;
        this.clasificaciones.forEach(function(clasific){
            console.log("Clasificación \"" + clasific + "\":");
            console.log(datos.filter((p) => (p.clasificacion == clasific && p.precio > precio_minimo)));
        });
        console.log("");
    }

    printProductosEnRangoPrecio(minimo, maximo){
        console.log(this.datos.filter((p) => (p.precio > minimo && p.precio < maximo)));
    }

    printConteoProductosPorClasificacion(){
        let datos = this.datos;
        let conteos = new Array(this.clasificaciones.length).fill(0);
        let it = 0;
        this.clasificaciones.forEach(function(clasific){
            datos.forEach(function(prod){
                if (prod.clasificacion == clasific)
                    conteos[it]++;
            });
            ++it;
        });

        it = 0;
        console.log("Conteos:");
        this.clasificaciones.forEach(function(clasific){
            console.log("Clasificación \"" + clasific + "\":" + conteos[it]);
            ++it;
        });
        console.log("");
    }
}

const archivo = "./productos.js";

procesador = new ProcesadorDeDatos(archivo);
console.log("\n--------------------------- Reporte 1:\n");
//procesador.printProductosEnRangoCantidad(21, 99999)
console.log("\n--------------------------- Reporte 2:\n");
//procesador.printProductosEnRangoCantidad(0, 14);
console.log("\n--------------------------- Reporte 3:\n");
procesador.printPrecioMayorAPorClasificacion(15.5);
console.log("\n--------------------------- Reporte 4:\n");
procesador.printProductosEnRangoPrecio(20.3, 45);
console.log("\n--------------------------- Reporte 5:\n");
procesador.printConteoProductosPorClasificacion();
