"use client";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { Result } from "@/components/result";
import { faArrowAltCircleUp, faGasPump } from "@fortawesome/free-solid-svg-icons";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons/faArrowUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function Page() {
  const [dist, setDist] = useState("");
  const [cons, setCons] = useState("");
  const [prec, setPrec] = useState("");
  const [consumo, setConsumo] = useState("");
  const [resultado, setResultado] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [showBtn, setShowBtn] = useState(false);

  const [alcool, setAlcool] = useState("");
  const [gasolina, setGasolina] = useState("");
  const [resultFuel, setResultFuel] = useState<boolean | null>(null);
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

    if (alcoolNum > 0 && gasolinaNum > 0) {
      const calc = (alcoolNum / gasolinaNum);
      const res = calc < 0.7;
      setResultFuel(res);
      setActive(true);
    }

  }

  const handleResetFuel = () => {
    setActive(false);
    setResultFuel(null);
    setAlcool("");
    setGasolina("");
  }

  const handleInput = (value: string, setter: (val: string) => void) => {
    // Permitir apenas números, ponto ou vírgula
    const regex = /^[0-9]*[.,]?[0-9]*$/;
    if (regex.test(value)) {
      const numberValue = value.replace(',', '.');
      setter(numberValue);
    }
  };



  const handleReset = () => {
    setShowResult(false);
    setResultado("");
    setDist("");
    setCons("");
    setPrec("");
  };


    useEffect(() => {
      const scrollFunction = () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
          setShowBtn(true);
        } else {
          setShowBtn(false);
        }
      };
  
      window.addEventListener('scroll', scrollFunction);
      return () => window.removeEventListener('scroll', scrollFunction);
    }, []);    

const topFunction = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' 
  });
}

return (
    <>
      <header>

        <Header />
      </header>

      <main className="container mx-auto  flex flex-col items-center text-gray-950 " id="home">
        <div className="flex justify-start w-full mt-8 px-4">
          <h1 className="font-medium text-white italic text-xl p-8 bg-blue-600 rounded-md shadow-lg">
            Calcule facilmente o custo do combustível da sua viagem com nossa<br /> calculadora prática e otimizada!
          </h1>
        </div>

     { showBtn &&

          <div className="w-10 h-10 bg-blue-600 rounded-full text-white flex justify-center items-center cursor-pointer shadow-sm shadow-gray-600 fixed right-4 bottom-10"
          onClick={topFunction}>
              <FontAwesomeIcon icon={faArrowUp} className="animate-bounce"/>
          </div>

     }

        

     

        <section className="flex flex-col  text-gray-800 max-w-4xl mt-8 p-2">

          <article>
            <h2 className="mt-4 text-xl font-semibold mb-4 text-blue-600">Como calcular o custo do combustível para uma viagem</h2>

            <p>Você precisa da distância total, do consumo do veículo (em km/l) e do preço do combustível por litro. O cálculo é:</p>



            <ul className=" mt-4">
              <li>Distância total (km) ÷ Consumo (km/l) = Litros necessários.</li>
              <li className="mt-4">Litros necessários × Preço do combustível (R$/l) = Custo total.</li>
            </ul>

          </article>

          <h2 className=" mt-4 text-xl font-semibold mb-4 text-blue-600">Calcule Seus Gastos</h2>

          <p>
            Para saber exatamente quanto você vai gastar em combustível, siga estas etapas simples:
          </p>

          <ul className=" mt-4">
            <li className="mt-4"><span className="font-semibold text-blue-600">Distância da Viagem:</span>  Determine a distância total que você pretende percorrer.</li>
            <li className="mt-4"><span className="font-semibold text-blue-600">Consumo do Veículo: </span> Verifique quantos quilômetros seu carro faz por litro de combustível.</li>
            <li className="mt-4"><span className="font-semibold text-blue-600">Preço do Combustível:</span> Confira o preço atual do combustível em sua região.</li>
          </ul>

        </section>

        <div className="flex flex-col max-w-4xl bg-blue-400 h-auto p-4 rounded-md mt-10 shadow-lg border border-blue-600" id="calc1">
          <div className=" mt-4 text-xl font-semibold text-white">Calculadora de combustível</div>
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
              <div className="flex justify-end mt-8 text-white">
                <div
                  className=" bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md cursor-pointer"
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

        <section className="flex flex-col  text-gray-800 max-w-4xl mt-8 p-2">

          <h2 className=" mt-4 text-xl font-semibold mb-4 text-blue-600">Álcool ou Gasolina Descubra a Melhor Opção</h2>

          <p>
            Bem-vindo à nossa calculadora de combustíveis! Sabemos que escolher entre abastecer com álcool ou gasolina pode ser um desafio,
            especialmente com as constantes variações de preços. Nossa ferramenta foi
            desenvolvida para ajudar você a tomar decisões mais informadas e econômicas.
          </p>

          <p>
            Com apenas alguns dados, nossa calculadora analisa a relação entre o preço do álcool e da gasolina,
            oferecendo uma recomendação clara sobre qual combustível oferece o melhor custo-benefício para o seu carro.
          </p>

          <h2>Como Funciona?</h2>

          <ul className=" mt-4">
            <li className="mt-4"><span className="font-semibold text-blue-600">Insira os Preços:</span> Digite o preço do litro do álcool e o preço do litro da gasolina.</li>
            <li className="mt-4"><span className="font-semibold text-blue-600">Calcule:</span> A calculadora fará o trabalho pesado, comparando os valores.</li>
            <li className="mt-4"><span className="font-semibold text-blue-600">Receba a Recomendação:</span> Descubra rapidamente qual combustível é a escolha mais vantajosa para o seu bolso.</li>
          </ul>

          <p>
            Lembre-se: a relação ideal para abastecer com álcool é quando o preço do litro é menor que 70%
            do preço da gasolina. Utilize nossa ferramenta sempre que for abastecer e aproveite para economizar em cada tanque cheio!
          </p>

        </section>

        <div className="flex flex-col max-w-4xl bg-blue-400 h-auto p-4 rounded-md mt-10 shadow-lg border border-blue-600" id="calc2">
          <div className=" mt-4 text-xl font-semibold text-white">Álcool ou Gasolina</div>
          <div className="flex flex-col lg:flex-row lg:justify-between mt-5 space-y-4 lg:space-y-0 lg:space-x-4">

            <Input
              disabled={active}
              label="Preço do Álcool"
              id="alcool"
              placeholder="4,20"
              value={alcool}
              state={setAlcool}
              icon={faGasPump}
              onChange={handleInput}
            />

            <Input
              disabled={active}
              label="Preço da Gasolina"
              id="gasolina"
              placeholder="5,98"
              value={gasolina}
              state={setGasolina}
              icon={faGasPump}
              onChange={handleInput}
            />


          </div>

          {
            !active && (
              <div className="flex justify-end mt-8 text-white">
                <div
                  className=" bg-blue-500 hover:bg-blue-600  py-2 px-4 rounded-md cursor-pointer"
                  onClick={handleCalcFuel}
                >
                  Calcular
                </div>
              </div>
            )
          }

          {
            active &&

            <div className="flex flex-col">
              <div className={`p-4 border mt-4 font-light rounded-md ${resultFuel ? 'bg-blue-200 border-blue-500' : 'bg-orange-200 border-orange-500'}`}>
                {resultFuel ? 'Vale a pena abastecer com Álcool' : 'Vale a pena abastecer com Gasolina'}
              </div>

              <div className="flex justify-end">
                <div
                  className=" bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer mt-8 "
                  onClick={handleResetFuel}
                >
                  Fazer novo cálculo
                </div>

              </div>



            </div>
          }
        </div>






        <section className="flex flex-col  text-gray-800 max-w-4xl p-2">

          <h2 className=" mt-20 text-xl font-semibold mb-4 text-blue-600">Gasolina vs. Álcool:</h2>

          <p className="text-base mb-4">
            A escolha entre gasolina e álcool como combustível para veículos é uma decisão importante para muitos motoristas. Embora a gasolina geralmente ofereça uma quilometragem superior em comparação ao álcool, o preço desempenha um papel crucial na viabilidade econômica de cada opção.
          </p>

          <p className="text-base mb-4">
            Em termos de desempenho, a gasolina tende a proporcionar uma autonomia maior. No entanto, o álcool, especialmente o etanol, tem se mostrado uma alternativa interessante, principalmente quando se considera o custo. Se o preço do álcool estiver abaixo de 70% do preço da gasolina, ele se torna uma opção financeiramente vantajosa.
          </p>

          <p className="text-base mb-4">
            Por exemplo, <span className="bg-blue-200 font-semibold">se a gasolina custa R$ 5,00 por litro, o álcool precisaria estar abaixo de R$ 3,50 para ser considerado mais econômico.</span>  Essa diferença de preço pode compensar a menor quilometragem, tornando o abastecimento com álcool uma escolha inteligente. Além disso, o etanol é uma fonte de energia renovável, o que contribui para a sustentabilidade ambiental.

          </p>

          <p className="text-base mb-4">
            Portanto, ao decidir entre gasolina e álcool, é essencial considerar não apenas a eficiência em quilometragem, mas também o preço por litro. Quando o etanol está em um patamar favorável, ele pode oferecer uma solução econômica e ecologicamente correta para os motoristas.
          </p>








          <h2 className=" mt-14 text-xl font-semibold mb-4 text-blue-600">Planejamento de Combustível: Saiba Quanto Você Vai Gastar e Como Economizar</h2>

          <p className="text-base">
            O planejamento de combustível é essencial para quem deseja otimizar seus gastos e
            tornar suas viagens mais econômicas. Com o aumento constante dos preços dos combustíveis,
            entender quanto você vai gastar e adotar estratégias para economizar se tornou uma necessidade.
          </p>



          <h2 className="mt-4 text-xl font-semibold mb-4 text-blue-600">Dicas para Economizar Combustível</h2>

          <ul className="mt-4">
            <li className=""><span className="font-semibold text-blue-600">Mantenha o Veículo em Dia:</span> Realize manutenções regulares, como troca de óleo e verificação de pneus. Um veículo bem cuidado consome menos combustível.</li>
            <li className="mt-4"><span className="font-semibold text-blue-600">Dirija de Forma Eficiente:</span> Evite acelerações bruscas e mantenha uma velocidade constante. Isso reduz o consumo e aumenta a eficiência do combustível.</li>
            <li className="mt-4"><span className="font-semibold text-blue-600">Planeje suas Rotas:</span> Utilize aplicativos de navegação que ajudem a evitar congestionamentos e busquem as rotas mais curtas.</li>
            <li className="mt-4"><span className="font-semibold text-blue-600">Reduza o Peso:</span> Remova itens desnecessários do carro. Quanto mais leve o veículo, menor será o consumo de combustível.</li>
            <li className="mt-4"><span className="font-semibold text-blue-600">Evite o Ar Condicionado:</span> O uso do ar condicionado pode aumentar o consumo de combustível. Sempre que possível, utilize a ventilação natural.</li>
            <li className="mt-4"><span className="font-semibold text-blue-600">Carona e Compartilhamento: </span> Considere dividir a viagem com outras pessoas. Além de economizar, você reduz a quantidade de carros nas ruas.</li>
          </ul>

          <p className="mt-4">Com um bom planejamento e algumas mudanças de hábito, é possível controlar
            seus gastos com combustível e ainda contribuir para um trânsito mais sustentável.
            Portanto, faça suas contas, adote as dicas e aproveite suas viagens com mais tranquilidade!</p>


        </section>

      </main>

      <footer className="bg-blue-600  w-full text-center p-4 text-white mt-20">
        mkweb ©2024
      </footer>

    </>


  );
}
