import Input from '../Input';

const RowEditList = () => {
  return (
    <tr>
      <td>
        <Input name="nome" />
      </td>
      <td>
        <Input type="date" name="dataNascimento" />
      </td>
      <td>
        <Input type="text" name="cpf" placeholder="000.000.000-00" />
      </td>
      <td>
        <select required name="sexo">
          <option hidden disabled></option>
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
          <option value="outros">Outros...</option>
        </select>
      </td>
      <td>
        <Input type="text" name="endereco" />
      </td>
      <td>
        <select required name="status">
          <option hidden disabled></option>
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
        </select>
      </td>
    </tr>
  );
};

export default RowEditList;
