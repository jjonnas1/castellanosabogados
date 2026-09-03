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
  'ley-2466-2025-redenciones-pena': {
    title: 'Ley 2466 de 2025: cómo cambiaron las redenciones de pena en Colombia',
    category: 'Ejecución de Penas',
    date: '2026-05-15',
    content: `
En febrero de 2025 Colombia promulgó la Ley 2466, una reforma que modificó de manera importante el régimen de redenciones de pena para personas privadas de la libertad. Si tiene un familiar condenado en un establecimiento del INPEC, entender este cambio puede significar semanas o incluso meses de diferencia en su fecha de acceso a beneficios como la libertad condicional o la prisión domiciliaria.

**¿Qué son las redenciones de pena?**

Las redenciones de pena son un mecanismo legal que permite a los internos descontar días de su condena a través del trabajo, el estudio y la enseñanza dentro del establecimiento penitenciario. Están reguladas en el Código Penitenciario y Carcelario (Ley 65 de 1993) y han sido objeto de varias modificaciones a lo largo de los años. Su importancia práctica es enorme: los días redimidos se descuentan del total de la pena y aceleran el momento en que el condenado puede solicitar beneficios como la libertad condicional.

**¿Qué cambió con la Ley 2466 de 2025?**

La ley establece que se abonarán dos días de reclusión por cada tres días efectivos de trabajo o estudio dentro del establecimiento. Esta relación (2 por cada 3 días) busca incentivar la participación activa de los internos en actividades productivas y educativas, reconociendo que estas actividades tienen un impacto real en la reducción de la reincidencia.

Uno de los aspectos más relevantes de la norma es el reconocimiento de las actividades laborales desarrolladas dentro del penal como experiencia laboral válida. El Ministerio de Trabajo tiene un plazo de seis meses desde la promulgación de la ley para reglamentar cómo se certifica y reconoce esta experiencia, con el objetivo de facilitar la inserción laboral al momento de la libertad. Esto representa un cambio significativo frente al estigma que históricamente ha enfrentado la población pospenada en el mercado laboral.

El INPEC y la USPEC (Unidad de Servicios Penitenciarios y Carcelarios) quedan encargados de consolidar y reportar la información sobre participación de los internos en actividades productivas, para que el Ministerio de Trabajo pueda llevar estadísticas actualizadas sobre inserción laboral.

**Por qué importa la exactitud en los cómputos del INPEC**

El registro de las actividades de trabajo y estudio es responsabilidad del INPEC, pero en la práctica los errores en los cómputos son frecuentes. Días trabajados que no quedaron registrados, períodos de estudio que no fueron certificados a tiempo o redenciones calculadas con la norma equivocada son situaciones que se presentan con más regularidad de lo que debería. Cada error en el cómputo puede retrasar semanas o meses la fecha en que el condenado alcanza el 60% de la pena necesario para solicitar la libertad condicional.

Por eso, la revisión técnica y oportuna de los cómputos del INPEC no es un lujo: es una necesidad para cualquier persona privada de la libertad y para su familia. La diferencia entre un cómputo correcto y uno erróneo puede ser determinante en la estrategia de ejecución de penas.

**¿Cómo se tramita el reconocimiento de las redenciones ante el Juez de Ejecución?**

Las redenciones no se reconocen automáticamente. El INPEC debe certificarlas y el abogado o el condenado deben presentar esa certificación ante el Juez de Ejecución de Penas y Medidas de Seguridad para que queden formalmente reconocidas en el expediente. Si hay discrepancias entre lo que certifica el INPEC y lo que el abogado calcula, se puede controvertir ante el juez con la documentación de respaldo de las actividades realizadas.

**Lo que debe revisar si tiene un familiar condenado**

Si tiene un familiar privado de la libertad en un establecimiento del INPEC, hay tres cosas que vale la pena verificar: primero, si las actividades de trabajo o estudio que realiza están siendo registradas correctamente por el INPEC; segundo, si los cómputos que lleva el juzgado de ejecución de penas coinciden con los que reporta el INPEC; y tercero, cuándo —con los cómputos correctos y las redenciones reconocidas— se alcanza el 60% de la pena para solicitar la libertad condicional o los demás beneficios aplicables.

¿Tiene dudas sobre los cómputos de pena o las redenciones de su familiar en el Eje Cafetero? Revisamos el expediente y le explicamos con exactitud a qué tiene derecho y cuándo. Contáctenos por WhatsApp o llámenos al 314 830 9306.
    `,
  },
  'libertad-condicional-colombia': {
    title: 'Libertad condicional en Colombia: requisitos del artículo 64 del Código Penal',
    category: 'Ejecución de Penas',
    date: '2026-05-19',
    content: `
La libertad condicional es uno de los beneficios más importantes dentro del sistema de ejecución de penas en Colombia. Permite que una persona condenada recupere su libertad antes de terminar de cumplir la totalidad de la pena, siempre que cumpla con los requisitos que establece la ley.

**¿Qué dice el artículo 64 del Código Penal colombiano?**

El artículo 64 de la Ley 599 de 2000 (Código Penal), modificado por el artículo 30 de la Ley 1709 de 2014, es la norma que regula la libertad condicional en Colombia. Su texto vigente dispone:

"El juez, previa valoración de la conducta punible, concederá la libertad condicional a la persona condenada a pena privativa de la libertad cuando haya cumplido con los siguientes requisitos: 1. Que la persona haya cumplido las tres quintas (3/5) partes de la pena. 2. Que su adecuado desempeño y comportamiento durante el tratamiento penitenciario en el centro de reclusión permita suponer fundadamente que no existe necesidad de continuar la ejecución de la pena. 3. Que demuestre arraigo familiar y social. [...] En todo caso su concesión estará supeditada a la reparación a la víctima o al aseguramiento del pago de la indemnización mediante garantía personal, real, bancaria o acuerdo de pago, salvo que se demuestre insolvencia del condenado. El tiempo que falte para el cumplimiento de la pena se tendrá como periodo de prueba."

En palabras simples: quien haya cumplido el 60% de su pena, tenga buen comportamiento certificado por el INPEC y demuestre arraigo familiar y social puede pedirle al Juez de Ejecución de Penas que le conceda la libertad por el tiempo restante, bajo condiciones. Además, debe haber reparado a la víctima o asegurado el pago de la indemnización, salvo que demuestre insolvencia.

**¿Qué es la libertad condicional?**

La libertad condicional es un subrogado penal, es decir, un mecanismo alternativo al cumplimiento total de la pena privativa de libertad en un establecimiento carcelario. Está regulada en el artículo 64 del Código Penal colombiano (Ley 599 de 2000), modificado por la Ley 1709 de 2014. Su nombre lo dice todo: la libertad se concede condicionada al cumplimiento de ciertas obligaciones durante el tiempo restante de la pena.

**Requisitos para obtener la libertad condicional**

El artículo 64 del Código Penal establece tres requisitos que deben cumplirse simultáneamente, más una condición adicional relacionada con la víctima.

Primer requisito — haber cumplido las tres quintas (3/5) partes de la pena: la persona debe haber cumplido el 60% de la pena. Para este cómputo cuentan tanto el tiempo físico de privación de la libertad como las redenciones de pena por trabajo, estudio o enseñanza certificadas por el INPEC. Tenga en cuenta que para ciertos delitos —como terrorismo, financiación del terrorismo, secuestro extorsivo y extorsión— la Ley 1121 de 2006 excluye este beneficio, por lo que cada caso debe revisarse de manera individual.

Segundo requisito — adecuado desempeño y comportamiento durante el tratamiento penitenciario: se acredita mediante el certificado de conducta expedido por el INPEC y debe permitir concluir que no es necesario continuar la ejecución de la pena en prisión. Las faltas disciplinarias graves o muy graves dentro del establecimiento pueden cerrar la puerta a este beneficio. El abogado debe argumentar que el condenado ya cumplió sus fines resocializadores y cuenta con condiciones para reintegrarse a la vida social.

Tercer requisito — demostrar arraigo familiar y social: el condenado debe acreditar vínculos familiares, laborales o comunitarios que respalden su reintegración. Corresponde al Juez de Ejecución de Penas establecer, con las pruebas del expediente, la existencia o inexistencia de ese arraigo.

Condición adicional — reparación a la víctima: la concesión está supeditada a la reparación a la víctima o al aseguramiento del pago de la indemnización mediante garantía personal, real, bancaria o acuerdo de pago, salvo que se demuestre la insolvencia del condenado. Desde la Ley 1709 de 2014, el pago de la multa dejó de ser un requisito de la libertad condicional: lo que la norma exige es la reparación o su aseguramiento.

**El proceso para solicitar la libertad condicional**

Paso 1: verificar el cumplimiento del requisito temporal considerando la fecha de inicio del cómputo de la pena, las rebajas por trabajo, estudio o enseñanza en el INPEC, y posibles acumulaciones de penas.

Paso 2: reunir los documentos, que incluyen la sentencia condenatoria en firme, el certificado de conducta del INPEC, el certificado de redención de penas, documentos de arraigo familiar y social, y la constancia de reparación a la víctima o del acuerdo de pago de la indemnización — o la prueba de insolvencia, según el caso.

Paso 3: presentar la solicitud ante el Juez de Ejecución de Penas del circuito donde la persona cumple condena. En el Eje Cafetero, estos despachos están en Pereira, Manizales y Armenia.

Paso 4: el juez puede citar a audiencia o resolver por escrito. Si concede la libertad condicional, fija las condiciones que el beneficiado debe cumplir durante el tiempo restante de pena.

**Por qué es importante un abogado para este trámite**

Técnicamente, un condenado puede presentar la solicitud por sí mismo. Pero en la práctica, los errores en el cálculo del tiempo cumplido, la falta de documentos o la debilidad en la argumentación jurídica son las causas más frecuentes de que el beneficio sea negado, a veces cuando el condenado sí tiene derecho a él.

Un abogado penalista con experiencia en ejecución de penas conoce los criterios que aplican los jueces del Eje Cafetero, sabe qué documentos son realmente relevantes y puede construir un expediente que maximice las posibilidades de éxito.

**Preguntas frecuentes sobre la libertad condicional**

**¿Qué es la libertad condicional en Colombia?**

Es un subrogado penal: un mecanismo que permite a una persona condenada cumplir en libertad la parte final de su pena, bajo condiciones fijadas por el juez. Está regulada en el artículo 64 del Código Penal (Ley 599 de 2000, modificado por la Ley 1709 de 2014). No borra la condena: el tiempo que falte de pena se convierte en un período de prueba.

**¿Cuánto tiempo de la pena hay que cumplir para pedir la libertad condicional?**

Las tres quintas (3/5) partes de la pena, es decir, el 60%. Para ese cómputo cuentan tanto el tiempo físico en prisión como las redenciones de pena por trabajo, estudio o enseñanza certificadas por el INPEC, por lo que la fecha real suele llegar antes de lo que la familia cree.

**¿Qué requisitos exige el artículo 64 del Código Penal?**

Tres requisitos: haber cumplido las 3/5 partes de la pena, que el comportamiento durante el tratamiento penitenciario permita concluir que no es necesario seguir ejecutando la pena, y demostrar arraigo familiar y social. Además, la concesión está supeditada a la reparación de la víctima o al aseguramiento del pago de la indemnización, salvo insolvencia demostrada.

**¿Quién concede la libertad condicional y dónde se solicita?**

La concede el Juez de Ejecución de Penas y Medidas de Seguridad que vigila la condena. La solicitud se presenta ante ese despacho con los cómputos y el certificado de conducta del INPEC, los certificados de redención y las pruebas de arraigo. En el Eje Cafetero, estos juzgados funcionan en Pereira, Manizales y Armenia.

**¿Qué pasa si se incumplen las condiciones durante el período de prueba?**

El juez puede revocar la libertad condicional y ordenar el regreso a prisión para cumplir el tiempo restante de la pena. El período de prueba equivale al tiempo que faltaba de condena y, cuando es inferior a tres años, el juez puede aumentarlo hasta en otro tanto igual.

¿Tienes un familiar privado de la libertad en el Eje Cafetero que podría tener derecho a la libertad condicional? Podemos revisar su caso sin costo. Llámanos al 314 830 9306 o escríbenos por WhatsApp.
    `,
  },
  'cuota-alimentaria-colombia': {
    title: 'Cuota de alimentos en Colombia: cómo se fija, cómo se revisa y qué pasa si no la pagan',
    category: 'Familia',
    date: '2026-03-25',
    content: `
La obligación alimentaria es uno de los temas de derecho de familia que más consultas genera en Colombia. Afecta a padres separados, parejas en proceso de divorcio y cualquier familia donde exista un menor de edad o una persona que dependa económicamente de otra. Conocer cómo funciona este proceso puede marcar una diferencia enorme en el bienestar de los hijos.

**¿Qué son los alimentos en el derecho colombiano?**

Los alimentos son la obligación legal de una persona de suministrar a otra lo necesario para su subsistencia: alimentación, vivienda, vestido, salud y educación. En Colombia, esta obligación está consagrada en el artículo 411 del Código Civil, norma que ha sido actualizada más recientemente por la Ley 2388 de 2024, la cual amplió los titulares del derecho de alimentos para incluir expresamente a los hijos y padres de crianza en los numerales 11 y 12 del artículo.

**¿Quiénes tienen derecho a alimentos?**

El artículo 411 del Código Civil establece que tienen derecho a alimentos, entre otros: el cónyuge o compañero permanente, los hijos legítimos o extramatrimoniales, los padres, los hermanos en condición de vulnerabilidad, y ahora también los hijos y padres de crianza. Los menores de edad tienen una protección reforzada: su derecho a los alimentos es de orden público y no puede renunciarse.

**Requisitos para que proceda la obligación alimentaria**

La Corte Constitucional ha establecido que para que nazca la obligación alimentaria deben concurrir tres elementos: que el solicitante no tenga los recursos suficientes para cubrir sus necesidades básicas, que el obligado tenga capacidad económica para suministrar los alimentos, y que exista entre las partes un vínculo de parentesco, matrimonio, unión marital o el supuesto legal que origina la obligación.

**¿Cómo se fija la cuota alimentaria?**

Existen dos vías principales. La primera es la conciliación extrajudicial: ante un centro de conciliación, una comisaría de familia o la Defensoría del Pueblo, las partes acuerdan el monto de la cuota sin necesidad de proceso judicial. El acta de conciliación tiene los mismos efectos de una sentencia y presta mérito ejecutivo. La segunda es el proceso judicial: cuando no hay acuerdo, se presenta una demanda ante el Juez de Familia del circuito. El juez puede decretar alimentos provisionales desde el inicio del proceso si existe prueba siquiera sumaria de la capacidad económica del demandado y de las necesidades del alimentario.

El juez fija la cuota considerando las necesidades del alimentario (edad, salud, educación, gastos de vida), la capacidad económica del obligado (ingresos, patrimonio, otras obligaciones) y el interés superior del menor cuando están involucrados hijos.

**¿Cuándo y cómo se puede revisar la cuota?**

La cuota de alimentos no es permanente ni inmutable. Puede revisarse cuando cambien las condiciones económicas del obligado (perdió su empleo o su ingreso disminuyó), cuando aumenten las necesidades del alimentario (enfermedad, cambio de ciclo educativo), o cuando el obligado mejore notoriamente su capacidad económica. El proceso de revisión se tramita ante el mismo juez que fijó la cuota inicial o ante el juez de familia del domicilio del alimentario.

**¿Qué pasa si el obligado no paga?**

El incumplimiento de la cuota alimentaria tiene consecuencias jurídicas en dos frentes. En el civil, puede iniciarse un proceso ejecutivo de alimentos ante el juez de familia. En este proceso pueden embargarse los salarios, cuentas bancarias y bienes del deudor. La ley permite embargar hasta el 50% del salario cuando se trata de alimentos para menores de edad. En el penal, el artículo 233 del Código Penal tipifica el delito de inasistencia alimentaria. El obligado que dolosamente no suministre los medios para la subsistencia del alimentario puede ser sancionado con prisión de dos a cuatro años, sin perjuicio de lo cual persiste la obligación de pagar.

**La importancia de actuar desde el inicio**

Muchas personas esperan meses antes de iniciar el proceso de fijación de alimentos, y ese tiempo no se recupera fácilmente. La cuota no opera de manera retroactiva salvo en casos excepcionales: se empieza a contar desde la notificación de la demanda. Iniciar el trámite a tiempo protege mejor los intereses del menor o del alimentario.

¿Necesita fijar, revisar o hacer cumplir una cuota de alimentos en Pereira, Manizales o Armenia? En Castellanos Abogados acompañamos todo el proceso. Contáctenos por WhatsApp o llámenos al 314 830 9306.
    `,
  },
  'violencia-intrafamiliar-medidas-proteccion': {
    title: 'Violencia intrafamiliar en Colombia: medidas de protección urgentes y cómo solicitarlas',
    category: 'Familia',
    date: '2026-04-22',
    content: `
La violencia intrafamiliar es una de las situaciones más urgentes que puede enfrentar una familia. En Colombia existe un marco legal robusto que permite actuar con rapidez para proteger a las víctimas, incluso antes de que haya una investigación penal formal. El problema es que muchas personas desconocen estos mecanismos o no saben cómo activarlos.

**Marco legal de la violencia intrafamiliar en Colombia**

El sistema de protección frente a la violencia intrafamiliar en Colombia está construido sobre varias normas que se complementan: la Ley 294 de 1996, que desarrolló el artículo 42 de la Constitución y estableció los primeros mecanismos de protección; la Ley 575 de 2000, que trasladó la competencia de los jueces de familia a los comisarios de familia; la Ley 1257 de 2008, que amplió el concepto de violencia para incluir el daño a la integridad sexual y psicológica; y la Ley 2126 de 2021, que reglamentó las comisarías de familia y fortaleció la respuesta institucional.

**¿Qué se entiende por violencia intrafamiliar?**

La ley protege a quienes sufren daño físico, psicológico, sexual o económico por parte de un miembro de su grupo familiar. El daño no requiere ser visible o haberse producido con violencia directa: las amenazas, la intimidación sistemática, el control económico y el maltrato verbal reiterado también constituyen violencia en los términos de la ley. No es necesario que exista una denuncia penal previa para solicitar medidas de protección.

**¿Qué son las medidas de protección?**

Las medidas de protección son órdenes que puede dictar el comisario de familia (o el juez civil municipal si no hay comisaría) para detener la violencia y prevenir nuevas agresiones. Pueden decretarse de manera inmediata, sin necesidad de prueba plena: basta con indicios serios de que ha ocurrido o puede ocurrir una situación de violencia. Las medidas más importantes incluyen: ordenar al agresor retirarse del hogar de la víctima, prohibir al agresor acercarse a la víctima, a sus hijos u otros miembros de la familia, ordenar al agresor abstenerse de todo acto de perturbación o intimidación, fijar provisionalmente la custodia y alimentos cuando hay menores en riesgo, y ordenar tratamiento reeducativo o terapéutico para el agresor.

**¿Dónde y cómo se solicita una medida de protección?**

La solicitud puede presentarse ante la comisaría de familia del municipio donde ocurrieron los hechos o donde reside la víctima. Si no hay comisaría, ante el juez civil municipal o promiscuo municipal. No se requiere abogado para presentar la solicitud, aunque contar con orientación jurídica mejora la presentación de los hechos y la solicitud de medidas específicas. La solicitud puede hacerla la propia víctima, cualquier miembro del grupo familiar, el defensor de familia, el agente del ministerio público o la Policía Nacional. El funcionario debe actuar de manera inmediata cuando hay urgencia y riesgo grave.

**¿Qué pasa si el agresor incumple la medida de protección?**

El incumplimiento de una medida de protección es una falta grave. La víctima debe denunciarlo de inmediato ante la comisaría que la impuso. El funcionario puede imponer multas de uno a diez salarios mínimos al agresor y arresto hasta por treinta días. El incumplimiento también puede fundar una denuncia penal por violación de medidas de protección, configurando además una agravante en eventuales investigaciones penales relacionadas.

**Violencia intrafamiliar y proceso penal**

La violencia intrafamiliar también puede ser constitutiva del delito tipificado en el artículo 229 del Código Penal, con penas de prisión de cuatro a ocho años. El proceso penal corre en paralelo al proceso de medidas de protección ante la comisaría: son mecanismos independientes que se complementan. Para el proceso penal, la víctima puede denunciar ante la Fiscalía General de la Nación o ante cualquier estación de Policía.

**Cuándo buscar orientación jurídica urgente**

Cuando hay violencia física o amenaza grave, el primer paso es ponerse a salvo. El segundo, activar la comisaría de familia con los hechos documentados: fotos de lesiones, capturas de mensajes amenazantes, llamadas recibidas, testigos. Un abogado de familia puede acompañar este proceso para garantizar que las medidas solicitadas sean las más adecuadas al caso y que se cumplan efectivamente.

¿Usted o alguien de su familia necesita medidas de protección urgentes en Pereira, Manizales o Armenia? Contáctenos por WhatsApp o llámenos al 314 830 9306. Atendemos con reserva y urgencia.
    `,
  },
  'prescripcion-titulos-valores-colombia': {
    title: 'Prescripción de títulos valores en Colombia: letras de cambio, cheques y pagarés',
    category: 'Civil',
    date: '2026-05-20',
    content: `
Los títulos valores —letras de cambio, cheques y pagarés— son documentos que incorporan una obligación de pago y que circulan con reglas propias dentro del tráfico comercial. Una de las más importantes es la prescripción: el plazo máximo durante el cual el tenedor puede exigir judicialmente el pago. Vencido ese término sin que se haya ejercido la acción, el derecho cambiario se extingue.

Conocer estos plazos es fundamental tanto para quien tiene un título en su poder como para quien lo firmó. Un acreedor que espera demasiado pierde el derecho a cobrar; un deudor que no sabe que el título prescribió puede pagar una obligación que ya no era exigible judicialmente.

**Fundamento legal**

La prescripción de los títulos valores está regulada en el Código de Comercio colombiano, principalmente en los artículos 789 a 793 para las letras de cambio y los pagarés, y en el artículo 730 para los cheques. Estas normas establecen plazos distintos según el tipo de título y según la posición que ocupa cada obligado dentro de la cadena cambiaria.

**Prescripción de la letra de cambio**

La letra de cambio es el título valor más complejo desde el punto de vista cambiario, porque en ella intervienen varios obligados con responsabilidades distintas: el aceptante (obligado principal), los endosantes y los avalistas.

El artículo 789 del Código de Comercio establece tres plazos de prescripción según la acción que se ejerza.

La acción cambiaria directa —la que se dirige contra el aceptante de la letra— prescribe en tres (3) años contados desde la fecha de vencimiento del título. Esta es la acción más sólida porque se dirige contra quien aceptó pagar.

La acción cambiaria de regreso del último tenedor —dirigida contra los endosantes, el girador o sus avalistas— prescribe en un (1) año, contado desde la fecha del protesto o, si el título fue girado con la cláusula "sin protesto", desde la fecha de vencimiento.

La acción de regreso entre obligados de regreso —por ejemplo, cuando un endosante ya pagó y quiere recuperar lo pagado de endosantes anteriores— prescribe en seis (6) meses contados desde la fecha en que ese obligado realizó el pago voluntario o desde la fecha en que fue notificado de la demanda en su contra.

**Prescripción del pagaré**

El pagaré se rige por las mismas normas de la letra de cambio en materia de prescripción, de conformidad con el artículo 793 del Código de Comercio. Los plazos son idénticos: tres años para la acción directa contra el suscriptor del pagaré (que equivale al aceptante en la letra), un año para la acción de regreso del último tenedor, y seis meses para las acciones entre obligados de regreso.

En la práctica, el pagaré es el título valor más utilizado en Colombia para documentar obligaciones de crédito entre personas naturales y empresas. Su prescripción de tres años desde el vencimiento es el plazo que con más frecuencia debe vigilarse.

**Prescripción del cheque**

El cheque tiene reglas propias y plazos más cortos. El artículo 730 del Código de Comercio establece que las acciones cambiarias derivadas del cheque prescriben en seis (6) meses.

Para el último tenedor del cheque, ese término se cuenta desde la fecha de presentación del título al banco, es decir, desde el momento en que el cheque fue cobrado o rechazado. Para los endosantes y sus avalistas, el término de seis meses se cuenta desde el día siguiente a aquel en que cada uno de ellos pagó el cheque.

Es importante tener en cuenta que el cheque también tiene un plazo de presentación al banco —quince días si fue expedido en el mismo lugar de pago y un mes si fue expedido en lugar distinto— y que la caducidad de ese plazo, aunque no extingue la acción, puede afectar las acciones de regreso.

**¿Desde cuándo se cuentan los plazos?**

La regla general es que los plazos de prescripción empiezan a correr desde el momento en que la obligación se hizo exigible: para la letra de cambio y el pagaré, desde el vencimiento; para el cheque, desde la presentación.

Si el título no tiene fecha de vencimiento o vence a la vista, el plazo empieza a correr desde la fecha de creación del documento o desde el momento de la presentación, según el tipo de título.

**Interrupción de la prescripción**

La prescripción no opera de manera automática si el acreedor toma acciones oportunas. El término se interrumpe —es decir, el conteo se reinicia— cuando el tenedor presenta una demanda ante el juez competente. También puede interrumpirse mediante la notificación formal del proceso al deudor o por el reconocimiento expreso que hace el deudor de la deuda.

Si la prescripción se interrumpe, el término empieza a correr nuevamente desde cero. Por eso, cuando se acercan los plazos, la presentación oportuna de la demanda es la herramienta más eficaz para conservar el derecho.

**¿Qué pasa cuando el título ya prescribió?**

La prescripción cambiaria no significa que el acreedor pierda todo. El ordenamiento colombiano conserva dos vías alternativas cuando el título ha prescrito.

La acción de enriquecimiento sin causa permite reclamar el pago cuando el deudor se ha enriquecido injustificadamente con la prescripción del título. Esta acción tiene un plazo de un (1) año contado desde la fecha en que operó la prescripción, y permite recuperar el valor del título aunque ya no sea posible ejercer la acción cambiaria directa.

La acción causal permite al acreedor volver al negocio jurídico que dio origen al título y exigir el cumplimiento por esa vía, con los plazos de prescripción del contrato subyacente, que en materia civil son generalmente de diez años.

**Resumen de plazos**

Letra de cambio — acción directa contra el aceptante: 3 años desde el vencimiento. Letra de cambio — acción de regreso del último tenedor: 1 año desde el protesto o el vencimiento. Letra de cambio — acción entre obligados de regreso: 6 meses desde el pago o notificación.

Pagaré — acción directa contra el suscriptor: 3 años desde el vencimiento. Pagaré — acción de regreso del último tenedor: 1 año desde el protesto o el vencimiento. Pagaré — acción entre obligados de regreso: 6 meses desde el pago o notificación.

Cheque — acción del último tenedor: 6 meses desde la presentación. Cheque — acción de endosantes y avalistas: 6 meses desde el pago.

Acción de enriquecimiento sin causa (para cualquier título prescrito): 1 año desde que operó la prescripción.

**Recomendación práctica**

Si tiene en su poder una letra de cambio, un cheque o un pagaré que no ha podido cobrar, no espere. Los plazos de prescripción son fatales y, una vez vencidos, la única alternativa es la acción de enriquecimiento, que tiene condiciones más estrictas y un plazo aún más corto.

Si usted firmó un título valor hace años y le están cobrando una deuda que podría estar prescrita, es igualmente importante verificar los términos antes de pagar, porque podría estar asumiendo una obligación que ya no era judicialmente exigible.

¿Tiene dudas sobre si un título valor que le deben o que firmó ya prescribió? En Castellanos Abogados revisamos la situación de su título y le explicamos las opciones disponibles. Contáctenos por WhatsApp o llámenos al 314 830 9306.
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
  'reforma-laboral-colombia-cambios-vigentes-2026': {
    title: 'Reforma laboral en Colombia: cambios vigentes en 2026 para trabajadores y empleadores',
    category: 'Laboral',
    date: '2026-08-05',
    content: `
La Ley 2466 de 2025 introdujo una reforma laboral que modificó varias reglas del Código Sustantivo del Trabajo. En 2026 ya están vigentes medidas que afectan la forma de contratar, la jornada nocturna, el trabajo en días de descanso obligatorio y los procedimientos disciplinarios. Conocer la fecha de entrada en vigencia de cada cambio es importante para trabajadores y empleadores.

**El contrato a término indefinido como regla general**

La reforma establece que el contrato a término indefinido es la modalidad principal de vinculación laboral. Los contratos a término fijo, por obra o labor determinada y los ocasionales siguen siendo posibles, pero deben responder a una necesidad real y cumplir los requisitos legales. En los contratos por obra o labor, la actividad contratada debe quedar descrita de forma precisa y por escrito; si no se cumplen las condiciones, o si el trabajador continúa una vez termina la obra, puede surgir una discusión sobre la naturaleza indefinida de la relación.

Para los contratos a término fijo, la ley fijó un límite máximo de cuatro años, incluidas sus prórrogas. Antes de firmar, renovar o terminar un contrato conviene revisar el texto concreto, la duración acumulada y las comunicaciones de preaviso.

**Trabajo nocturno desde las 7:00 p. m.**

Desde el 25 de diciembre de 2025, la jornada nocturna comprende el trabajo realizado entre las 7:00 p. m. y las 6:00 a. m. Antes de esa fecha, el período nocturno iniciaba a las 9:00 p. m. El cambio puede impactar la liquidación del recargo nocturno de quienes trabajan en comercio, restaurantes, seguridad, transporte, salud y otras actividades con turnos extendidos.

**Recargo por trabajar en día de descanso obligatorio**

La Ley 2466 dispuso una implementación gradual del recargo por laborar en día de descanso obligatorio. Desde el 1 de julio de 2026, el recargo es del 90% sobre el salario ordinario, en proporción a las horas trabajadas. La aplicación plena del 100% está prevista para el 1 de julio de 2027. La regla puede variar según la forma en que esté pactado el día de descanso y las condiciones particulares del vínculo laboral, por lo que una liquidación debe revisarse caso por caso.

**Debido proceso en actuaciones disciplinarias**

La reforma también reforzó el deber de respetar garantías mínimas al imponer sanciones laborales. Una sanción no debería convertirse en una decisión sorpresiva: el trabajador debe tener oportunidad real de conocer los hechos, dar su versión, controvertir las pruebas y ejercer su defensa. Para las empresas, esto implica revisar reglamentos internos y procedimientos; para los trabajadores, conservar citaciones, descargos, comunicaciones y soportes.

**Qué hacer si existe una duda sobre el contrato o la nómina**

El primer paso es reunir el contrato, comprobantes de pago, horarios, desprendibles de nómina y comunicaciones relevantes. No toda diferencia se resuelve de la misma manera: la fecha de los hechos, el tipo de contrato y el sector pueden modificar el análisis. Una asesoría laboral permite identificar si procede una reclamación directa, una conciliación o una acción judicial.

¿Tiene dudas sobre la aplicación de la reforma laboral en Pereira, Manizales, Armenia o el Eje Cafetero? En Castellanos Abogados revisamos su caso y le explicamos las alternativas jurídicas disponibles.
    `,
  },
  'nuevo-codigo-procesal-trabajo-colombia-2026': {
    title: 'Nuevo Código Procesal del Trabajo: qué cambió desde abril de 2026',
    category: 'Laboral',
    date: '2026-08-12',
    content: `
Desde el 2 de abril de 2026 rige en Colombia el Código Procesal del Trabajo y de la Seguridad Social, expedido mediante la Ley 2452 de 2025. Esta norma reemplazó las reglas procesales laborales anteriores para los asuntos que comenzaron a partir de su entrada en vigencia. Su propósito es ordenar los trámites ante la jurisdicción laboral y de seguridad social, con énfasis en la oralidad, el uso de herramientas digitales y una gestión más concentrada de los procesos.

**La fecha en que inició el proceso es decisiva**

La Ley 2452 estableció un régimen de transición claro: los procesos iniciados antes del 2 de abril de 2026 continúan tramitándose con las normas anteriores. Los que se presenten desde esa fecha deben seguir el nuevo Código. Por eso, antes de definir términos, recursos o la estrategia de una demanda, es indispensable establecer cuándo se inició formalmente el asunto y en qué etapa se encuentra.

**Qué asuntos conoce la jurisdicción laboral y de seguridad social**

En esta jurisdicción se tramitan, entre otros, conflictos derivados de contratos de trabajo, discusiones sobre salarios, prestaciones, indemnizaciones y seguridad social. También existen controversias entre afiliados, beneficiarios, empleadores y entidades administradoras o prestadoras del sistema, dentro de los límites fijados por la ley.

No todas las inconformidades laborales siguen el mismo camino. Algunas requieren reclamar primero ante el empleador o la entidad correspondiente; otras exigen identificar con precisión la autoridad competente y el procedimiento aplicable. Presentar una demanda sin revisar estos elementos puede generar demoras evitables.

**Nuevas herramientas procesales**

El Código regula actuaciones orales y virtuales en los casos permitidos por la ley y organiza mecanismos para tramitar determinadas obligaciones laborales o de seguridad social. Entre ellos se encuentra el proceso monitorio, diseñado para ciertos conflictos en los que se reclama una obligación y el demandado debe pagar o explicar de manera concreta las razones de su oposición.

Esto no significa que todos los casos sean rápidos ni que el resultado esté asegurado. La procedencia del trámite depende de los hechos, las pruebas, la cuantía y las reglas específicas de cada asunto. Una demanda laboral requiere sustento documental y una lectura cuidadosa de las normas aplicables.

**Recomendaciones antes de acudir a un juez laboral**

Conserve contratos, desprendibles de nómina, certificaciones, incapacidades, comunicaciones, reportes de semanas cotizadas y cualquier prueba relacionada con el conflicto. Organice los hechos por fechas y no deje pasar el tiempo: algunas reclamaciones están sujetas a términos de prescripción. Si el caso ya está en curso, no asuma que el nuevo Código cambia automáticamente las reglas que lo gobiernan; primero debe verificarse el régimen de transición.

¿Necesita revisar una reclamación laboral o de seguridad social en el Eje Cafetero? En Castellanos Abogados analizamos el estado del caso y la ruta jurídica que corresponda.
    `,
  },
  'ley-2477-2025-reforma-procesal-penal': {
    title: 'Ley 2477 de 2025: cambios recientes en el proceso penal colombiano',
    category: 'Penal',
    date: '2026-08-19',
    content: `
La Ley 2477 de 2025, vigente desde el 11 de julio de 2025, introdujo cambios a normas del Código Penal y del Código de Procedimiento Penal. La reforma busca promover decisiones más tempranas dentro del sistema penal acusatorio y modificó aspectos relacionados con la reparación integral, los preacuerdos, el principio de oportunidad y algunos términos procesales. Su aplicación siempre depende del delito investigado, la etapa del proceso y los derechos de las víctimas.

**Reparación integral y consecuencias en el proceso**

La reparación integral puede ser relevante en determinados casos, especialmente cuando la ley permite que tenga efectos sobre la acción penal. Sin embargo, no es una fórmula automática para terminar una investigación. Deben analizarse el tipo de conducta, la existencia de víctima, el alcance real de la reparación, los antecedentes y las exclusiones previstas por la ley. Un acuerdo económico sin el procedimiento adecuado puede no producir el efecto jurídico que las partes esperan.

**Preacuerdos y allanamientos a cargos**

La Ley 2477 modificó reglas relacionadas con los beneficios por allanamiento y preacuerdo. Estos mecanismos pueden evitar un juicio completo y, en algunos eventos, permitir una reducción punitiva, pero no son equivalentes ni aplican de igual manera en todos los delitos. La oportunidad procesal en que se toma una decisión, la calidad de la información de la Fiscalía, la reparación a la víctima y las limitaciones legales pueden cambiar por completo la conveniencia de aceptar una negociación.

Antes de aceptar cargos o firmar un preacuerdo, la defensa debe calcular las consecuencias reales de la pena, las posibilidades de subrogados y los efectos para la vida laboral y familiar. La decisión debe ser libre, informada y con defensa técnica.

**Principio de oportunidad**

La reforma amplió y ajustó causales relacionadas con el principio de oportunidad. Este mecanismo permite a la Fiscalía, bajo controles y requisitos legales, suspender, interrumpir o renunciar a la persecución penal en supuestos determinados. No es un derecho automático del investigado: requiere revisar la causal concreta, las condiciones de procedencia y la protección de los derechos de las víctimas.

**Libertad por vencimiento de términos**

La Ley 2477 actualizó los términos del artículo 317 del Código de Procedimiento Penal. Como regla general, la libertad puede discutirse si transcurren 60 días desde la imputación sin que se presente escrito de acusación o se solicite preclusión; 120 días desde la acusación sin que inicie el juicio; o 150 días desde el inicio del juicio sin lectura de fallo o su equivalente. En algunos casos los términos se incrementan, por ejemplo, cuando intervienen tres o más imputados, se trata de justicia penal especializada, hechos de corrupción o ciertos delitos expresamente señalados por la ley.

El simple paso del tiempo no basta para pedir la libertad. Debe verificarse qué actuaciones suspenden, restablecen o no permiten contabilizar los términos, incluyendo demoras atribuibles a la defensa. El análisis exige revisar el expediente y las fechas exactas de las audiencias.

¿Usted o un familiar enfrenta una investigación penal en Pereira, Manizales, Armenia o el Eje Cafetero? Una revisión temprana del expediente ayuda a identificar las decisiones y términos relevantes para la defensa.
    `,
  },
  'inasistencia-alimentaria-colombia': {
    title: 'Inasistencia alimentaria en Colombia: cuándo el no pago de alimentos es delito',
    category: 'Penal',
    date: '2026-09-03',
    content: `
No pagar la cuota de alimentos no es únicamente un incumplimiento familiar: en Colombia puede constituir un delito. El artículo 233 del Código Penal (Ley 599 de 2000) tipifica la inasistencia alimentaria. Sin embargo, la ley exige que concurran requisitos precisos, y la Corte Suprema de Justicia ha sido clara en que no basta con demostrar que una persona dejó de pagar.

**Qué sanciona el artículo 233 del Código Penal**

La norma castiga a quien se sustraiga sin justa causa a la prestación de alimentos legalmente debidos a sus ascendientes, descendientes, adoptante, adoptivo, cónyuge o compañero permanente.

La pena básica es de prisión de dieciséis (16) a cincuenta y cuatro (54) meses y multa de trece punto treinta y tres (13.33) a treinta (30) salarios mínimos legales mensuales vigentes.

Cuando la inasistencia alimentaria se comete contra un menor de edad, la pena se agrava: prisión de treinta y dos (32) a setenta y dos (72) meses y multa de veinte (20) a treinta y siete punto cinco (37.5) salarios mínimos legales mensuales vigentes.

El parágrafo 1º precisa que se tendrá por compañero y compañera permanente al hombre y la mujer que forman parte de la Unión Marital de Hecho durante un lapso no inferior a dos años, en los términos de la Ley 54 de 1990. El parágrafo 2º dispone que en estos eventos se podrá aplicar el principio de oportunidad.

**Los tres elementos que deben probarse**

Para que la conducta sea punible deben concurrir tres elementos: la existencia del vínculo familiar entre obligado y beneficiario; la sustracción total o parcial al deber alimentario; y que esa sustracción se produzca sin justa causa.

El tercer elemento es el que realmente se discute en los procesos.

**Retirar la denuncia no termina el proceso**

Este es el punto que más desconocen quienes intervienen en estos casos. La Ley 1542 de 2012 eliminó el carácter de querellables y desistibles de los delitos de violencia intrafamiliar (artículo 229) e inasistencia alimentaria (artículo 233), suprimiéndolos del numeral 2 del artículo 74 de la Ley 906 de 2004, Código de Procedimiento Penal.

La Corte Constitucional, en la Sentencia C-022 de 2015, declaró exequibles esas expresiones contenidas en los artículos 1 y 2 de la Ley 1542 de 2012.

En la práctica esto significa que la investigación procede de oficio: quien denuncia no puede después retirar la denuncia para que el proceso termine, y un acuerdo de pago posterior no extingue automáticamente la acción penal. Es una consecuencia que sorprende tanto a quien denunció buscando presionar el pago como a quien resulta denunciado.

**La justa causa: capacidad económica, no liquidez**

Aquí está el aspecto técnico más relevante. La Corte Suprema de Justicia, Sala de Casación Penal, en la sentencia SP5130-2021 (radicado 58373, del 17 de noviembre de 2021, con ponencia del magistrado Gerson Chaverra Castro), precisó que para la configuración del delito de inasistencia alimentaria no se exige liquidez monetaria sino capacidad económica, y que la carga de probarla corresponde a la Fiscalía. De lo contrario, señaló la Corte, la justificación del incumplimiento se mantiene amparada por la presunción constitucional de inocencia del artículo 29 de la Constitución.

En ese caso la Corte revocó la condena proferida en segunda instancia y confirmó la absolución, porque la Fiscalía no acreditó más allá de toda duda razonable la capacidad económica del procesado: los testimonios sobre los oficios que desempeñaba resultaron vagos, sin precisar períodos ni la fuente de ese conocimiento, y la labor investigativa sobre su situación financiera no llegó a incorporarse al juicio.

De ahí se derivan dos consecuencias prácticas. Para la defensa: no basta afirmar que no había dinero, pero tampoco puede construirse una condena sobre suposiciones acerca de lo que la persona podría haber ganado; circunstancias como una enfermedad, una incapacidad o la pérdida del empleo, debidamente probadas, pueden configurar la justa causa. Para quien reclama: una denuncia sin material probatorio sobre la capacidad económica del obligado puede terminar en absolución, por lo que documentar ingresos, bienes y actividad laboral resulta determinante.

**La vía penal no reemplaza la vía de familia**

El proceso penal sanciona una conducta; no fija la cuota ni la cobra. Fijar, revisar o ejecutar la cuota alimentaria tiene su propio camino ante la comisaría de familia, la defensoría de familia o el juez de familia. En muchos casos la ruta adecuada combina ambas vías, y el orden en que se activan puede cambiar el resultado.

**Qué hacer en cada situación**

Si usted fue denunciado, reúna los soportes de los pagos realizados, su situación laboral y de salud durante el período investigado, y cualquier comunicación con la otra parte. No se limite a esperar la audiencia: la prueba de la justa causa se construye desde el inicio.

Si usted necesita reclamar, verifique primero que exista una cuota fijada o un acuerdo, y documente el incumplimiento y la capacidad económica del obligado. Actuar con soporte probatorio es lo que diferencia una denuncia que prospera de una que se archiva.

¿Enfrenta una investigación por inasistencia alimentaria o necesita hacer cumplir una cuota de alimentos en Pereira, Manizales, Armenia o el Eje Cafetero? En Castellanos Abogados analizamos su caso y le explicamos con claridad la ruta jurídica que corresponde. Llámenos al 314 830 9306 o escríbanos por WhatsApp.
    `,
  },
};

export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({ slug }));
}

const ARTICLE_DESCRIPTIONS: Record<string, string> = {
  'cuando-interponer-una-tutela':        'La acción de tutela protege derechos fundamentales en Colombia. Aprende cuándo procede, sus requisitos y los términos del proceso. Asesoría en Pereira y Eje Cafetero.',
  'derechos-del-imputado-proceso-penal': 'Presunción de inocencia, derecho a guardar silencio y defensa técnica: conoce los derechos del imputado en el proceso penal colombiano. Abogados penalistas en Pereira.',
  'responsabilidad-penal-empresarial':   'La Ley 2195 de 2022 permite sancionar penalmente a empresas en Colombia. Delitos, sanciones y cómo proteger tu organización. Castellanos Abogados, Pereira.',
  'beneficios-ejecucion-penas':          'Prisión domiciliaria, libertad condicional y redención de pena en Colombia: requisitos y cómo tramitarlos ante el Juez de Ejecución de Penas en el Eje Cafetero.',
  'abogado-penalista-pereira':           '¿Cuándo necesitas un abogado penalista en Pereira? Guía completa sobre captura, imputación, medidas de aseguramiento y ejecución de penas en el Eje Cafetero.',
  'que-hacer-si-te-detienen-colombia':   'Guía paso a paso: derechos si te detienen en Colombia, qué no hacer y cómo actúa tu abogado en la audiencia de legalización de captura. Atención urgente en Pereira.',
  'detencion-domiciliaria-colombia':     'Requisitos de la detención domiciliaria preventiva y prisión domiciliaria en Colombia. Cómo solicitar este beneficio ante el Juez de Ejecución de Penas en el Eje Cafetero.',
  'divorcio-colombia':                   'Tipos de divorcio en Colombia, tiempos estimados y proceso paso a paso. Mutuo acuerdo, contencioso y cesación de efectos civiles. Abogados de familia en Pereira.',
  'acoso-laboral-colombia':              'Qué es el acoso laboral según la Ley 1010 de 2006, cómo reconocerlo y cómo denunciarlo ante el Comité de Convivencia o el Ministerio de Trabajo. Abogados en Pereira.',
  'medida-de-aseguramiento-colombia':    'Tipos, requisitos y cómo impugnar una medida de aseguramiento en Colombia. Detención preventiva, apelación y sustitución. Abogados penalistas en Pereira.',
  'cuota-alimentaria-colombia':          'Cómo se fija, revisa y hace cumplir la cuota de alimentos en Colombia. Requisitos del artículo 411 del Código Civil y Ley 2388 de 2024. Abogados de familia en Pereira y Eje Cafetero.',
  'violencia-intrafamiliar-medidas-proteccion': 'Medidas de protección urgentes ante violencia intrafamiliar en Colombia. Comisaría de familia, Ley 294/1996, Ley 1257/2008 y Ley 2126/2021. Abogados de familia en Pereira.',
  'ley-2466-2025-redenciones-pena':      'Ley 2466 de 2025 y redenciones de pena en Colombia: qué cambió, cómo se calculan y por qué revisar los cómputos del INPEC. Ejecución de penas en Pereira y Eje Cafetero.',
  'libertad-condicional-colombia':       'Texto vigente del artículo 64 del Código Penal colombiano y sus 3 requisitos: 3/5 de la pena, buena conducta y arraigo. Guía clara y actualizada a 2026.',
  'preacuerdo-penal-colombia':           'Preacuerdo penal en Colombia: ventajas, riesgos y cuándo conviene aceptarlo. Diferencias con el allanamiento a cargos. Abogados penalistas en Pereira y Eje Cafetero.',
  'prescripcion-titulos-valores-colombia': 'Plazos de prescripción de letras de cambio, cheques y pagarés en Colombia según el Código de Comercio. Desde cuándo cuentan, cómo interrumpirlos y qué hacer cuando el título ya prescribió.',
  'reforma-laboral-colombia-cambios-vigentes-2026': 'Reforma laboral en Colombia 2026: contrato indefinido, jornada nocturna desde las 7 p. m., recargo por descanso obligatorio y debido proceso disciplinario.',
  'nuevo-codigo-procesal-trabajo-colombia-2026': 'Nuevo Código Procesal del Trabajo vigente desde el 2 de abril de 2026: transición, procesos laborales y seguridad social en Colombia.',
  'ley-2477-2025-reforma-procesal-penal': 'Ley 2477 de 2025: cambios en reparación integral, preacuerdos, principio de oportunidad y vencimiento de términos en Colombia.',
  'inasistencia-alimentaria-colombia':   'Inasistencia alimentaria en Colombia (art. 233 del Código Penal): penas, por qué no es querellable ni desistible desde la Ley 1542 de 2012 y qué debe probar la Fiscalía sobre la capacidad económica. Abogados penalistas en Pereira.',
};

const ARTICLE_TITLES: Record<string, string> = {
  'libertad-condicional-colombia': 'Artículo 64 del Código Penal: Libertad Condicional 2026',
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) return {};

  const description = ARTICLE_DESCRIPTIONS[slug] ?? article.content.trim().split('\n')[0].slice(0, 160);
  const title = ARTICLE_TITLES[slug] ?? `${article.title} | Castellanos Abogados`;

  return {
    title,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: 'article',
      url: `https://jonatancastellanosabogado.com/blog/${slug}`,
      title,
      description,
      publishedTime: article.date,
      authors: ['Jonatan Castellanos'],
      images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: article.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles[slug];
  if (!article) notFound();

  const paragraphs = article.content.trim().split('\n\n');
  const description = ARTICLE_DESCRIPTIONS[slug] ?? article.content.trim().split('\n')[0].slice(0, 160);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Person",
      name: "Jonatan Castellanos",
      url: "https://jonatancastellanosabogado.com/nosotros",
    },
    publisher: {
      "@type": "Organization",
      name: "Castellanos Abogados",
      url: "https://jonatancastellanosabogado.com",
      logo: { "@type": "ImageObject", url: "https://jonatancastellanosabogado.com/logo.png" },
    },
    mainEntityOfPage: `https://jonatancastellanosabogado.com/blog/${slug}`,
  };

  const faqSchema = slug === 'libertad-condicional-colombia' ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Qué es la libertad condicional en Colombia?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Es un subrogado penal: un mecanismo que permite a una persona condenada cumplir en libertad la parte final de su pena, bajo condiciones fijadas por el juez. Está regulada en el artículo 64 del Código Penal (Ley 599 de 2000, modificado por la Ley 1709 de 2014). No borra la condena: el tiempo que falte de pena se convierte en un período de prueba.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuánto tiempo de la pena hay que cumplir para pedir la libertad condicional?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Las tres quintas (3/5) partes de la pena, es decir, el 60%. Para ese cómputo cuentan tanto el tiempo físico en prisión como las redenciones de pena por trabajo, estudio o enseñanza certificadas por el INPEC, por lo que la fecha real suele llegar antes de lo que la familia cree.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué requisitos exige el artículo 64 del Código Penal?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tres requisitos: haber cumplido las 3/5 partes de la pena, que el comportamiento durante el tratamiento penitenciario permita concluir que no es necesario seguir ejecutando la pena, y demostrar arraigo familiar y social. Además, la concesión está supeditada a la reparación de la víctima o al aseguramiento del pago de la indemnización, salvo insolvencia demostrada.",
        },
      },
      {
        "@type": "Question",
        name: "¿Quién concede la libertad condicional y dónde se solicita?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La concede el Juez de Ejecución de Penas y Medidas de Seguridad que vigila la condena. La solicitud se presenta ante ese despacho con los cómputos y el certificado de conducta del INPEC, los certificados de redención y las pruebas de arraigo. En el Eje Cafetero, estos juzgados funcionan en Pereira, Manizales y Armenia.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué pasa si se incumplen las condiciones durante el período de prueba?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El juez puede revocar la libertad condicional y ordenar el regreso a prisión para cumplir el tiempo restante de la pena. El período de prueba equivale al tiempo que faltaba de condena y, cuando es inferior a tres años, el juez puede aumentarlo hasta en otro tanto igual.",
        },
      },
    ],
  } : null;

  return (
    <main className="min-h-screen bg-canvas text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
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
