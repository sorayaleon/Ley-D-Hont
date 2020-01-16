"use strict";//Declaración obligatoria de variables
/*
1. Crear las estructuras de datos necesarias para esta tarea. Entre ellas habrá que crear una clase llamada Partido, con las propiedades: nomPart (nombre de partido), votos, porcentaje y escanios. También se creará un método para calcular el porcentaje de votos, calcularPorc().

2. Desarrollar una función que permita la carga de los nombres de los partidos y los votos obtenidos por cada uno. Acabar de pedir los datos cuando se pulse en nombre de partido un asterisco.

3.-Controlar que los votos sean numéricos mediante una función.

4.- Desarrollar una función para visualizar los partidos con el nº de votos y el porcentaje obtenido. Tabla I

5.- Se introducirá el número de escaños a repartir. Se utilizará la misma función que se ha utilizado para controlar los votos.

6.- Desarrollar una función para realizar y visualizar  la tabla II.

7. Desarrollar una función para calcular el número de escaños asignado a cada partido.

8. Realizar un listado por pantalla en el que aparezcan los distintos partidos y los votos obtenidos por cada uno. El listado deberá aparecer ordenado de forma descendente por número de escaños. Tabla III*/


//Declaración de variables.
var aPartido = new Array();
var aVotos = new Array();
var aTotalVotos = new Array();//Array que contiene todos los votos
var aReparteEscanios = new Array();//Array longitud número escaños
var numTotalVotos = 0;
var numEscanios;//Escaños a repartir

//Clase Partido.
class Partido {
    //Constructor.
    constructor(nomPart, votos, porcentaje, escanios) {
        this.nomPart = nomPart;
        this.votos = votos;
        this.porcentaje = porcentaje;
        this.escanios = escanios;
    }

    //Método para calcular el porcentaje de votos
    calcularPorc() {

        this.porcentaje = Math.round((this.votos * 100) / numTotalVotos);

    }

}


//Función para cargar los datos
function cargaDatos() {
    let nombre;
    let num;
    let i = 0;

    nombre = prompt("Introduce el nombre del partido, *->Fin");
    while (nombre != "*") {
        aPartido[i] = new Partido();
        aPartido[i].nomPart = nombre;
        num = prompt("Introduce los votos que ha obtenido");
        while (esNumero(num) == false) {
            num = prompt("Error. Se debe introducir un número mayor que 0. \n Por favor, introduce los votos que ha obtenido.");
        }
        num = parseInt(num);
        aPartido[i].votos = num;
        numTotalVotos += aPartido[i].votos;
        i++;

        nombre = prompt(numTotalVotos + " votos. Introduce el nombre del partido, *->Fin");
    }
    numEscanios = prompt("Introduce el número de escaños que se van a repartir");
    num = numEscanios;
    while (esNumero(num) == false) {
        numEscanios = prompt("Error. Debe ser un número. \n Por favor introduce el número de escaños a repartir.");
        num = numEscanios;
    }
    numEscanios = parseInt(numEscanios);
}

//Función para controlar introducción de votos
function esNumero(num) {
    if (isNaN(num) || num < 0 || num == null) {
        return false;
    } else {
        return true;
    }
}
//Función para calcular el porcentaje de votos
function calculaPorcentaje() {
    for (let i = 0; i < aPartido.length; i++) {
        aPartido[i].calcularPorc();
    }

}


//Función para ordenar partidos
function ordenaPartidos() {
    aPartido.sort(function (a, b) {
        if (a.votos > b.votos) {
            return -1;
        } else if (a.votos < b.votos) {
            return 1;
        } else {
            return 0;
        }
    });
}

//Función para mostrar los datos de la taba I
function tablaI() {
    document.write("<h2 align=\"center\">TABLA I</h2>");//Título de la tabla
    document.write("<table border=1 cellspacing=0 cellpadding=2 style=\"margin: 0 auto;\"> <tr> <th>Partido</th> <th>Votos</th> <th>%Votos</th> </tr>");//Encabezado de la tabla
    for (let i = 0; i < aPartido.length; i++) {
        document.write("<tr> <td>" + aPartido[i].nomPart + "</td> <td>" + aPartido[i].votos + "</td> <td>" + aPartido[i].porcentaje + "</td> </tr>");
    }
    document.write("</table>");
}

//Función para mostrar los datos de la tabla II
function tablaII() {

    let votoDiv;//Resultado de ir dividiendo los votos
    document.write("<h2 align=\"center\">TABLA II</h2>");//Título de la tabla
    document.write("<table border=1 cellspacing=0 cellpadding=2 style=\"margin: 0 auto;\"> <tr> <th> </th> ");//Encabezado de la tabla
    for (let k = 1; k <= numEscanios; k++) {//Bucle para especificar el divisor de los votos
        document.write("<th>Votos/" + k + "</th>");
    }
    document.write("</tr>");//Final del encabezado de la tabla

    for (let i = 0; i < aPartido.length; i++) {//Introducción de datos

        if (aPartido[i].porcentaje >= 3) {
            document.write("<tr> <td>" + aPartido[i].nomPart + "</td> ");//Se introduce el nombre del partido en la tabla
            aVotos[i] = new Array();
            for (let j = 0; j < numEscanios; j++) {

                votoDiv = aPartido[i].votos / (j + 1);//Se hace la división de los votos
                votoDiv = votoDiv.toFixed(2);//Saca dos decimales
                aVotos[i].push([votoDiv, i]);
                document.write("<td>" + votoDiv + "</td>");//Se introduce el resultado en la tabla
            }
            document.write("</tr>");

        }

    }

    document.write("</table>");

}


//Función para que el array contenga todos los votos
function votos() {
    for (let i = 0; i < aVotos.length; i++) {
        aTotalVotos = aTotalVotos.concat(aVotos[i]);

    }
}

//Función para ordenar los votos
function ordenarVotos() {
    aTotalVotos.sort(function (a, b) {
        return b[0] - a[0];
    });
}



//Función para asignar escaños
function reparteEscanios() {

    for (let i = 0; i < numEscanios; i++) {
        aReparteEscanios.push(aTotalVotos[i]);
    }

    for (var i = 0; i < aPartido.length; i++) {
        aPartido[i].escanios = 0;
        for (let j = 0; j < aReparteEscanios.length; j++) {
            if (aReparteEscanios[j][1] == [i] && [i] <= aPartido.length) {
                aPartido[i].escanios = aPartido[i].escanios + 1;
            }
        }

    }

}


//Función para crear la tabla III
function tablaIII() {
    document.write("<h2 align=\"center\">TABLA III</h2>");//Título de la tabla
    document.write("<table border=1 cellspacing=0 cellpadding=2 style=\"margin: 0 auto;\"> <tr> <th> Partido </th> <th>Esca&nacute;os");//Encabezado de la tabla
    for (let i = 0; i < aPartido.length; i++) {
        document.write("<tr> <td>" + aPartido[i].nomPart + "</td> <td>" + aPartido[i].escanios + "</td></tr>");

    }
    document.write("</table>");
}


//Llamo a las funciones.
cargaDatos();
calculaPorcentaje();
ordenaPartidos();
tablaI();
tablaII();
votos();
ordenarVotos();
reparteEscanios();
tablaIII();