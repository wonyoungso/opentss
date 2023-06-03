import * as React from "react";
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
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
    }
  },
  es: {
    translation: {
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
      "submissions.submit_desc_04": "<0>¿Qué hará OpenTSS con mis datos?</0><1>En primer lugar, nos interesa conocer el impacto discriminatorio de las prácticas de selección de inquilinos por grupos protegidos (por ejemplo, raza, sexo, fuente de ingresos).</1><2>Analizaremos los datos de selección de inquilinos para ver si existe algún impacto discriminatorio por motivos de raza, sexo, situación familiar o fuente de ingresos, y también analizaremos los mecanismos de puntuación o los procesos de toma de decisiones. Publicaremos los resultados en este sitio web de forma agregada.</2><3>También nos interesa el impacto de la recomendación algorítmica realizada por los servicios de selección de inquilinos en la toma de decisiones de los propietarios.</3><4>Esperamos medir el impacto discriminatorio del sistema de puntuación algorítmica en las prácticas de selección de inquilinos.</4><5></5><6>¿Cómo protegerán mis datos?</6><7>Usted envía su informe mediante cifrado de extremo a extremo. Eliminaremos toda la información identificable y la guardaremos en un almacenamiento cifrado y seguro.</7><8>Sólo nos interesan los datos de sus informes de selección de inquilinos, no su nombre, su SSN ni su dirección. Después de enviar su informe, eliminaremos sus datos identificativos del informe y los almacenaremos en nuestro servidor. Le pediremos información demográfica adicional para poder analizar el informe de selección de inquilinos con mayor precisión, para determinar cómo las empresas de selección de inquilinos tratan de forma diferente los distintos perfiles. El informe y los datos se transferirán con un cifrado de extremo a extremo y se almacenarán en nuestro servidor. Los datos sólo se utilizarán para analizar los algoritmos de selección de inquilinos. No se transmitirán a terceros ni se venderán.</8><9></9><10>¿Puedo donar varios informes de selección de inquilinos?</10><11>Lamentablemente, no. Compensamos por persona.</11>"
      
    }
  }
};


// <1>2. Consulte su solicitud de alquiler.</1><br/>
// Examine su solicitud de alquiler, ya que los propietarios suelen revelar el nombre de la empresa de selección de inquilinos que utilizan durante el proceso de selección.
// <2>3. Consult your adverse action letter.</2><br/>
// Si ha recibido una carta de acción adversa debido a una denegación basada en los resultados de la selección de inquilinos, el propietario está obligado a revelar el nombre de la empresa de selección en la carta.

// <2>4. Communicate with the landlord or conduct research.</2><br/>
// Inicie una comunicación directa con el propietario para informarse sobre los servicios de selección de inquilinos empleados. Por último, lleve a cabo una investigación independiente para identificar a las empresas de selección de inquilinos asociadas a su casero.

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
    debug: true,
    detection: options,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });



export default i18n;