import { MouseEvent } from 'react';
import Button from '../Button';
import { Pacientes } from '../Formulario';
import Input from '../Input';
import styles from './index.module.css';

type RowEditListProps = {
  editDados: Pacientes;
  isActive: boolean;
  handleEditInputChange: React.ChangeEventHandler<HTMLInputElement>;
  handleEditSelectChange: React.ChangeEventHandler<HTMLSelectElement>;
  handleSaveClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleCancelClick: () => void;
  handleOnBlur: React.FocusEventHandler<HTMLInputElement>;
};

const RowEditList = ({
  editDados,
  isActive,
  handleEditInputChange,
  handleEditSelectChange,
  handleSaveClick,
  handleCancelClick,
  handleOnBlur,
}: RowEditListProps) => {
  return (
    <tr key={`${editDados.cpf} row`} className={styles.rowWrapper}>
      <td key={`${editDados.cpf} row1`}>
        <Input
          name="nome"
          onChange={handleEditInputChange}
          onBlur={handleOnBlur}
          value={editDados.nome}
        />
      </td>
      <td key={`${editDados.cpf} row2`}>
        <Input
          type="date"
          name="dataNascimento"
          onChange={handleEditInputChange}
          onBlur={handleOnBlur}
          value={editDados.dataNascimento}
        />
      </td>
      <td key={`${editDados.cpf} row3`}>
        <Input
          type="text"
          name="cpf"
          placeholder="000.000.000-00"
          onChange={handleEditInputChange}
          onBlur={handleOnBlur}
          value={editDados.cpf}
        />
      </td>
      <td key={`${editDados.cpf} row4`}>
        <select
          required
          name="sexo"
          onChange={handleEditSelectChange}
          value={editDados.sexo}
        >
          <option hidden disabled></option>
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
          <option value="outros">Outros...</option>
        </select>
      </td>
      <td key={`${editDados.cpf} row5`}>
        <Input
          type="text"
          name="endereco"
          onChange={handleEditInputChange}
          value={editDados.endereco}
        />
      </td>
      <td key={`${editDados.cpf} row6`}>
        <select
          required
          name="status"
          onChange={handleEditSelectChange}
          value={editDados.status}
        >
          <option hidden disabled></option>
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
        </select>
      </td>
      <td key={`${editDados.cpf} row7`}>
        {isActive ? (
          <div>
            <Button onClick={(event) => handleSaveClick(event)}>Salvar</Button>
          </div>
        ) : null}
        <div>
          <Button onClick={() => handleCancelClick()}>Cancelar</Button>
        </div>
      </td>
    </tr>
  );
};

export default RowEditList;
