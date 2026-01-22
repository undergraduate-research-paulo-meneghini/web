import api from './api';
import type { BinomioRegistrationData, BinomioRegistrationResponse } from '../types/binomio.types';

class BinomioService {
    async registerBinomio(data: BinomioRegistrationData): Promise<BinomioRegistrationResponse> {
        const response = await api.post<BinomioRegistrationResponse>('/binomio/cadastro', data);
        return response.data;
    }

    async getBinomioById(id: number): Promise<BinomioRegistrationData> {
        const response = await api.get<BinomioRegistrationData>(`/binomio/${id}`);
        return response.data;
    }

    async updateBinomio(id: number, data: Partial<BinomioRegistrationData>): Promise<BinomioRegistrationResponse> {
        const response = await api.put<BinomioRegistrationResponse>(`/binomio/${id}`, data);
        return response.data;
    }
}

export default new BinomioService();
