# Internationalization (i18n)

---

Implementación completa de internacionalización para e-commerce con Next.js 15, incluyendo geolocalización automática y cambio de idioma dinámico.

## 🌍 Sistema de Internacionalización

### Selector de Idioma

Cada ruta de la pagina esta enrutada dinamicamente deacuerdo al lenguaje, cambiando el contenido y el link

```typescript
.com/es/productos/busqueda/ejemplo  //Español
.com/en/products/search/example     //Ingles
```

- Detección de idioma `pathname.startsWith("/en")` y renderizado automatico
- Usa `useRouter` y `usePathname` de Next.js

### Componente selector de Idioma `SwitchLang.tsx`

```typescript
 Toggle visual UIX
```

- Cambio de ruta: Reemplaza `/[lang]` en la URL actual con `router.push()`

### Rewrites de URLs `next.config.ts`

```typescript
async rewrites() {
  return [
    {
      source: "/en/products",
      destination: "/en/productos"
    },
    {
      source: "/en/about",
      destination: "/en/acerca"
    }
  ];
}
```

**📚 Diccionario de traducciones:**

Cada pagina tiene su contenido en diccionarios ordenados por idioma y ruta

```typescript
// lib/dictionaries/index.ts
- ✅ Función getDictionary para cargar traducciones
- ✅ Soporte para 'en' | 'es' | etc
- ✅ Import dinámico de archivos JSON
- ✅ Server-only para optimización
```

**Ejemplo:**

```json
// src/lib/dictionaries/es.json
{
  "title": "Productos",
  "description": "Esta es la página de productos."
}

// src/lib/dictionaries/en.json
{
  "title": "Products",
  "description": "This is the products page."
}
```

### Pais

#### Custom hook de Geolocalización `useGeoLocation.tsx`

```typescript
// Funcionalidades implementadas:
- ✅ Detección automática de país via API (ipapi.co)
- ✅ Persistencia en localStorage
```

#### **DropdownCountry.tsx** - Selector de País

✅ Dropdown UIX con banderas de países (Chile, México, Perú)

```typescript
// Funcionalidades implementadas:
- ✅ Integración con hook de geolocalización para cambio manual
- ✅ Mapeo de monedas por país (USD, MXN, PEN)
```

---

---

- [ ] Monitoring

  - Stadistics

- [ ] Testing

  - Cypress

- API de geolocalización para detectar el pais
- CustomHook useGeoLocation.tsx
- Guardar el pais en el LocalStorage
- Drowdpown para escoger el pais y comunicarse con el hook
- Usa librería `flag-icons` para banderas
