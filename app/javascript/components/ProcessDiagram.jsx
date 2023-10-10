import _ from "lodash";
import * as React from "react"
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom'

const reportPositions = {
  1: { x: 0, y: 0, opacity: 0 },
  2: { x: -300, y: 0, opacity: 1},
  3: { x: -150, y: 70, opacity: 1},
  4: { x: 0, y: 0, opacity: 0 }
}

const cardPositions = {
  1: { x: 0, y: 0, opacity: 0 },
  2: { x: 0, y: 0, opacity: 0 },
  3: { x: 0, y: 0, opacity: 0 },
  4: { x: -145, y: -60, opacity: 1 }
}
const ProcessDiagram = (props) => {
  
  const { t } = useTranslation();
  const { locale } = useParams();
  const [step, setStep] = useState(1);

  useEffect(() => {
    _.delay(() => {
      setStep(step < 4 ? step + 1 : 1);
    }, 5000)
  }, [step]);

  return (
    <svg width="653" height="308" viewBox="0 0 653 308" fill="none">
      <g id="Process">
        <g id="step_1_caveat"  className="transition-opacity duration-500 delay-250" style={{ opacity: step === 1 ? 1 : 0 }}>
          <text fill="white" fillOpacity="0.8" fontFamily="Sohne" fontSize="18" letterSpacing="0em">
            
            {
              locale === "es" ? 
              <>
                <tspan x="210" y="117">* ¡Tienes derecho a solicitar una copia </tspan>
                <tspan x="210" y="132"> de tu informe! (incluso si se le acepta)</tspan>
              </> :
              <>
                <tspan x="210" y="117">* You have a right to request a copy of </tspan>
                <tspan x="210" y="132"> your report! (even if you are accepted)</tspan>
              </>
            }
          </text>
        </g>

        <g id="tenant_box" className="transition-opacity duration-500">
          <rect id="Rectangle 3" x="28.5" y="139.5" width="141" height="58" rx="4.5" fill="#F7C242" stroke="#F7C242"/>
          <text id="Tenant" fill="black" fontFamily="Sohne" fontSize="24" fontWeight="bold" letterSpacing="0em">
            {
              locale === "es" ? 
              <tspan x="67" y="174.754">Inquilino</tspan> :
              <tspan x="72" y="174.754">Tenant</tspan>
            }
          </text>
        </g>

        <g id="tss_box" className="transition-opacity duration-500">
          <rect id="Rectangle 5" x="462.5" y="138.5" width="183" height="59" rx="4.5" fill="#2C2E38" stroke="white"/>
          <text id="Tenant Screening Service" fill="white" fontFamily="Sohne" fontSize="24" fontWeight="bold" letterSpacing="0em">
            {
              locale === "es" ? 
              <>
                <tspan x="473" y="164.754">Servicio de selección</tspan>
                <tspan x="503" y="183.754">de inquilinos</tspan>
              </> :
              <>
                <tspan x="485" y="164.754">Tenant Screening</tspan>
                <tspan x="525" y="183.754">Service</tspan>
              </>
            }
          </text>
        </g>

        <g id="opentss_box" className="transition-opacity duration-500">
          <rect id="Rectangle 6" x="251.5" y="239.5" width="141" height="46" rx="4.5" fill="#2C2E38" stroke="white"/>
          <text id="OpenTSS" fill="white" fontFamily="Sohne" fontSize="24" fontWeight="bold" letterSpacing="0em">
            <tspan x="284" y="268">OpenTSS</tspan>
          </text>
        </g>

        <g id="step_1_arrow" className="transition-opacity duration-500" style={{ opacity: step === 1 ? 1 : 0 }}>
          <path d="M562 138L552.468 123.539L544.71 139.024L562 138ZM102.799 141.769C117.006 132.824 131.845 119.378 163.045 108.035C194.229 96.6971 241.741 87.5 320.859 87.5V84.5C241.527 84.5 193.639 93.7195 162.02 105.215C130.418 116.705 115.053 130.509 101.201 139.231L102.799 141.769ZM320.859 87.5C450.023 87.5 512.301 114.943 549.262 133.297L550.596 130.61C513.283 112.081 450.551 84.5 320.859 84.5V87.5Z" fill="#F9C40B"/>
        </g>

        <g id="step_2_arrow" className="transition-opacity duration-500" style={{ opacity: step === 2 ? 1 : 0 }}>
          <path d="M171 170L186 178.66V161.34L171 170ZM462.5 168.5H184.5V171.5H462.5V168.5Z" fill="#F9C40B"/>
        </g>
        
        <g id="step_3_arrow" className="transition-opacity duration-500" style={{ opacity: step === 3 ? 1 : 0 }}>
          <path d="M251 263L240.95 248.894L233.758 264.651L251 263ZM101.377 196.365L238.096 258.76L239.341 256.03L102.623 193.635L101.377 196.365Z" fill="#F9C40B"/>
        </g>


        <g id="step_4_arrow" className="transition-opacity duration-500" style={{ opacity: step === 4 ? 1 : 0 }}  >
          <path d="M102 195L112.05 209.106L119.242 193.349L102 195ZM113.659 201.97L250.377 264.365L251.623 261.635L114.904 199.24L113.659 201.97Z" fill="#F9C40B"/>
        </g>

        <g id="step_3_balloon" className="transition-opacity duration-500 delay-200" style={{ opacity: step === 3 ? 1 : 0 }} >
          <path id="Rectangle 7" d="M18 231.5H208C210.485 231.5 212.5 233.515 212.5 236V293C212.5 295.485 210.485 297.5 208 297.5H119.391H113H106.609H18C15.5147 297.5 13.5 295.485 13.5 293V236C13.5 233.515 15.5147 231.5 18 231.5Z" fill="white" stroke="white"/>
          <text id="Step 3. You donate your copy of tenant screening report to OpenTSS" fill="#2C2E38" fontFamily="Sohne" fontSize="18" letterSpacing="0em">
            {
              locale === "es" ? 
              <>
                <tspan x="22.0225" y="251.642">Paso 3. Usted dona su copia del </tspan>
                <tspan x="22.0225" y="269.642">informe de selección de  </tspan>
                <tspan x="22.0225" y="287.642">inquilinos a OpenTSS</tspan>
              </> :
              <>
                <tspan x="22.0225" y="251.642">Step 3. You donate your copy </tspan>
                <tspan x="22.0225" y="269.642">of tenant screening report to </tspan>
                <tspan x="22.0225" y="287.642">OpenTSS</tspan>
              </>
            }

             
          </text>
          <rect id="Rectangle 294" width="8.84682" height="8.84682" transform="matrix(0.600961 0.799278 -0.600961 0.799278 166.437 224)" fill="white"/>
        </g>
        
        <g id="step_4_balloon"  className="transition-opacity duration-500 delay-200" style={{ opacity: step === 4 ? 1 : 0 }} >
          <path id="Rectangle 7_2" d="M18 231.5H208C210.485 231.5 212.5 233.515 212.5 236V278C212.5 280.485 210.485 282.5 208 282.5H119.391H113H106.609H18C15.5147 282.5 13.5 280.485 13.5 278V236C13.5 233.515 15.5147 231.5 18 231.5Z" fill="white" stroke="white"/>
          <text id="Step 4. We email you the $100 gift card." fill="#2C2E38" fontFamily="Sohne" fontSize="18" letterSpacing="0em">
            {
                locale === "es" ? 
                <>
                  <tspan x="22.0225" y="251.642">Paso 4. Te enviamos por correo</tspan>
                  <tspan x="22.0225" y="269.642">electrónico la tarjeta regalo de 50$</tspan>  
                </> :
                <>
                  <tspan x="22.0225" y="251.642">Step 4. We email you the $100 </tspan>
                  <tspan x="22.0225" y="269.642">gift card.</tspan>  
                </>
              }
          </text>
          <rect id="Rectangle 294_2" width="8.84682" height="8.84682" transform="matrix(0.600961 0.799278 -0.600961 0.799278 166.437 224)" fill="white"/>
        </g>
        
        <g id="step_1_balloon"  className="transition-opacity duration-500 delay-200" style={{ opacity: step === 1 ? 1 : 0 }}>
          <path id="Rectangle 7_3" d="M194 9.5H450C452.485 9.5 454.5 11.5147 454.5 14V74C454.5 76.4853 452.485 78.5 450 78.5H330.5H322H313.5H194C191.515 78.5 189.5 76.4853 189.5 74V14C189.5 11.5147 191.515 9.5 194 9.5Z" fill="white" stroke="white"/>
          <g id="Step 1. (optional) You request a copy of your tenant screening report to the service">
            <text fill="#2C2E38" fontFamily="Sohne" fontSize="18" letterSpacing="0em">
              {
                locale === "es" ? 
                <>
                  <tspan x="202" y="31.642">Paso 1. (opcional) Usted solicita una copia </tspan>
                  <tspan x="202" y="49.642">de su informe de selección </tspan>
                  <tspan x="202" y="67.642">de inquilinos al servicio</tspan>
                </> :
                <>
                  <tspan x="202" y="31.642">Step 1. (optional) You request a copy</tspan>
                  <tspan x="202" y="49.642">of your tenant screening report to the </tspan>
                  <tspan x="202" y="67.642">service</tspan>
                </>
              }
            </text>
          </g>

          <rect id="Rectangle 294_3" x="322.071" y="72" width="10" height="10" transform="rotate(45 322.071 72)" fill="white"/>
        </g>
        
        <g id="step_2_balloon" className="transition-opacity duration-500 delay-200" style={{ opacity: step === 2 ? 1 : 0 }} >
          <path id="Rectangle 7_4" d="M194 111.5H450C452.485 111.5 454.5 113.515 454.5 116V159C454.5 161.485 452.485 163.5 450 163.5H330.5H322H313.5H194C191.515 163.5 189.5 161.485 189.5 159V116C189.5 113.515 191.515 111.5 194 111.5Z" fill="white" stroke="white"/>
          <text id="Step 2. The tenant screening service gives you the copy" fill="#2C2E38" fontFamily="Sohne" fontSize="18" letterSpacing="0em">
            {
              locale === "es" ? 
              <>
                <tspan x="202" y="131.642">Paso 2. (opcional) El servicio de selección</tspan>
                <tspan x="202" y="149.642">de inquilinos le proporciona la copia</tspan>
              </> :
              <>
                <tspan x="202" y="131.642">Step 2. (optional) The tenant screening</tspan>
                <tspan x="202" y="149.642">service gives you the copy</tspan>
              </>
            }
          </text>
          <rect id="Rectangle 294_4" x="322.071" y="157" width="10" height="10" transform="rotate(45 322.071 157)" fill="white"/>
        </g>
        
        <g id="report_icon" filter="url(#filter0_d_407_76)" className="transition-transform duration-2000" style={{ 
          opacity: reportPositions[step].opacity, 
          transform: step !== 1 ? `translate(${reportPositions[step].x}px, ${reportPositions[step].y}px)` : "none" }} >
          <rect id="Rectangle 295" x="431" y="125.292" width="52" height="59" rx="2" transform="rotate(-1.42402 431 125.292)" fill="white"/>
          <text id="Report" transform="translate(435.123 130.191) rotate(-1.42402)" fill="#2C2E38" fontFamily="Sohne" fontSize="16" letterSpacing="0em"><tspan x="0" y="13.739">{ t("Report") }</tspan></text>
        </g>
        
        <g id="gift_card_icon" filter="url(#filter1_d_407_76)"  className="transition-transform duration-2000" 
        
          
        style={{ 
          opacity: cardPositions[step].opacity, 
          transform: step === 4 ? `translate(${cardPositions[step].x}px, ${cardPositions[step].y}px)` : "none" 
        
        }}
        
         >
          <rect id="Rectangle 296" x="218.5" y="246.5" width="54" height="30" rx="4.5" fill="#2C2E38" stroke="white"/>
          <g id="Visa_Inc._logo 1" clipPath="url(#clip0_407_76)">
            <g id="g4158">
              <path id="polygon9" d="M253.133 272.87L250.865 272.87L252.284 264.158L254.552 264.158L253.133 272.87Z" fill="white"/>
              <path id="path11" d="M261.356 264.371C260.908 264.195 260.199 264 259.321 264C257.081 264 255.504 265.186 255.494 266.882C255.476 268.134 256.624 268.829 257.482 269.246C258.36 269.672 258.658 269.951 258.658 270.331C258.649 270.914 257.949 271.183 257.296 271.183C256.39 271.183 255.905 271.045 255.168 270.72L254.869 270.581L254.552 272.536C255.084 272.777 256.064 272.991 257.081 273C259.461 273 261.011 271.832 261.029 270.025C261.038 269.033 260.432 268.273 259.125 267.652C258.332 267.253 257.846 266.985 257.846 266.577C257.855 266.206 258.257 265.826 259.153 265.826C259.89 265.808 260.432 265.984 260.842 266.16L261.047 266.252L261.356 264.371Z" fill="white"/>
              <path id="path13" d="M264.37 269.784C264.557 269.283 265.276 267.346 265.276 267.346C265.266 267.365 265.462 266.837 265.574 266.512L265.733 267.263C265.733 267.263 266.162 269.348 266.255 269.784C265.901 269.784 264.818 269.784 264.37 269.784ZM267.17 264.158L265.415 264.158C264.874 264.158 264.463 264.316 264.23 264.881L260.861 272.87L263.241 272.87C263.241 272.87 263.633 271.795 263.717 271.563C263.978 271.563 266.293 271.563 266.629 271.563C266.694 271.869 266.9 272.87 266.9 272.87L269 272.87L267.17 264.158Z" fill="white"/>
              <path id="path15" d="M248.971 264.158L246.749 270.099L246.507 268.894C246.096 267.504 244.808 265.993 243.371 265.242L245.405 272.861L247.804 272.861L251.369 264.158L248.971 264.158Z" fill="white"/>
              <path id="path17" d="M244.687 264.158L241.037 264.158L241 264.334C243.847 265.057 245.732 266.8 246.507 268.895L245.713 264.891C245.583 264.334 245.181 264.177 244.687 264.158Z" fill="white"/>
            </g>

          </g>
          <text id="$100" transform="translate(222 248)" fill="white" fontFamily="Sohne" fontSize="14" letterSpacing="0em"><tspan x="0" y="12.336">$100</tspan></text>
        </g>

      </g>
      <defs>
        <filter id="filter0_d_407_76" x="431.049" y="124.049" width="54.8516" height="61.6758" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dx="1.5" dy="1.5"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_407_76"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_407_76" result="shape"/>
        </filter>
        <filter id="filter1_d_407_76" x="218" y="246" width="56.5" height="32.5" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dx="1.5" dy="1.5"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_407_76"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_407_76" result="shape"/>
        </filter>
        <clipPath id="clip0_407_76">
        <rect width="28" height="9" fill="white" transform="translate(241 264)"/>
        </clipPath>
      </defs>
    </svg>  
  );
}
export default ProcessDiagram;
