import React, { useEffect, useState, MouseEvent } from 'react';
import { formatarCPF, Pacientes } from '../Formulario';
import Input from '../Input';
import RowEditList from '../RowEditList';
import RowList from '../RowList';
import styles from './index.module.css';

const Lista = () => {
  const [pacientes, setPacientes] = useState<Pacientes[]>([]);
  const [busca, setBusca] = useState<string>('');
  const [editPacienteCpf, setEditPacienteCpf] = useState<string>('');
  const [isActive, setIsActive] = useState(true);
  const [editDados, setEditDados] = useState<Pacientes>({
    nome: '',
    dataNascimento: '',
    cpf: '',
    sexo: '',
    endereco: '',
    status: '',
  });

  const handleEditInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    const name = event.target.getAttribute('name') as keyof Pacientes;
    const value = event.target.value;

    let newDados = {
      ...editDados,
    };
    if (name === 'cpf') {
      newDados[name] = value.replace(/\s/g, '');
    } else {
      newDados[name] = value;
    }
    setEditDados(newDados);
  };

  const handleEditSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    event.preventDefault();

    const name = event.target.getAttribute('name') as keyof Pacientes;
    const value = event.target.value;

    let newDados = {
      ...editDados,
    };

    newDados[name] = value;
    setEditDados(newDados);
  };

  const handleEditClick = (
    event: MouseEvent<HTMLButtonElement>,
    paciente: Pacientes
  ) => {
    event.preventDefault();
    setEditPacienteCpf(paciente.cpf);

    const popularDadosAtuais = {
      nome: paciente.nome,
      dataNascimento: paciente.dataNascimento,
      cpf: formatarCPF(paciente.cpf),
      sexo: paciente.sexo,
      endereco: paciente.endereco,
      status: paciente.status,
    };

    setEditDados(popularDadosAtuais);
  };

  const handleSaveClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const salvarDados = {
      ...editDados,
    };

    const novoArrayPacientes = [...pacientes];

    if (
      novoArrayPacientes
        .filter((paciente) => paciente.cpf !== editPacienteCpf)
        .some((paciente) => {
          return paciente.cpf === salvarDados.cpf;
        })
    ) {
      return alert('CPF já cadastrado no sistema');
    }

    const indexPacienteSelecionado = pacientes.findIndex(
      (paciente) => paciente.cpf === editPacienteCpf
    );
    novoArrayPacientes[indexPacienteSelecionado] = salvarDados;

    setPacientes(novoArrayPacientes);

    localStorage.setItem('pacientes', JSON.stringify(novoArrayPacientes));
    alert(`Paciente ${salvarDados.nome} Editado com sucesso.`);
    setEditPacienteCpf('');
  };

  const handleInativarClick = (
    event: MouseEvent<HTMLButtonElement>,
    paciente: Pacientes
  ) => {
    event.preventDefault();

    const salvarDados = {
      ...paciente,
      status: 'inativo',
    };

    const novoArrayPacientes = [...pacientes];

    const indexPacienteSelecionado = pacientes.findIndex(
      (pacienteSelecionar) => pacienteSelecionar.cpf === paciente.cpf
    );
    novoArrayPacientes[indexPacienteSelecionado] = salvarDados;

    setPacientes(novoArrayPacientes);

    localStorage.setItem('pacientes', JSON.stringify(novoArrayPacientes));
    alert(`Paciente ${salvarDados.nome} inativado com sucesso.`);
    setEditPacienteCpf('');
  };

  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const name = event.target.getAttribute('name') as keyof Pacientes;
    const value = event.target.value;
    const regexTexto = /(?!^$)([^\s])/;
    const regexCPF = /(^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$)/;

    if (name !== 'endereco') {
      if (!regexTexto.test(value)) {
        setIsActive(false);
        return alert(`Campo ${name} em branco. Preenchimento obrigatório`);
      } else if (name === 'cpf') {
        if (!regexCPF.test(value)) {
          setIsActive(false);
          return alert(`CPF Inválido. Tente novamente`);
        } else {
          setIsActive(true);
        }
      } else {
        setIsActive(true);
      }
    }
  };

  const handleCancelClick = () => {
    setEditPacienteCpf('');
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
                            <RowEditList
                              editDados={editDados}
                              isActive={isActive}
                              handleEditInputChange={handleEditInputChange}
                              handleEditSelectChange={handleEditSelectChange}
                              handleSaveClick={handleSaveClick}
                              handleCancelClick={handleCancelClick}
                              handleOnBlur={handleOnBlur}
                            />
                          ) : (
                            <RowList
                              paciente={paciente}
                              handleEditClick={handleEditClick}
                              handleInativarClick={handleInativarClick}
                            />
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
