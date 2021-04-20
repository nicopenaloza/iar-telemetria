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
    while (lineaSatelite = Satelite.next()){

        if (index > 1){

            if (index <= config.satelite.nucleos + 1){
                data.satelite.temperaturas.push(lineaSatelite.toString().replaceAll('\r', ''));
            }
            
            if (index > config.satelite.nucleos + 1){
                data.satelite.voltajes.push(lineaSatelite.toString().replaceAll('\r', ''));
            }

        }

        index += 1;

    }

 
    let LineaPc;

    while (LineaPc = PC.next()){
        
        const valores = LineaPc.toString().split(' ');
        if (valores[0] == 'cpu_fan:'){
            data.pc.cpu_fan = parseInt(valores[8]);
        }

        if (valores[0] == "temp1:" || valores[0] == "temp2:"){
            data.pc.temperaturas.mother.push(valores[8].replaceAll('Â°C', '').replaceAll('+', ''));
        }

        if (valores[0] == "Core"){
            data.pc.temperaturas.cores.push(valores[9].replaceAll('Â°C', '').replaceAll('+', ''));
        }

        if (valores[0] == "Package"){
            data.pc.temperaturas.cores.push(valores[4].replaceAll('Â°C', '').replaceAll('+', ''));
        }

    }


    let lineaDisco;
    
    while (lineaDisco = Discos.next()){
        
        if (lineaDisco.toString()[0] == '/') {
            
            const disco = lineaDisco.toString().split(' ');
            
            disco.forEach(bloque => {
                
                if (bloque[2] == '%' || bloque[3] == '%'){
                    data.discos.push({
                        name: disco[0],
                        use: bloque
                    });
                }

            });

        }


    }
    return data;

}

module.exports = {
    getInfo: function(){
        return GetData();
    }
}