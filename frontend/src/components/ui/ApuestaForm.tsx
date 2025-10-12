import { useState } from "react";
import axios from "axios";
import Modal from "./Modal";
import { data } from "react-router-dom";

interface Props {
  id_usuario: number;
  id_competencia: number;
  trigger: React.ReactNode; // Botón que abre el modal
}

const ApuestaForm: React.FC<Props> = ({ id_usuario, id_competencia, trigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [idAve, setIdAve] = useState<number>(1);
  const [monto, setMonto] = useState<number>(0);
  const [mensaje, setMensaje] = useState<string>("");

  const handleApuesta = async () => {
    try {
      const res = await axios.post("https://aves-backend.onrender.com/api/apuestas", {
  id_usuario,
  id_competencia,
  id_ave: idAve,
  monto,
});


      setMensaje(`✅ Apuesta realizada. Saldo restante: $${res.data.saldo_restante}`);
      setTimeout(() => setIsOpen(false), 1500);
    } catch (error: any) {
      setMensaje(error.response?.data?.error || "Error al apostar");
    }
  };

  return (
    <>
      <div onClick={() => setIsOpen(true)}>{trigger}</div>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-xl mb-4 font-semibold">Realizar Apuesta</h2>

        <label className="block mb-2">Selecciona Ave:</label>
        <select
          value={idAve}
          onChange={(e) => setIdAve(Number(e.target.value))}
          className="w-full p-2 rounded bg-[#2b1454] border border-purple-500 mb-4"
        >
          <option value={1}>Águila Real</option>
          <option value={2}>Halcón Peregrino</option>
          <option value={3}>Búho Nevado</option>
        </select>

        <label className="block mb-2">Monto:</label>
        <input
          type="number"
          value={monto}
          onChange={(e) => setMonto(Number(e.target.value))}
          className="w-full p-2 rounded bg-[#2b1454] border border-purple-500 mb-4"
        />

        <button
          onClick={handleApuesta}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
        >
          Confirmar Apuesta
        </button>

        {mensaje && <p className="mt-3 text-center">{mensaje}</p>}
      </Modal>
    </>
  );
};

export default ApuestaForm;
