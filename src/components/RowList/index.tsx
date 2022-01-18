import { MouseEvent } from 'react';
import Button from '../Button';
import { Pacientes } from '../Formulario';
import styles from './index.module.css';

type RowListProps = {
  paciente: Pacientes;
  handleEditClick: (
    event: MouseEvent<HTMLButtonElement>,
    paciente: Pacientes
  ) => void;
  handleInativarClick: (
    event: MouseEvent<HTMLButtonElement>,
    paciente: Pacientes
  ) => void;
};

const RowList = ({
  paciente,
  handleEditClick,
  handleInativarClick,
}: RowListProps) => {
  const capitalizarPrimeiraLetra = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };
  return (
    <tr key={paciente.cpf} className={styles.rowWrapper}>
      <td key={`${paciente.cpf} - 1`}>
        {capitalizarPrimeiraLetra(paciente.nome)}
      </td>
      <td key={`${paciente.cpf} - 2`}>{paciente.dataNascimento}</td>
      <td key={`${paciente.cpf} - 3`}>{paciente.cpf}</td>
      <td key={`${paciente.cpf} - 4`}>
        {capitalizarPrimeiraLetra(paciente.sexo)}
      </td>
      <td key={`${paciente.cpf} - 5`}>{paciente.endereco}</td>
      <td key={`${paciente.cpf} - 6`}>{paciente.status?.toUpperCase()}</td>
      <td key={`${paciente.cpf} - 7`} className={styles.button}>
        <div>
        <Button onClick={(event) => handleEditClick(event, paciente)}>
          Editar
        </Button>
        </div>
        <div>
        {paciente.status.toUpperCase() === 'ATIVO' ? (
          <Button onClick={(event) => handleInativarClick(event, paciente)}>
            Inativar
          </Button>
        ) : null}

        </div>
      </td>
    </tr>
  );
};

export default RowList;
