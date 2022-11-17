//variables
const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cdogecoin%2Ccardano%2Cbinancecoin%2Cmatic-network%2Cpolkadot%2Csolana%2Ctron%2Cuniswap&vs_currencies=usd%2Cars%2Ceur';

//selecciono elementos
const selectionFiat = document.querySelector(".selectFiat");
const selectionCripto = document.querySelector(".selectCripto");
const cotizacionResultado = document.querySelector(".cotizacion__resultado");


//evento
document.addEventListener('DOMContentLoaded', llamarAPI);
const button = document.querySelector(".cotizacion__button");

//funciones
function llamarAPI(){
    fetch(url)
        .then(resp => resp.json())
        .then(data => {
            crearOpcion(data);
            button.addEventListener('click', ()=>{
                mostrarResultado(data);
            })
        })
}

function crearOpcion(datos){
    for (key in datos){
        option = document.createElement("OPTION");
        option.setAttribute("value",key);

        if (key == "binancecoin"){
            option.textContent = "BNB";
        }else if(key == "matic-network"){
            option.textContent = "Polygon";
        }else if(key == "tron"){
            option.textContent = "TRON";
        }
        else{
            option.textContent = key[0].toUpperCase() + key.substring(1);
        }
        selectionCripto.appendChild(option);
    }

}

function mostrarResultado(datos){    
    var nombreCripto = selectionCripto.options[selectionCripto.selectedIndex].textContent;
    var cripto = selectionCripto.options[selectionCripto.selectedIndex].value;
    var moneda = selectionFiat.options[selectionFiat.selectedIndex].value;

    cotizacionResultado.textContent = `La cotizacion de ${nombreCripto} es de ${datos[cripto][moneda]} ${moneda.toUpperCase()} en este momento`;
}



