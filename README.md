# iar-telemetria-client
## Grupo de Pasantias N° 4
#### Colegio Florentino Ameghino
##### Integrantes: GIAMMARINI Ana, PEÑALOZA Nicolas, ZAVALETA Maximo

## Descripción:
Este software genera una api REST la cual al ser solicitado por el servidor esta genera una respuesta con los datos del cliente con los cuales se puede hacer un monitoreo desde el servidor y mostrarlo en una interfaz.

## Instalacion:

  1. Descargar el repositorio
  2. Instalar nodeJS en el equipo
  3. En el archivo `config.json` colocar las rutas exactas de los archivos que desea monitorear. (El primero es el del satelite, el segundo de la pc y el tercero del disco), asignar un puerto donde trabajara el sistema y especificar la cantidad de nucleos que hay en el primer archivo.
  4. Una vez finalizado esto abrir una terminal en la carpeta del programa
  5. Escribir en esa terminal `node app.js`
  6. Listo, Ahora solo toca dejar el programa ejecutandose en segundo plano.


### Ejemplo config.json:

```json

{
    "puerto": 3000,
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

En donde dice `"nucleos"` colocar la cantidad de nucleos que tiene el satelite (la cantidad a monitorear), Segun el siguiente ejemplo de los datos del satelite podremos ver como tiene un total de 5 nucleos.

```
1,0
1,0
32.6 // Nucleo 1
32.1 // Nucleo 2
33.2 // Nucleo 3
34.3 // Nucleo 4
34.2 // Nucleo 5
4.984
14.82984
27.651
28.
```
