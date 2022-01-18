import { useEffect, useState } from 'react';
import Button from '../Button';
import { Pacientes } from '../Formulario';
import Input from '../Input';
import styles from './index.module.css';

const Lista = () => {
  const [pacientes, setPacientes] = useState<Pacientes[]>([]);
  const [busca, setBusca] = useState<string>('');

  const capitalizarPrimeiraLetra = (value: string) => {
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

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
                      paciente.nome.toLowerCase().includes(busca.toLowerCase())
                    ) {
                      return paciente;
                    } else return null;
                  })
                  .map((paciente, index) => {
                    return (
                      <tr key={index}>
                        <td key={`${paciente.cpf} - 1`}>
                          {capitalizarPrimeiraLetra(paciente.nome)}
                        </td>
                        <td key={`${paciente.cpf} - 2`}>
                          {paciente.dataNascimento}
                        </td>
                        <td key={`${paciente.cpf} - 3`}>{paciente.cpf}</td>
                        <td key={`${paciente.cpf} - 4`}>
                          {capitalizarPrimeiraLetra(paciente.sexo)}
                        </td>
                        <td key={`${paciente.cpf} - 5`}>{paciente.endereco}</td>
                        <td key={`${paciente.cpf} - 6`}>
                          {paciente.status?.toUpperCase()}
                        </td>
                        <td className={styles.button}>
                          <Button>Editar</Button> {paciente.status.toUpperCase() === 'ATIVO' ?   <Button>Inativar</Button> : null }  
                        </td>
                      </tr>
                    );
                  })
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Lista;
