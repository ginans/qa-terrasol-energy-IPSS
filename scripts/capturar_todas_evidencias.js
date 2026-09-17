const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

async function run() {
  console.log('Iniciando captura de evidencias con Playwright...');
  
  // Crear carpetas de destino si no existen
  const baseDir = path.resolve(__dirname, '..', 'evidencias');
  const tsDir = path.join(baseDir, 'terrasol');
  const ewDir = path.join(baseDir, 'energy_and_water');
  const defDir = path.join(baseDir, 'defectos');

  [baseDir, tsDir, ewDir, defDir].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });

  // Lanzar navegador usando Microsoft Edge nativo
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  
  // -------------------------------------------------------------
  // 1. TERRASOL PARCELAS
  // -------------------------------------------------------------
  console.log('Capturando evidencias de TerraSol Parcelas...');
  const desktopCtx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const tsPage = await desktopCtx.newPage();

  // HU01 - Navegación Intuitiva
  await tsPage.goto('https://clinicatecnologica.cl/terrasol/index.html', { waitUntil: 'networkidle' });
  await tsPage.screenshot({ path: path.join(tsDir, 'HU01_navegacion_menu.png') });

  // HU02 - Compatibilidad Móvil (375x667)
  const mobileCtx = await browser.newContext({ viewport: { width: 375, height: 667 }, isMobile: true });
  const tsMobile = await mobileCtx.newPage();
  await tsMobile.goto('https://clinicatecnologica.cl/terrasol/index.html', { waitUntil: 'networkidle' });
  await tsMobile.screenshot({ path: path.join(tsDir, 'HU02_compatibilidad_movil.png') });
  await mobileCtx.close();

  // HU03 - Galería de Imágenes y Videos
  const galeriaSection = tsPage.locator('#galeria');
  if (await galeriaSection.count() > 0) {
    await galeriaSection.scrollIntoViewIfNeeded();
    await tsPage.screenshot({ path: path.join(tsDir, 'HU03_galeria_multimedia.png') });
  }

  // HU04 - Información de Contacto
  await tsPage.goto('https://clinicatecnologica.cl/terrasol/contacto.html', { waitUntil: 'networkidle' });
  const contactCard = tsPage.locator('.contact-card');
  if (await contactCard.count() > 0) {
    await contactCard.scrollIntoViewIfNeeded();
    await tsPage.screenshot({ path: path.join(tsDir, 'HU04_contacto.png') });
  }

  // HU05 - Formulario de Solicitud (Llenado)
  await tsPage.fill('#nombre', 'Gina Norambuena');
  await tsPage.fill('#telefono', '+56912345678');
  await tsPage.fill('#email', 'gina.norambuena@example.cl');
  await tsPage.selectOption('#parcela', 'Coihue');
  await tsPage.fill('#mensaje', 'Deseo coordinar visita a la parcela este fin de semana.');
  await tsPage.check('input[name="privacidad"]');
  await tsPage.screenshot({ path: path.join(tsDir, 'HU05_formulario_solicitud.png') });

  // HU06 / DEF-01 - Fuga de PII en GET y pantalla de confirmación
  await tsPage.click('button[type="submit"]');
  await tsPage.waitForLoadState('networkidle');
  await tsPage.screenshot({ path: path.join(tsDir, 'HU06_seguridad_get_resultado.png') });
  await tsPage.screenshot({ path: path.join(defDir, 'DEF-01_terrasol_fuga_pii_get.png') });

  // HU07 - Preguntas Frecuentes
  await tsPage.goto('https://clinicatecnologica.cl/terrasol/faq.html', { waitUntil: 'networkidle' });
  // Clic en la primera pregunta
  const q1 = tsPage.locator('button[data-faq]').first();
  await q1.click();
  await tsPage.waitForTimeout(300);
  await tsPage.screenshot({ path: path.join(tsDir, 'HU07_faq_acordeon.png') });

  // DEF-03 - Enlace roto 404 en menú FAQ
  const parcelasLinkInFaq = tsPage.locator('header nav a', { hasText: 'Parcelas' });
  await parcelasLinkInFaq.click();
  await tsPage.waitForLoadState('load');
  await tsPage.screenshot({ path: path.join(defDir, 'DEF-03_terrasol_enlace_roto_404.png') });

  await desktopCtx.close();

  // -------------------------------------------------------------
  // 2. ENERGY & WATER ECOPARCELAS
  // -------------------------------------------------------------
  console.log('Capturando evidencias de Energy & Water EcoParcelas...');
  const ewCtx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const ewPage = await ewCtx.newPage();

  // HU01 - Navegación Intuitiva
  await ewPage.goto('https://clinicatecnologica.cl/energyandwater/index.html', { waitUntil: 'networkidle' });
  await ewPage.screenshot({ path: path.join(ewDir, 'HU01_navegacion_menu.png') });

  // HU02 - Compatibilidad Móvil (375x667)
  const ewMobileCtx = await browser.newContext({ viewport: { width: 375, height: 667 }, isMobile: true });
  const ewMobile = await ewMobileCtx.newPage();
  await ewMobile.goto('https://clinicatecnologica.cl/energyandwater/index.html#parcelas', { waitUntil: 'networkidle' });
  await ewMobile.screenshot({ path: path.join(ewDir, 'HU02_compatibilidad_movil.png') });
  await ewMobileCtx.close();

  // HU03 - Galería Multimedia
  const ewGaleria = ewPage.locator('#galeria');
  await ewGaleria.scrollIntoViewIfNeeded();
  await ewPage.screenshot({ path: path.join(ewDir, 'HU03_galeria_multimedia.png') });

  // HU04 - Información de Contacto
  const ewContacto = ewPage.locator('#contacto .contact-card');
  await ewContacto.scrollIntoViewIfNeeded();
  await ewPage.screenshot({ path: path.join(ewDir, 'HU04_contacto.png') });

  // HU05 - Formulario de Solicitud (Llenado y Envío exitoso)
  const ewForm = ewPage.locator('#visit-form');
  await ewForm.scrollIntoViewIfNeeded();
  await ewPage.fill('#name', 'Gina Norambuena');
  await ewPage.fill('#phone', '+56223456789');
  await ewPage.fill('#email', 'gina.norambuena@example.com');
  await ewPage.selectOption('#lot', 'EW-02 Agua Clara');
  await ewPage.fill('#message', 'Solicitud de visita técnica.');
  await ewPage.click('#visit-form button[type="submit"]');
  await ewPage.waitForTimeout(300);
  await ewPage.screenshot({ path: path.join(ewDir, 'HU05_formulario_solicitud.png') });

  // DEF-02 - Almacenamiento en LocalStorage
  const storageData = await ewPage.evaluate(() => {
    return {
      name: localStorage.getItem('ew_demo_name'),
      email: localStorage.getItem('ew_demo_email'),
      phone: localStorage.getItem('ew_demo_phone')
    };
  });
  console.log('Datos extraídos de LocalStorage:', storageData);
  // Renderizar un overlay visual para la captura de LocalStorage
  await ewPage.evaluate((data) => {
    const box = document.createElement('div');
    box.id = 'qa-storage-overlay';
    box.style.position = 'fixed';
    box.style.bottom = '20px';
    box.style.right = '20px';
    box.style.background = '#0f172a';
    box.style.color = '#38bdf8';
    box.style.fontFamily = 'monospace';
    box.style.padding = '15px 20px';
    box.style.borderRadius = '8px';
    box.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)';
    box.style.zIndex = '999999';
    box.style.border = '2px solid #ef4444';
    box.innerHTML = `
      <div style="color:#ef4444;font-weight:bold;margin-bottom:8px;">[DEF-02 EVIDENCIA] LocalStorage (Datos PII en Texto Plano):</div>
      <div><strong>ew_demo_name:</strong> "${data.name}"</div>
      <div><strong>ew_demo_email:</strong> "${data.email}"</div>
      <div><strong>ew_demo_phone:</strong> "${data.phone}"</div>
    `;
    document.body.appendChild(box);
  }, storageData);
  await ewPage.screenshot({ path: path.join(defDir, 'DEF-02_energy_water_localstorage_pii.png') });
  await ewPage.evaluate(() => { const el = document.getElementById('qa-storage-overlay'); if (el) el.remove(); });

  // HU06 - Seguridad (Footer con enlace no seguro)
  const footerLink = ewPage.locator('footer a[href="http://example.com"]');
  if (await footerLink.count() > 0) {
    await footerLink.scrollIntoViewIfNeeded();
    await ewPage.screenshot({ path: path.join(ewDir, 'HU06_seguridad_footer.png') });
  }

  // HU07 - Preguntas Frecuentes
  const faqSection = ewPage.locator('#faq');
  await faqSection.scrollIntoViewIfNeeded();
  await ewPage.screenshot({ path: path.join(ewDir, 'HU07_faq_seccion.png') });

  // DEF-04 - Buscador FAQ roto (buscar '¿Que' sin tilde y presionar Limpiar)
  await ewPage.fill('#faq-search', '¿Que');
  await ewPage.waitForTimeout(300);
  await ewPage.click('.faq-tools button'); // Botón Limpiar
  await ewPage.waitForTimeout(300);
  await faqSection.scrollIntoViewIfNeeded();
  await ewPage.screenshot({ path: path.join(defDir, 'DEF-04_energy_water_faq_buscador_roto.png') });

  // DEF-05 - Acordeón pregunta 3 muerto
  await ewPage.reload({ waitUntil: 'networkidle' });
  const qVisita = ewPage.locator('.faq-q', { hasText: '¿Cómo agendo una visita?' });
  await qVisita.scrollIntoViewIfNeeded();
  await qVisita.click();
  await ewPage.waitForTimeout(300);
  await ewPage.screenshot({ path: path.join(defDir, 'DEF-05_energy_water_acordeon_desalineado.png') });

  // DEF-06 - Formulario vacío aceptado
  await ewPage.goto('https://clinicatecnologica.cl/energyandwater/index.html#contacto', { waitUntil: 'networkidle' });
  const emptyForm = ewPage.locator('#visit-form');
  await emptyForm.scrollIntoViewIfNeeded();
  await ewPage.fill('#name', '');
  await ewPage.fill('#phone', '');
  await ewPage.fill('#email', '');
  await ewPage.click('#visit-form button[type="submit"]');
  await ewPage.waitForTimeout(300);
  await ewPage.screenshot({ path: path.join(defDir, 'DEF-06_energy_water_form_sin_validacion.png') });

  await ewCtx.close();
  await browser.close();

  console.log('¡Todas las capturas de pantalla han sido generadas con éxito en la carpeta "evidencias/"!');
}

run().catch(err => {
  console.error('Error al ejecutar Playwright:', err);
  process.exit(1);
});
