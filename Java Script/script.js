/* ============================================================
   script.js — Benji & Terry Clínica Integral
   Archivo JavaScript único para todo el proyecto
   ============================================================ */

/* ===== MENÚ RESPONSIVE =====
   El navbar usa flex-wrap para ajustarse automáticamente,
   no requiere JavaScript para el menú.
   ============================= */

/* ============================================================
   FORMULARIO 1 — ESTÉTICA CANINA
   Operación: SUMA de servicios seleccionados
   ============================================================ */
function calcularEstetica() {
    // Validación básica
    const nombre = document.getElementById('nombreDueno');
    const perro  = document.getElementById('nombrePerro');
    let valido = true;

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

    if (!valido) return;

    // Cálculo: SUMA de servicios
    let total = 0;
    if (document.getElementById('bano') && document.getElementById('bano').checked)   total += 100;
    if (document.getElementById('corte') && document.getElementById('corte').checked) total += 80;
    if (document.getElementById('spa') && document.getElementById('spa').checked)     total += 120;

    if (total === 0) {
        alert('Por favor selecciona al menos un servicio.');
        return;
    }

    const resultado = document.getElementById('resultadoEstetica');
    if (resultado) {
        resultado.innerText = 'Total a pagar: $' + total + ' MXN';
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
   FORMULARIO 2 — PENSIÓN CANINA
   Operación: MULTIPLICACIÓN (días × costo por día)
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
   FORMULARIO 3 — TIENDA
   Operaciones: MULTIPLICACIÓN y RESTA (descuento)
   ============================================================ */
function calcularCompra() {
    const productoSelect = document.getElementById('producto');
    const cantidadInput  = document.getElementById('cantidad');
    let valido = true;

    if (!productoSelect || productoSelect.value === '') {
        mostrarError('errorProducto', 'errorProductoMsg');
        valido = false;
    } else {
        ocultarError('errorProducto', 'errorProductoMsg');
    }

    if (!cantidadInput || cantidadInput.value === '' || parseInt(cantidadInput.value) <= 0) {
        mostrarError('errorCantidad', 'errorCantidadMsg');
        valido = false;
    } else {
        ocultarError('errorCantidad', 'errorCantidadMsg');
    }

    if (!valido) return;

    const precio   = parseFloat(productoSelect.value); // PARSEFLOT para precios
    const cantidad = parseInt(cantidadInput.value);
    let total      = precio * cantidad; // MULTIPLICACIÓN

    let descuento = 0;
    if (total > 500) {
        descuento = 50;
        total = total - descuento; // RESTA
    }

    const resultado = document.getElementById('resultadoCompra');
    if (resultado) {
        let texto = 'Total: $' + total.toFixed(2) + ' MXN';
        if (descuento > 0) texto += ' (descuento de $' + descuento + ' aplicado)';
        resultado.innerText = texto;
        resultado.classList.add('visible');
    }
}

/* ============================================================
   FORMULARIO 4 — CITAS MÉDICAS
   Operación: RESTA (cambio = pago - costo)
   ============================================================ */
function calcularCambio() {
    const duenoInput    = document.getElementById('nombreCitaDueno');
    const mascotaInput  = document.getElementById('mascota');
    const consultaSelect = document.getElementById('consulta');
    const pagoInput     = document.getElementById('pago');
    let valido = true;

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

    if (!valido) return;

    const costo = parseInt(consultaSelect.value);
    const pago  = parseInt(pagoInput.value);

    if (isNaN(pago) || pago <= 0) {
        mostrarError('errorPago', 'errorPagoMsg');
        return;
    } else {
        ocultarError('errorPago', 'errorPagoMsg');
    }

    if (pago < costo) {
        alert('El pago recibido es menor al costo de la consulta ($' + costo + ').');
        return;
    }

    const cambio = pago - costo; // RESTA
    mostrarCostoConsulta(costo);

    const resultado = document.getElementById('resultadoCita');
    if (resultado) {
        resultado.innerText = 'Costo: $' + costo + ' | Pago: $' + pago + ' | Cambio: $' + cambio + ' MXN';
        resultado.classList.add('visible');
    }
}

// Muestra el costo al seleccionar tipo de consulta
function mostrarCostoConsulta(costo) {
    const costoSpan = document.getElementById('costoConsulta');
    if (costoSpan) {
        costoSpan.innerText = 'Costo de la consulta: $' + costo + ' MXN';
        costoSpan.style.display = 'block';
    }
}

function actualizarCosto() {
    const consultaSelect = document.getElementById('consulta');
    if (consultaSelect) {
        const costo = parseInt(consultaSelect.value);
        mostrarCostoConsulta(costo);
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