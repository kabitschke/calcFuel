"use client";

import { useState } from "react";

export default function Page() {
  const [dist, setDist] = useState<string>("");
  const [cons, setCons] = useState<string>("");
  const [prec, setPrec] = useState<string>("");
  const [resultado, setResultado] = useState<string>("");
  const [showResult, setShowResult] = useState<boolean>(false);
  const [consumo, setConsumo] = useState("");

  const handleCalc = () => {
    const distNum = parseFloat(dist);
    const consNum = parseFloat(cons);
    const precNum = parseFloat(prec);

    if (distNum > 0 && consNum > 0 && precNum > 0) {
      const calc = (distNum / consNum) * precNum;
      const consumo = distNum / consNum;
      const resultadoFormatado = calc.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      const resultadoConsumo = consumo.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

      setShowResult(true);
      setResultado(resultadoFormatado);
      setConsumo(resultadoConsumo);
    }
  };

  const handleReset = () => {
    setShowResult(false);
    setResultado("");
    setDist("");
    setCons("");
    setPrec("");
  };

  const handleInput = (value: string, setter: (val: string) => void) => {
    // Permitir apenas números, ponto ou vírgula
    const regex = /^[0-9]*[.,]?[0-9]*$/;
    if (regex.test(value)) {
      setter(value);
    }
  };

  return (
    <div className="container mx-auto mt-4 flex justify-center items-center text-gray-950">
    <div className="flex flex-col max-w-4xl bg-gray-400 h-auto p-4 rounded-md">
      <h1 className=" mt-4 text-xl font-semibold text-gray-800">Calculadora de combustível</h1>
  
      <div className="flex flex-col lg:flex-row lg:justify-between mt-5 space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="w-full lg:w-auto">
          <label htmlFor="dist" className=" text-sm block">
            Distância percorrida
          </label>
          <div className="flex">
            <input
              type="text"
              id="dist"
              className="rounded-l p-1  w-full lg:w-auto bg-gray-100 border border-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-gray-600"
              placeholder="0"
              value={dist}
              onChange={(e) => handleInput(e.target.value, setDist)}
              disabled={showResult}
            />
            <span className=" p-2 bg-gray-500 rounded-r flex-shrink-0">km</span>
          </div>
        </div>
  
        <div className="w-full lg:w-auto">
          <label htmlFor="cons" className=" text-sm block">
            Consumo médio do veículo
          </label>
          <div className="flex">
            <input
              type="text"
              id="cons"
              className="rounded-l p-1  w-full lg:w-auto bg-gray-100 border border-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-gray-600"
              placeholder="0"
              value={cons}
              onChange={(e) => handleInput(e.target.value, setCons)}
              disabled={showResult}
            />
            <span className=" p-2 bg-gray-500 rounded-r flex-shrink-0">km / ℓ</span>
          </div>
        </div>
  
        <div className="w-full lg:w-auto">
          <label htmlFor="prec" className=" text-sm block">
            Preço por litro
          </label>
          <div className="flex">
            <input
              type="text"
              id="prec"
              className="rounded-l p-1  w-full lg:w-auto bg-gray-100 border border-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-gray-600"
              placeholder="0,00"
              value={prec}
              onChange={(e) => handleInput(e.target.value, setPrec)}
              disabled={showResult}
            />
            <span className=" p-2 bg-gray-500 rounded-r flex-shrink-0">por ℓ</span>
          </div>
        </div>
      </div>
  
      {!showResult && (
        <div className="flex justify-end mt-8">
          <div
            className=" bg-gray-500 hover:bg-slate-600 px-4 py-2 rounded-md cursor-pointer"
            onClick={handleCalc}
          >
            Calcular
          </div>
        </div>
      )}
  
      {showResult && (
        <div className="flex flex-col">
          <h1 className="mt-8 text-xl font-semibold text-gray-800">Resultado:</h1>
          <div className=" mt-8">
            <div>
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-200 text-gray-600">
                    <th className="py-2 px-4 border-b">KM</th>
                    <th className="py-2 px-4 border-b">Consumo (ℓ)</th>
                    <th className="py-2 px-4 border-b">Preço</th>
                  </tr>
                </thead>
                <tbody className="">
                  <tr className="bg-gray-100 text-center border-2 border-gray-300">
                    <td className="py-2 px-4 border-2 border-gray-300">{dist} km</td>
                    <td className="py-2 px-4 border-2 border-gray-300">{consumo} ℓ</td>
                    <td className="py-2 px-4 border-2 border-gray-300">{`R$ ${resultado}`}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
  
          <div className="flex justify-end">
            <div
              className=" bg-gray-500 hover:bg-gray-600 px-4 py-2 rounded-md cursor-pointer mt-8"
              onClick={handleReset}
            >
              Fazer novo cálculo
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
  

  );
}
