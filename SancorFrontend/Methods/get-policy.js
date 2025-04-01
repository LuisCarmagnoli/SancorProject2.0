document.getElementById('searchForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const policyId = document.getElementById('policyId').value;
    const resultsContainer = document.getElementById('results');
    
    // Mostrar indicador de carga
    resultsContainer.innerHTML = '<p class="loading">Buscando póliza...</p>';
    
    try {
        const response = await fetch(`https://localhost:7090/api/Policy/GetById/${policyId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        
        const policy = await response.json();
        
        // Mostrar los resultados
        if (policy) {
            // Convertir los IDs de ramo a texto
            let ramoText = 'Desconocido';
            if (policy.ramo === 200) {
                ramoText = 'Automotores';
            } else if (policy.ramo === 700) {
                ramoText = 'Robo';
            }

            // Convertir los IDs de producto a texto
            let productoText = 'Desconocido';
            if (policy.productId === 17) {
                productoText = 'Operatoria normal';
            } else if (policy.productId === 44) {
                productoText = 'Robo de equipos electrónicos';
            } else if (policy.productId === 85) {
                productoText = 'Artículos y Vivienda';
            }

            resultsContainer.innerHTML = `
                <div class="policy-details">
                    <h3>Detalles de la Póliza</h3>
                    <div class="policy-info">
                        <p><strong>ID de Cliente:</strong> ${policy.clientId}</p>
                        <p><strong>Ramo:</strong> ${ramoText} (${policy.ramo})</p>
                        <p><strong>Producto:</strong> ${productoText} (${policy.productId})</p>
                        <p><strong>Descripción:</strong> ${policy.description || 'No disponible'}</p>
                    </div>
                </div>
            `;
        } else {
            resultsContainer.innerHTML = `
                <p class="no-results">No se encontró la póliza con ID: ${policyId}</p>
            `;
        }
        
    } catch (error) {
        console.error('Error:', error);
        resultsContainer.innerHTML = `
            <div class="error-message">
                <p>Error al buscar la póliza:</p>
                <p>${error.message}</p>
                <p>Por favor, verifique que:</p>
                <ul>
                    <li>El ID ingresado sea válido</li>
                    <li>El servidor esté funcionando</li>
                    <li>La conexión a internet esté activa</li>
                </ul>
            </div>
        `;
    }
});
