import { faGasPump, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div className="bg-blue-600 w-full p-4 text-white">
        <div className="container flex justify-between items-center mx-auto">
          <div className="hidden md:block">
            <FontAwesomeIcon icon={faGasPump} className="size-6" />
          </div>

          <div className="text-2xl font-medium">Cálculo de combustível</div>

          <nav>
            <ul>
              <div className={`sm:hidden cursor-pointer`} onClick={() => setShowMenu(!showMenu)}>
                {showMenu ? (
                  <FontAwesomeIcon icon={faXmark} className="size-6" />
                ) : (
                  <FontAwesomeIcon icon={faBars} className="size-6" />
                )}
              </div>

              <div className="hidden sm:flex sm:gap-4">
                <ul className="flex gap-4">
                  <li><a href="#home" className="hover:text-blue-300 hover:border-b-blue-300 hover:border-b">Home</a></li>
                  <li><a href="#calc1" className="hover:text-blue-300 hover:border-b-blue-300 hover:border-b">Calculadora</a></li>
                  <li><a href="#calc2" className="hover:text-blue-300 hover:border-b-blue-300 hover:border-b">Álcool/Gasolina</a></li>
                </ul>
              </div>

            </ul>
          </nav>
        </div>
      </div>

   
      {showMenu && (
        <div className="lg:hidden md:hidden bg-blue-600 p-4 rounded-md mt-1 text-white  mx-1">
          <ul>
            <li className="border-b border-b-blue-500">
              <a href="#home" className="hover:text-blue-300">Home</a>
            </li>
            <li className="border-b border-b-blue-500">
              <a href="#calc1" className="hover:text-blue-300">Calculadora</a>
            </li>
            <li className="border-b border-b-blue-500">
              <a href="#calc2" className="hover:text-blue-300">Álcool/Gasolina</a>
            </li>
          </ul>
        </div>
      )}

   
     
    </>
  );
}
