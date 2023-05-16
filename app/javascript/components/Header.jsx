import React from 'react'
import { store } from '../providers/TSSProvider';
import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'

const useOutsideClick = (callback) => {
  const ref = React.useRef();

  React.useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [ref]);

  return ref;
};


export default function Header(props) {
  const navigate = useNavigate();
  const { menuOpen, setMenuOpen, resetSubmission, headerMode } = useContext(store)
  const { bg } = props;
  
  useEffect(() => {
    function onKeyDown(){
      setMenuOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };

  }, []);

  const handleClickOutside = () => {
    setMenuOpen(false);
  };
  
  const ref = useOutsideClick(handleClickOutside);
  
  return (
    <>
      {
        menuOpen ? 
        <header ref={ref} className={`${bg === 'bright' ? 'bg-white-bg' : (bg === 'black' ? 'bg-black' : 'bg-dark-blue-bg')} top-0 py-4 fixed w-full z-50`}>
          <div className="container mx-auto px-5">
            <div className="grid gap-2 grid-cols-2 lg:grid-cols-6 lg:gap-5">
              <Link to="/" className="lg:col-span-5">
                <h1 className="font-normal">
                  OpenTSS<span className="hidden lg:inline">: Countering Tenant Screening</span>
                </h1>
              </Link>
              
              <div className="flex flex-row-reverse">
                <button onClick={() => { setMenuOpen(!menuOpen); }}>
                  {
                    menuOpen ? "Close" : "Menu"
                  } 
                </button>
              </div>

              <div className="col-span-2 lg:col-span-3">
                <Link to="/how-tss-works" className="text-lg">
                  How <span className="font-bold">tenant screening service works</span>
                </Link>
                <div className="indent-3">
                  <Link to="/companies" className="text-m ">
                    Tenant screening services lookup tool
                  </Link>
                </div>
                
                <div className="mt-5">
                  <Link to="/request-copy" className="text-lg leading-none">
                    Request a copy of your <br/>
                    <span className="font-bold">tenant screening report</span>
                  </Link>
                </div>

                <div className="mt-5">
                  <Link to="/submissions" className="text-lg leading-none">
                    Submit your <span className="font-bold">tenant screening report</span> <br/>
                    for research
                  </Link>
                </div>
                

              </div>
              <div className="col-span-2 lg:col-span-3">
                <div>     
                  <Link to="/submissions/retrieve" className="text-sm">
                    Retrieve your submission
                  </Link><br/>
                  <Link to="/about" className="text-sm">
                    About this project
                  </Link>
                </div>
                <div className="text-sm pt-4">
                  If you have any questions for this project, <br/>
                  please email us at <a className="underline" href="mailto:contact@opentss.net">contact@opentss.net</a>
                </div>
                

              </div>
            </div>
          </div>

        </header>
        :
        <header className={`${bg === 'bright' ? 'bg-white-bg' : (bg === 'black' ? 'bg-black' : 'bg-dark-blue-bg')} top-0 py-4 fixed w-full z-50`}>
          <div className="container mx-auto px-5">
            <div className="grid gap-2 grid-cols-2 lg:grid-cols-6 lg:gap-5">
            
              <h1 className="font-normal cursor-pointer" onClick={() => {
                if (headerMode === "focus") {
                  if (confirm("Leaving this page will lose the input you entered. Do you want to continue?")) {
                    resetSubmission();
                    navigate("/");
                  }
                } else {

                  navigate("/");
                }
              }}>
                OpenTSS
              </h1>
              {
                headerMode === "focus" ?
                <>
                  <div className="hidden lg:block lg:col-span-3">

                  </div>
                </> : 
                <>
                  <Link to="/how-tss-works" className="hidden lg:block">
                    How TSS works
                  </Link>

                  <Link to="/companies" className="hidden lg:block">
                    Company Lookup 
                  </Link>


                  <Link to="/request-copy" className="hidden lg:block">
                    Request a copy
                  </Link>

                  <Link to="/submissions" className="hidden lg:block">
                    Submit your report
                  </Link>
                </>
              }
              
              <div className="flex flex-row-reverse">
                {
                  headerMode === "focus" ?
                  null : 

                  <button onClick={() => { setMenuOpen(!menuOpen); }}>
                    {
                      menuOpen ? "Close" : "Menu"
                    } 
                  </button>
                }
              </div>
            </div>
          </div>
        </header>
      }
      
      <div className="h-20">

      </div>
    </>

  )
}
