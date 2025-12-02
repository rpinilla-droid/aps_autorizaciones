document.addEventListener('DOMContentLoaded', () => {
    // --- Configuración de Roles ---
    const roles = {
        // Rol con acceso total
        auditor: ['telefonia', 'precertificacion', 'reembolso', 'reclamo'],
        // Rol limitado (Caja/Atención primaria)
        caja: ['telefonia', 'precertificacion'],
        // Rol solo para Reembolsos
        reembolso: ['reembolso'],
        // Rol para IVR/Web Service (solo ver y modificar)
        sistema: ['ivr', 'webservice', 'importadas'] 
    };

    // --- Lógica de Login (Solo si estamos en login.html) ---
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value.toLowerCase();
            const password = document.getElementById('password').value;
            const loginMessage = document.getElementById('login-message');
            
            // Simulación de validación
            if (password === '1234' && roles[username]) {
                localStorage.setItem('userRole', username);
                localStorage.setItem('userPermissions', JSON.stringify(roles[username]));
                
                // Simular el usuario que se muestra en el status bar
                localStorage.setItem('loggedInUser', username.toUpperCase()); 
                
                window.location.href = 'index.html'; 
            } else {
                loginMessage.textContent = 'Credenciales o rol no válidos. Pruebe con "auditor", "caja", o "reembolso" y contraseña 1234.';
                loginMessage.style.display = 'block';
            }
        });
    }

    // --- Lógica de la Aplicación Principal (Solo si estamos en index.html) ---
    const mainContent = document.querySelector('main');
    if (mainContent) {
        // 1. Verificar autenticación
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
            window.location.href = 'login.html'; // Redirigir si no hay sesión
            return;
        }

        // 2. Cargar permisos y configurar UI
        const userPermissions = JSON.parse(localStorage.getItem('userPermissions') || '[]');
        const authTypeSelector = document.getElementById('auth-type-selector');
        const statusUser = document.getElementById('status-user');
        
        // Actualizar el usuario en la barra de estado
        statusUser.textContent = loggedInUser; 
        
        // Mapeo de tipos de autorización
        const optionsMap = {
            'telefonia': 'Autorizaciones Telefónicas',
            'precertificacion': 'Autorizaciones Pre-Certificadas',
            'reembolso': 'Autorizaciones de Reembolsos',
            'reclamo': 'Autorizaciones Reclamos No Autorizados',
            'ivr': 'Autorizaciones IVR (Solo Modificar)',
            'webservice': 'Autorizaciones Web Service (Solo Modificar)',
            'importadas': 'Autorizaciones Importadas (Solo Modificar)'
        };

        function loadAuthorizationOptions() {
            authTypeSelector.innerHTML = '';
            
            userPermissions.forEach(permission => {
                const option = document.createElement('option');
                option.value = permission;
                option.textContent = optionsMap[permission] || permission;
                authTypeSelector.appendChild(option);
            });
        }
        
        // 3. Control de acceso por tipo de autorización seleccionada
        function updatePermissionsForType(selectedType) {
            const isReadWrite = ['telefonia', 'precertificacion', 'reembolso', 'reclamo'].includes(selectedType);
            const isReadOnly = ['ivr', 'webservice', 'importadas'].includes(selectedType);

            // Botones de acción
            document.getElementById('adicionar-btn').disabled = !isReadWrite;
            document.getElementById('modificar-btn').disabled = !isReadWrite && !isReadOnly; // Permitir modificar en ReadOnly
            document.getElementById('anular-btn').disabled = isReadOnly; // No se anula en IVR/Web Service/Importadas (solo corrección)
            document.getElementById('casos-btn').disabled = !isReadWrite;
            document.getElementById('excepcion-btn').disabled = !isReadWrite;
            
            document.getElementById('status-text').textContent = isReadWrite ? 'Modo Escritura' : 'Modo Consulta';
        }

        loadAuthorizationOptions();
        updatePermissionsForType(authTypeSelector.value); 
        authTypeSelector.addEventListener('change', (e) => {
            updatePermissionsForType(e.target.value);
            alert(`Cambiando a: ${optionsMap[e.target.value] || e.target.value}. Se han ajustado los permisos de los botones.`);
        });

        // 4. Manejo de Pestañas
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                tabButtons.forEach(btn => btn.classList.remove('active'));
                tabContents.forEach(content => content.classList.remove('active'));

                const tabId = button.getAttribute('data-tab');
                button.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });

        // 5. Simulación de Acciones
        document.getElementById('adicionar-btn').addEventListener('click', () => {
            alert(`Procedimiento Adicionar: Iniciando adición para ${optionsMap[authTypeSelector.value]}. (F2)`);
        });

        document.getElementById('modificar-btn').addEventListener('click', () => {
            alert('Procedimiento Modificar: Habilitando la edición del registro en pantalla. (F3)');
        });

        document.getElementById('anular-btn').addEventListener('click', () => {
            [cite_start]if (confirm('Advertencia: ¿Está seguro que desea anular la autorización? Una autorización con auditoria concurrente, o con auditoria retrospectiva o reclamada no es posible ser anulada. (F4) [cite: 453, 697, 948, 1225, 1450, 1647, 1849, 2058]')) {
                alert('Procedimiento Anular: Desplegando pantalla auxiliar para credenciales y motivo.');
            }
        });
        
        document.getElementById('logout-btn').addEventListener('click', () => {
            localStorage.clear();
            window.location.href = 'login.html';
        });

    }
});
