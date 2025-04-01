// Cargar los datos cuando la página esté lista
// document.addEventListener('DOMContentLoaded', loadPolicyData);

// Recuperar y rellenar los datos de la póliza desde localStorage
document.addEventListener('DOMContentLoaded', function() {
    const policyData = JSON.parse(localStorage.getItem('policyData'));
    if (policyData) {
        document.getElementById('policyId').value = policyData.id;
        document.getElementById('clientId').value = policyData.clientId;
        document.getElementById('ramo').value = policyData.ramo;
        document.getElementById('productId').value = policyData.productId;
        document.getElementById('description').value = policyData.description;
        localStorage.removeItem('policyData'); // Limpiar el localStorage
    }
});

document.getElementById('updateForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const policyId = document.getElementById('policyId').value;
    const ramo = document.getElementById('ramo').value;
    const productId = document.getElementById('productId').value;
    const clientId = document.getElementById('clientId').value;
    const description = document.getElementById('description').value;
    const updateResult = document.getElementById('updateResult');
    
    const data = {
        ramo: parseInt(ramo),
        productId: parseInt(productId),
        clientId: parseInt(clientId),
        description: description
    };
    
    try {
        const response = await fetch(`https://localhost:7090/api/Policy/Update/${policyId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        
        // Verifica si hay contenido en la respuesta
        const text = await response.text();
        const result = text ? JSON.parse(text) : {};
        
        updateResult.innerHTML = `<p class="success-message">Póliza actualizada correctamente: ${JSON.stringify(result)}</p>`;
        
    } catch (error) {
        console.error('Error:', error);
        updateResult.innerHTML = `
            <div class="error-message">
                <p>Error al actualizar la póliza:</p>
                <p>${error.message}</p>
            </div>
        `;
    }
});