# iar-telemetria-client
## Grupo de Pasantias N° 4
#### Colegio Florentino Ameghino
##### Integrantes: GIAMMARINI Ana, PEÑALOZA Nicolas, ZAVALETA Maximo


## Instalacion:

  1. Descargar el repositorio
  2. Instalar nodeJS en el equipo
  3. En el archivo `config.json` colocar las rutas exactas de los archivos que desea monitorear. (El primero es el del satelite, el segundo de la pc y el tercero del disco)
  4. Una vez finalizado esto abrir una terminal en la carpeta del programa
  5. Escribir en esa terminal `node app.js`
  6. Listo, Ahora solo toca dejar el programa ejecutandose en segundo plano.


### Ejemplo config.json:

```json

{
    "rutas": [
        "D:/iar-telemetria/aca/log_tlmy_1.txt",
        "D:/iar-telemetria/aca/log_tlmy_2.txt",
        "D:/iar-telemetria/aca/hd_space.log"
    ],

    "satelite": {
        "nucleos": 5
    }
}

```

En donde dice `"nucleos"` colocar la cantidad de nucleos que tiene el satelite (la cantidad a monitorear).
