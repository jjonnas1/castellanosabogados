import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '@/app/components/SiteHeader';
import { buildWhatsAppUrl } from '@/lib/contactLinks';

const articles: Record<string, { title: string; category: string; date: string; content: string }> = {
  'cuando-interponer-una-tutela': {
    title: '¿Cuándo interponer una acción de tutela?',
    category: 'Tutelas',
    date: '2026-03-10',
    content: `
La acción de tutela es el principal mecanismo de protección de derechos fundamentales en Colombia, consagrado en el artículo 86 de la Constitución Política. Es ágil, gratuita y puede ser presentada por cualquier persona sin necesidad de abogado, aunque la asesoría jurídica aumenta significativamente las posibilidades de éxito.

**¿Cuándo procede la tutela?**

Procede cuando existe una vulneración o amenaza real e inminente de un derecho fundamental, y no existe otro mecanismo judicial eficaz para protegerlo. Los casos más comunes incluyen:

- Negativa de una EPS a autorizar medicamentos, procedimientos o tratamientos médicos.
- Omisiones de entidades públicas que afectan el mínimo vital.
- Vulneraciones al derecho de petición cuando la entidad no responde en los términos legales.
- Afectaciones al debido proceso en actuaciones administrativas o judiciales.
- Situaciones que requieren protección inmediata del derecho a la vida o a la salud.

**¿Qué requisitos debe cumplir?**

Para que la tutela sea viable, es necesario que: (1) exista un derecho fundamental comprometido, (2) la vulneración sea actual o la amenaza sea inminente, (3) no exista otro mecanismo judicial que resulte eficaz, o que existiendo, la tutela sea necesaria como mecanismo transitorio para evitar un perjuicio irremediable.

**¿Cuánto tiempo tiene el juez para fallar?**

El juez tiene diez (10) días hábiles para emitir su fallo. Si la decisión es desfavorable, se puede impugnar dentro de los tres (3) días siguientes, y el superior jerárquico tiene veinte (20) días para resolver.

**Recomendación**

Aunque la tutela puede presentarse sin abogado, contar con orientación jurídica permite estructurar correctamente los hechos, identificar los derechos vulnerados y acompañar el cumplimiento del fallo. En Castellanos Abogados acompañamos todo el proceso.
    `,
  },
  'derechos-del-imputado-proceso-penal': {
    title: 'Derechos del imputado en el proceso penal colombiano',
    category: 'Penal',
    date: '2026-03-18',
    content: `
Ser imputado en un proceso penal no significa ser culpable. El sistema penal acusatorio colombiano, establecido por la Ley 906 de 2004, garantiza una serie de derechos fundamentales a toda persona a quien se le atribuya la comisión de un delito.

**Principio de presunción de inocencia**

Toda persona es inocente hasta que sea declarada culpable mediante sentencia debidamente ejecutoriada. Esta presunción debe mantenerse a lo largo de todo el proceso y solo puede desvirtuarse mediante pruebas legalmente obtenidas.

**Derecho a no autoincriminarse**

Nadie está obligado a declarar contra sí mismo. El imputado puede guardar silencio en cualquier momento del proceso sin que ello pueda ser interpretado como indicio de culpabilidad.

**Derecho a la defensa técnica**

Desde el momento de la imputación, el procesado tiene derecho a ser asistido por un abogado de su elección o, en caso de no tenerlo, por un defensor público. La defensa técnica es irrenunciable.

**Derecho a conocer los cargos**

El imputado tiene derecho a ser informado de manera clara, precisa y oportuna sobre los hechos que se le atribuyen y la calificación jurídica de los mismos.

**Derechos procesales clave**

- Derecho a que las pruebas en su contra sean obtenidas de manera legal.
- Derecho a contrainterrogar testigos de cargo.
- Derecho a presentar pruebas de descargo.
- Derecho a que el proceso se adelante sin dilaciones injustificadas.
- Derecho a impugnar las decisiones que le sean desfavorables.

**¿Qué hacer si es imputado?**

Lo primero es no declarar sin la presencia de su abogado. Contacte a un profesional del derecho penal de inmediato. Las primeras decisiones del proceso son determinantes para la estrategia de defensa.
    `,
  },
  'responsabilidad-penal-empresarial': {
    title: '¿Qué es la responsabilidad penal de las personas jurídicas?',
    category: 'Penal Empresarial',
    date: '2026-04-01',
    content: `
Con la expedición de la Ley 2195 de 2022, Colombia incorporó de manera definitiva la responsabilidad penal de las personas jurídicas en su ordenamiento jurídico. Esto significa que las empresas, como entes independientes de sus socios y directivos, pueden ser investigadas, procesadas y sancionadas penalmente.

**¿Qué delitos pueden comprometer a una empresa?**

La ley establece que las personas jurídicas pueden responder penalmente por delitos cometidos en su nombre, por su cuenta y en su beneficio, tales como:

- Soborno transnacional.
- Financiación de terrorismo y lavado de activos.
- Delitos contra la administración pública (cohecho, peculado, etc.).
- Delitos contra el medio ambiente.
- Fraudes en contratación estatal.

**¿Cómo se determina la responsabilidad?**

La empresa responde cuando el delito es cometido por sus representantes legales, administradores, empleados o contratistas actuando en ejercicio de sus funciones y en beneficio de la organización. La responsabilidad puede existir incluso si el individuo que cometió el delito no es identificado o condenado.

**¿Qué sanciones pueden imponerse?**

Las sanciones incluyen multas de hasta 200.000 SMMLV, prohibición de contratar con el Estado, cancelación de la personería jurídica, y decomiso de bienes.

**¿Cómo proteger su empresa?**

La mejor protección es la prevención. Un programa serio de cumplimiento (compliance) penal permite identificar riesgos, establecer controles y demostrar buena fe institucional. En Castellanos Abogados acompañamos la estructuración de estos programas y la defensa en caso de investigaciones.
    `,
  },
  'beneficios-ejecucion-penas': {
    title: 'Beneficios administrativos en ejecución de penas',
    category: 'Ejecución de Penas',
    date: '2026-04-05',
    content: `
Una vez impuesta una condena, el proceso penal no termina. La fase de ejecución de penas es donde el condenado puede acceder a una serie de beneficios que le permiten modificar las condiciones de cumplimiento de su pena, siempre que cumpla los requisitos legales.

**Prisión domiciliaria**

Permite cumplir la pena en el lugar de residencia bajo condiciones de vigilancia electrónica. Procede cuando la pena impuesta no supera ciertos límites, cuando el condenado no tiene antecedentes penales graves, y cuando no representa un riesgo para la víctima o la sociedad.

**Libertad condicional**

Puede solicitarse cuando el condenado ha cumplido las tres quintas (3/5) partes de la pena, ha observado buena conducta en el establecimiento penitenciario y el juez considera que no existe necesidad de continuar la ejecución de la pena.

**Redención de pena**

Los internos pueden redimir tiempo de condena mediante trabajo, estudio y enseñanza. Por cada dos días de actividad efectiva se redime un día de pena. Es fundamental llevar un registro adecuado y solicitar oportunamente su reconocimiento ante el juez de ejecución de penas.

**Permiso de 72 horas**

Los condenados que han cumplido la mitad de la condena pueden solicitar permisos periódicos de salida. Este beneficio también sirve como preparación para la libertad condicional.

**¿Quién decide sobre estos beneficios?**

El juez de ejecución de penas y medidas de seguridad es la autoridad competente. Las solicitudes deben estar bien sustentadas, con los documentos del INPEC que acrediten el comportamiento y el tiempo cumplido.

**Nuestra recomendación**

Muchos condenados no acceden a estos beneficios por desconocimiento o por no contar con representación jurídica adecuada durante la ejecución. En Castellanos Abogados hacemos seguimiento permanente a los términos y gestionamos oportunamente cada solicitud.
    `,
  },
  'abogado-penalista-pereira': {
    title: 'Abogado penalista en Pereira: cuándo necesitas uno y cómo elegirlo',
    category: 'Penal',
    date: '2026-05-05',
    content: `
Enfrentar un proceso penal es una de las experiencias más difíciles que puede vivir una persona. Ya sea como imputado, acusado o incluso como víctima, la complejidad del sistema judicial colombiano hace que contar con un abogado penalista en Pereira sea determinante para proteger tus derechos y obtener un resultado justo.

**¿Qué hace un abogado penalista?**

Un abogado penalista es el profesional del derecho especializado en el sistema penal acusatorio colombiano, regulado por la Ley 906 de 2004. Su trabajo abarca todas las etapas del proceso: desde la indagación preliminar hasta el juicio oral y los recursos de apelación o casación.

Entre sus funciones principales están representar al imputado desde el momento de la captura o la formulación de imputación, diseñar una estrategia de defensa basada en el análisis de las pruebas, asistir a audiencias de legalización de captura, imputación de cargos e imposición de medidas de aseguramiento, negociar preacuerdos y allanamientos cuando convenga al interés del cliente, y solicitar beneficios administrativos en la etapa de ejecución de penas.

**¿Cuándo necesitas un abogado penalista en Pereira?**

Muchas personas esperan demasiado antes de buscar asesoría legal. Estos son los momentos en que necesitas actuar de inmediato.

**Si fuiste capturado o hay una orden de captura en tu contra**

Desde el instante en que la Policía te pone bajo custodia tienes derecho a guardar silencio y a designar un abogado de confianza. Declarar sin asesoría es uno de los errores más costosos que puede cometer un imputado. Un penalista actúa en la audiencia de legalización de captura para controlar que el procedimiento sea legal y para frenar, desde el inicio, posibles irregularidades.

**Si recibiste una citación de la Fiscalía**

Ser citado a entrevista o indagatoria no significa que seas culpable, pero sí indica que eres de interés para la investigación. Ir sin abogado puede ser fatal para tu caso.

**Si te van a formular cargos**

La audiencia de formulación de imputación es el punto de partida oficial del proceso penal en tu contra. A partir de ese momento los términos corren y las decisiones que tomes —como allanarte a cargos o no— tendrán consecuencias permanentes.

**Si te impusieron una medida de aseguramiento**

La detención preventiva, ya sea en establecimiento carcelario o en domicilio, puede ser impugnada si no se cumplen los requisitos del artículo 308 del Código de Procedimiento Penal. Un abogado penalista en Pereira puede gestionar la sustitución o revocación de esa medida.

**Si ya tienes una condena**

El proceso no termina con la sentencia. En la etapa de ejecución de penas existen beneficios como la libertad condicional, la prisión domiciliaria y las rebajas por trabajo o estudio que un abogado puede tramitar ante el Juez de Ejecución de Penas.

**Qué mirar al elegir un abogado penal en el Eje Cafetero**

Especialización real: el derecho penal tiene sus propios códigos, audiencias y técnicas de litigación oral. Verifica que el abogado trabaje exclusivamente o de manera principal en materia penal.

Conocimiento del sistema local: los juzgados penales del Circuito de Pereira, Manizales y Armenia tienen sus propias dinámicas. Un penalista con experiencia en el Eje Cafetero conoce a los fiscales, entiende los tiempos y sabe cómo se resuelven los casos en la región.

Comunicación clara: tu abogado debe explicarte qué está pasando en términos que puedas entender. Si desde la primera consulta no te da claridad, busca otra opción.

Disponibilidad: los procesos penales tienen urgencias. Necesitas un abogado que responda cuando más lo necesitas.

**La importancia de actuar rápido**

En derecho penal, el tiempo es un recurso crítico. Las primeras horas después de una captura, los primeros días después de una imputación, definen en gran medida el rumbo del caso. Esperar a ver cómo se desarrolla puede cerrar puertas que después son imposibles de abrir.

Si estás enfrentando una situación penal en Pereira o en cualquier municipio del Eje Cafetero, la consulta inicial no tiene costo y puede darte la claridad que necesitas para tomar la mejor decisión.

¿Necesitas un abogado penalista en Pereira? Contáctanos ahora por WhatsApp o llámanos al 314 830 9306. Atendemos casos en todo el Eje Cafetero: Pereira, Manizales, Armenia y municipios aledaños.
    `,
  },
  'que-hacer-si-te-detienen-colombia': {
    title: '¿Qué hacer si te detienen en Colombia? Guía paso a paso',
    category: 'Penal',
    date: '2026-05-05',
    content: `
Una detención policial es una situación que nadie espera vivir, pero que puede ocurrirle a cualquier persona. Conocer tus derechos desde ese primer instante no es solo conveniente: puede ser la diferencia entre una libertad recuperada en horas y un proceso penal que se extienda por años.

**Tipos de captura en Colombia**

Captura en flagrancia: ocurre cuando eres sorprendido en el momento de cometer el delito o inmediatamente después. La Policía puede actuar sin orden judicial previa.

Captura con orden judicial: un juez de control de garantías expidió una orden de captura en tu contra.

Captura administrativa excepcional: en casos muy específicos, la Fiscalía puede ordenar una captura sin acudir al juez, siempre que exista urgencia y peligro de fuga.

**Tus derechos desde el momento de la captura**

La Constitución Política y el Código de Procedimiento Penal garantizan los siguientes derechos a toda persona capturada.

**Derecho a guardar silencio**

No estás obligado a declarar en tu contra. Puedes decir simplemente: "Voy a ejercer mi derecho a guardar silencio hasta hablar con mi abogado." Cualquier declaración que hagas sin asesoría jurídica puede ser usada en tu contra.

**Derecho a comunicarte con un abogado de confianza**

Tan pronto como seas capturado, tienes derecho a llamar a tu abogado. Si no tienes uno, el Estado debe asignarte un defensor público, aunque lo ideal es que contactes a un abogado penalista de tu confianza lo antes posible.

**Derecho a ser informado de los motivos de la captura**

La autoridad que te detiene está obligada a decirte por qué te captura, qué hechos se te atribuyen y cuáles son tus derechos. Si esto no ocurre, hay una irregularidad que tu abogado puede invocar.

**Derecho a que tu familia sea notificada**

Tienes derecho a comunicarte con un familiar o persona de confianza para informarle de tu situación y ubicación.

**Qué NO debes hacer si te detienen**

No declares sin abogado. Aunque parezca que explicar lo ocurrido te ayudará, sin orientación jurídica puedes incriminarte involuntariamente.

No firmes documentos sin leerlos ni sin asesoría. Algunos formatos pueden parecer inofensivos pero contienen reconocimientos importantes.

No intentes resistirte físicamente. Aunque la captura sea ilegal, la vía para remediarla es judicial, no física.

No dejes vencer los términos. La Fiscalía tiene 36 horas para llevar al capturado ante un juez de control de garantías. Si ese término vence sin audiencia, puedes reclamar tu libertad.

**La audiencia de legalización de captura**

Dentro de las 36 horas siguientes a la detención, el fiscal debe presentarte ante un juez de control de garantías. En esta audiencia el juez verifica si la captura fue legal, la Fiscalía puede formular cargos, y el juez puede decretar una medida de aseguramiento si la Fiscalía lo solicita y acredita los requisitos legales. Tu abogado tiene un papel clave: puede controvertir la legalidad de la captura y oponerse a la medida de aseguramiento.

**¿Y si la captura fue ilegal?**

Si la Policía no tenía orden judicial y no había flagrancia, o si el procedimiento se realizó con irregularidades graves, tu abogado puede solicitar que el juez declare ilegal la captura. Las consecuencias pueden incluir tu liberación inmediata, la nulidad de los elementos materiales de prueba obtenidos en ese procedimiento, e investigaciones disciplinarias contra los agentes que actuaron de forma irregular.

**Cómo actuar si un familiar fue capturado**

Si eres el familiar de alguien detenido en el Eje Cafetero, lo primero es ubicar a la persona. Puedes consultar la Sijin, la seccional de Policía correspondiente o el INPEC si ya fue trasladado. Lo segundo, y más importante, es contactar de inmediato a un abogado penalista. Cada hora que pasa sin representación legal es una hora en que el proceso avanza sin defensa.

¿Capturaron a un familiar en Pereira, Manizales o Armenia? Llámanos ahora al 314 830 9306 o escríbenos por WhatsApp. Atendemos urgencias penales en todo el Eje Cafetero.
    `,
  },
  'detencion-domiciliaria-colombia': {
    title: 'Detención domiciliaria en Colombia: requisitos y cómo solicitarla',
    category: 'Ejecución de Penas',
    date: '2026-05-05',
    content: `
La detención domiciliaria es uno de los temas que más consultas genera en materia penal. Muchas personas que enfrentan un proceso o que ya tienen una condena desconocen que pueden cumplir su medida o pena fuera de un establecimiento carcelario, en su propio hogar.

**Detención domiciliaria: dos modalidades distintas**

Existen dos tipos que no deben confundirse.

Detención preventiva domiciliaria (art. 314 C.P.P.): opera durante el proceso penal, antes de la condena. Sustituye la detención preventiva en establecimiento carcelario.

Prisión domiciliaria (art. 38 y ss. del Código Penal): opera como pena, una vez hay sentencia condenatoria en firme.

Cada una tiene sus propios requisitos y se tramita ante instancias diferentes.

**Detención preventiva domiciliaria (durante el proceso)**

El artículo 314 del Código de Procedimiento Penal permite sustituir la detención en establecimiento carcelario por detención en el lugar de residencia cuando el imputado es mayor de 65 años, padece una enfermedad grave que el centro de reclusión no puede atender, es madre o padre cabeza de familia de hijo menor o con incapacidad permanente, la mujer imputada está en estado de gestación, o la persona tiene una condición de discapacidad que implica riesgo grave.

La solicitud se presenta ante el Juez de Control de Garantías. El abogado defensor hace la petición en audiencia, aporta las pruebas que acreditan la causal y el juez decide.

El juez puede imponer condiciones como no salir del lugar de residencia sin autorización, presentarse periódicamente ante el despacho, abstenerse de contactar a víctimas o testigos, y usar dispositivo de vigilancia electrónica si lo ordena.

**Prisión domiciliaria como sustituto de la pena**

Una vez proferida la sentencia, el condenado puede solicitar que la pena se cumpla en su domicilio si la pena impuesta no supera los ocho años de prisión, demuestra arraigo familiar y social con domicilio fijo y vínculos estables, no es reincidente por delitos dolosos, el delito no está expresamente excluido por la ley, y firma un compromiso de no reincidencia.

La solicitud se presenta ante el Juez de Ejecución de Penas y Medidas de Seguridad del circuito correspondiente. En el Eje Cafetero, esos despachos están en Pereira, Manizales y Armenia.

**¿Vale la pena solicitarla?**

Para muchas personas y sus familias, la diferencia entre cumplir una pena en una cárcel del INPEC y hacerlo en casa es enorme: en términos de salud, de relaciones familiares y de posibilidades de reinserción social. El proceso requiere conocimiento técnico del derecho penal de ejecución, manejo de los jueces de ejecución en el Eje Cafetero y capacidad de argumentación.

¿Tienes un familiar con una condena o detención preventiva en Pereira, Manizales o Armenia? Podemos analizar si aplica la detención domiciliaria en tu caso. Llámanos al 314 830 9306 o escríbenos por WhatsApp para una consulta inicial.
    `,
  },
  'divorcio-colombia': {
    title: 'Divorcio en Colombia: tipos, proceso y tiempos',
    category: 'Familia',
    date: '2026-05-12',
    content: `
El divorcio es uno de los procesos legales más comunes y, al mismo tiempo, uno de los más cargados emocionalmente. En Colombia existen diferentes vías para disolver el matrimonio, y conocer cuál aplica a tu situación puede ahorrarte tiempo, dinero y conflictos innecesarios.

**Tipos de divorcio en Colombia**

**Divorcio de mutuo acuerdo**

Es la forma más ágil y menos costosa de terminar un matrimonio. Ambos cónyuges están de acuerdo en divorciarse y en las condiciones de la separación: custodia de los hijos, alimentos, liquidación de la sociedad conyugal.

Si no hay hijos menores de edad ni personas con discapacidad que dependan económicamente de alguno de los cónyuges, el divorcio puede tramitarse ante notario público sin necesidad de intervención judicial. Es el proceso más rápido: puede resolverse en semanas.

Si hay hijos menores, el divorcio requiere la aprobación de un juez de familia que verifique que los acuerdos sobre custodia y alimentos protegen adecuadamente a los menores.

**Divorcio contencioso**

Cuando uno de los cónyuges no quiere divorciarse o no hay acuerdo sobre las condiciones, el otro puede demandar el divorcio ante un juez de familia. Las causales del artículo 154 del Código Civil incluyen relaciones sexuares extramatrimoniales, grave incumplimiento de los deberes conyugales o parentales, ultrajes o trato cruel, embriaguez habitual o drogadicción, separación de cuerpos judicial por más de dos años, y separación de hecho por más de dos años.

**Cesación de efectos civiles del matrimonio católico**

En Colombia, los matrimonios religiosos católicos tienen efectos civiles. Para disolver estos efectos ante la ley se tramita la cesación de efectos civiles ante un juez de familia, siguiendo un proceso similar al divorcio contencioso.

**Paso a paso del proceso de divorcio judicial**

Paso 1: Consulta con un abogado de familia para entender tus derechos y la ruta más conveniente según tu situación.

Paso 2: Intento de conciliación. Antes de acudir al juez, la ley colombiana exige intentar la conciliación en un centro de conciliación.

Paso 3: Presentación de la demanda ante el Juzgado de Familia del circuito donde tuvo el último domicilio conyugal. En el Eje Cafetero, los juzgados de familia están en Pereira, Manizales y Armenia.

Paso 4: Trámite judicial con admisión de la demanda, notificación al cónyuge demandado, período probatorio, audiencias y sentencia.

Paso 5: Liquidación de la sociedad conyugal. El divorcio no liquida automáticamente los bienes. Después del fallo, las partes deben tramitar la liquidación, ya sea por acuerdo o ante el juez.

**Tiempos aproximados**

Mutuo acuerdo sin hijos ante notaría: 2 a 6 semanas. Mutuo acuerdo con hijos por vía judicial: 3 a 6 meses. Divorcio contencioso con causal: 8 meses a 2 años.

**¿Qué pasa con los hijos y la custodia?**

Cuando hay hijos menores de edad, el divorcio no puede tramitarse sin definir la custodia y cuidado personal, el régimen de visitas y la cuota alimentaria. El juez de familia tiene la última palabra para garantizar el interés superior del menor. Si los padres no se ponen de acuerdo, el juez decide.

¿Necesitas asesoría para un proceso de divorcio en Pereira, Manizales o Armenia? Contáctanos por WhatsApp o llámanos al 314 830 9306. Te explicamos cuál es la mejor ruta para tu caso y acompañamos el proceso de principio a fin.
    `,
  },
  'acoso-laboral-colombia': {
    title: 'Acoso laboral en Colombia: qué es, cómo reconocerlo y cómo denunciarlo',
    category: 'Laboral',
    date: '2026-05-12',
    content: `
El acoso laboral es una realidad que afecta a miles de trabajadores colombianos y que, a pesar de tener una ley específica desde 2006, sigue siendo uno de los fenómenos más subdenunciados del ámbito laboral. Muchas víctimas no saben que lo que viven tiene nombre legal, tiene consecuencias jurídicas para el agresor y tiene un procedimiento claro para denunciarlo.

**¿Qué es el acoso laboral según la Ley 1010 de 2006?**

La Ley 1010 de 2006 define el acoso laboral como toda conducta persistente y demostrable ejercida sobre un empleado por parte de un empleador, jefe, compañero o subalterno, encaminada a infundir miedo, intimidación, terror o angustia, a causar perjuicio laboral, a generar desmotivación o a inducir la renuncia del trabajador.

La ley distingue varias modalidades: maltrato laboral (violencia física o verbal, intimidación, amenazas), persecución laboral (conductas reiteradas de hostigamiento, cambios de horario injustificados, asignación de funciones imposibles), discriminación laboral (trato diferenciado por raza, género, origen, religión), inequidad laboral (asignación de funciones sin correspondencia con el cargo), y desprotección laboral (poner en riesgo la integridad del trabajador sin justificación).

**¿Cómo reconocer el acoso laboral?**

No toda situación difícil en el trabajo es acoso. La ley exige que las conductas sean persistentes y demostradas. Algunas señales: tu jefe o compañero te grita, humilla o insulta con frecuencia frente a otros; te asignan tareas imposibles de cumplir en el tiempo dado para justificar sanciones; te excluyen de reuniones o decisiones importantes sin razón aparente; recibes sanciones disciplinarias sin fundamento real orientadas a construir un expediente para despedirte; hay una campaña sistemática para hacerte quedar mal.

Una orden estricta, una crítica puntual o una carga laboral alta por sí solas no constituyen acoso. La ley apunta a conductas sistemáticas orientadas a dañar psicológica o profesionalmente al trabajador.

**¿Qué no es acoso laboral?**

La misma Ley 1010 aclara que no son acoso laboral: la exigencia de cumplir con las funciones del contrato, las sanciones disciplinarias aplicadas conforme al reglamento interno, la designación de cargos de confianza, ni los conflictos laborales puntuales sin patrón de persecución.

**Cómo denunciar el acoso laboral en Colombia**

Paso 1: Reúne evidencia. Documenta todo: guarda correos electrónicos, capturas de pantalla, registros de llamadas, anotaciones con fechas y testigos. Cuanta más evidencia tengas, más sólida será tu denuncia.

Paso 2: Acude al Comité de Convivencia Laboral. La Ley 1010 obliga a las empresas con más de 20 trabajadores a tener este comité. Recibe la queja, escucha a las partes y busca una solución interna. Si la empresa no tiene comité o no actúa, ese incumplimiento también es relevante jurídicamente.

Paso 3: Denuncia ante el Inspector de Trabajo del Ministerio de Trabajo. En el Eje Cafetero, los inspectores están en Pereira, Manizales y Armenia.

Paso 4: Acción penal o civil si hay daño grave. Algunos casos también pueden configurar delitos penales o generar responsabilidad civil por los daños a la salud mental del trabajador.

**Consecuencias para el agresor**

La Ley 1010 establece multas de 2 a 10 salarios mínimos para el agresor, terminación del contrato con justa causa si el acosador es un empleado, y obligación de realizar procesos de convivencia en la empresa. En casos graves, la víctima puede dar por terminado su contrato e invocar el despido indirecto, reclamando las indemnizaciones correspondientes.

¿Estás viviendo acoso laboral en Pereira, Manizales, Armenia o cualquier municipio del Eje Cafetero? Podemos orientarte sobre las acciones legales disponibles. Contáctanos por WhatsApp o llámanos al 314 830 9306.
    `,
  },
  'medida-de-aseguramiento-colombia': {
    title: 'Medida de aseguramiento en Colombia: tipos, requisitos y cómo impugnarla',
    category: 'Penal',
    date: '2026-05-19',
    content: `
Una de las consecuencias más graves que puede enfrentar una persona durante un proceso penal es la imposición de una medida de aseguramiento. Para muchos imputados, esta decisión significa perder la libertad antes de que exista una condena, lo que tiene un impacto enorme en su vida, su trabajo y su familia.

**¿Qué es una medida de aseguramiento?**

La medida de aseguramiento es una restricción a la libertad personal que un juez puede imponer durante el proceso penal, antes de que exista condena. No es una pena: es una medida cautelar que busca garantizar que el imputado esté disponible para el proceso y no obstaculice la justicia. Está regulada en los artículos 306 a 320 del Código de Procedimiento Penal.

**Tipos de medidas de aseguramiento**

Medidas privativas de la libertad: detención preventiva en establecimiento carcelario (la más grave) y detención preventiva domiciliaria (el imputado cumple la medida en su residencia).

Medidas no privativas de la libertad: obligación de presentarse periódicamente ante las autoridades, prohibición de salir del país, prohibición de salir del lugar de residencia, prohibición de comunicarse con la víctima o testigos, y uso de dispositivo de vigilancia electrónica.

**Requisitos para imponer una medida de aseguramiento**

El artículo 308 del Código de Procedimiento Penal establece que el juez solo puede imponer una medida cuando se cumplan simultáneamente tres condiciones.

Inferencia razonable de autoría o participación: la Fiscalía debe presentar elementos materiales de prueba que permitan inferir razonablemente que el imputado es autor o partícipe del delito.

Necesidad de la medida: debe existir peligro para la comunidad, peligro de no comparecencia del imputado al proceso, o riesgo de obstaculización de la investigación.

Proporcionalidad: la medida debe ser proporcional a la gravedad del delito y las condiciones personales del imputado. Una detención carcelaria no es procedente si una medida no privativa de libertad es suficiente.

**Cómo impugnar una medida de aseguramiento**

Recurso de apelación: la decisión que impone la medida es apelable ante el Tribunal Superior del Distrito Judicial correspondiente. El abogado debe sustentar el recurso demostrando que no se cumplían los requisitos del artículo 308.

Solicitud de revocatoria o sustitución: el artículo 318 permite solicitar al juez que revoque o sustituya la medida cuando hayan variado las circunstancias que la justificaron.

Vencimiento de términos: el artículo 317 establece que la medida pierde vigencia si se vencen ciertos términos procesales sin que el caso avance. Un abogado vigilante puede invocar este vencimiento para lograr la libertad del cliente.

**El papel del abogado defensor en la audiencia**

Este es uno de los momentos más críticos de un proceso penal. Un defensor técnico y preparado puede cuestionar la suficiencia de los elementos probatorios de la Fiscalía, demostrar que los fines constitucionales de la medida no se cumplen, acreditar condiciones personales del imputado que hacen innecesaria la privación de libertad, y proponer medidas alternativas no privativas que sean suficientes.

En los juzgados de control de garantías de Pereira, Manizales y Armenia, la experiencia en litigación oral y el conocimiento del sistema local hacen una diferencia real en el resultado de estas audiencias.

¿Te impusieron o le impusieron a un familiar una medida de aseguramiento en el Eje Cafetero? El tiempo importa. Llámanos al 314 830 9306 o escríbenos por WhatsApp para analizar las opciones de impugnación o sustitución.
    `,
  },
  'libertad-condicional-colombia': {
    title: 'Libertad condicional en Colombia: requisitos del artículo 64 del Código Penal',
    category: 'Ejecución de Penas',
    date: '2026-05-19',
    content: `
La libertad condicional es uno de los beneficios más importantes dentro del sistema de ejecución de penas en Colombia. Permite que una persona condenada recupere su libertad antes de terminar de cumplir la totalidad de la pena, siempre que cumpla con los requisitos que establece la ley.

**¿Qué es la libertad condicional?**

La libertad condicional es un subrogado penal, es decir, un mecanismo alternativo al cumplimiento total de la pena privativa de libertad en un establecimiento carcelario. Está regulada en el artículo 64 del Código Penal colombiano (Ley 599 de 2000), modificado por la Ley 1709 de 2014. Su nombre lo dice todo: la libertad se concede condicionada al cumplimiento de ciertas obligaciones durante el tiempo restante de la pena.

**Requisitos para obtener la libertad condicional**

El artículo 64 del Código Penal establece cuatro requisitos que deben cumplirse simultáneamente.

Primer requisito — haber cumplido las tres quintas (3/5) partes de la pena: la persona debe haber cumplido efectivamente el 60% de su pena en prisión. Para ciertos delitos como terrorismo, secuestro o extorsión, la ley exige que se haya cumplido el 80% de la pena.

Segundo requisito — buena conducta en el establecimiento carcelario: se acredita mediante el certificado de conducta expedido por el INPEC. Las faltas disciplinarias graves o muy graves dentro del establecimiento pueden cerrar la puerta a este beneficio.

Tercer requisito — que no sea necesario mantener la privación de libertad: el Juez de Ejecución de Penas valora si la privación continua sigue siendo necesaria para los fines de prevención y resocialización. El abogado debe argumentar que el condenado ya cumplió sus fines resocializadores y cuenta con condiciones para reintegrarse a la vida social.

Cuarto requisito — pago de la multa o acuerdo de pago: si la sentencia impuso multa como pena accesoria, debe haberse pagado o acordado un plan de pago.

**El proceso para solicitar la libertad condicional**

Paso 1: verificar el cumplimiento del requisito temporal considerando la fecha de inicio del cómputo de la pena, las rebajas por trabajo, estudio o enseñanza en el INPEC, y posibles acumulaciones de penas.

Paso 2: reunir los documentos, que incluyen la sentencia condenatoria en firme, el certificado de conducta del INPEC, el certificado de redención de penas, documentos de arraigo familiar, y comprobante de pago de multa si aplica.

Paso 3: presentar la solicitud ante el Juez de Ejecución de Penas del circuito donde la persona cumple condena. En el Eje Cafetero, estos despachos están en Pereira, Manizales y Armenia.

Paso 4: el juez puede citar a audiencia o resolver por escrito. Si concede la libertad condicional, fija las condiciones que el beneficiado debe cumplir durante el tiempo restante de pena.

**Por qué es importante un abogado para este trámite**

Técnicamente, un condenado puede presentar la solicitud por sí mismo. Pero en la práctica, los errores en el cálculo del tiempo cumplido, la falta de documentos o la debilidad en la argumentación jurídica son las causas más frecuentes de que el beneficio sea negado, a veces cuando el condenado sí tiene derecho a él.

Un abogado penalista con experiencia en ejecución de penas conoce los criterios que aplican los jueces del Eje Cafetero, sabe qué documentos son realmente relevantes y puede construir un expediente que maximice las posibilidades de éxito.

¿Tienes un familiar privado de la libertad en el Eje Cafetero que podría tener derecho a la libertad condicional? Podemos revisar su caso sin costo. Llámanos al 314 830 9306 o escríbenos por WhatsApp.
    `,
  },
  'preacuerdo-penal-colombia': {
    title: 'Preacuerdo penal en Colombia: ventajas, riesgos y cuándo conviene',
    category: 'Penal',
    date: '2026-05-19',
    content: `
Uno de los mecanismos más estratégicos del sistema penal acusatorio colombiano es el preacuerdo entre la Fiscalía y el imputado o acusado. Bien utilizado, puede significar una reducción importante de la pena, la eliminación de cargos secundarios o el acceso a beneficios que un juicio oral no garantizaría. Mal utilizado —o usado sin asesoría— puede ser un error grave del que no hay vuelta atrás.

**¿Qué es un preacuerdo en el proceso penal colombiano?**

Un preacuerdo es un acuerdo negociado entre la Fiscalía General de la Nación y el imputado o acusado, en el que este acepta total o parcialmente los cargos formulados a cambio de beneficios pactados. Está regulado en los artículos 348 a 354 del Código de Procedimiento Penal.

Los preacuerdos pueden incluir reducción de la pena, eliminación de cargos o cambio de la tipificación del delito, reconocimiento de circunstancias de menor punibilidad, y renuncia a la imposición de algunas penas accesorias. El preacuerdo debe ser aprobado por el Juez de Conocimiento, quien verifica que sea legal y que el imputado haya actuado libremente y con asesoría jurídica.

**Diferencia con el allanamiento a cargos**

El allanamiento a cargos es diferente al preacuerdo: en el allanamiento, el imputado acepta los cargos tal como los formula la Fiscalía, sin negociación previa. A cambio, la ley reconoce automáticamente una reducción de pena. En el preacuerdo, en cambio, hay negociación real sobre las condiciones, la tipificación y la pena resultante.

**Ventajas de un preacuerdo**

Reducción significativa de la pena: dependiendo del momento procesal, las rebajas pueden llegar al 50% de la pena imponible.

Certeza sobre el resultado: un juicio oral implica incertidumbre. Un preacuerdo bien negociado ofrece una condena conocida y manejable, lo que permite planear desde ya la fase de ejecución de la pena.

Posibilidad de eliminar cargos graves: si la Fiscalía formuló múltiples cargos, un preacuerdo puede implicar que el acusado acepta el cargo principal a cambio de que la Fiscalía retire los de mayor penalidad. Esto puede determinar si la pena resultante permite acceder a prisión domiciliaria o libertad condicional.

Ahorro de tiempo y desgaste emocional: un juicio oral puede extenderse por meses o años. Para muchos clientes, un preacuerdo bien negociado representa también una solución de vida.

**Riesgos de un preacuerdo**

Aceptar cargos sin base suficiente: si la Fiscalía no tiene pruebas sólidas para una condena y el imputado no lo sabe, puede allanarse innecesariamente a una condena que en juicio habría podido ganar.

No verificar el impacto en la pena real: una rebaja del 50% sobre una pena de 20 años sigue siendo 10 años de prisión. Antes de acordar, hay que calcular si la pena resultante permite beneficios administrativos.

No contar con asesoría jurídica real: la Fiscalía busca maximizar condenas. El imputado que negocia sin abogado suele aceptar condiciones que un defensor técnico habría podido mejorar.

**¿Cuándo conviene un preacuerdo?**

Un preacuerdo conviene cuando las pruebas de la Fiscalía son sólidas y la probabilidad de condena en juicio es alta, cuando la rebaja de pena permite acceder a beneficios como prisión domiciliaria o pena menor de 8 años, cuando el imputado quiere resolver su situación con certeza y sin el desgaste de un juicio, o cuando la tipificación propuesta es menos grave que la inicial y tiene consecuencias prácticas importantes.

No conviene cuando la defensa tiene elementos sólidos para controvertir la acusación, cuando las pruebas de la Fiscalía son débiles, o cuando el preacuerdo ofrecido no mejora sustancialmente la situación jurídica del imputado.

La decisión de aceptar o rechazar un preacuerdo es una de las más importantes en todo el proceso penal. Debe tomarse con información completa y con el acompañamiento de un abogado penalista de confianza.

¿Te ofrecieron un preacuerdo en Pereira, Manizales o Armenia y no sabes si conviene aceptarlo? Analizamos tu caso y te damos una opinión clara y honesta. Llámanos al 314 830 9306 o contáctanos por WhatsApp.
    `,
  },
};

export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) notFound();

  const paragraphs = article.content.trim().split('\n\n');

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <SiteHeader />

      <section className="section-shell">
        <div className="container max-w-3xl space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="pill text-xs">{article.category}</span>
              <span className="text-xs text-muted">
                {new Date(article.date).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>
            <h1>{article.title}</h1>
          </div>

          <div className="card-shell bg-white p-6 md:p-8 space-y-4 text-muted leading-relaxed">
            {paragraphs.map((p, i) => {
              if (p.startsWith('**') && p.endsWith('**')) {
                return <h3 key={i} className="text-ink font-semibold text-base mt-2">{p.replace(/\*\*/g, '')}</h3>;
              }
              return <p key={i} className="text-sm">{p}</p>;
            })}
          </div>

          <div className="card-shell bg-surface p-6 space-y-3">
            <p className="font-semibold text-ink">¿Tiene preguntas sobre este tema?</p>
            <p className="text-sm text-muted">Contáctenos y le orientamos sin compromiso.</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={buildWhatsAppUrl({ area: article.category, source: `/blog/${slug}`, message: `Hola, leí el artículo "${article.title}" y tengo una consulta.` })}
                className="btn-primary"
              >
                Escribir por WhatsApp
              </a>
              <Link href="/blog" className="btn-secondary">Ver más artículos</Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-white/90 py-8">
        <div className="container text-sm text-muted text-center">
          <p>© {new Date().getFullYear()} Castellanos Abogados · Todos los derechos reservados.</p>
        </div>
      </footer>
    </main>
  );
}
