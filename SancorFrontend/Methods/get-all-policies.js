document.addEventListener('DOMContentLoaded', async function() {
    const resultsContainer = document.getElementById('results');
    
    try {
        const response = await fetch('https://localhost:7090/api/Policy/GetAll', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        
        const policies = await response.json();
        
        if (Array.isArray(policies) && policies.length > 0) {
            resultsContainer.innerHTML = ''; // Limpiar resultados anteriores
            policies.forEach(policy => {
                const policyCard = document.createElement('div');
                policyCard.className = 'policy-card';
                policyCard.setAttribute('data-id', policy.id);
                policyCard.innerHTML = `
                    <div class="policy-info">
                        <h3>Póliza #${policy.id}</h3>
                        <p><strong>ID de Cliente:</strong> ${policy.clientId}</p>
                        <p><strong>Ramo:</strong> ${policy.ramo}</p>
                        <p><strong>Producto:</strong> ${policy.productId}</p>
                        <p><strong>Descripción:</strong> ${policy.description || 'No disponible'}</p>
                    </div>
                    <div class="policy-actions">
                        <button class="edit-button" onclick="editPolicy(${policy.id})">Editar</button>
                        <button class="delete-button" onclick="deletePolicy(${policy.id})">Eliminar</button>
                    </div>
                `;
                resultsContainer.appendChild(policyCard);
            });
        } else {
            resultsContainer.innerHTML = '<p class="no-results">No se encontraron pólizas.</p>';
        }
        
    } catch (error) {
        console.error('Error:', error);
        resultsContainer.innerHTML = `
            <div class="error-message">
                <p>Error al obtener las pólizas:</p>
                <p>${error.message}</p>
            </div>
        `;
    }
});

// Función para eliminar una póliza
async function deletePolicy(policyId) {
    if (confirm('¿Estás seguro de que deseas eliminar esta póliza?')) {
        try {
            const response = await fetch(`https://localhost:7090/api/Policy/Delete/${policyId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            
            alert('Póliza eliminada correctamente.');
            location.reload(); // Recargar la página para actualizar la lista
            
        } catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar la póliza.');
        }
    }
}

// Función para editar una póliza
function editPolicy(policyId) {
    const policyElement = document.querySelector(`.policy-card[data-id='${policyId}']`);
    const policyData = {
        id: policyId,
        clientId: policyElement.querySelector('p:nth-child(2)').textContent.split(': ')[1],
        ramo: policyElement.querySelector('p:nth-child(3)').textContent.split(': ')[1],
        productId: policyElement.querySelector('p:nth-child(4)').textContent.split(': ')[1],
        description: policyElement.querySelector('p:nth-child(5)').textContent.split(': ')[1]
    };
    localStorage.setItem('policyData', JSON.stringify(policyData));
    window.location.href = 'update-policy.html';
}
