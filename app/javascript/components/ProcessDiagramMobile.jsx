import _ from "lodash";
import * as React from "react"
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom'

const reportPositions = {
  1: { x: 0, y: 0, opacity: 0 },
  2: { x: -100, y: 0, opacity: 1},
  3: { x: -30, y: 120, opacity: 1},
  4: { x: 0, y: 0, opacity: 0 }
}

const cardPositions = {
  1: { x: 0, y: 0, opacity: 0 },
  2: { x: 0, y: 0, opacity: 0 },
  3: { x: 0, y: 0, opacity: 0 },
  4: { x: -55, y: -60, opacity: 1 }
}
const ProcessDiagramMobile = (props) => {
  
  const [step, setStep] = useState(1);
  const { t } = useTranslation();
  const { locale } = useParams();

  useEffect(() => {
    _.delay(() => {
      setStep(step < 4 ? step + 1 : 1);
    }, 5000)
  }, [step]);

  return (
    <svg width="351" height="345" viewBox="0 0 351 345" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="tenant_box" className="transition-opacity duration-500">
        <rect id="Rectangle 3" x="0.5" y="144.5" width="109" height="42" rx="4.5" fill="#F7C242" stroke="#F7C242"/>
        <text id="Tenant" fill="black" fontFamily="Sohne" fontSize="18" fontWeight="bold" letterSpacing="0em">
          {
            locale === "es" ? 
            <tspan x="30" y="170.142">Inquilino</tspan> :
            <tspan x="34" y="170.142">Tenant</tspan>
          }
        </text>
      </g>

      <g id="tss_box" className="transition-opacity duration-500">
        <rect id="Rectangle 5" x="195.5" y="144.5" width="155" height="43" rx="4.5" fill="#2C2E38" stroke="white"/>
        <text id="Tenant Screening Service" fill="white" fontFamily="Sohne" fontSize="18" fontWeight="bold" letterSpacing="0em">
          {
            locale === "es" ? 
            <>
              <tspan x="212" y="163.142">Servicio de selección</tspan>
              <tspan x="238" y="180.142">de inquilinos</tspan>
            </>:
            <>
              <tspan x="222" y="163.142">Tenant Screening</tspan>
              <tspan x="252" y="180.142">Service</tspan>
            </>
          }
        </text>
      </g>

      <g id="opentss_box" className="transition-opacity duration-500">
        <rect id="Rectangle 6" x="98.5" y="253.5" width="155" height="43" rx="4.5" fill="#2C2E38" stroke="white"/>
        <text id="OpenTSS" fill="white" fontFamily="Sohne" fontSize="18" fontWeight="bold" letterSpacing="0em"><tspan x="146.333" y="279.142">OpenTSS</tspan></text>
      </g>

      <g id="step_1_arrow" className="transition-opacity duration-500" style={{ opacity: step === 1 ? 1 : 0 }}>
        <path id="Vector 43" d="M281 143.34L276.022 132.921L269.488 142.441L281 143.34ZM60.6544 144.756C67.5023 138.83 74.5891 130.241 89.5172 123.025C104.427 115.819 127.183 110 165.147 110V108C126.987 108 103.91 113.848 88.6469 121.225C73.4026 128.593 65.9782 137.504 59.3456 143.244L60.6544 144.756ZM165.147 110C225.25 110 255.123 127.025 273.021 139.077L274.138 137.418C255.974 125.187 225.719 108 165.147 108V110Z" fill="#F9C40B"/>
      </g>

      <g id="step_2_arrow" className="transition-opacity duration-500" style={{ opacity: step === 2 ? 1 : 0 }}>
        <path id="Vector 47" d="M110 166L120 171.774L120 160.226L110 166ZM195 165L119 165L119 167L195 167L195 165Z" fill="#F9C40B"/>
      </g>

      <g id="step_3_arrow" className="transition-opacity duration-500" style={{ opacity: step === 3 ? 1 : 0 }}>
        <path id="Vector 46" d="M170 253L164.201 243.015L158.453 253.03L170 253ZM54.5022 187.867L161.696 249.387L162.692 247.653L55.4978 186.133L54.5022 187.867Z" fill="#F9C40B"/>
      </g>

      <g id="step_4_arrow" className="transition-opacity duration-500" style={{ opacity: step === 4 ? 1 : 0 }}>
        <path id="Vector 47_2" d="M55 187L60.7993 196.985L66.547 186.97L55 187ZM62.3081 192.347L169.502 253.867L170.498 252.133L63.3036 190.613L62.3081 192.347Z" fill="#F9C40B"/>
      </g>

      <g id="step_1_caveat" className="transition-opacity duration-500 delay-250" style={{ opacity: step === 1 ? 1 : 0 }}>
        <text id="* You have a right to request a copy of your report! (even if you are accepted)" fill="white" fillOpacity="0.8" fontFamily="Sohne" fontSize="14" letterSpacing="0em">
          {
            locale === "es" ? 
            <>

              <tspan x="44" y="11.433">* ¡Tienes derecho a solicitar una copia </tspan>
              <tspan x="44" y="25.433">de tu informe! (incluso si se le acepta)</tspan>
            </> :
            <>
              <tspan x="44" y="11.433">* You have a right to request a copy of your report! </tspan>
              <tspan x="44" y="25.433">(even if you are accepted)</tspan>
            </>
          }
        
        </text>
      </g>

      <g id="step_1_balloon" className="transition-opacity duration-500 delay-200" style={{ opacity: step === 1 ? 1 : 0 }}>
        <path id="Rectangle 7" d="M44 33.5H300C302.485 33.5 304.5 35.5147 304.5 38V98C304.5 100.485 302.485 102.5 300 102.5H180.5H172H163.5H44C41.5147 102.5 39.5 100.485 39.5 98V38C39.5 35.5147 41.5147 33.5 44 33.5Z" fill="white" stroke="white"/>
        <text id="Step 1. (optional) you request a copy of your tenant screening report to the company" fill="#2C2E38" fontFamily="Sohne" fontSize="18" letterSpacing="0em">
          {
            locale === "es" ? 
            <>
              <tspan x="52" y="55.642">Paso 1. (opcional) Usted solicita una copia</tspan>
              <tspan x="52" y="73.642">de su informe de selección </tspan>
              <tspan x="52" y="91.642">de inquilinos al servicio</tspan>
            </> :
            <>
              <tspan x="52" y="55.642">Step 1. (optional) you request a copy of </tspan>
              <tspan x="52" y="73.642">your tenant screening report to the </tspan>
              <tspan x="52" y="91.642">company</tspan>
            </>
          }
        </text>
        <rect id="Rectangle 294" x="172.071" y="96" width="10" height="10" transform="rotate(45 172.071 96)" fill="white"/>
      </g>

      <g id="step_2_balloon" className="transition-opacity duration-500 delay-200" style={{ opacity: step === 2 ? 1 : 0 }}>
        <path id="Rectangle 7_2" d="M26 95.5H282C284.485 95.5 286.5 97.5147 286.5 100V143C286.5 145.485 284.485 147.5 282 147.5H162.5H154H145.5H26C23.5147 147.5 21.5 145.485 21.5 143V100C21.5 97.5147 23.5147 95.5 26 95.5Z" fill="white" stroke="white"/>
        <text id="Step 2. The tenant screening service gives you the copy" fill="#2C2E38" fontFamily="Sohne" fontSize="18" letterSpacing="0em">
          {
            locale === "es" ? 
            <>
              <tspan x="34" y="115.642">Paso 2. (opcional) El servicio de selección</tspan>
              <tspan x="34" y="133.642">de inquilinos le proporciona la copia</tspan>
            </> :
            <>
              <tspan x="34" y="115.642">Step 2. The tenant screening service </tspan>
              <tspan x="34" y="133.642">gives you the copy</tspan>
            </>
          }
        </text>
        <rect id="Rectangle 294_2" x="154.071" y="141" width="10" height="10" transform="rotate(45 154.071 141)" fill="white"/>
      </g>

      <g id="step_3_balloon" className="transition-opacity duration-500 delay-200" style={{ opacity: step === 3 ? 1 : 0 }}>
        <path id="Rectangle 7_3" d="M5 181.5H195C197.485 181.5 199.5 183.515 199.5 186V243C199.5 245.485 197.485 247.5 195 247.5H106.391H100H93.609H4.99999C2.51471 247.5 0.5 245.485 0.5 243V186C0.5 183.515 2.51472 181.5 5 181.5Z" fill="white" stroke="white"/>
        <text id="Step 3. You donate your copy of tenant screening report to OpenTSS" fill="#2C2E38" fontFamily="Sohne" fontSize="18" letterSpacing="0em">
          {
            locale === "es" ? 
            <>
              <tspan x="9.02246" y="201.642">Paso 3. Usted dona su copia del </tspan>
              <tspan x="9.02246" y="219.642">informe de selección de  </tspan>
              <tspan x="9.02246" y="237.642">inquilinos a OpenTSS</tspan>
            </> :
            <>
              <tspan x="9.02246" y="201.642">Step 3. You donate your copy </tspan>
              <tspan x="9.02246" y="219.642">of tenant screening report to </tspan>
              <tspan x="9.02246" y="237.642">OpenTSS</tspan>
            </>
          }
         
        </text>
        <rect id="Rectangle 294_3" width="8.84682" height="8.84682" transform="matrix(0.600961 0.799278 -0.600961 0.799278 81.3164 174)" fill="white"/>
      </g>

      <g id="step_4_balloon" className="transition-opacity duration-500 delay-200" style={{ opacity: step === 4 ? 1 : 0 }}>
        <path id="Rectangle 7_4" d="M72 293.5H262C264.485 293.5 266.5 295.515 266.5 298V340C266.5 342.485 264.485 344.5 262 344.5H173.391H167H160.609H72C69.5147 344.5 67.5 342.485 67.5 340V298C67.5 295.515 69.5147 293.5 72 293.5Z" fill="white" stroke="white"/>
        <text id="Step 4. We email you the $100 gift card." fill="#2C2E38" fontFamily="Sohne" fontSize="18" letterSpacing="0em">
          {
            locale === "es" ? 
            <>
              <tspan x="76.0225" y="313.642">Paso 4. Te enviamos por correo</tspan>
              <tspan x="76.0225" y="331.642">electrónico la tarjeta regalo de $100</tspan>  
            </> :
            <>
              <tspan x="76.0225" y="313.642">Step 4. We email you the $100 </tspan>
              <tspan x="76.0225" y="331.642">gift card.</tspan>  
            </>
          }
        
        </text>
        <rect id="Rectangle 294_4" width="8.84682" height="8.84682" transform="matrix(0.600961 0.799278 -0.600961 0.799278 220.437 286)" fill="white"/>
      </g>


      <g id="report_icon" filter="url(#filter0_d_0_1)" className="transition-transform duration-2000" style={{ 
          opacity: reportPositions[step].opacity, 
          transform: step !== 1 ? `translate(${reportPositions[step].x}px, ${reportPositions[step].y}px)` : "none" }} >
        <rect id="Rectangle 295" x="184" y="170.292" width="52" height="48.6747" rx="2" transform="rotate(-1.42402 184 170.292)" fill="white"/>
        <text id="Report" transform="translate(188.101 174.317) rotate(-1.42402)" fill="#2C2E38" fontFamily="Sohne" fontSize="15" letterSpacing="0em"><tspan x="0" y="13.739">{ t("Report") } </tspan></text>
      </g>

      <g id="gift_icon"  className="transition-transform duration-2000" 
        style={{ 
          opacity: cardPositions[step].opacity, 
          transform: step === 4 ? `translate(${cardPositions[step].x}px, ${cardPositions[step].y}px)` : "none" 
        
        }}>
        <rect id="Rectangle 296" x="111.5" y="234.5" width="54" height="30" rx="4.5" fill="#2C2E38" stroke="white"/>
        <g id="Visa_Inc._logo 1" clipPath="url(#clip0_0_1)">
          <g id="g4158">
            <path id="polygon9" d="M146.133 260.87L143.865 260.87L145.284 252.158L147.552 252.158L146.133 260.87Z" fill="white"/>
            <path id="path11" d="M154.356 252.371C153.908 252.195 153.199 252 152.321 252C150.081 252 148.504 253.186 148.494 254.882C148.476 256.134 149.624 256.829 150.482 257.246C151.36 257.672 151.658 257.951 151.658 258.331C151.649 258.914 150.949 259.183 150.296 259.183C149.39 259.183 148.905 259.045 148.168 258.72L147.869 258.581L147.552 260.536C148.084 260.777 149.064 260.991 150.081 261C152.461 261 154.011 259.832 154.029 258.025C154.038 257.033 153.432 256.273 152.125 255.652C151.332 255.253 150.846 254.985 150.846 254.577C150.855 254.206 151.257 253.826 152.153 253.826C152.89 253.808 153.432 253.984 153.842 254.16L154.047 254.252L154.356 252.371Z" fill="white"/>
            <path id="path13" d="M157.37 257.784C157.557 257.283 158.276 255.346 158.276 255.346C158.266 255.365 158.462 254.836 158.574 254.512L158.733 255.263C158.733 255.263 159.162 257.348 159.255 257.784C158.901 257.784 157.818 257.784 157.37 257.784ZM160.17 252.158L158.415 252.158C157.874 252.158 157.463 252.315 157.23 252.881L153.861 260.87L156.241 260.87C156.241 260.87 156.633 259.795 156.717 259.563C156.978 259.563 159.293 259.563 159.629 259.563C159.694 259.869 159.9 260.87 159.9 260.87L162 260.87L160.17 252.158Z" fill="white"/>
            <path id="path15" d="M141.971 252.158L139.749 258.099L139.507 256.894C139.096 255.504 137.808 253.993 136.371 253.242L138.405 260.861L140.804 260.861L144.369 252.158L141.971 252.158Z" fill="white"/>
            <path id="path17" d="M137.687 252.158L134.037 252.158L134 252.334C136.847 253.057 138.732 254.8 139.507 256.894L138.713 252.89C138.583 252.334 138.181 252.176 137.687 252.158Z" fill="white"/>
          </g>
        </g>
        <text id="$100" transform="translate(115 236)" fill="white" fontFamily="Sohne" fontSize="14" letterSpacing="0em"><tspan x="0" y="12.336">$100</tspan></text>
      </g>

    
      <defs>
        <filter id="filter0_d_0_1" x="184.049" y="169.049" width="54.5952" height="51.3538" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="1.5" dy="1.5"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_0_1"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_0_1" result="shape"/>
        </filter>
        <clipPath id="clip0_0_1">
          <rect width="28" height="9" fill="white" transform="translate(134 252)"/>
        </clipPath>
      </defs>
    </svg>

  );
}
export default ProcessDiagramMobile;
