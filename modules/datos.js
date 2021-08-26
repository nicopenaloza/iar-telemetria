const LineByLine = require('n-readlines');
const database = require("mime-db");
const config = require("../config.json");

function GetData(){

    let Satelite = new LineByLine(config.rutas[0]);
    let PC = new LineByLine(config.rutas[1]);
    let Discos = new LineByLine(config.rutas[2]);

    let data = {
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
        return GetData();
    }
}