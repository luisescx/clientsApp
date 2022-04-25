import axios from 'axios';
import { api } from '~/services/api';

const updatePersonUseCase = async (person: Person): Promise<Person> => {
  try {
    const { data } = await api.post<Person>(`/persons/update`, { ...person });

    return data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw new Error(e.response?.data.message);
    }

    throw new Error('Não foi possível excluir colaborador');
  }
};

export default updatePersonUseCase;
