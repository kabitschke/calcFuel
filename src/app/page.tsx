"use client"

import { useState } from "react";

export default function Page () {

  const [dist, setDist] = useState<number>(0);
  const [cons, setCons] = useState<number>(0);
  const [prec, setPrec] = useState<number>(0);
  const [resultado, setResultado] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);

  const handleCalc = () => {
    if (dist > 0 && cons > 0 && prec > 0) {
      const calc = (dist / cons) * prec;
      setShowResult(true);
      setResultado(calc);
    } 
  }
  
  const handleReset = () => {
    setShowResult(false);
    setResultado(0);
    setDist(0);
    setCons(0);
    setPrec(0);
    
  }



  return(
      <div className="container mx-auto  mt-4 flex justify-center items-center">
        <div className="flex flex-col   max-w-4xl bg-[#222] h-80 p-4 rounded-md">
          <h1 className="text-white mt-4">Cálculo do Combustível</h1>


          <div className="flex justify-between  mt-5">

                <div>
                  <label htmlFor="dist" className="text-white text-sm">Distância percorrida</label>
                  <input type="text" id="dist" className="rounded-l p-1" placeholder="0" value={dist} 
                  onChange={e => {const value = e.target.value;
                    if (!isNaN(Number(value)) && value.trim() !== "") {setDist(Number(value));}}}/>
                  <span className="text-white p-2 bg-[#444] rounded-r">km</span>
                </div>

                <div>
                  <label htmlFor="cons" className="text-white text-sm">Consumo médio do veículo</label>
                  <input type="text" id="cons" className="rounded-l p-1" placeholder="0"  value={cons} 
                    onChange={e => {const value = e.target.value;
                    if (!isNaN(Number(value)) && value.trim() !== "") {setCons(Number(value));}}}/>
                  <span className="text-white p-2 bg-[#444] rounded-r">km / ℓ</span>                
                </div>

                <div>
                    <label htmlFor="prec" className="text-white text-sm">Preço por litro</label>
                    <input type="text" id="prec" className="rounded-l p-1" placeholder="0"  value={prec} 
                    onChange={e => {const value = e.target.value;
                      if (!isNaN(Number(value)) && value.trim() !== "") {setPrec(Number(value));}}}/>
                    <span className="text-white p-2 bg-[#444] rounded-r">por ℓ</span> 
                </div>
              

               

          </div>

          {
              !showResult &&
            <div className="flex justify-end mt-8">
              <div className="text-white bg-[#333] hover:bg-[#111] px-4 py-2 rounded-md cursor-pointer" onClick={handleCalc}>
                Calcular
              </div>
            </div>
          }

          {
            showResult &&
            <div className="flex justify-between">
              <div className="text-white bg-black p-4 rounded-md mt-8">{resultado}</div>

              <div className="text-white bg-[#333] hover:bg-[#111] px-4 py-2 rounded-md cursor-pointer mt-8" onClick={handleReset}>
                Limpar
              </div>

            </div>

          }

        

       
   
          
        </div>  

      </div>
  );
}