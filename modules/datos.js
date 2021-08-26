const LineByLine = require('n-readlines');
const database = require("mime-db");
const config = require("../config.json");

function GetData(){

    let Satelite = new LineByLine(config.rutas[0]); // lee el archivo en la ruta especificada en el config.json
    let PC = new LineByLine(config.rutas[1]); // lee el archivo en la ruta especificada en el config.json
    let Discos = new LineByLine(config.rutas[2]); // lee el archivo en la ruta especificada en el config.json

    let data = { // genera el objeto que va a devolver este modulo con los datos necesarios
        satelite : {
            temperaturas : [],
            voltajes : []
        },

        pc : {
            temperaturas : {
                cores : [],
                mother : []
            }
        },

        discos : []

    }

   
    let lineaSatelite;
    let index = 0;
    while (lineaSatelite = Satelite.next()){ // si no va con un solo = no anda, no se porque

        /*
        Algoritmo:
            1. Omite las primeras dos lineas
            2. Segun la cantidad de nucleos especificadas en el json carga los datos a la clase data
            3. Lo que queda lo toma como voltaje y lo añade a la data
        */
        
        if (index > 1){ // omite las primeras 2 lineas

            if (index <= config.satelite.nucleos + 1){ // Temperaturas
                data.satelite.temperaturas.push(lineaSatelite.toString().replaceAll('\r', ''));
            }
            
            if (index > config.satelite.nucleos + 1){ // Voltaje
                data.satelite.voltajes.push(lineaSatelite.toString().replaceAll('\r', ''));
            }

        }

        index += 1;

    }

 
    let LineaPc;

    while (LineaPc = PC.next()){
        
        /*
        Algoritmo:
            1. Separa la linea en una lista dividida por espacios
            2. Dependiendo lo que diga el primer valor de la lista cargarlo a algun lado removiendo los caracteres innecesarios
        */
        
        const valores = LineaPc.toString().split(' '); // Crea una lista con todos los valores de la linea
        if (valores[0] == 'cpu_fan:'){ // Devuelve el RPM del CPU FAN
            data.pc.cpu_fan = parseInt(valores[8]);
        }

        if (valores[0] == "temp1:" || valores[0] == "temp2:"){ //  Temperaturas 1 y 2 del MOBO
            data.pc.temperaturas.mother.push(valores[8].replaceAll('Â°C', '').replaceAll('+', ''));
        }

        if (valores[0] == "Core"){ // Temperaturas de los nucleos
            data.pc.temperaturas.cores.push(valores[9].replaceAll('Â°C', '').replaceAll('+', ''));
        }

        if (valores[0] == "Package"){ // No se de que es pero estaba en los valores del archivo.
            data.pc.temperaturas.cores.push(valores[4].replaceAll('Â°C', '').replaceAll('+', ''));
        }

    }


    let lineaDisco;
    
    while (lineaDisco = Discos.next()){
        
        /*
        Algoritmo:
            1. Si la linea comienza con la / sigue al paso 2
            2. busca el valor en % (porcentaje)
            3. Lo toma y lo añade a la lista de discos de data, guardando el nombre del disco y el uso sin el %
        */
        
        if (lineaDisco.toString()[0] == '/') { // Busca los discos
            
            const disco = lineaDisco.toString().split(' ');
            
            disco.forEach(bloque => { // por cada disco busca el porcentaje usado y lo añade a la data Obj
                
                if (bloque[2] == '%' || bloque[3] == '%'){
                    data.discos.push({
                        name: disco[0],
                        use: bloque
                    });
                }

            });

        }


    }
    console.log(data);
    return data; // Devuelve el data object

}

module.exports = {
    getInfo: function(){
        return GetData(); // Devuelve los valores del archivo.
    }
}
