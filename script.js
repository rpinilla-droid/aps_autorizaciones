document.addEventListener('DOMContentLoaded', () => {
    // Manejo de Pestañas
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Desactivar todos los botones y contenidos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Activar el botón y el contenido correspondiente
            const tabId = button.getAttribute('data-tab');
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Simulación de Acciones (Adicionar, Modificar, Anular)
    document.getElementById('adicionar-btn').addEventListener('click', () => {
        alert('Procedimiento Adicionar: Habilitando el formulario para nuevo registro y asignando número de autorización temporal. (F2) [cite: 419, 420]');
        // Lógica para habilitar campos y limpiar datos
    });

    document.getElementById('modificar-btn').addEventListener('click', () => {
        alert('Procedimiento Modificar: Habilitando la edición del registro en pantalla. (F3) [cite: 441]');
        // Lógica para habilitar edición
    });

    document.getElementById('anular-btn').addEventListener('click', () => {
        // Validación según el manual: no se puede anular si tiene auditoría concurrente o retrospectiva o reclamada 
        if (confirm('¿Está seguro que desea anular la autorización? Se solicitarán credenciales y motivo.')) {
            alert('Procedimiento Anular: Desplegando pantalla auxiliar para credenciales y motivo. (F4) [cite: 460]');
        }
    });
    
    document.getElementById('casos-btn').addEventListener('click', () => {
        alert('Abriendo pestaña o ventana auxiliar para crear/seleccionar Caso (requerido para hospitalización, accidente de tránsito o cirugía)[cite: 462, 464].');
    });

    document.getElementById('excepcion-btn').addEventListener('click', () => {
        alert('Función para crear una Excepción y anular una restricción generada por el sistema (si el usuario está habilitado).');
    });
});
