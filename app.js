//variables
const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1';
const table = document.querySelector(".tbody");


//evento

document.addEventListener('DOMContentLoaded', llamarAPI);


//funciones
function llamarAPI(){
    fetch(url)
        .then(resp => resp.json())
        .then(data => {mostrarHTML(data)})
}

function crearElemento(token,propiedad,prop2,prop3){        

    td = document.createElement("TD");

    if(propiedad == "price_change_percentage_24h"){
        td.textContent = token[propiedad];
        if(token[propiedad]<0){
            td.style.color = "#DC3545";
        }else{
            td.style.color = "#198754";
        }
    }else if(propiedad == "current_price" || propiedad == "market_cap"){
            td.textContent = "$" + token[propiedad];
    }else if(propiedad != "name"){
            td.textContent = token[propiedad];
    }else{
        td.classList.add("td-name");

        img = document.createElement("IMG");
        text = document.createElement("SPAN");
        symbol = document.createElement("SPAN");

        img.setAttribute("src",token[prop2]);
        text.textContent = token[propiedad];
        symbol.textContent = token[prop3].toUpperCase();
        symbol.style.color = "#6c757d";
        
        td.appendChild(img);
        td.appendChild(text);
        td.appendChild(symbol);
    }
    trPadre.appendChild(td);

}

function mostrarHTML(datos){
    datos.forEach(token => {

        trPadre = document.createElement("TR");
        trPadre.classList.add('tbody__row');
        table.appendChild(trPadre);

        crearElemento(token,"market_cap_rank")
        crearElemento(token,"name","image","symbol")
        crearElemento(token,"current_price")
        crearElemento(token,"price_change_percentage_24h")
        crearElemento(token,"market_cap")
    });

}

//buscador

document.addEventListener('keyup', e=>{

    if(e.target.matches(".search")){
        document.querySelectorAll(".tbody__row").forEach(el =>{
            console.log(el.textContent);
            el.textContent.toLowerCase().includes(e.target.value.toLowerCase())
                ?el.classList.remove("filtro")
                :el.classList.add("filtro")
        })
    }
    
})