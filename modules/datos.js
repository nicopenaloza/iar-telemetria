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

 /*
    let LineaPc;
    while (LineaPc = PC.next()){
         console.log(LineaPc.toString());
    }
*/

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