import axios from 'axios';
import { api } from '~/services/api';

const deletePersonUseCase = async (id: number): Promise<boolean> => {
  try {
    const { data } = await api.get<boolean>(`/persons/delete/${id}`);
    return data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw new Error(e.response?.data.message);
    }

    throw new Error('Não foi possível excluir colaborador');
  }
};

export default deletePersonUseCase;
