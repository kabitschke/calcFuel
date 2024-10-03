"use client";

import { Input } from "@/components/input";
import { Result } from "@/components/result";
import { useState } from "react";

export default function Page() {
  const [dist, setDist] = useState("");
  const [cons, setCons] = useState("");
  const [prec, setPrec] = useState("");
  const [consumo, setConsumo] = useState("");
  const [resultado, setResultado] = useState("");
  const [showResult, setShowResult] = useState(false);

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

  const handleInput = (value: string, setter: (val: string) => void) => {
    // Permitir apenas números, ponto ou vírgula
    const regex = /^[0-9]*[.,]?[0-9]*$/;
    if (regex.test(value)) {
      setter(value);
    }
  };

  const handleReset = () => {
    setShowResult(false);
    setResultado("");
    setDist("");
    setCons("");
    setPrec("");
  };



  return (
    <div className="container mx-auto mt-4 flex justify-center items-center text-gray-950">
      <div className="flex flex-col max-w-4xl bg-gray-400 h-auto p-4 rounded-md">
        <h1 className=" mt-4 text-xl font-semibold text-gray-800">Calculadora de combustível</h1>
        <div className="flex flex-col lg:flex-row lg:justify-between mt-5 space-y-4 lg:space-y-0 lg:space-x-4">

          <Input
            disabled={showResult}
            label="Distância percorrida"
            id="dist"
            placeholder="0"
            value={dist}
            state={setDist}
            span="km"
            onChange={handleInput}
          />

          <Input
            disabled={showResult}
            label="Consumo médio do veículo"
            id="cons"
            placeholder="0"
            value={cons}
            state={setCons}
            span="km / ℓ"
            onChange={handleInput}
          />

          <Input
            disabled={showResult}
            label="Preço por litro"
            id="prec"
            placeholder="0,00"
            value={prec}
            state={setPrec}
            span="por ℓ"
            onChange={handleInput}
          />

        </div>


        {
          !showResult && (
            <div className="flex justify-end mt-8">
              <div
                className=" bg-gray-500 hover:bg-slate-600 px-4 py-2 rounded-md cursor-pointer"
                onClick={handleCalc}
              >
                Calcular
              </div>
            </div>
          )
        }

        {
          showResult &&
          <Result
            consumo={consumo}
            dist={dist}
            resultado={resultado}
            handleReset={handleReset}
          />
        }

      </div>
    </div>


  );
}
