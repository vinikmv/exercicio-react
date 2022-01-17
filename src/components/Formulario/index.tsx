import React from 'react';
import styles from './index.module.css';
import Input from '../Input';
import Button from '../Button';
import useForm from '../../hooks/useForm';

export type Pacientes = {
  nome: string;
  dataNascimento: string;
  cpf: string;
  sexo: string;
  endereco?: string;
  status: string;
};

const Formulario = () => {
  const nome = useForm('text');
  const dataNascimento = useForm('date');
  const cpf = useForm('cpf');
  const sexo = useForm('text');
  const endereco = useForm('endereco');
  const status = useForm('text');

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (nome.validate() && cpf.validate() && dataNascimento.validate() && sexo.validate()) {
      let pacientes: Pacientes[] = [];

      if (localStorage.hasOwnProperty('pacientes')) {
        pacientes = JSON.parse(localStorage.getItem('pacientes')!);
      }

      if (
        pacientes.some((paciente) => {
          return paciente.cpf === cpf.value;
        })
      ) {
        return alert('CPF já cadastrado no sistema');
      } else {
        pacientes = [
          ...pacientes,
          {
            nome: nome.value,
            dataNascimento: dataNascimento.value,
            cpf: cpf.value,
            sexo: sexo.value,
            endereco: endereco.value,
            status: status.value,
          },
        ];

        localStorage.setItem('pacientes', JSON.stringify(pacientes));
        alert(`Paciente ${nome.value} cadastrado com sucesso.`)
      }
    }
  }

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Cadastro de Pacientes</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Nome:" type="text" name="nome" {...nome} />
        <Input
          label="Data de Nascimento:"
          type="date"
          name="dataNascimento"
          {...dataNascimento}
        />
        <Input
          label="CPF:"
          type="text"
          name="cpf"
          placeholder="000.000.000-00"
          {...cpf}
        />
        <label>Sexo: </label>
        <select required name="sexo" className={styles.select} {...sexo}>
          <option hidden disabled></option>
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
          <option value="outros">Outros...</option>
        </select>
        <Input label="Endereço:" type="text" name="endereco" {...endereco} />
        <label>Status: </label>
        <select required name="status" className={styles.select} {...status}>
          <option hidden disabled></option>
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
        </select>
        <div className={styles.button}>
          <Button>Cadastrar</Button>
        </div>
      </form>
    </section>
  );
};

export default Formulario;
