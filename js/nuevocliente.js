(function () {
    

    document.addEventListener('DOMContentLoaded', () => {

        conectarDB();
        formulario.addEventListener('submit', validarCliente);
    });

    

    function validarCliente(e) {
        e.preventDefault();
        console.log('validando');
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if (nombre === '' || email === '' || isNaN(telefono) === true || empresa === '') {
            console.log('faltan campos');
            imprimirAlerta('Llene bien los campos', 'error');
        }

        const cliente = {
            nombre, email, telefono, empresa
        };
        cliente.id = Date.now();
        console.log(cliente);
        crearNuevoCliente(cliente);
    }

    function crearNuevoCliente(cliente) {
        let transaction = DB.transaction(['crm'], 'readwrite');
        console.log(transaction);
        
        const objectStore = transaction.objectStore('crm');

        objectStore.add(cliente);

        transaction.onerror = function(){
            imprimirAlerta('Error','error');
        }

        transaction.oncomplete = function(){
            console.log('cliente agregado');
            imprimirAlerta('Cliente agregado correctamente');

            setTimeout(()=>{
                window.location.href = 'index.html';
            },2000);
        }
    }

    





})();   