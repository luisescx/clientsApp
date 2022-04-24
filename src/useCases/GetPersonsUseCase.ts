import axios from 'axios';
import { api } from '~/services/api';

const getPersonsUseCase = async (): Promise<Person[]> => {
  try {
    const { data } = await api.get<Person[]>('/persons/list');

    return data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw new Error(e.response?.data.message);
    }

    throw new Error('Não foi possível buscar os colaboradores');
  }
};

export default getPersonsUseCase;
