import type { Locale } from '@/shared/i18n/locales'

const es: Record<string, string> = {
  'language.label': 'Idioma',
  'language.es': 'Español',
  'language.en': 'English',

  'nav.inicio': 'Inicio',
  'nav.flota': 'Flota',
  'nav.horario': 'Horario de vuelos',
  'nav.reservas': 'Reservas',
  'nav.documentos': 'Documentos',
  'nav.seguimiento': 'Seguimiento de vuelos',
  'nav.pista': 'Mapa de pista',
  'nav.tutorProgreso': 'Progreso alumnos',
  'nav.tutorFinanzas': 'Ganancias y saldo',

  'shell.logout': 'Cerrar sesión',
  'shell.loading': 'Cargando vista…',

  'login.title': 'Iniciar sesión',
  'login.desc': 'Ingresa con tu correo y contraseña para acceder a la agenda y operación.',
  'login.email': 'Correo',
  'login.password': 'Contraseña',
  'login.submit': 'Entrar',
  'login.submitting': 'Entrando…',
  'login.error.email': 'Ingresa un correo.',
  'login.error.badCreds': 'Correo o contraseña incorrectos.',
  'login.error.generic': 'No se pudo iniciar sesión. Intenta de nuevo.',

  'brand.tagline':
    'Agenda de vuelos, pista y operación — con la claridad que mereces.',

  'role.student': 'Estudiante',
  'role.tutor': 'Tutor / Instructor',
  'role.user': 'Usuario',

  'dashboard.panel': 'Panel principal',
  'dashboard.hello': 'Hola',
  'dashboard.role': 'Rol',
  'dashboard.intro':
    'Usa el menú lateral o los accesos rápidos para moverte por la operación.',

  'dash.card.flota.title': 'Flota',
  'dash.card.flota.desc':
    'Aeronaves con foto, matrícula y datos para planear tu clase.',
  'dash.card.horario.title': 'Horario de vuelos',
  'dash.card.horario.desc': 'Consulta bloques libres y reserva (estudiante).',
  'dash.card.reservas.title': 'Reservas',
  'dash.card.reservas.desc': 'Gestiona tus clases o revisa las de tus alumnos.',
  'dash.card.documentos.title': 'Documentos',
  'dash.card.documentos.desc':
    'Enlaces y notas de manuales, formatos o material de apoyo.',
  'dash.card.seguimiento.title': 'Seguimiento de vuelos',
  'dash.card.seguimiento.desc':
    'Recordatorios, etapas con maniobras, mapa compacto de la zona y FlightAware opcional.',
  'dash.card.pista.title': 'Mapa de pista',
  'dash.card.pista.desc': 'Referencia visual de zonas en la pista.',
  'dash.card.progreso.title': 'Progreso',
  'dash.card.progreso.desc': 'Tablero de avance de estudiantes.',
  'dash.card.finanzas.title': 'Finanzas',
  'dash.card.finanzas.desc': 'Ganancias y saldo estimado.',

  'weather.loading': 'Consultando clima en la zona de operación…',
  'weather.retry': 'Reintentar',
  'weather.region': 'Condiciones para vuelo',
  'weather.aria': 'Estado meteorológico para vuelo',
  'weather.vfrYes': 'Práctica VFR: sí, con briefing habitual del club.',
  'weather.vfrNo': 'Práctica VFR: no recomendada con estas lecturas automáticas.',
  'weather.source': 'Fuente: Open-Meteo · zona aeródromo ·',
  'weather.approx': '(aprox.)',
  'weather.update': 'Actualizar',

  'fleet.title': 'Estado de flota (simulado)',
  'fleet.lead': 'Vista rápida para alumnos e instructores.',
  'fleet.sub': 'Los instructores pueden cambiar el estado en la página Flota.',
  'fleet.oneFlying': 'Hay 1 aeronave marcada en vuelo.',
  'fleet.nFlying': 'Hay {n} aeronaves en vuelo.',
  'fleet.allGround': 'Toda la flota figura en tierra.',
  'fleet.link': 'Ver flota →',

  'ops.ground': 'En tierra',
  'ops.in_flight': 'En vuelo',
  'ops.maintenance': 'Mantenimiento',

  'common.save': 'Guardar',
  'common.add': 'Añadir',
  'common.remove': 'Quitar',
  'common.close': 'Cerrar',
  'common.zone': 'Zona',

  'booking.error.slot_taken': 'Este hueco ya está reservado.',
  'booking.error.tutor_simulation_only':
    'Solo instructores pueden registrar una clase simulada para un alumno.',
  'booking.error.student_booking_only':
    'Para tu propia reserva entra como estudiante, o elige un alumno si eres instructor.',
  'booking.status.confirmada': 'Confirmada',
  'booking.status.completada': 'Completada',
  'booking.status.cancelada': 'Cancelada',

  'reservations.title': 'Reservas',
  'reservations.noUserDesc':
    'Con el rol usuario solo puedes consultar el horario de vuelos. Cambia a estudiante o tutor en el inicio de sesión para ver reservas.',
  'reservations.descTutor': 'Todas las reservas registradas en el sistema.',
  'reservations.descStudent': 'Tus clases agendadas.',
  'reservations.empty': 'No hay reservas para mostrar.',
  'reservations.status': 'Estado',
  'reservations.cancel': 'Cancelar',
  'reservations.markComplete': 'Marcar completada',

  'schedule.title': 'Agenda de vuelos',
  'schedule.desc.readOnly': 'Solo consulta: elige un bloque en el calendario para ver detalle.',
  'schedule.desc.student':
    '1) Toca un bloque azul en el calendario o un acceso rápido. 2) Pulsa «Confirmar reserva» abajo.',
  'schedule.desc.tutor':
    'Simula la agenda: elige bloque libre y registra clase para un alumno de ejemplo.',
  'schedule.desc.default': 'Vista de ocupación de la flota.',
  'schedule.legend.available': 'Disponible — clic para seleccionar',
  'schedule.legend.busy': 'Ocupado',
  'schedule.fcBrand': 'FullCalendar',
  'schedule.eventTaken': 'Ocupado',
  'schedule.quick.title': 'Agendar rápido',
  'schedule.quick.desc':
    'Huecos libres próximos: un clic elige el bloque; confirma abajo.',
  'schedule.success.student': 'Listo: clase agendada. Revísala en Reservas.',
  'schedule.success.tutor': 'Clase registrada para {name}. Visible en Reservas.',
  'schedule.pickStudent': 'Elige un alumno de la lista.',
  'schedule.fc.today': 'Hoy',
  'schedule.fc.month': 'Mes',
  'schedule.fc.week': 'Semana',
  'schedule.fc.day': 'Día',
  'schedule.selected.title': 'Bloque seleccionado',
  'schedule.field.aircraft': 'Aeronave',
  'schedule.field.instructor': 'Instructor',
  'schedule.field.zone': 'Zona',
  'schedule.field.status': 'Estado',
  'schedule.status.free': 'Libre',
  'schedule.status.busy': 'Ocupado',
  'schedule.aircraftAssigned': 'Aeronave asignada a este bloque',
  'schedule.viewFullSpecs': 'Ver ficha completa y especificaciones',
  'schedule.inFlightHint':
    'En la simulación esta aeronave figura en vuelo. Sigue pudiendo reservar bloques futuros en agenda; esto no sustituye disponibilidad real de la escuela.',
  'schedule.confirm': 'Confirmar reserva',
  'schedule.clearSelection': 'Cancelar selección',
  'schedule.tutorSimLead':
    'Simulación: registra esta franja como clase de un alumno de ejemplo.',
  'schedule.studentField': 'Alumno',
  'schedule.simulate': 'Registrar clase simulada',
  'schedule.readOnlyHint': 'Tu rol solo permite consultar el calendario.',
  'schedule.slotTakenHint':
    'Este bloque ya está ocupado. Elige otro en el calendario o en «Agendar rápido».',
  'schedule.empty.readOnly': 'Toca un evento en el calendario para ver el detalle.',
  'schedule.empty.action':
    'Selecciona un bloque azul en el calendario o usa «Agendar rápido» para empezar.',
  'aircraft.simTitle': 'Simulación operativa',
  'aircraft.simHelp':
    'Marca si la aeronave está en vuelo, en tierra o en mantenimiento (solo demo).',
  'aircraft.studentFleetHint':
    'Estado en vuelo / tierra simulado. Tu instructor puede actualizarlo en esta misma pantalla.',
  'aircraft.capacity': 'Capacidad',
  'aircraft.seats': '{n} plazas',
  'aircraft.engine': 'Motor / crucero',
  'aircraft.cruise': '~{kts} kt crucero · techo {ft} ft',
  'aircraft.category': 'Categoría y uso',
  'aircraft.rangeYear': 'Autonomía y año',
  'aircraft.rangeLine': 'Hasta ~{nm} NM · año {year}',
  'aircraft.schedulingOn': 'Disponible en agenda',
  'aircraft.schedulingOff': 'Fuera de rotación',

  'fleetPage.title': 'Flota disponible',
  'fleetPage.desc':
    'Cada aeronave puede asignarse a bloques del horario. El estado «en vuelo / tierra / mantenimiento» es una simulación para el curso (se guarda en esta sesión del navegador). Los datos técnicos son orientativos: sustituye matrículas y cifras por los de tu operación.',

  'runway.card.title': 'Mapa operativo',
  'runway.card.desc':
    'Vista satélite / híbrida estilo Google Maps para orientar la pista y puntos de práctica en Aviox.',
  'runway.toolbarHint':
    'Marcadores de referencia sobre la cartografía. Con clave de API obtienes controles completos de Google Maps.',
  'runway.tipEnv':
    'Tip: añade VITE_GOOGLE_MAPS_API_KEY en un archivo .env para activar la API de JavaScript (satélite, gestos y capas avanzadas). Copia .env.example.',
  'runway.zone.threshold.label': 'Umbral',
  'runway.zone.threshold.note': 'Despegue, toque y puesta en potencia.',
  'runway.zone.mid.label': 'Tramo central',
  'runway.zone.mid.note': 'Circuito de tráfico y referencias visuales.',
  'runway.zone.final.label': 'Final',
  'runway.zone.final.note': 'Aproximación y alineación con la pista.',
  'runway.marker.threshold': 'Umbral · despegue / toque',
  'runway.marker.pattern': 'Circuito de tráfico',
  'runway.marker.final': 'Aproximación final',
  'runway.embedTitle': 'Mapa de la zona de operación',
  'runway.mapsLoadError':
    'No se pudo cargar Google Maps. Revisa la clave de API y la facturación del proyecto en Google Cloud.',
  'runway.mapsLoading': 'Cargando mapa…',

  'documents.page.title': 'Documentos',
  'documents.page.lead':
    'Material de referencia (procedimientos, libros, videos) y documentos que aún no están en la app — por ejemplo el checklist en papel del avión X: fotografía o PDF y queda guardado en este dispositivo.',
  'documents.ref.title': 'Material de referencia',
  'documents.ref.desc':
    'Listas de procedimientos, enlaces a libros o artículos, videos (YouTube, Vimeo, etc.). El enlace es opcional si solo quieres dejar una nota.',
  'documents.ref.add': 'Añadir a referencias',
  'documents.ref.errTitle': 'Indica un título.',
  'documents.field.title': 'Título',
  'documents.field.url': 'URL (opcional)',
  'documents.field.urlPh': 'https://… (video, PDF en la nube, etc.)',
  'documents.field.note': 'Nota o descripción (opcional)',
  'documents.ref.titlePh': 'Ej. Lista de verificación pre-vuelo VFR',
  'documents.upload.title': 'Subir checklist o foto',
  'documents.upload.desc':
    'Si el documento no está en Aviox (p. ej. checklist del avión que solo tienes en papel), toma una foto o adjunta un PDF escaneado. Se guarda localmente en este navegador.',
  'documents.upload.save': 'Guardar subida',
  'documents.upload.aircraft': 'Avión o referencia (opcional)',
  'documents.upload.aircraftPh': 'Ej. HK-1234, Cessna 172S',
  'documents.upload.titlePh': 'Ej. Checklist Cessna 172 · copia escuela',
  'documents.upload.file': 'Foto o archivo',
  'documents.upload.fileHelp':
    'Máx. ~{mb} MB. En el móvil puedes usar la cámara (foto al checklist).',
  'documents.upload.note': 'Nota (opcional)',
  'documents.upload.errTitle': 'Indica un título (ej. checklist Cessna 172).',
  'documents.upload.errFile': 'Selecciona una foto o un PDF desde tu dispositivo.',
  'documents.upload.errSize':
    'El archivo supera {mb} MB. Prueba con otra foto o reduce la resolución.',
  'documents.upload.errRead': 'No se pudo leer el archivo. Intenta de nuevo.',
  'documents.empty':
    'Aún no hay entradas. Usa los formularios de arriba para referencias o para subir un checklist.',
  'documents.section.uploads': 'Subidas y checklists',
  'documents.section.refs': 'Referencias y enlaces',
  'documents.badge.upload': 'Subida',
  'documents.badge.ref': 'Referencia',
  'documents.aircraftLabel': 'Avión / referencia',
  'documents.openLink': 'Abrir enlace',
  'documents.download': 'Descargar / abrir archivo',
  'documents.map.noKeyTitle': 'Vista de etapas (sin clave de mapas estáticos)',
  'documents.map.staticHint':
    'Configura VITE_GOOGLE_MAPS_API_KEY con la API de Maps Static API habilitada para ver el trazado en imagen.',
  'documents.map.alt': 'Mapa resumido de etapas del vuelo',

  'track.noAccess.title': 'Seguimiento de vuelos',
  'track.noAccess.desc':
    'Esta sección está disponible para estudiantes e instructores. Inicia sesión con un rol que gestione reservas.',
  'track.main.title': 'Seguimiento y recordatorios',
  'track.main.desc':
    'Próximas clases, historial con etapas y maniobras (tiempos orientativos), mapa compacto de la zona con orientación N/S/E/O y enlace opcional a FlightAware si quieres cruzar datos.',
  'track.reminderOne': 'Tienes 1 clase en las próximas 48 horas.',
  'track.reminderMany': 'Tienes {n} clases en las próximas 48 horas.',
  'track.upcoming': 'Próximos vuelos',
  'track.upcoming.empty': 'No hay clases confirmadas pendientes.',
  'track.past': 'Vuelos pasados',
  'track.past.lead':
    'Clases completadas, canceladas o con fecha ya vencida (aún confirmadas en el sistema).',
  'track.past.empty': 'No hay historial todavía.',
  'track.stages': 'Etapas del vuelo (referencia)',
  'track.maneuvers.title': 'Etapas y maniobras',
  'track.maneuvers.lead':
    'Resumen por tramo para debrief: maniobra asociada y minutos orientativos (no es registro ADS-B ni Google Earth embebido; el mapa de abajo es una imagen estática ligera).',
  'track.maneuvers.kind': 'Maniobra',
  'track.durationEst': '~{m} min en este tramo (orientativo)',
  'track.totalDurationEst': 'Suma orientativa de etapas: ~{m} min',
  'track.zoneMap.title': 'Mapa de la zona (compacto)',
  'track.cardinal.title': 'Rosa de los vientos: norte arriba (referencia visual)',
  'track.cardinal.n': 'N',
  'track.cardinal.e': 'E',
  'track.cardinal.s': 'S',
  'track.cardinal.w': 'O',
  'track.stage.initial': 'Salida y tramo inicial',
  'track.stage.cruise': 'Tramo de crucero',
  'track.stage.pattern': 'Zona de circuito',
  'track.stage.final': 'Final y toma',
  'track.maneuver.departure': 'Despegue y ascenso inicial',
  'track.maneuver.cruise': 'Crucero / tramo en nivel',
  'track.maneuver.pattern': 'Circuito de tráfico / patrón',
  'track.maneuver.approach': 'Aproximación final y toma',
  'track.caption.saved':
    'Trazado guardado al marcar la clase como completada.',
  'track.caption.ref': 'Trazado de referencia para esta clase.',
  'track.caption.preview': 'Vista previa del circuito de práctica en la zona de operación.',
  'track.fa.title': 'FlightAware — seguimiento',
  'track.fa.help':
    'Si la aeronave o el vuelo aparece en FlightAware, introduce matrícula, indicativo o número de vuelo y abre el enlace.',
  'track.fa.ident': 'Identificador',
  'track.fa.identPh': 'Ej. HK-4952, N123AB, AV123',
  'track.fa.link': 'Buscar en FlightAware',
  'track.status.pastUnmarked': 'No marcada (fecha pasada)',
  'track.status.label': 'Estado',

  'finances.title': 'Ganancias y saldo',
  'finances.desc': 'Tarifa de referencia: USD {rate} por clase completada (marca completadas en Reservas).',
  'finances.completed': 'Clases completadas',
  'finances.recognized': 'Ingreso reconocido: USD {amount}',
  'finances.pending': 'Por cobrar (agendadas)',
  'finances.estimated': 'Estimado: USD {amount}',
  'finances.net': 'Saldo neto estimado',
  'finances.netNote': 'Aprox. 92 % del bruto (impuestos/comisiones simuladas).',

  'progress.title': 'Progreso de estudiantes',
  'progress.desc':
    'Resumen de avance por alumno. Conecta después tu backend para datos en vivo.',
  'progress.col.student': 'Estudiante',
  'progress.col.phase': 'Fase',
  'progress.col.hours': 'Horas vuelo',
  'progress.col.landings': 'Aterrizajes',
  'progress.col.last': 'Última sesión',
}

const en: Record<string, string> = {
  'language.label': 'Language',
  'language.es': 'Español',
  'language.en': 'English',

  'nav.inicio': 'Home',
  'nav.flota': 'Fleet',
  'nav.horario': 'Flight schedule',
  'nav.reservas': 'Bookings',
  'nav.documentos': 'Documents',
  'nav.seguimiento': 'Flight tracking',
  'nav.pista': 'Runway map',
  'nav.tutorProgreso': 'Student progress',
  'nav.tutorFinanzas': 'Earnings & balance',

  'shell.logout': 'Log out',
  'shell.loading': 'Loading…',

  'login.title': 'Sign in',
  'login.desc': 'Use your email and password to access the schedule and ops.',
  'login.email': 'Email',
  'login.password': 'Password',
  'login.submit': 'Sign in',
  'login.submitting': 'Signing in…',
  'login.error.email': 'Please enter an email.',
  'login.error.badCreds': 'Incorrect email or password.',
  'login.error.generic': 'Could not sign in. Please try again.',

  'brand.tagline':
    'Flight schedule, runway and ops — with the clarity you deserve.',

  'role.student': 'Student',
  'role.tutor': 'Tutor / Instructor',
  'role.user': 'User',

  'dashboard.panel': 'Main panel',
  'dashboard.hello': 'Hello',
  'dashboard.role': 'Role',
  'dashboard.intro':
    'Use the side menu or quick links to move around the operation.',

  'dash.card.flota.title': 'Fleet',
  'dash.card.flota.desc':
    'Aircraft with photo, registration and details to plan your lesson.',
  'dash.card.horario.title': 'Flight schedule',
  'dash.card.horario.desc': 'See open slots and book (student).',
  'dash.card.reservas.title': 'Bookings',
  'dash.card.reservas.desc': 'Manage your lessons or your students’.',
  'dash.card.documentos.title': 'Documents',
  'dash.card.documentos.desc':
    'Links and notes for manuals, forms or study material.',
  'dash.card.seguimiento.title': 'Flight tracking',
  'dash.card.seguimiento.desc':
    'Reminders, stages with maneuvers, compact zone map and optional FlightAware.',
  'dash.card.pista.title': 'Runway map',
  'dash.card.pista.desc': 'Visual reference for traffic pattern zones.',
  'dash.card.progreso.title': 'Progress',
  'dash.card.progreso.desc': 'Student progress board.',
  'dash.card.finanzas.title': 'Finances',
  'dash.card.finanzas.desc': 'Estimated earnings and balance.',

  'weather.loading': 'Fetching weather for the ops area…',
  'weather.retry': 'Retry',
  'weather.region': 'Flying conditions',
  'weather.aria': 'Weather status for flight',
  'weather.vfrYes': 'VFR practice: yes — use your club’s usual briefing.',
  'weather.vfrNo': 'VFR practice: not recommended from these automated readings.',
  'weather.source': 'Source: Open-Meteo · airfield area ·',
  'weather.approx': '(approx.)',
  'weather.update': 'Refresh',

  'fleet.title': 'Fleet status (simulated)',
  'fleet.lead': 'Quick view for students and instructors.',
  'fleet.sub': 'Instructors can change status on the Fleet page.',
  'fleet.oneFlying': '1 aircraft is marked in flight.',
  'fleet.nFlying': '{n} aircraft are in flight.',
  'fleet.allGround': 'All aircraft are on the ground.',
  'fleet.link': 'View fleet →',

  'ops.ground': 'On ground',
  'ops.in_flight': 'In flight',
  'ops.maintenance': 'Maintenance',

  'common.save': 'Save',
  'common.add': 'Add',
  'common.remove': 'Remove',
  'common.close': 'Close',
  'common.zone': 'Zone',

  'booking.error.slot_taken': 'This slot is already booked.',
  'booking.error.tutor_simulation_only':
    'Only instructors can register a simulated lesson for a student.',
  'booking.error.student_booking_only':
    'To book for yourself sign in as a student, or pick a student if you are an instructor.',
  'booking.status.confirmada': 'Confirmed',
  'booking.status.completada': 'Completed',
  'booking.status.cancelada': 'Cancelled',

  'reservations.title': 'Bookings',
  'reservations.noUserDesc':
    'As a visitor you can only browse the flight schedule. Switch to student or instructor to see bookings.',
  'reservations.descTutor': 'All bookings recorded in the system.',
  'reservations.descStudent': 'Your scheduled lessons.',
  'reservations.empty': 'No bookings to show.',
  'reservations.status': 'Status',
  'reservations.cancel': 'Cancel',
  'reservations.markComplete': 'Mark completed',

  'schedule.title': 'Flight schedule',
  'schedule.desc.readOnly': 'Read-only: pick a slot on the calendar to see details.',
  'schedule.desc.student':
    '1) Tap a blue block on the calendar or a quick slot. 2) Tap “Confirm booking” below.',
  'schedule.desc.tutor':
    'Simulate ops: pick a free block and register a lesson for a sample student.',
  'schedule.desc.default': 'Fleet occupancy view.',
  'schedule.legend.available': 'Available — click to select',
  'schedule.legend.busy': 'Busy',
  'schedule.fcBrand': 'FullCalendar',
  'schedule.eventTaken': 'Busy',
  'schedule.quick.title': 'Quick book',
  'schedule.quick.desc': 'Next free slots: one click selects the block; confirm below.',
  'schedule.success.student': 'Done: lesson booked. Check it under Bookings.',
  'schedule.success.tutor': 'Lesson saved for {name}. Visible under Bookings.',
  'schedule.pickStudent': 'Pick a student from the list.',
  'schedule.fc.today': 'Today',
  'schedule.fc.month': 'Month',
  'schedule.fc.week': 'Week',
  'schedule.fc.day': 'Day',
  'schedule.selected.title': 'Selected block',
  'schedule.field.aircraft': 'Aircraft',
  'schedule.field.instructor': 'Instructor',
  'schedule.field.zone': 'Zone',
  'schedule.field.status': 'Status',
  'schedule.status.free': 'Free',
  'schedule.status.busy': 'Busy',
  'schedule.aircraftAssigned': 'Aircraft assigned to this block',
  'schedule.viewFullSpecs': 'View full profile and specs',
  'schedule.inFlightHint':
    'In the simulation this aircraft is marked in flight. You can still book future blocks; this does not replace real school availability.',
  'schedule.confirm': 'Confirm booking',
  'schedule.clearSelection': 'Clear selection',
  'schedule.tutorSimLead':
    'Simulation: register this slot as a lesson for a sample student.',
  'schedule.studentField': 'Student',
  'schedule.simulate': 'Save simulated lesson',
  'schedule.readOnlyHint': 'Your role only allows viewing the calendar.',
  'schedule.slotTakenHint':
    'This block is already taken. Pick another on the calendar or under “Quick book”.',
  'schedule.empty.readOnly': 'Tap an event on the calendar to see details.',
  'schedule.empty.action':
    'Select a blue block on the calendar or use “Quick book” to start.',

  'aircraft.simTitle': 'Ops simulation',
  'aircraft.simHelp':
    'Mark whether the aircraft is in flight, on ground or in maintenance (demo only).',
  'aircraft.studentFleetHint':
    'Flight / ground status is simulated. Your instructor can update it on this screen.',
  'aircraft.capacity': 'Capacity',
  'aircraft.seats': '{n} seats',
  'aircraft.engine': 'Engine / cruise',
  'aircraft.cruise': '~{kts} kt cruise · ceiling {ft} ft',
  'aircraft.category': 'Category & use',
  'aircraft.rangeYear': 'Range & year',
  'aircraft.rangeLine': 'Up to ~{nm} NM · year {year}',
  'aircraft.schedulingOn': 'Available on schedule',
  'aircraft.schedulingOff': 'Off rotation',

  'fleetPage.title': 'Available fleet',
  'fleetPage.desc':
    'Each aircraft can be assigned to schedule blocks. “In flight / ground / maintenance” is a course simulation (stored in this browser session). Technical figures are indicative—replace registrations and numbers with your operation’s.',

  'runway.card.title': 'Operations map',
  'runway.card.desc':
    'Satellite / hybrid Google-style map to orient the runway and practice points in Aviox.',
  'runway.toolbarHint':
    'Reference markers on the chart. With an API key you get full Google Maps controls.',
  'runway.tipEnv':
    'Tip: add VITE_GOOGLE_MAPS_API_KEY in a .env file to enable the JavaScript API (satellite, gestures, advanced layers). Copy .env.example.',
  'runway.zone.threshold.label': 'Threshold',
  'runway.zone.threshold.note': 'Take-off, touch-and-go, power application.',
  'runway.zone.mid.label': 'Mid segment',
  'runway.zone.mid.note': 'Traffic pattern and visual references.',
  'runway.zone.final.label': 'Final',
  'runway.zone.final.note': 'Approach and runway alignment.',
  'runway.marker.threshold': 'Threshold · take-off / touch',
  'runway.marker.pattern': 'Traffic pattern',
  'runway.marker.final': 'Final approach',
  'runway.embedTitle': 'Operations area map',
  'runway.mapsLoadError':
    'Could not load Google Maps. Check your API key and billing in Google Cloud.',
  'runway.mapsLoading': 'Loading map…',

  'documents.page.title': 'Documents',
  'documents.page.lead':
    'Reference material (procedures, books, videos) and items not yet in the app—for example the paper checklist for aircraft X: photo or PDF, stored on this device.',
  'documents.ref.title': 'Reference material',
  'documents.ref.desc':
    'Procedure lists, links to books or articles, videos (YouTube, Vimeo, etc.). URL is optional if you only leave a note.',
  'documents.ref.add': 'Add to references',
  'documents.ref.errTitle': 'Please enter a title.',
  'documents.field.title': 'Title',
  'documents.field.url': 'URL (optional)',
  'documents.field.urlPh': 'https://… (video, cloud PDF, etc.)',
  'documents.field.note': 'Note or description (optional)',
  'documents.ref.titlePh': 'e.g. Pre-flight VFR checklist',
  'documents.upload.title': 'Upload checklist or photo',
  'documents.upload.desc':
    'If the document is not in Aviox (e.g. checklist you only have on paper), take a photo or attach a scanned PDF. Stored locally in this browser.',
  'documents.upload.save': 'Save upload',
  'documents.upload.aircraft': 'Aircraft / reference (optional)',
  'documents.upload.aircraftPh': 'e.g. N123AB, Cessna 172S',
  'documents.upload.titlePh': 'e.g. Cessna 172 checklist · school copy',
  'documents.upload.file': 'Photo or file',
  'documents.upload.fileHelp':
    'Max ~{mb} MB. On mobile you can use the camera (photo of the checklist).',
  'documents.upload.note': 'Note (optional)',
  'documents.upload.errTitle': 'Enter a title (e.g. Cessna 172 checklist).',
  'documents.upload.errFile': 'Select a photo or PDF from your device.',
  'documents.upload.errSize':
    'File exceeds {mb} MB. Try another photo or lower resolution.',
  'documents.upload.errRead': 'Could not read the file. Try again.',
  'documents.empty':
    'No entries yet. Use the forms above for references or to upload a checklist.',
  'documents.section.uploads': 'Uploads & checklists',
  'documents.section.refs': 'References & links',
  'documents.badge.upload': 'Upload',
  'documents.badge.ref': 'Reference',
  'documents.aircraftLabel': 'Aircraft / reference',
  'documents.openLink': 'Open link',
  'documents.download': 'Download / open file',
  'documents.map.noKeyTitle': 'Stage view (no static maps API key)',
  'documents.map.staticHint':
    'Set VITE_GOOGLE_MAPS_API_KEY with Maps Static API enabled to see the path image.',
  'documents.map.alt': 'Summary map of flight stages',

  'track.noAccess.title': 'Flight tracking',
  'track.noAccess.desc':
    'This section is for students and instructors. Sign in with a role that manages bookings.',
  'track.main.title': 'Tracking & reminders',
  'track.main.desc':
    'Upcoming lessons, history with stages and maneuvers (indicative times), a compact zone map with N/S/E/W reference and an optional FlightAware link.',
  'track.reminderOne': 'You have 1 lesson in the next 48 hours.',
  'track.reminderMany': 'You have {n} lessons in the next 48 hours.',
  'track.upcoming': 'Upcoming flights',
  'track.upcoming.empty': 'No confirmed upcoming lessons.',
  'track.past': 'Past flights',
  'track.past.lead':
    'Completed, cancelled, or past date (still marked confirmed in the system).',
  'track.past.empty': 'No history yet.',
  'track.stages': 'Flight stages (reference)',
  'track.maneuvers.title': 'Stages and maneuvers',
  'track.maneuvers.lead':
    'Per-segment debrief summary: linked maneuver and indicative minutes (not ADS-B or embedded Google Earth; the map below is a lightweight static image).',
  'track.maneuvers.kind': 'Maneuver',
  'track.durationEst': '~{m} min on this segment (indicative)',
  'track.totalDurationEst': 'Indicative total across stages: ~{m} min',
  'track.zoneMap.title': 'Zone map (compact)',
  'track.cardinal.title': 'Cardinal reference: north up (visual aid)',
  'track.cardinal.n': 'N',
  'track.cardinal.e': 'E',
  'track.cardinal.s': 'S',
  'track.cardinal.w': 'W',
  'track.stage.initial': 'Departure and initial segment',
  'track.stage.cruise': 'Cruise segment',
  'track.stage.pattern': 'Traffic pattern area',
  'track.stage.final': 'Final approach and landing',
  'track.maneuver.departure': 'Takeoff and initial climb',
  'track.maneuver.cruise': 'Cruise / level flight',
  'track.maneuver.pattern': 'Traffic pattern work',
  'track.maneuver.approach': 'Final approach and landing',
  'track.caption.saved': 'Path saved when the lesson was marked completed.',
  'track.caption.ref': 'Reference path for this lesson.',
  'track.caption.preview': 'Preview of the practice pattern in the ops area.',
  'track.fa.title': 'FlightAware — tracking',
  'track.fa.help':
    'If the aircraft or flight appears on FlightAware, enter registration, callsign or flight number and open the link.',
  'track.fa.ident': 'Identifier',
  'track.fa.identPh': 'e.g. N123AB, AV123',
  'track.fa.link': 'Search on FlightAware',
  'track.status.pastUnmarked': 'Not marked (past date)',
  'track.status.label': 'Status',

  'finances.title': 'Earnings & balance',
  'finances.desc':
    'Reference rate: USD {rate} per completed lesson (mark completed under Bookings).',
  'finances.completed': 'Completed lessons',
  'finances.recognized': 'Recognized income: USD {amount}',
  'finances.pending': 'To collect (scheduled)',
  'finances.estimated': 'Estimated: USD {amount}',
  'finances.net': 'Estimated net balance',
  'finances.netNote': 'Approx. 92% of gross (simulated taxes/fees).',

  'progress.title': 'Student progress',
  'progress.desc':
    'Progress summary per student. Connect your backend later for live data.',
  'progress.col.student': 'Student',
  'progress.col.phase': 'Phase',
  'progress.col.hours': 'Flight hours',
  'progress.col.landings': 'Landings',
  'progress.col.last': 'Last session',
}

export const messages: Record<Locale, Record<string, string>> = {
  es,
  en,
}

export function interpolate(
  template: string,
  vars: Record<string, string | number>,
): string {
  let out = template
  for (const [k, v] of Object.entries(vars)) {
    out = out.replaceAll(`{${k}}`, String(v))
  }
  return out
}
