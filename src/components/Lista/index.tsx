import React, { useEffect, useState, MouseEvent } from 'react';
import Button from '../Button';
import { Pacientes } from '../Formulario';
import Input from '../Input';
import RowEditList from '../RowEditList';
import RowList from '../RowList';
import styles from './index.module.css';

const Lista = () => {
  const [pacientes, setPacientes] = useState<Pacientes[]>([]);
  const [busca, setBusca] = useState<string>('');
  const [editPacienteCpf, setEditPacienteCpf] = useState<string | null>(null);

  const handleEditClick = (event: MouseEvent<HTMLButtonElement>, paciente: Pacientes) => {
    event.preventDefault()
    setEditPacienteCpf(paciente.cpf)
  }
  

  useEffect(() => {
    if (localStorage.hasOwnProperty('pacientes')) {
      setPacientes(JSON.parse(localStorage.getItem('pacientes')!));
    }
  }, []);


  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Listagem de Pacientes</h2>
      <Input
        placeholder="Buscar por nome"
        onChange={(event) => setBusca(event.target.value)}
      />
      <div className={styles.tableContainer}>
        <form>
          <table className={styles.table}>
            <thead>
              <tr>
                <td>Nome </td>
                <td>Data de Nascimento </td>
                <td>CPF </td>
                <td>Sexo </td>
                <td>Endereço </td>
                <td>Status </td>
                <td>Opções</td>
              </tr>
            </thead>
            <tbody>
              {!!pacientes
                ? pacientes
                    .filter((paciente) => {
                      if (busca === '') {
                        return paciente;
                      } else if (
                        paciente.nome
                          .toLowerCase()
                          .includes(busca.toLowerCase())
                      ) {
                        return paciente;
                      } else return null;
                    })
                    .map((paciente) => {
                      return (
                        <>
                          {editPacienteCpf === paciente.cpf ? (
                            <RowEditList />
                          ) : (
                            <RowList paciente={paciente} handleEditClick={handleEditClick} />
                          )}
                        </>
                      );
                    })
                : null}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};


export default Lista;
