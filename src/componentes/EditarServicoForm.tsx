import React, { useState } from 'react';
import Servico from '../modelo/servico';

interface EditarServicoFormProps {
  servico: Servico | null;
  onAtualizarServico: (index: number, novoNome: string, novoPreco: number) => void;
  onCancel: () => void;
}

const EditarServicoForm: React.FC<EditarServicoFormProps> = ({ servico, onAtualizarServico, onCancel }) => {
  const [novoNome, setNovoNome] = useState<string>(servico?.getNome() || '');
  const [novoPreco, setNovoPreco] = useState<number>(servico?.getPreco() || 0);

  const handleAtualizarServico = () => {
    if (servico !== null) {
      onAtualizarServico(servico.getId, novoNome, novoPreco);
      onCancel();
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="novoNome">Novo Nome:</label>
        <input type="text" id="novoNome" value={novoNome} onChange={(e) => setNovoNome(e.target.value)} />
      </div>
      <div>
        <label htmlFor="novoPreco">Novo Preço:</label>
        <input type="number" id="novoPreco" value={novoPreco} onChange={(e) => setNovoPreco(Number(e.target.value))} />
      </div>
      <div>
        <button className="btn btn-success" onClick={handleAtualizarServico}>Atualizar Serviço</button>
        <button className="btn btn-danger ml-2" onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
};

export default EditarServicoForm;
