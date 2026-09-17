# Examen Final: Testing Aplicado al Desarrollo de Sistemas
**Instituto Profesional San Sebastián (IPSS)**  
**Estudiante:** Gina Norambuena  
**Docente:** Carlos Caro
**Carrera:** Ingeniería en Informática
**Asignatura:** Testing Aplicado al Desarrollo de Sistemas  

---

## 🎯 Descripción del Proyecto
Repositorio oficial de aseguramiento de calidad (QA Testing) para la evaluación final transversal. El proyecto comprende la planificación, diseño BDD en Gherkin, ejecución manual paso a paso, automatización de evidencias visuales con Playwright y reporte técnico exhaustivo de defectos sobre dos plataformas inmobiliarias demostrativas:

1. **TerraSol Parcelas:** [https://clinicatecnologica.cl/terrasol/](https://clinicatecnologica.cl/terrasol/)
2. **Energy & Water EcoParcelas:** [https://clinicatecnologica.cl/energyandwater/](https://clinicatecnologica.cl/energyandwater/)

---

## 📁 Estructura del Repositorio

```text
qa-terrasol-energy-IPSS/
├── casos_de_prueba/
│   ├── todos_los_casos_gherkin.txt    # 28 Casos de prueba BDD completos (.txt exigido por pauta)
│   ├── casos_terrasol.txt             # 14 Casos BDD de TerraSol Parcelas
│   └── casos_energy_and_water.txt     # 14 Casos BDD de Energy & Water
├── matriz_ejecucion/
│   └── matriz_ejecucion.md            # Matriz de ejecución detallada con resultados PASS/FAIL y enlaces
├── reporte_defectos/
│   └── reporte_defectos.md            # Reporte formal de 6 defectos (ISTQB/IEEE) con código de corrección
├── evidencias/                        # 20 Capturas de pantalla en alta resolución generadas con Playwright
│   ├── terrasol/                      # Capturas de las 7 Historias de Usuario en TerraSol
│   ├── energy_and_water/              # Capturas de las 7 Historias de Usuario en Energy & Water
│   └── defectos/                      # Evidencias visuales de los bugs críticos descubiertos
├── scripts/
│   └── capturar_todas_evidencias.js   # Script automatizado en Playwright para captura de evidencias
├── INFORME_EXAMEN_FINAL.docx          # Documento Word oficial formateado (Arial 12, interlineado 1.15)
├── INFORME_EXAMEN_FINAL.md            # Informe consolidado en formato Markdown
├── EX_APELLIDO_NOMBRE.pdf             # Informe compilado en PDF listo para entrega (6 páginas)
├── package.json                       # Configuración y dependencias de Playwright
└── README.md                          # Documentación general del repositorio
```

---

## 📊 Métricas Globales de Testing

| Métrica | TerraSol | Energy & Water | Total General |
| :--- | :---: | :---: | :---: |
| **Historias de Usuario Evaluadas** | 7 | 7 | 7 |
| **Total Casos Diseñados (Gherkin)** | 14 | 14 | 28 |
| **Casos Ejecutados** | 14 | 14 | 28 |
| **Casos Exitosos (PASS)** | 7 | 6 | **13 (46.4%)** |
| **Casos Fallidos (FAIL)** | 7 | 8 | **15 (53.6%)** |
| **Defectos Críticos Documentados** | 3 | 3 | **6 (Seguridad, Funcional y Accesibilidad)** |

---

## 🤖 Ejecución Automatizada de Evidencias (Playwright)

Para replicar la captura automática de evidencias visuales en alta resolución:

```bash
# Instalar dependencias
npm install

# Ejecutar script de captura (usa Microsoft Edge nativo)
node scripts/capturar_todas_evidencias.js
```

---
