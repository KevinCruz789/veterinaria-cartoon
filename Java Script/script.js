/* ============================================================
   ESTÉTICA — SUMA DE SERVICIOS
   ============================================================ */
function calcularEstetica() {
    var nombre = document.getElementById('nombreDueno');
    var perro  = document.getElementById('nombrePerro');
    var tamano = document.getElementById('tamanoPerro');
    var valido = true;

    if (!nombre || nombre.value.trim() === '') {
        mostrarError('errorNombreDueno', 'errorNombreDuenoMsg');
        valido = false;
    } else {
        ocultarError('errorNombreDueno', 'errorNombreDuenoMsg');
    }

    if (!perro || perro.value.trim() === '') {
        mostrarError('errorNombrePerro', 'errorNombrePerroMsg');
        valido = false;
    } else {
        ocultarError('errorNombrePerro', 'errorNombrePerroMsg');
    }

    if (!tamano || tamano.value === '') {
        mostrarError('errorTamano', 'errorTamanoMsg');
        valido = false;
    } else {
        ocultarError('errorTamano', 'errorTamanoMsg');
    }

    if (!valido) return;

    // Cálculo: SUMA de servicios seleccionados
    var total    = 0;
    var desglose = [];

    if (document.getElementById('bano') && document.getElementById('bano').checked) {
        total += 100;
        desglose.push('Baño $100');
    }
    if (document.getElementById('corte') && document.getElementById('corte').checked) {
        total += 80;
        desglose.push('Corte de pelo $80');
    }
    if (document.getElementById('unas') && document.getElementById('unas').checked) {
        total += 50;
        desglose.push('Corte de uñas $50');
    }
    if (document.getElementById('oidos') && document.getElementById('oidos').checked) {
        total += 60;
        desglose.push('Limpieza de oídos $60');
    }

    if (total === 0) {
        mostrarError('errorServicios', 'errorServiciosMsg');
        return;
    } else {
        ocultarError('errorServicios', 'errorServiciosMsg');
    }

    var mascota   = perro.value.trim();
    var resultado = document.getElementById('resultadoEstetica');
    if (resultado) {
        resultado.innerText = mascota + ' — Servicios: ' + desglose.join(' + ') + ' = Total: $' + total + ' MXN';
        resultado.classList.add('visible');
    }
}

/* ============================================================
   HOSPEDAJE — MOSTRAR CAMPOS SEGÚN ESPECIE
   ============================================================ */
function actualizarPlanes() {
    var especie      = document.getElementById('especiePension').value;
    var grupoTamano  = document.getElementById('grupo-tamano');
    var grupoPlanGato = document.getElementById('grupo-plan-gato');
    var costoDia     = document.getElementById('costoDia');

    if (grupoTamano)   grupoTamano.style.display   = (especie === 'perro') ? 'flex' : 'none';
    if (grupoPlanGato) grupoPlanGato.style.display  = (especie === 'gato')  ? 'flex' : 'none';
    if (costoDia)      costoDia.value = '';
}

function actualizarCostoDia() {
    var especie   = document.getElementById('especiePension') ? document.getElementById('especiePension').value : '';
    var costoDia  = document.getElementById('costoDia');
    var valor     = 0;

    if (especie === 'perro') {
        var sel = document.getElementById('tamanoPension');
        if (sel) valor = parseInt(sel.value) || 0;
    } else if (especie === 'gato') {
        var sel = document.getElementById('planGato');
        if (sel) valor = parseInt(sel.value) || 0;
    }

    if (costoDia && valor > 0) {
        costoDia.value = '$' + valor + ' MXN por día';
    }
}

/* ============================================================
   HOSPEDAJE — MULTIPLICACIÓN (días × costo por día)
   ============================================================ */
function calcularPension() {
    var nombreInput  = document.getElementById('nombrePensionPerro');
    var especieInput = document.getElementById('especiePension');
    var diasInput    = document.getElementById('dias');
    var valido = true;

    if (!nombreInput || nombreInput.value.trim() === '') {
        mostrarError('errorPensionPerro', 'errorPensionPerroMsg');
        valido = false;
    } else {
        ocultarError('errorPensionPerro', 'errorPensionPerroMsg');
    }

    if (!especieInput || especieInput.value === '') {
        mostrarError('errorEspecie', 'errorEspecieMsg');
        valido = false;
    } else {
        ocultarError('errorEspecie', 'errorEspecieMsg');
    }

    if (!diasInput || diasInput.value === '' || parseInt(diasInput.value) <= 0) {
        mostrarError('errorDias', 'errorDiasMsg');
        valido = false;
    } else {
        ocultarError('errorDias', 'errorDiasMsg');
    }

    if (!valido) return;

    // Obtener costo según especie
    var especie = especieInput.value;
    var costo   = 0;

    if (especie === 'perro') {
        var tamano = document.getElementById('tamanoPension');
        if (!tamano || tamano.value === '') { alert('Selecciona el tamaño del perro.'); return; }
        costo = parseInt(tamano.value);
    } else if (especie === 'gato') {
        var plan = document.getElementById('planGato');
        if (!plan || plan.value === '') { alert('Selecciona el plan para el gato.'); return; }
        costo = parseInt(plan.value);
    }

    var dias  = parseInt(diasInput.value);
    var total = dias * costo; // MULTIPLICACIÓN

    var mascota   = nombreInput.value.trim();
    var resultado = document.getElementById('resultadoPension');
    if (resultado) {
        resultado.innerText = mascota + ' — ' + dias + ' día(s) × $' + costo + '/día = Total: $' + total + ' MXN';
        resultado.classList.add('visible');
    }
}

/* ============================================================
   TIENDA — CARRITO DE COMPRA — MULTIPLICACIÓN (precio × cantidad) y RESTA (descuento)
   ============================================================ */

var carrito = []; // Array global que almacena los productos

function agregarAlCarrito(nombre, precio) {
    // Buscar si el producto ya existe en el carrito
    var indice = -1;
    for (var i = 0; i < carrito.length; i++) {
        if (carrito[i].nombre === nombre) {
            indice = i;
            break;
        }
    }

    if (indice >= 0) {
        // Si ya existe, aumentar cantidad
        carrito[indice].cantidad += 1;
    } else {
        // Si no existe, agregarlo
        carrito.push({ nombre: nombre, precio: precio, cantidad: 1 });
    }

    renderizarCarrito();

    // Scroll suave al carrito
    var seccionCarrito = document.getElementById('formulario-tienda');
    if (seccionCarrito) {
        seccionCarrito.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function cambiarCantidad(indice, delta) {
    carrito[indice].cantidad += delta;
    if (carrito[indice].cantidad <= 0) {
        carrito.splice(indice, 1);
    }
    renderizarCarrito();
}

function eliminarProducto(indice) {
    carrito.splice(indice, 1);
    renderizarCarrito();
}

function vaciarCarrito() {
    carrito = [];
    renderizarCarrito();
    var resultado = document.getElementById('resultadoCompra');
    if (resultado) {
        resultado.classList.remove('visible');
        resultado.innerText = '';
    }
}

function renderizarCarrito() {
    var vacio     = document.getElementById('carrito-vacio');
    var contenido = document.getElementById('carrito-contenido');
    var tbody     = document.getElementById('carrito-items');

    if (carrito.length === 0) {
        if (vacio)     vacio.style.display     = 'block';
        if (contenido) contenido.style.display = 'none';
        return;
    }

    if (vacio)     vacio.style.display     = 'none';
    if (contenido) contenido.style.display = 'block';

    // Renderizar filas
    tbody.innerHTML = '';
    var subtotal = 0;

    for (var i = 0; i < carrito.length; i++) {
        var item       = carrito[i];
        var itemTotal  = item.precio * item.cantidad; // MULTIPLICACIÓN
        subtotal      += itemTotal;

        var tr = document.createElement('tr');
        tr.innerHTML =
            '<td>' + item.nombre + '</td>' +
            '<td>$' + item.precio + '</td>' +
            '<td>' +
                '<div class="td-cantidad">' +
                    '<button class="btn-cant" onclick="cambiarCantidad(' + i + ', -1)">−</button>' +
                    item.cantidad +
                    '<button class="btn-cant" onclick="cambiarCantidad(' + i + ', 1)">+</button>' +
                '</div>' +
            '</td>' +
            '<td>$' + itemTotal + '</td>' +
            '<td><button class="btn-eliminar" onclick="eliminarProducto(' + i + ')"><i class="fas fa-trash"></i></button></td>';
        tbody.appendChild(tr);
    }

    // Calcular descuento y total
    var descuento    = 0;
    var filaDescuento = document.getElementById('fila-descuento');

    if (subtotal > 500) {
        descuento = 50;
        if (filaDescuento) filaDescuento.style.display = 'flex';
    } else {
        if (filaDescuento) filaDescuento.style.display = 'none';
    }

    var total = subtotal - descuento; // RESTA

    document.getElementById('carrito-subtotal').innerText = '$' + subtotal + ' MXN';
    document.getElementById('carrito-total').innerText    = '$' + total + ' MXN';
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío.');
        return;
    }

    // Calcular totales
    var subtotal  = 0;
    for (var i = 0; i < carrito.length; i++) {
        subtotal += carrito[i].precio * carrito[i].cantidad;
    }
    var descuento = subtotal > 500 ? 50 : 0;
    var total     = subtotal - descuento;

    var resultado = document.getElementById('resultadoCompra');
    if (resultado) {
        var msg = '¡Compra registrada! ' + carrito.length + ' producto(s) — Subtotal: $' + subtotal;
        if (descuento > 0) msg += ' — Descuento: -$' + descuento;
        msg += ' — Total: $' + total + ' MXN';
        resultado.innerText = msg;
        resultado.classList.add('visible');
    }
}

/* ============================================================
   CITAS MÉDICAS — RESTA (cambio = pago - costo)
   ============================================================ */
function calcularCambio() {
    var duenoInput     = document.getElementById('nombreCitaDueno');
    var mascotaInput   = document.getElementById('mascota');
    var consultaSelect = document.getElementById('consulta');
    var pagoInput      = document.getElementById('pago');
    var valido = true;

    if (!duenoInput || duenoInput.value.trim() === '') {
        mostrarError('errorCitaDueno', 'errorCitaDuenoMsg');
        valido = false;
    } else {
        ocultarError('errorCitaDueno', 'errorCitaDuenoMsg');
    }

    if (!mascotaInput || mascotaInput.value.trim() === '') {
        mostrarError('errorMascota', 'errorMascotaMsg');
        valido = false;
    } else {
        ocultarError('errorMascota', 'errorMascotaMsg');
    }

    if (!consultaSelect || consultaSelect.value === '') {
        mostrarError('errorConsulta', 'errorConsultaMsg');
        valido = false;
    } else {
        ocultarError('errorConsulta', 'errorConsultaMsg');
    }

    if (!valido) return;

    var costo = parseInt(consultaSelect.value);
    var pago  = parseInt(pagoInput.value);

    if (isNaN(pago) || pago <= 0) {
        mostrarError('errorPago', 'errorPagoMsg');
        return;
    } else {
        ocultarError('errorPago', 'errorPagoMsg');
    }

    if (pago < costo) {
        alert('El pago recibido ($' + pago + ') es menor al costo de la consulta ($' + costo + ').');
        return;
    }

    var cambio  = pago - costo; // RESTA
    var dueno   = duenoInput.value.trim();
    var mascota = mascotaInput.value.trim();

    var resultado = document.getElementById('resultadoCita');
    if (resultado) {
        resultado.innerText = 'Cita registrada para ' + dueno + ' y su mascota ' + mascota +
            ' — Costo: $' + costo + ' | Pago: $' + pago + ' | Cambio: $' + cambio + ' MXN';
        resultado.classList.add('visible');
    }
}

// Actualiza el campo de costo al seleccionar tipo de consulta
function actualizarCosto() {
    var consultaSelect = document.getElementById('consulta');
    var costoInput     = document.getElementById('costoConsulta');
    if (consultaSelect && costoInput && consultaSelect.value !== '') {
        var costo = parseInt(consultaSelect.value);
        costoInput.value = '$' + costo + ' MXN';
    }
}

/* ============================================================
   UTILIDADES DE VALIDACIÓN
   ============================================================ */
function mostrarError(inputId, msgId) {
    const input = document.getElementById(inputId);
    const msg   = document.getElementById(msgId);
    if (input) input.classList.add('input-error');
    if (msg)   msg.classList.add('visible');
}

function ocultarError(inputId, msgId) {
    const input = document.getElementById(inputId);
    const msg   = document.getElementById(msgId);
    if (input) input.classList.remove('input-error');
    if (msg)   msg.classList.remove('visible');
}