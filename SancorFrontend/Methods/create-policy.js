function toggleProduct() {
    const ramo = document.getElementById("ramo").value;
    const product = document.getElementById("product");
    product.disabled = false;
    product.innerHTML = "";
    if (ramo === "Robo") {
        product.innerHTML = `<option value="electronicos">Robo de equipos electronicos</option>
                            <option value="vivienda">Articulos y Vivienda</option>`;
    } else if (ramo === "Automotores") {
        product.innerHTML = `<option value="operatoria">Operatoria normal</option>`;
    } else {
        product.disabled = true;
    }
}

document.getElementById("myForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    let ramosId = document.getElementById("ramo").value;

    if(ramosId === 'Automotores'){
        ramosId = 200
    }
    else if(ramosId === 'Robo'){
        ramosId = 700
    }

    let productsId = document.getElementById("product").value;

    if(productsId === 'operatoria'){
        productsId = 17
    }
    else if(productsId === 'electronicos'){
        productsId = 44
    }
    else if(productsId === 'vivienda'){
        productsId = 85
    }

    const data = {
        ramo: ramosId,
        productId: productsId,
        clientId: Math.floor(Math.random() * 99) + 1, //Numero aleatorio provisional hasta crear la logica de clientId / document.getElementById("nombre").value,
        description: "prueba"
        //apellido: document.getElementById("apellido").value,
        //fechaNacimiento: document.getElementById("fecha").value,
        //intermediario: document.getElementById("intermediario").value
    };

    try {
        const response = await fetch("https://localhost:7090/api/Policy/Insert", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            const result = await response.json();
            alert("Datos enviados correctamente: " + JSON.stringify(result));
        } else {
            alert("Error al enviar los datos: " + response.status);
        }
    } catch (error) {
        console.error("Error de conexión:", error);
        alert("No se pudo conectar con el servidor.");
    }
});
