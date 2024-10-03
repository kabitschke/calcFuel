type Props = {
  dist: string;
  consumo: string;
  resultado: string;
  handleReset: () => void;
}


export const Result = ({ dist, consumo, resultado, handleReset }: Props) => {


  return (

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
              <tr className="bg-gray-100 text-center ">
                <td className="py-2 px-4 border border-gray-300">{dist} km</td>
                <td className="py-2 px-4 border border-gray-300">{consumo} ℓ</td>
                <td className="py-2 px-4 border border-gray-300">{`R$ ${resultado}`}</td>
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
  );

}