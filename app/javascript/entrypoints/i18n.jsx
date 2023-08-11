import * as React from "react";
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { kebabCase } from "lodash";
import { m } from "framer-motion";
// don't want to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on initt
const options = {
  // order and from where user language should be detected
  order: [ 'path',  'navigator', 'htmlTag','subdomain'],

  // keys or params to lookup language from
  lookupQuerystring: 'lng',
  lookupCookie: 'i18next',
  lookupLocalStorage: 'i18nextLng',
  lookupSessionStorage: 'i18nextLng',
  lookupFromPathIndex: 0,
  lookupFromSubdomainIndex: 0,

  // cache user language on
  caches: ['localStorage', 'cookie'],
  excludeCacheFor: ['cimode'], // languages to not persist (cookie, localStorage)

  // optional expire and domain for set cookie
  cookieMinutes: 10,
  cookieDomain: 'myDomain',

  // optional htmlTag with lang attribute, the default is:
  htmlTag: document.documentElement,

  // optional set cookie options, reference:[MDN Set-Cookie docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
  cookieOptions: { path: '/', sameSite: 'strict' }
}
const resources = {
  en: {
    translation: {
      "application_chars.validate_date": "The application date should be the same or precede the date of receiving the tenant screening report by less than 1 year. (you entered {{ date }} in the previous step)"
    }
  },
  es: {
    translation: {
      "Report": "Informe",
      "Tenant": "Inquilino",
      "You will get paid $50.": "Te pagarán $50.",
      "Call to Action:": "Llamada a la acción:",
      "We need your help!": "Necesitamos tu ayuda",
      "Request Copy of Tenant Screening Report": "Solicitar copia del informe de selección de inquilinos",
      "have you ever been screened by...": "¿Le han examinado <br/> alguna vez...",
      "tenant screening services title": "<0>servicios</0><1> </1><2>de selección</2><3>de inquilinos?</3>",
      "title welcome": "OpenTSS: <br/> Contrarrestar la selección<br/> de inquilinos",
      "Countering Tenant Screening": "Contrarrestar la Selección de Inquilinos",
      "How TSS Works": "Cómo funciona TSS",
      "Company Lookup": "Búsqueda de empresas",
      "Request Copy": "Solicitar copia",
      "Donate Your Report": "Done su informe",
      "Menu": "Menú",
      "Close": "Cerrar",
      "How tenant screening works": "Cómo <1>funciona la selección de inquilinos</1>",
      "step 1": "Paso 1. Infórmese de cómo <1>funciona la selección de inquilinos</1>",
      "Do you want to know how tenant screening works?": "¿Quiere saber cómo funciona la selección de inquilinos?",
      "step 2": "Paso 2. Solicite una copia de su <1>informe de selección de inquilinos</1>",
      "We provide a tool to facilitate the straightforward process of requesting a copy of your tenant screening report.": "Ponemos a su disposición una herramienta que le facilitará el sencillo proceso de solicitar una copia de su informe de selección de inquilinos.",
      "step 3": "Paso 3. Done su informe <1>de selección de inquilinos</1> para investigación",
      "Donate your report for our research. We will compensate $50 for your contribution.": "Done su informe para nuestra investigación. Le compensaremos con 50 dólares por su contribución.",
      "About": "Acerca de",
      "about title": "<0>Estamos recopilando informes de selección de inquilinos para desvelar los patrones</0> de los algoritmos internos, las estructuras de datos y las representaciones de los servicios de selección de inquilinos.",
      "about desc para 1": "Los servicios de selección de inquilinos utilizan bases de datos de puntuación crediticia, registros de desahucios y antecedentes penales de intermediarios de datos externos para elaborar informes que los propietarios utilizan para decidir a quién alquilan. Numerosas investigaciones y artículos de prensa han señalado que los informes de selección de inquilinos y su algoritmo interno tienen un impacto discriminatorio y racializado, y que no existe una estructura regulada para sus procesos algorítmicos y de modelización.",
      "See How Tenant Screening Works": "Vea cómo funciona la selección de inquilinos",
      "about desc para 2": "Sin embargo, los servicios de selección de inquilinos y sus algoritmos internos y procesos de recopilación de datos están protegidos por derechos de propiedad, por lo que sólo es posible auditarlos externamente. Los resultados del proyecto se utilizarán para abogar por la regulación de los servicios de selección de inquilinos y para exigir responsabilidades a los algoritmos de selección de inquilinos en virtud de los principios de la vivienda justa.",
      "Crowdsourcing Tenant Screening Reports": "Crowdsourcing de informes de selección de inquilinos",
      "crowdsourcing title": "Buscamos inquilinos que hayan sido seleccionados por servicios de selección de inquilinos. Pueden participar tanto los inquilinos aceptados como los rechazados.",
      "crowdsourcing desc": "Se anima a participar tanto a los inquilinos rechazados *como* a los aceptados. Esta investigación espera estudiar una valiosa oportunidad para comparar las condiciones en las que los servicios de selección de inquilinos algorítmicamente recomiendan y a los propietarios a tomar sus decisiones finales.",
      "Participate": "Participe en",
      "How can I participate?": "¿Cómo puedo participar?",
      "participate desc": "Escanee o haga fotos de su informe de selección de inquilinos (eliminaremos su información confidencial) y cárguelo. Además, le haremos algunas preguntas sobre usted, como su edad, sexo, raza, ingresos, código postal, número de hijos y las condiciones de la vivienda de alquiler que solicitó, como el alquiler, el número de habitaciones y la escala de propietarios (número de unidades).",
      "FAQ": "Preguntas frecuentes",
      "Request a copy": "Solicitar una copia",
      "Request Copy of Screening Report": "Solicitar copia del informe de cribado",
      "Request copy title": "Si no tiene su copia del informe de selección de inquilinos: le ayudaremos a solicitar su copia del informe de selección de inquilinos a los servicios de selección de inquilinos.",
      "Request copy desc": "Tiene derecho a solicitar su copia del informe a los servicios de selección de inquilinos, en la mayoría de los casos de forma gratuita (en cada periodo de 12 meses o cuando se le haya denegado y lo solicite en un plazo de 60 días). Le proporcionamos una herramienta para que pueda solicitar fácilmente su copia del informe. Con ella, puede enviar la carta a los servicios de selección de inquilinos.",
      "What will OpenTSS do with my data?": "¿Qué hará OpenTSS con mis datos?",
      "FAQ Q1 Answer": "<0>En primer lugar, nos interesa conocer el impacto discriminatorio de las prácticas de selección de inquilinos por grupos protegidos (por ejemplo, raza, sexo, fuente de ingresos)</0> <1>Analizaremos los datos de selección de inquilinos para ver si existe algún impacto discriminatorio por motivos de raza, sexo, situación familiar o fuente de ingresos, y también analizaremos los mecanismos de puntuación o los procesos de toma de decisiones. Publicaremos los resultados en este sitio web de forma agregada.</1> <2>También nos interesa el impacto de la recomendación algorítmica realizada por los servicios de selección de inquilinos en la toma de decisiones de los propietarios.</2><3>Esperamos medir el impacto discriminatorio del sistema de puntuación algorítmica en las prácticas de selección de inquilinos.</3>",
      "How will you protect my data?": "¿Cómo protegerán mis datos?",
      "FAQ Q2 Answer": "<0>Esta investigación ha sido aprobada por el Comité del <1>MIT Committee on the Use of Humans as Experimental Subjects (COUHES)</1>, la Junta de Revisión Institucional responsable de supervisar los aspectos éticos y de privacidad del estudio. El informe que nos proporcione se enviará mediante cifrado de extremo a extremo para garantizar su transmisión segura. Además, eliminaremos cuidadosamente cualquier información identificable.</0><1><2>Sólo nos interesan los datos de sus informes de selección de inquilinos, no su nombre, su SSN ni su dirección.</2> Después de enviar su informe, eliminaremos sus datos identificables del informe. Le pediremos información demográfica adicional, que también se codificará, para poder analizar el informe de selección de inquilinos con mayor precisión, para averiguar cómo las empresas de selección de inquilinos tratan de forma diferente los distintos perfiles. <2>El informe y los datos se transferirán con un cifrado de extremo a extremo y se almacenarán en nuestro servidor seguro. Los datos sólo se utilizarán para analizar la práctica de los servicios de selección de inquilinos. No se transmitirán a terceros ni se venderán.</2></1>",
      "Who are we?": "¿Quiénes somos?",
      "Who are we desc": "Somos investigadores del MIT que abordamos los retos relacionados con la obtención de información sobre los algoritmos internos, las representaciones y los sesgos de los algoritmos de selección de inquilinos.",
      "Back to top": "Volver arriba",
      "Who supports this project?": "¿Quién apoya este proyecto?",
      "supporters": "Este proyecto ha sido posible gracias al generoso apoyo del <1>Mozilla Technology Fund</1>, y hacemos extensivo nuestro agradecimiento al <1>MIT IDSS</1> y al <1>Data + Feminism Lab del MIT</1>.",
      "Tenant screening services lookup tool": "Herramienta de búsqueda de servicios de selección de inquilinos",
      "Menu request a copy": "Solicite una copia de su <br/> <2>informe de selección de inquilinos</2>",
      "Menu donate report": "Done su informe de selección de inquilinos para investigación",
      "Retrieve your submission": "Recuperar su envío",
      "About this project": "Acerca de este proyecto",
      "contact us desc": "Si tiene alguna pregunta sobre este proyecto, <br/>envíenos un correo electrónico a <3>opentss@mit.edu</3>.",
      "How it works": "Cómo funciona",
      // request copy page
      "request_copy.title": "Solicite una copia de su <br/> informe de selección de inquilinos",
      "request_copy.title_desc": "Se trata de una herramienta que le guía a través del proceso de solicitud de una copia de su informe de selección de inquilinos a un servicio de selección de inquilinos.",
      "request_copy.start_process": "Iniciar el proceso",
      "request_copy.step_1_title": "Paso 1. Identifique los servicios de selección de inquilinos que ha examinado.",
      "request_copy.step_1_desc": "Para solicitar una copia de su informe de selección de inquilinos, es fundamental identificar con precisión la empresa asociada al proceso de selección. <1>Cada servicio de selección de inquilinos funciona con protocolos distintos para presentar dichas solicitudes.</1> Por ejemplo, es posible que haya recibido un correo electrónico de la empresa de selección de inquilinos, solicitando su consentimiento para recopilar y proporcionar datos al propietario. Por otra parte, al rellenar una solicitud de alquiler, los propietarios suelen revelar el nombre de la empresa de selección de inquilinos que emplean. Estas fuentes de información ayudan a determinar la entidad adecuada a la que dirigirse para solicitar el informe.",
      "request_copy.step_2_title": "Paso 2. Rellene el formulario y envíe la solicitud.",
      "request_copy.step_2_desc": "Basándose en las orientaciones, usted envía la solicitud y espera a que la selección de inquilinos o propietarios responda y envíe una copia de su informe.",
      "request_copy.step_3_title": "Paso 3. Done la copia de su informe de selección de inquilinos.",
      "request_copy.step_3_desc": "Cuando reciba el ejemplar, <1>le rogamos que nos lo done para contribuir a la investigación.</1>",
      //request copy new
      "request_copy_new.step_1_subtitle": "Paso 1. Identificar el servicio de selección de inquilinos",
      "request_copy_new.step_1_title": "¿Cuál es la empresa de selección de inquilinos que le ha seleccionado?",
      "request_copy_new.select_label": "Seleccione aquí el servicio de selección de inquilinos.",
      "Choose...": "Elige...",
      "I can't find the name in the list": "No encuentro el nombre en la lista",
      "Next": "Siguiente",
      "Enter the name of the tenant screening company": "Introduzca el nombre de la empresa de selección de inquilinos",
      "e.g., TransUnion": "por ejemplo, TransUnion",
      "request_copy_new.faq_q_1": "P: ¿Cómo puedo saber qué empresa realiza la selección de inquilinos?",
      "request_copy_new.faq_a_1_title": "R: Hay varias vías que explorar para identificar a la empresa de selección de inquilinos.",
      "1. Review your email correspondence.": "1. Revise su correspondencia electrónica.",
      "request_copy_new.faq_a_desc_01": "Compruebe su buzón de correo electrónico para ver si ha recibido alguna comunicación de la empresa de selección de inquilinos. Es habitual que envíen correos electrónicos solicitando tu consentimiento para recopilar y facilitar datos al propietario.",
      "2. Refer to your rental application.": "2. Consulte su solicitud de alquiler.",
      "request_copy_new.faq_a_desc_02": "Compruebe su buzón de correo electrónico para ver si ha recibido alguna comunicación de la empresa de selección de inquilinos. Es habitual que envíen correos electrónicos solicitando tu consentimiento para recopilar y facilitar datos al propietario.",
      "3. Consult your adverse action letter.": "3. Consulte su carta de acción adversa.",
      "request_copy_new.faq_a_desc_03": "Si ha recibido una carta de acción adversa debido a una denegación basada en los resultados de la selección de inquilinos, el propietario está obligado a revelar el nombre de la empresa de selección en la carta.",
      "4. Communicate with the landlord or conduct research.": "4. Comunicarse con el propietario o realizar investigaciones.",
      "request_copy_new.faq_a_desc_04": "Inicie una comunicación directa con el propietario para informarse sobre los servicios de selección de inquilinos empleados. Por último, realice una investigación independiente para identificar a las empresas de selección de inquilinos asociadas a su casero.",
      // request copy result
      "Request your report": "Solicite su informe",
      "request_copy_result.compose_letter_title": "Le ayudaremos a generar la carta para solicitar su copia del informe de selección de inquilinos, para que pueda enviarla a {{company_name}}. ",
      "request_copy_result.direct_accept_title": "{{company_name}} acepta directamente la solicitud de su copia del informe de selección de inquilinos. ",
      "request_copy_result.outsource_title": "{{company_name}} informes de selección de inquilinos a",
      "Inquiry Page": "Página de consulta",
      //pdf filing form
      "pdf_filing_form.assure_desc": "Entendemos que introducir sus datos personales pueda ser motivo de preocupación. Sin embargo, tenga la seguridad de que esta herramienta está diseñada para funcionar dentro de su navegador (o su teléfono), <1>y por lo tanto no transmitimos ni almacenamos ninguna de la información que introduzca.</1> Piense que es como utilizar un procesador de textos en su ordenador.",
      "This field is required.": "Este campo es obligatorio.",
      "Required.": "Necesario.",
      "Optional.": "Opcional.",
      "Name": "Nombre",
      "First Name": "En primer lugar Nombre",
      "Middle Name": "Segundo nombre",
      "Last Name": "Apellido",
      "Address": "Dirección",
      "Generation": "Generación",
      "Street Address": "Dirección",
      "Name of Landlord": "Nombre del arrendador",
      "City": "Ciudad",
      "State": "Estado",
      "Zip Code": "Código postal",
      "Social Security Number": "Número de la Seguridad Social",
      "We understand that entering your Social Security number may be a concern. Please be assured that this tool is designed to work within your browser (or your phone), and therefore we do not transmit or store any of the information you enter. Think of it like using a word processor on your computer.": "Entendemos que introducir su número de la Seguridad Social puede ser motivo de preocupación. Tenga la seguridad de que esta herramienta está diseñada para funcionar dentro de su navegador (o su teléfono), y por lo tanto no transmitimos ni almacenamos ninguna de la información que introduzca. Piense que es como utilizar un procesador de textos en su ordenador.",
      "Date of Birth": "Fecha de nacimiento",
      "Phone": "Teléfono",
      "Last 4 digits of SSN": "4 últimos dígitos del SSN",
      "Email": "Correo electrónico",
      "Fill only if you have the adverse action letter from landlords and they used NTN.": "Rellene sólo si usted tiene la carta de acción adversa de los propietarios y utilizaron NTN.",
      "I have been denied and notified of an adverse action.": "Se me ha denegado y notificado una acción adversa.",
      "Date": "Fecha",
      "List Maiden or Other Names Used": "Apellidos de soltera u otros apellidos utilizados",
      "Housing Application Date": "Fecha de solicitud de vivienda",
      "Prospective Landlord Name": "Nombre del posible arrendador",
      "Contact Person": "Persona de contacto",
      "Landlord Phone Number": "Número de teléfono del propietario",
      "Landlord Street Address": "Dirección del arrendador",
      "Landlord Address City": "Propietario Dirección Ciudad",
      "Landlord Address State": "Propietario Dirección Estado",
      "Landlord Address Zip": "Propietario Dirección Código postal",
      "Current Address Street": "Dirección actual Calle",
      "Current Address Apt": "Dirección actual Apt",
      "Current Address City": "Dirección actual Ciudad",
      "Current Address State": "Dirección actual Estado",
      "Current Address Zip": "Dirección actual Código postal",

      "Previous (1) Address Street": "Dirección anterior (1) Calle",
      "Previous (1) Address Apt": "Dirección anterior (1) Apt",
      "Previous (1) Address City": "Dirección anterior (1) Ciudad",
      "Previous (1) Address State": "Dirección anterior (1) Estado",
      "Previous (1) Address Zip": "Dirección anterior (1) Código postal",

      "Previous (2) Address Street": "Dirección anterior (2) Calle",
      "Previous (2) Address Apt": "Dirección anterior (2) Apt",
      "Previous (2) Address City": "Dirección anterior (2) Ciudad",
      "Previous (2) Address State": "Dirección anterior (2) Estado",
      "Previous (2) Address Zip": "Dirección anterior (2) Código postal",

      "Previous (3) Address Street": "Dirección anterior (3) Calle",
      "Previous (3) Address Apt": "Dirección anterior (3) Apt",
      "Previous (3) Address City": "Dirección anterior (3) Ciudad",
      "Previous (3) Address State": "Dirección anterior (3) Estado",
      "Previous (3) Address Zip": "Dirección anterior (3) Código postal",

      "Previous (4) Address Street": "Dirección anterior (4) Calle",
      "Previous (4) Address Apt": "Dirección anterior (4) Apt",
      "Previous (4) Address City": "Dirección anterior (4) Ciudad",
      "Previous (4) Address State": "Dirección anterior (4) Estado",
      "Previous (4) Address Zip": "Dirección anterior (4) Código postal",
      
      "Previous (5) Address Street": "Dirección anterior (5) Calle",
      "Previous (5) Address Apt": "Dirección anterior (5) Apt",
      "Previous (5) Address City": "Dirección anterior (5) Ciudad",
      "Previous (5) Address State": "Dirección anterior (5) Estado",
      "Previous (5) Address Zip": "Dirección anterior (5) Código postal",

      "Previous (6) Address Street": "Dirección anterior (6) Calle",
      "Previous (6) Address Apt": "Dirección anterior (6) Apt",
      "Previous (6) Address City": "Dirección anterior (6) Ciudad",
      "Previous (6) Address State": "Dirección anterior (6) Estado",
      "Previous (6) Address Zip": "Dirección anterior (6) Código postal",

      "Previous (7) Address Street": "Dirección anterior (7) Calle",
      "Previous (7) Address Apt": "Dirección anterior (7) Apt",
      "Previous (7) Address City": "Dirección anterior (7) Ciudad",
      "Previous (7) Address State": "Dirección anterior (7) Estado",
      "Previous (7) Address Zip": "Dirección anterior (7) Código postal",

      "List all addresses where you have resided over the past seven years": "Indique todas las direcciones en las que ha residido en los últimos siete años",
      "If you have the adverse action letter from landlords and they used SafeRent, check the box.": "Si tienes la carta de acción adversa de los propietarios y utilizaron SafeRent, marca la casilla.",
      "Fill only if you have the adverse action letter from landlords and they used SafeRent.": "Rellene sólo si tiene la carta de acción adversa de los propietarios y utilizaron SafeRent.",

      "pdf_filing_form.download_button": "Descargar {{company_name}} Formulario de solicitud de informe",
      "Next Step": "Siguiente paso",
      "What's next after you download the form? ": "¿Qué sigue después de descargar el formulario?",
      "What's next after you download the form?": "¿Qué sigue después de descargar el formulario?",

      // submissions
      "Donate Tenant Screening Report": "Donar el informe de selección de inquilinos",
      "Donate your tenant screening report securely, and get a $50 gift card.": "Done su informe de selección de inquilinos de forma segura y reciba una tarjeta regalo de 50 $.",
      "Start Here!": "Comience aquí!",
      "By collecting these denied reports from tenants, this project hopes to better understand the patterns of denying tenants based on such algorithms and expose the discriminatory impact of employing tenant screening services.": "Mediante la recopilación de estos informes denegados de los inquilinos, este proyecto espera comprender mejor las pautas de denegación de inquilinos basadas en dichos algoritmos y exponer el impacto discriminatorio del empleo de servicios de selección de inquilinos.",
      "In this submission, you will provide your copy of tenant screening reports, and we will additionally ask you about you and the rental property you applied for, such as your age, gender, race, income, zip code, number of children, and rent and property types, among others.": "En esta presentación, usted proporcionará su copia de los informes de selección de inquilinos, y además le preguntaremos sobre usted y la propiedad de alquiler que solicitó, como su edad, sexo, raza, ingresos, código postal, número de hijos, y alquiler y tipos de propiedad, entre otros.",
      "Read before donating": "Leer antes de donar",
      "Please carefully read below before starting submission.": "Lea atentamente lo que se indica a continuación antes de iniciar el envío.",
      "How can I participate in OpenTSS?": "¿Cómo puedo participar en OpenTSS?",
      "submissions.copy_desc_01": "Si no tiene su copia del informe de selección de inquilinos: <1>le ayudamos a solicitar un informe de selección de inquilinos a los servicios de selección de inquilinos.</1>",
      "submissions.copy_desc_02": "<0>Tiene derecho a solicitar su copia del informe a los servicios de selección de inquilinos,</0> en la mayoría de los casos de forma gratuita (en cada periodo de 12 meses o cuando se le haya denegado y lo solicite en un plazo de 60 días). Le proporcionamos una herramienta para que pueda solicitar fácilmente su copia del informe. Con ella, puede enviar la carta a los servicios de selección de inquilinos.",
      "If you have your copy of tenant screening report, please make sure you have the following:": "Si tiene su copia del informe de selección de inquilinos, asegúrese de que tiene lo siguiente:",
      "submissions.submit_desc_01": "Asegúrese de tener listos los archivos digitales (por ejemplo, PDF, JPG, PNG) del informe de selección de inquilinos. <1>Escanee o haga fotos del informe de selección de inquilinos si lo tiene en papel. Compruebe que los informes son legibles.</1>",
      "submissions.submit_desc_02": "Asegúrese de tener una dirección de correo electrónico. <1>Es para recibir tu compensación. Cuando comprobemos que el envío es válido, le enviaremos una tarjeta electrónica de regalo (50 $) a su dirección de correo electrónico.</1>",
      "submissions.submit_desc_03": "Además, le haremos algunas preguntas sobre usted, como su edad, sexo, raza, ingresos, código postal, número de hijos y las condiciones de la vivienda de alquiler que solicitó, como el alquiler, el número de habitaciones y la escala de propietarios (número de unidades). <1>Toda la información que nos envíe será encriptada, de modo que sólo nosotros podamos verla. Además, eliminaremos su información sensible del informe.</1>",
      "submissions.submit_desc_04": "<0>¿Qué hará OpenTSS con mis datos?</0><1>En primer lugar, nos interesa conocer el impacto discriminatorio de las prácticas de selección de inquilinos por grupos protegidos (por ejemplo, raza, sexo, fuente de ingresos).</1><2>Analizaremos los datos de selección de inquilinos para ver si existe algún impacto discriminatorio por motivos de raza, sexo, situación familiar o fuente de ingresos, y también analizaremos los mecanismos de puntuación o los procesos de toma de decisiones. Publicaremos los resultados en este sitio web de forma agregada.</2><3>También nos interesa el impacto de la recomendación algorítmica realizada por los servicios de selección de inquilinos en la toma de decisiones de los propietarios.</3><4>Esperamos medir el impacto discriminatorio del sistema de puntuación algorítmica en las prácticas de selección de inquilinos.</4><5></5><6>¿Cómo protegerán mis datos?</6><7>Usted envía su informe mediante cifrado de extremo a extremo. Eliminaremos toda la información identificable y la guardaremos en un almacenamiento cifrado y seguro.</7><8>Sólo nos interesan los datos de sus informes de selección de inquilinos, no su nombre, su SSN ni su dirección. Después de enviar su informe, eliminaremos sus datos identificativos del informe y los almacenaremos en nuestro servidor. Le pediremos información demográfica adicional para poder analizar el informe de selección de inquilinos con mayor precisión, para determinar cómo las empresas de selección de inquilinos tratan de forma diferente los distintos perfiles. El informe y los datos se transferirán con un cifrado de extremo a extremo y se almacenarán en nuestro servidor. Los datos sólo se utilizarán para analizar los algoritmos de selección de inquilinos. No se transmitirán a terceros ni se venderán.</8><9></9><10>¿Puedo donar varios informes de selección de inquilinos?</10><11>Lamentablemente, no. Compensamos por persona.</11>",
      
      // consent
      "Back": "Volver",
      "Informed Consent": "Consentimiento informado",
      "Before you submit the report, please read this and consent to participate.": "Antes de enviar el informe, lea esto y dé su consentimiento para participar.",
      "consent.title_part": `
        <0>CONSENTIMIENTO PARA PARTICIPAR EN LA INVESTIGACIÓN</0>
        
        <1>Se le ha pedido que participe en un estudio de investigación dirigido por Wonyoung So, del Departamento de Estudios Urbanos y Planificación del Instituto Tecnológico de Massachusetts (M.I.T.). Este estudio está patrocinado por la Mozilla Foundation.</1><2>Se le ha seleccionado como posible participante en este estudio porque ha sido previamente examinado por los propietarios que utilizan servicios de selección de inquilinos para tomar decisiones sobre el arrendamiento.</2>
      `,
      "consent.summary": `
        <0>
          La información que figura a continuación ofrece un resumen de la investigación. Su participación en esta investigación es voluntaria y puede retirarse en cualquier momento.
        </0>
        
        <1>
          <0>Propósito</0><br/>
          <3>El propósito de este estudio es auditar los servicios de selección de inquilinos y revelar los patrones de sus algoritmos internos, estructuras de datos y representaciones. Este estudio está recopilando informes de selección de inquilinos y experiencias de inquilinos denegados, con el objetivo de medir el impacto discriminatorio y racializado del empleo de servicios de selección de inquilinos.</3>
        </1>

        <2>
          <0>Procedimientos del estudio</0><br/>
          <3>
            Este estudio recopilará informes de selección de inquilinos. Recogerá el informe, la información demográfica y el resultado de la decisión de arrendamiento (por ejemplo, aceptado o denegado, depósitos de seguridad). El estudio analizará los datos y compartirá los resultados agregados con el público a través de una forma de sitio web de narración digital. Se presentará un informe a la Fundación Mozilla. La participación en el estudio llevará aproximadamente 15 minutos.
          </3>
        </2>

        <3>
          <0>Riesgos y posibles molestias</0><br/>
          <3>
            Existen riesgos potenciales para la privacidad de los participantes, ya que el estudio recogerá información sensible y personalmente identificable, así como la información sensible contenida en los informes de selección de inquilinos. Para minimizar estos riesgos, el estudio utilizará la base de datos segura del MIT, encriptación completa y procedimientos de anonimización.
          </3>
        </3>
        <4></4><5></5>
        <6>Lea la información que figura a continuación y pregunte todo lo que no entienda antes de decidir si desea participar o no.</6>
      `,
      "consent.participation_withdrawal": `
        <0> 
          <0>PARTICIPACIÓN Y RETIRADA</0><1></1>
          <3>Su participación en esta investigación es totalmente VOLUNTARIA. Si decide participar, podrá retirarse posteriormente del estudio en cualquier momento sin penalización ni consecuencias de ningún tipo. Si decide no participar, ello no afectará a su relación con el M.I.T. ni a su derecho a la asistencia sanitaria u otros servicios a los que tenga derecho.</3>
        </0>
      `,
      "consent.purpose_study": `
        <0> 
          <0>OBJETIVO DEL ESTUDIO</0><1></1>
          <3>El objetivo es investigar el impacto discriminatorio y racial del uso de servicios de selección de inquilinos. El objetivo del proyecto es crear una base de datos colectiva mediante la recopilación de informes de selección de inquilinos denegados y datos de los inquilinos que fueron rechazados en base a dichos informes, para comprender los patrones de denegación de inquilinos y el impacto dispar del empleo de servicios de selección de inquilinos por parte de los propietarios. La investigación se interesa por el historial crediticio, los registros de desahucios y los antecedentes penales utilizados en los informes de selección de inquilinos, y cómo afectan estas medidas a los algoritmos de puntuación de inquilinos. El objetivo de la investigación es abogar por la regulación de la práctica y la política de los servicios de selección de inquilinos y comprender mejor el sector de la selección de inquilinos.</3>
        </0>
      `,
      "consent.procedures": `
        <0> 
          <0>PROCEDIMIENTOS</0><1></1>
          <3>Si se ofrece voluntario para participar en este estudio, le pedimos que haga lo siguiente: Envíenos su informe de selección de inquilinos. Envíenos sus informes de selección de inquilinos en formato digital. Participe en la encuesta. Complete la herramienta de encuesta para registrar sus experiencias, así como su información demográfica, incluyendo raza, sexo e ingresos, entre otros. La participación en el estudio le llevará aproximadamente 15 minutos.</3>
        </0>
      `,
      "consent.risks": `
        <0> 
          <0>POSIBLES RIESGOS Y MOLESTIAS</0><1></1>
          <3>Existen riesgos potenciales para la privacidad de los participantes, ya que el estudio recopilará información sensible y de identificación personal (por ejemplo, nombre, fecha de nacimiento, número de seguro social, dirección, teléfono, raza, sexo, ingresos, puntuación crediticia, historial de crédito, registros de desahucios, antecedentes penales). Para minimizar estos riesgos, el estudio utilizará la base de datos segura del MIT y se someterá a procedimientos completos de encriptación y anonimización.
          Los datos brutos nunca se compartirán y el resultado de la investigación se compartirá en análisis con agregación con respecto a cómo los servicios de selección de inquilinos puntúan a los inquilinos. Sin embargo, el extracto de la entrevista podría compartirse de forma anónima (por ejemplo, P1, P2, ...). Se espera que el resultado de esta investigación se publique en forma de informe para la Fundación Mozilla.</3>
        </0>
      `,
      "consent.benefits": `
        <0> 
          <0>BENEFICIOS PREVISTOS PARA LOS SUJETOS</0><1></1>
          <3>Participar en la investigación no conlleva ningún beneficio directo.</3>
        </0>
        <1>
          <0>BENEFICIOS PREVISTOS PARA LA SOCIEDAD</0><1></1>
          <3>Entre los beneficios potenciales que la sociedad puede esperar del estudio figuran:</3>
        </1>
        <2>
          <0>Mayor transparencia y responsabilidad de los servicios de selección de inquilinos: El estudio pretende auditar y revelar los patrones de algoritmos y estructuras de datos utilizados por los servicios de selección de inquilinos. Esto podría aumentar la transparencia y la responsabilidad de estos servicios y, potencialmente, dar lugar a procesos de toma de decisiones más justos y equitativos.</0>
          <1>Mejor comprensión del impacto de los servicios de selección de inquilinos: Mediante el análisis de los informes de selección de inquilinos denegados, el estudio proporcionará información sobre el modo en que el historial crediticio, los registros de desahucios y los antecedentes penales influyen en los algoritmos de puntuación de inquilinos. Esto podría llevar a una mejor comprensión del impacto discriminatorio y racializado del empleo de estos servicios.</1>
          <2>Abogar por políticas de vivienda justa: Los resultados del estudio podrían utilizarse para abogar por la regulación de la práctica y la política de los servicios de selección de inquilinos sobre la base de la norma de impacto dispar de la Ley de Vivienda Justa. Esto podría dar lugar a un sistema de vivienda más justo y equitativo para todos los inquilinos.</2>
        </2>
      `,
      "consent.payment": `
        <0> 
          <0>PAGO POR PARTICIPAR</0><1></1>
          Cada inquilino que participe en la herramienta de crowdsourcing y envíe un informe de selección de inquilinos recibirá una compensación de 50 $. Los inquilinos entrevistados recibirán una compensación de 25 dólares. Las compensaciones se abonarán mediante tarjetas regalo Visa.
        </0>
      `,
      "consent.privacy": `
        <0> 
          <0>PRIVACIDAD Y CONFIDENCIALIDAD</0><br/>
          Las únicas personas que sabrán que usted es un sujeto de investigación son los miembros del equipo de investigación, que pueden incluir colaboradores externos no afiliados al MIT. Ninguna información sobre usted, o proporcionada por usted durante la investigación, será revelada a terceros sin su permiso por escrito, excepto: si es necesario para proteger sus derechos o bienestar, o si es requerido por la ley. Además, su información podrá ser revisada por representantes autorizados del MIT para garantizar el cumplimiento de las políticas y procedimientos del MIT.<br/><br/>
          Todos los datos se almacenan en un servidor mantenido por el MIT, y el servidor de administración sólo es accesible a través de la VPN del MIT y la cuenta de administrador del equipo, lo que significa que sólo las personas con afiliación al MIT y la debida autorización tendrán acceso. Durante todo el proceso de recopilación de datos, todas las transacciones y los datos se transmitirán mediante HTTP con capa de conexión segura (SSL), y los datos transmitidos se almacenarán cifrados. Una vez finalizada la investigación, se destruirán los datos y los informes. Los datos brutos nunca se compartirán y el resultado de la investigación se compartirá en análisis con agregación con respecto a cómo los servicios de selección de inquilinos puntúan a los inquilinos. El extracto de la entrevista podría compartirse de forma anónima (por ejemplo, P1, P2, ...). Se espera que el resultado de esta investigación se publique en forma de informe para la Fundación Mozilla.
        </0>
      `,
      "consent.data_use": `
        <0> 
          <0>USO FUTURO DE LOS DATOS</0><br/>
          Sus datos recogidos como parte de la investigación, aunque se eliminen los identificadores, no se utilizarán ni distribuirán para futuros estudios de investigación. Una vez finalizado el estudio, el equipo destruirá los datos y las copias impresas.
          <br/><br/>
          Los datos identificativos utilizados tradicionalmente sobre usted, como su nombre, dirección, número de teléfono, historial médico, número de la seguridad social, rasgos identificativos o su voz, etc., se eliminarán antes de almacenarlos, utilizarlos o distribuirlos para futuras investigaciones. Una vez finalizado el estudio, todos los datos identificables se destruirán tras el periodo de conservación de datos exigido.
        </0>
      `,
      "consent.withdrawal_by_inv": `
        <0> 
          <0>RETIRADA DE LA PARTICIPACIÓN POR PARTE DEL INVESTIGADOR</0><br/>
          El investigador puede retirarle la participación en esta investigación si surgen circunstancias que lo justifiquen. El investigador, Wonyoung So, tomará la decisión y le comunicará si no le es posible continuar. La decisión puede tomarse para proteger su seguridad o porque forma parte del plan de investigación que las personas que desarrollen determinadas afecciones no puedan seguir participando.
          <br/><br/>
          Si debe abandonar porque el investigador se lo pide o porque ha decidido por su cuenta retirarse, se le abonará una tarjeta regalo Visa valorada en 25 dólares.
        </0>
      `,
      "consent.emergency": `
        <0> 
          <0>ATENCIÓN DE URGENCIA E INDEMNIZACIÓN POR LESIONES</0><br/>
          Si cree que ha sufrido un perjuicio, que puede incluir un trauma emocional, como consecuencia de su participación en este estudio, póngase en contacto con el responsable del estudio lo antes posible.<br/><br/>
          En caso de que usted sufra una lesión de este tipo, M.I.T. podrá proporcionar por sí mismo, o disponer que se proporcione, transporte de emergencia o tratamiento médico, incluido el tratamiento de emergencia y la atención de seguimiento, según sea necesario, o el reembolso de dichos servicios médicos. M.I.T. no proporciona ninguna otra forma de compensación por lesiones. En cualquier caso, ni la oferta de prestar asistencia médica ni la prestación efectiva de servicios médicos se considerarán una admisión de culpa o aceptación de responsabilidad. Las preguntas relativas a esta póliza pueden dirigirse a la Oficina de Seguros del MIT, al teléfono (617) 253-2823.
        </0>
      `,
      "consent.identity_inv": `
        <0> 
          <0>IDENTIFICACIÓN DE LOS INVESTIGADORES</0><br/>
          En caso de lesión relacionada con la investigación o si experimenta una reacción adversa, póngase en contacto inmediatamente con uno de los investigadores que figuran a continuación. Si tiene alguna pregunta sobre la investigación, no dude en ponerse en contacto con Wonyoung So (wso@mit.edu, 617-949-6602).
        </0>
      `,
      "consent.rights": `
        <0> 
          <0>DERECHOS DE LOS SUJETOS DE LA INVESTIGACIÓN</0><br/>
          Usted no está renunciando a ninguna reclamación legal, derecho o recurso debido a su participación en este estudio de investigación. Si cree que se le ha tratado injustamente o tiene alguna pregunta sobre sus derechos como sujeto de investigación, puede ponerse en contacto con el Presidente del Comité sobre el Uso de Humanos como Sujetos Experimentales, M.I.T., Room E25-143B, 77 Massachusetts Ave, Cambridge, MA 02139, teléfono 1-617-253 6787.
        </0>
      `,
      "BY PRESSING THIS BUTTON, I WILLINGLY AGREE TO PARTICIPATE IN THE RESEARCH IT DESCRIBES.": "AL PULSAR ESTE BOTÓN, ACEPTO VOLUNTARIAMENTE PARTICIPAR EN LA INVESTIGACIÓN QUE DESCRIBE.",
      "I AGREE TO PARTICIPATE": "ACEPTO PARTICIPAR",

      //upload report
      "Upload Report": "Cargar informe",
      "Please upload your tenant screening report.": "Cargue su informe de selección de inquilinos.",
      "upload_report.title_desc": `
        <0>
          <0>Si tienes tu informe físico encima:</0> Primero, haga fotos de cada página del informe. Después, sube todas las fotos aquí.
        </0>
        <1>
          <0>Si tiene un archivo PDF que recibió de la empresa de selección de inquilinos:</0> adjunte aquí el archivo PDF.*
        </1>
      `,
      "Choose File...": "Seleccione Archivo...",
      "Uploaded Files": "Archivos cargados",
      "No files are attached.": "No se adjunta ningún archivo.",
      "When approximately did you receive this report?": "¿Cuándo recibió aproximadamente este informe?",
      "January": "Enero",
      "February": "Febrero",
      "March": "Marzo",
      "April": "Abril",
      "May": "Mayo",
      "June": "Junio",
      "July": "Julio",
      "August": "Agosto",
      "September": "Septiembre",
      "October": "Octubre",
      "November": "Noviembre",
      "December": "Diciembre",
      "Month": "Mes",
      "Year": "Año",
      "upload_report.copy_desc": `
        <0>
          * Si no tiene su copia del informe de selección de inquilinos, <1>haga clic aquí y solicite una copia de su informe de selección de inquilinos</1>.
        </0>
      `,
      "You send your report through end-to-end encryption. We will remove every identifiable information and store it on a secured server.": "Usted envía su informe mediante cifrado de extremo a extremo. Eliminaremos toda la información identificable y la almacenaremos en un servidor seguro.",

      // tenant demographics
      "Tenant Demographics": "Datos demográficos de los inquilinos",
      "Next, we will ask about you.": "A continuación, le preguntaremos por usted.",
      "To which gender identity do you most identify?": "¿Con qué identidad de género se identifica más?",
      "Woman": "Mujer",
      "Man": "Hombre",
      "Non-binary person": "Persona no binaria",
      "Prefer not to answer": "Prefiero no contestar",
      "Do you have lived experience as a trans person (meaning your gender identity does not align with your gender assigned at birth)?": "¿Tienes experiencia de vida como persona trans (es decir, tu identidad de género no coincide con el género asignado al nacer)?",
      "Yes": "Sí",
      "No": "No",
      "Are you of Hispanic or Latino Origin?": "¿Es usted de origen hispano o latino?",
      "To which race do you most identify?": "¿Con qué raza se identifica más?",
      "White": "Blanco",
      "Black / African American": "Negro / afroamericano",
      "Native American or Alaska Native": "Nativo americano o nativo de Alaska",
      "Asian or Pacific Islander": "Asiáticos o de las islas del Pacífico",
      "Other": "Otros",
      "What is your age?": "¿Cuál es su edad?",
      "More than 70": "Más del 70",
      "Do you live with your partner?": "¿Vive con su pareja?",
      "How many dependents (children) do you live with?": "¿Con cuántas personas a su cargo (hijos) vive?",
      "No dependents": "Sin personas a cargo",
      "More than 5": "Más del 5",
      "How much is your monthly income before tax?": "¿A cuánto ascienden sus ingresos mensuales antes de impuestos?",
      "This field only accepts numbers.": "Este campo sólo acepta números.",

      //tenant application 
      "Tenant Application": "Solicitud de arrendamiento",
      "Now we will ask you about the tenant application.": "Ahora le preguntaremos por la solicitud de inquilino.",
      "When approximately did you apply?": "¿Cuándo lo solicitó aproximadamente?",
      "Month field is required.": "El campo Mes es obligatorio.",
      "Year field is required.": "El campo Año es obligatorio.",
      "application_chars.validate_date": "La fecha de solicitud debe ser la misma o anterior a la fecha de recepción del informe de selección de inquilinos en menos de 1 año. (ha introducido {{ date }} en el paso anterior).",
      "What was the rental decision?": "¿Cuál fue la decisión del alquiler?",
      "Accepted": "Aceptado",
      "Denied": "Denegado",
      "If you were accepted, how much was the security deposit? If there was no security deposit, please enter 0.": "Si le aceptaron, ¿a cuánto ascendía la fianza? Si no hubo fianza, introduzca 0.",
      "How much was the rent of the property?": "¿A cuánto ascendía el alquiler de la vivienda?",
      "How many bedrooms were there?": "¿Cuántas habitaciones había?",
      "Studio": "Estudio",
      "1 Bedroom": "1 habitación",
      "2 Bedrooms": "2 habitaciones",
      "3 Bedrooms": "3 habitaciones",
      "4 Bedrooms": "4 habitaciones",
      "More than 5 Bedrooms": "Más de 5 habitaciones",
      "What was the house type?": "¿Cuál era el tipo de casa?",
      "Detached Single Family Housing": "Viviendas unifamiliares aisladas",
      "Townhouse": "Casa adosada",
      "Multifamily Housing": "Viviendas multifamiliares",
      "Manufactured Housing (i.e. Mobile Homes)": "Viviendas prefabricadas (es decir, casas móviles)",
      "Do you have any types of housing vouchers?": "¿Tiene algún tipo de bono de vivienda?",
      "* Vouchers include Housing Choice Vouchers (Section 8), Veterans Affairs Supportive Housing (VASH), as well as city-level vouchers like CityFHEPS in NYC.": "* Los vales incluyen vales de elección de vivienda (Sección 8), viviendas de apoyo para veteranos (VASH), así como vales municipales como CityFHEPS en NYC.",
      "What percentage of your income do you pay under your housing voucher?": "¿Qué porcentaje de sus ingresos paga en virtud de su bono de vivienda?",
      "application_chars.hcv_desc": `
        Por ejemplo, los Vales de Elección de Vivienda exigen que pague el <1>30%</1> de sus ingresos en concepto de alquiler.
      `,
      "This field only accepts percentages (0-100).": "Este campo sólo acepta porcentajes (0-100).",
      "Enter the name of the landlord or the property management company.": "Introduzca el nombre del propietario o de la empresa de gestión inmobiliaria.",
      "Is the landlord individual or a company?": "¿El arrendador es un particular o una empresa?",
      "Individual": "Individual",
      "Company": "Empresa",
      "Enter the property address *you applied*.": "Introduzca la dirección del inmueble *que solicitó*.",
      "Choose State...": "Elige Estado...",
      "This field allows only zip code (e.g., XXXXX or XXXXX-YYYY)": "Este campo sólo permite el código postal (por ejemplo, XXXXX o XXXXX-YYYY)",
      "Please describe your experience with a landlord or property management company that uses tenant screening services.": "Describa su experiencia con un propietario o una empresa de gestión inmobiliaria que utilice servicios de selección de inquilinos.",
      "Type your experience...": "Escriba su experiencia...",
      "Would you be willing to participate in an interview with us to discuss your experience further, if we are interested in learning more?": "¿Estaría dispuesto a participar en una entrevista con nosotros para hablar más a fondo de su experiencia, si nos interesa saber más?",
      "Email address for gift card": "Dirección de correo electrónico para la tarjeta regalo",
      "Finally, enter your information for gift card delivery.": "Por último, introduzca sus datos para la entrega de la tarjeta regalo.",
      "What is your email address?": "¿Cuál es su dirección de correo electrónico?",
      "e.g., john@gmail.com": "Por ejemplo, mariana@gmail.com",
      "Confirm your email address.": "Confirme su dirección de correo electrónico.",
      "Required. It is important to enter your correct and current email address because we will send a Visa gift card and a copy of your consent form to this email address.": "Obligatorio. Es importante que introduzca su dirección de correo electrónico correcta y actual porque le enviaremos una tarjeta regalo Visa y una copia de su formulario de consentimiento a esta dirección de correo electrónico.",
      "Done": "Hecho",

      // Last step landing page
      "Thank you": "Gracias",
      "Thank you very much! We will send a gift card as soon as we check your submission is completed.": "Muchas gracias. Le enviaremos una tarjeta regalo en cuanto comprobemos que su envío se ha completado.",
      "submissions.final_desc": `
        <0>
          <0>Confirme su dirección de correo electrónico:</0> Hemos recibido y procesado su informe de selección de inquilinos. Mientras tanto, le rogamos que confirme su dirección de correo electrónico a través del mensaje que acabamos de enviarle.
        </0>
        <1>
          <0>¿Y ahora qué?</0> Recibirás una tarjeta regalo Visa de 50 $ por correo electrónico. Please anticipate its arrival in your inbox within 7 days. Kindly note that we review each submission individually, and in the event that your tenant screening report is illegible due to a blurry photograph, we may request that you re-upload the report for clarity.
          <br/><br/>
          Una vez que hayamos confirmado que la solicitud es válida, le enviaremos la tarjeta regalo a su dirección de correo electrónico ({{displayEmail}}). Dentro del correo electrónico de la tarjeta regalo, tendrá la opción de elegir entre recibir una tarjeta regalo digital o una física.
        </1>
        <2>
          <0>¿Cómo puedo comprobar el estado de mi envío?</0> Para comprobar el estado de su envío, utilice el siguiente <2>enlace</2>. Se le pedirá que introduzca su dirección de correo electrónico y, a continuación, le enviaremos un enlace seguro para recuperar el estado de su presentación.
        </2>
        <3>
          <0>¿Cómo puedo ponerme en contacto con ustedes?</0> Envíe un correo electrónico a <2>opentss@mit.edu</2>. Le responderemos en cuanto recibamos su mensaje.
        </3>
      `,
      "Go to First Page": "Ir a la primera página",

      // check submission status
      "Check your submission": "Compruebe su envío",
      "Check your submission status here.": "Compruebe aquí el estado de su envío.",
      "Please provide us with your email address so that we may send you a secure link to browse the status of your submission.": "Indíquenos su dirección de correo electrónico para que podamos enviarle un enlace seguro para consultar el estado de su envío.",
      "This field only allows email address (e.g., john@gmail.com)": "Este campo sólo permite la dirección de correo electrónico (por ejemplo, mariana@gmail.com)",
      "Submit": "Enviar",
      "Thank you! We just sent an email with a secure link.": "Gracias. Acabamos de enviarle un correo electrónico con un enlace seguro.",
      "Please check your inbox — You can have access to the submission status through the secure link in the email. The link will be expired after 1 day.": "Por favor, compruebe su bandeja de entrada - Puede acceder al estado del envío a través del enlace seguro del correo electrónico. El enlace caducará al cabo de 1 día.",
      "We couldn't find your submissions.": "No hemos podido encontrar sus envíos.",
      "Please try again with different email.": "Por favor, inténtelo de nuevo con otro correo electrónico.",
      "Error Occurred.": "Se ha producido un error.",
      "Please try again.": "Por favor, inténtelo de nuevo.",

      // retrieve submission
      "submitted": "Presentado:<br/>En curso",
      "Reward Granted": "Recompensa concedida",
      "Retrieve Submission": "Recuperar la presentación",
      "Your submission": "Su presentación",
      "Here is your submission.": "Aquí está su presentación.",
      "Submitted Date": "Fecha de envío",
      "Status": "Estado",
      "Consent Form": "Formulario de consentimiento",
      "Re-upload Report": "Volver a cargar el informe",
      "View Consent Form": "Ver el formulario de consentimiento",
      "Re-upload": "Volver a cargar",


      // view consent form
      "view_consent_form.consent_desc": "A continuación encontrará el formulario de consentimiento informado en el que aceptó participar en {{date}}. Si tiene alguna pregunta sobre la investigación, escríbanos a <3>opentss@mit.edu</3>",

      //reupload form
      "Please reupload your tenant screening report.": "Por favor, vuelva a subir su informe de selección de inquilinos.",
      "We may ask you to reupload because either 1) the report is not legible or 2) there is an unexpected error so we couldn't properly obtain your report.": "Es posible que le pidamos que vuelva a cargarlo porque 1) el informe no es legible o 2) hay un error inesperado por el que no hemos podido obtener correctamente su informe.",
      "Your report is successfully submitted. After we check your newly submitted report, we will issue an e-gift card to your email.": "Su informe se ha enviado correctamente. Una vez comprobado su informe, le enviaremos una tarjeta electrónica de regalo a su correo electrónico.",
      "There is an unexpected error.": "Se ha producido un error inesperado.",
      "reupload_report.error_contact": "Por favor, inténtelo de nuevo más tarde o póngase en contacto con <1>opentss@mit.edu</1>.",

      //lookup tool
      "Lookup tool": "Herramienta de búsqueda",
      "Tenant Screening Services Lookup Tool": "Herramienta de búsqueda de servicios de selección de inquilinos",
      "Search": "Buscar en",
      "These tools are updated based on the tenant screening report collection and sample reports they provided to their website.": "Estas herramientas se actualizan en función de la recopilación de informes de selección de inquilinos y de los informes de muestra que facilitan en su sitio web.",
      "List of companies": "Lista de empresas",
      "scoring_system": "Puntuación<br/>Sistema",
      "data_collect": "Datos <br/> que recogen",
      "report_collected": "Informe<br/>Recogido",

      //company show
      "resells reports to": "revende informes a",
      "Sample report available": "Informe de muestra disponible",
      "Sample report unavailable": "Ejemplo de informe no disponible",
      "Admin interface available": "Interfaz de administración disponible",
      "Admin interface unavailable": "Interfaz de administración no disponible",
      "reports collected": "informes recopilados",

      // how tss works
    }
  }
};


i18n
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    fallbackLng: 'en',
    detection: options,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });



export default i18n;