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

  var waBtn = document.querySelector('.whatsapp-float');
  if (waBtn) {
    var waIcon = waBtn.querySelector('svg') ? waBtn.querySelector('svg').outerHTML : '';
    var waMenu = document.createElement('div');
    waMenu.className = 'whatsapp-menu';
    waMenu.innerHTML =
      '<div class="whatsapp-menu-title">Escribinos por WhatsApp</div>' +
      '<a href="https://wa.me/5491153019616" target="_blank" rel="noopener">' + waIcon +
        '<span><strong>Oficina ZFLP – Depósito</strong><small>(+54) 011-5301-9616</small></span></a>' +
      '<a href="https://wa.me/5491130881320" target="_blank" rel="noopener"><svg class="wa-phone" viewBox="0 0 24 24"><path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z"/></svg>' +
        '<span><strong>Comercial</strong><small>(+54) 9-11-3088-1320</small></span></a>';
    document.body.appendChild(waMenu);
    waBtn.addEventListener('click', function (e) {
      e.preventDefault();
      waMenu.classList.toggle('open');
    });
    document.addEventListener('click', function (e) {
      if (!waMenu.contains(e.target) && !waBtn.contains(e.target)) {
        waMenu.classList.remove('open');
      }
    });
  }
});
