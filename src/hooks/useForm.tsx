import { useState } from 'react';

type formTypes = 'text' | 'cpf' | 'date' | 'endereco';

const types = {
  text: {
    regex: /(?!^$)([^\s])/,
    message: 'Preenchimento obrigatório.',
  },
  cpf: {
    regex:
    /(^\d{3}\.\d{3}\.\d{3}-\d{2}$)/,
    message: 'Preencha um CPF Válido e no formato correto: xxx.xxx.xxx-xx',
  },
  date: {
    regex: /(?!^$)([^\s])/,
    message: 'Preenchimento obrigatório.',
  },
};

const useForm = (type: formTypes) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validate = (value: string) => {
    if (value.length === 0) {
      setError('Preenchimento Obrigatório.');
      return false;
    } else if (type === 'text' && !types[type].regex.test(value)) {
      setError(types.text.message);
      return false;
    } else if (type === 'cpf' && !types[type].regex.test(value)) {
      setError(types.cpf.message);
      return false;
    } else if (type === 'date' && !types[type].regex.test(value)) {
      setError(types.date.message);
      return false;
    } else {
      setError(null);
      return true;
    }
  };

  const onChange = ({
    target,
  }:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement>) => {
    if (error) validate(target.value);
    setValue(target.value);
  };

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
  };
};

export default useForm;
