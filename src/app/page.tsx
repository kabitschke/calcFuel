"use client";


import { Header } from "@/components/header";
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

  const [alcool, setAlcool] = useState("");
  const [gasolina, setGasolina] = useState("");
  const [resultFuel, setResultFuel] = useState("");
  const [active, setActive] = useState(false);

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

  const handleCalcFuel = () => {
    const alcoolNum = parseFloat(alcool);
    const gasolinaNum = parseFloat(gasolina);

    if(alcoolNum > 0 && gasolinaNum >0){
      const calc = (alcoolNum / gasolinaNum);
      const resultFormatado = parseFloat(calc.toFixed(2));
      
      const res = resultFormatado <= 0.70;
     

      alert(res);

    }

  }

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
    <>

      <Header/>

    <div className="container mx-auto  flex flex-col items-center text-gray-950 ">
      <div className="flex justify-start w-full mt-8 px-4">
        <h1 className="font-medium text-gray-800 text-xl p-8 bg-slate-300 rounded-md">
        Calcule facilmente o custo do combustível da sua viagem com nossa<br/> calculadora prática e otimizada!
        </h1>
      </div>
    
      <div className="flex flex-col max-w-4xl bg-gray-400 h-auto p-4 rounded-md mt-10">
        <div className=" mt-4 text-xl font-semibold text-gray-800">Calculadora de combustível</div>
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

      <div className="flex flex-col max-w-4xl bg-gray-400 h-auto p-4 rounded-md mt-10">
        <div className=" mt-4 text-xl font-semibold text-gray-800">Álcool ou Gasolina</div>
        <div className="flex flex-col lg:flex-row lg:justify-between mt-5 space-y-4 lg:space-y-0 lg:space-x-4">

        <Input
            disabled={active}
            label="Preço do Álcool"
            id="alcool"
            placeholder="0"
            value={alcool}
            state={setAlcool}
            span="AL"
            onChange={handleInput}
          />

          <Input
            disabled={active}
            label="Preço da Gasolina"
            id="gasolina"
            placeholder="0"
            value={gasolina}
            state={setGasolina}
            span="GS"
            onChange={handleInput}
          />


          </div>       

              {
          !active && (
            <div className="flex justify-end mt-8">
              <div
                className=" bg-gray-500 hover:bg-slate-600 px-4 py-2 rounded-md cursor-pointer"
                onClick={handleCalcFuel}
              >
                Calcular
              </div>
            </div>
          )
        }   
       </div>

          
         



        <div className="flex flex-col  text-gray-800 max-w-4xl">
          <h2 className=" mt-20 text-xl font-semibold mb-4">Planejamento de Combustível: Saiba Quanto Você Vai Gastar e Como Economizar</h2>

          <p className="text-base">
          O planejamento de combustível é essencial para quem deseja otimizar seus gastos e 
          tornar suas viagens mais econômicas. Com o aumento constante dos preços dos combustíveis,
           entender quanto você vai gastar e adotar estratégias para economizar se tornou uma necessidade.
          </p>

          <h2 className=" mt-4 text-xl font-semibold mb-4">Calcule Seus Gastos</h2>

          <p>
          Para saber exatamente quanto você vai gastar em combustível, siga estas etapas simples:
          </p>

          <ul className="list-decimal mt-4">
            <li><span className="font-semibold">Distância da Viagem:</span>  Determine a distância total que você pretende percorrer.</li>
            <li><span className="font-semibold">Consumo do Veículo: </span> Verifique quantos quilômetros seu carro faz por litro de combustível.</li>
            <li><span className="font-semibold">Preço do Combustível:</span> Confira o preço atual do combustível em sua região.</li>
          </ul>

          <h2 className=" mt-4 text-xl font-semibold mb-4">Como calcular o custo do combustível para uma viagem</h2>

          <p>você precisa da distância total, do consumo do veículo (em km/l) e do preço do combustível por litro. O cálculo é:</p>


          <ul className="list-decimal mt-4">
            <li>Distância total (km) ÷ Consumo (km/l) = Litros necessários.</li>
            <li>Litros necessários × Preço do combustível (R$/l) = Custo total.</li>
          </ul>

          <h2 className="mt-4 text-xl font-semibold mb-4">Dicas para Economizar Combustível</h2>

          <ul className="list-decimal mt-4">
            <li className=""><span className="font-semibold">Mantenha o Veículo em Dia:</span> Realize manutenções regulares, como troca de óleo e verificação de pneus. Um veículo bem cuidado consome menos combustível.</li>
            <li className="mt-4"><span className="font-semibold">Dirija de Forma Eficiente:</span> Evite acelerações bruscas e mantenha uma velocidade constante. Isso reduz o consumo e aumenta a eficiência do combustível.</li>
            <li className="mt-4"><span className="font-semibold">Planeje suas Rotas:</span> Utilize aplicativos de navegação que ajudem a evitar congestionamentos e busquem as rotas mais curtas.</li>
            <li className="mt-4"><span className="font-semibold">Reduza o Peso:</span> Remova itens desnecessários do carro. Quanto mais leve o veículo, menor será o consumo de combustível.</li>
            <li className="mt-4"><span className="font-semibold">Evite o Ar Condicionado:</span> O uso do ar condicionado pode aumentar o consumo de combustível. Sempre que possível, utilize a ventilação natural.</li>
            <li className="mt-4"><span className="font-semibold">Carona e Compartilhamento: </span> Considere dividir a viagem com outras pessoas. Além de economizar, você reduz a quantidade de carros nas ruas.</li>
          </ul>

          <p className="mt-4">Com um bom planejamento e algumas mudanças de hábito, é possível controlar
            seus gastos com combustível e ainda contribuir para um trânsito mais sustentável. 
            Portanto, faça suas contas, adote as dicas e aproveite suas viagens com mais tranquilidade!</p>


        </div>
        
    </div>

    <footer className="bg-slate-300  w-full text-center p-4 text-gray-800 mt-20">
          mkweb ©2024 
    </footer>

    </>


  );
}
