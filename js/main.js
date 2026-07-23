document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  var yearEl = document.querySelector('[data-year]');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  var dolarWidget = document.getElementById('dolarWidget');
  if (dolarWidget) {
    fetch('https://dolarapi.com/v1/dolares/mayorista')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        var fmt = function (n) {
          return n.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0 });
        };
        document.getElementById('dolarCompra').textContent = fmt(data.compra);
        document.getElementById('dolarVenta').textContent = fmt(data.venta);
        document.getElementById('dolarFecha').textContent = 'Actualizado ' + new Date(data.fechaActualizacion).toLocaleString('es-AR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });
        dolarWidget.classList.add('is-ready');
      })
      .catch(function () {
        dolarWidget.style.display = 'none';
      });
  }
});
