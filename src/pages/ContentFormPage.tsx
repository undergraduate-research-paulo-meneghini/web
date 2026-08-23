import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { X, Save } from 'lucide-react';
import BlockEditor from '../components/BlockEditor';
import api from '../services/api';

export default function ContentFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  const [formData, setFormData] = useState({
    titulo: '',
    categoria: 'Amamentação',
    status: 'rascunho',
    semanaApresentacao: '',
    fase: '',
    nivelRisco: '',
    tipo: '',
    condicaoEnvio: '',
    link: '',
    referenciaMaterial: '',
    blocos: [] as any
  });

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(isEditing);

  useEffect(() => {
    if (isEditing) {
      api.get(`/conteudos/${id}`)
        .then(response => {
          setFormData(response.data);
        })
        .catch(error => console.error('Error fetching data', error))
        .finally(() => setLoadingData(false));
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlocksChange = (content: any) => {
    setFormData(prev => ({ ...prev, blocos: content }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      if (isEditing) {
        await api.patch(`/conteudos/${id}`, formData);
      } else {
        await api.post(`/conteudos`, formData);
      }
      navigate('/gerenciar-conteudo');
    } catch (error) {
      console.error('Error saving', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-8 flex justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl overflow-hidden flex flex-col h-[calc(100vh-4rem)]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/gerenciar-conteudo')} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold">{isEditing ? 'Editar Conteúdo' : 'Novo Conteúdo'}</h2>
          </div>
          <button 
            onClick={handleSave}
            disabled={loading || loadingData}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50"
          >
            <Save size={18} />
            {loading ? 'Salvando...' : 'Salvar'}
          </button>
        </div>

        {/* Content Area */}
        {loadingData ? (
          <div className="p-8 flex justify-center items-center h-full">
            <p className="text-gray-500">Carregando conteúdo...</p>
          </div>
        ) : (
          <div className="p-8 overflow-y-auto grow">
          
          {/* Informações */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Informações</h3>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
                <input 
                  type="text" 
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleChange}
                  placeholder="Ex: Como amamentar nos primeiros dias"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                  <select name="categoria" value={formData.categoria} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md bg-white">
                    <option value="Amamentação">Amamentação</option>
                    <option value="Nutrição">Nutrição</option>
                    <option value="Saúde Mental">Saúde Mental</option>
                    <option value="Apoio Familiar">Apoio Familiar</option>
                    <option value="Desenvolvimento do Bebê">Desenvolvimento do Bebê</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md bg-white">
                    <option value="rascunho">Rascunho</option>
                    <option value="publicado">Publicado</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Recomendação */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Recomendação</h3>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Semana de apresentação</label>
                  <input type="number" name="semanaApresentacao" value={formData.semanaApresentacao} onChange={handleChange} placeholder="Ex: 4" className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fase</label>
                  <select name="fase" value={formData.fase} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md bg-white">
                    <option value="">Selecione...</option>
                    <option value="pre_natal">Pré-natal</option>
                    <option value="pos_parto_imediato">Pós-parto imediato (0-48h)</option>
                    <option value="1_30_dias">1 a 30 dias</option>
                    <option value="1_3_meses">1 a 3 meses</option>
                    <option value="3_6_meses">3 a 6 meses</option>
                    <option value="6_12_meses">6 a 12 meses</option>
                    <option value="acima_12_meses">Acima de 12 meses</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nível de risco</label>
                  <select name="nivelRisco" value={formData.nivelRisco} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md bg-white">
                    <option value="">Selecione...</option>
                    <option value="Baixo">Baixo</option>
                    <option value="Médio">Médio</option>
                    <option value="Alto">Alto</option>
                    <option value="Todos">Todos</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
                  <select name="tipo" value={formData.tipo} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md bg-white">
                    <option value="">Selecione...</option>
                    <option value="Artigo">Artigo</option>
                    <option value="Vídeo">Vídeo</option>
                    <option value="Infográfico">Infográfico</option>
                    <option value="Podcast">Podcast</option>
                    <option value="Guia prático">Guia prático</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Condição de envio</label>
                  <select name="condicaoEnvio" value={formData.condicaoEnvio} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded-md bg-white">
                    <option value="">Selecione...</option>
                    <option value="Sempre">Sempre</option>
                    <option value="Primeira amamentação">Primeira amamentação</option>
                    <option value="Dificuldade de amamentação">Dificuldade de amamentação</option>
                    <option value="Retorno ao trabalho">Retorno ao trabalho</option>
                    <option value="Cirurgia mamária">Cirurgia mamária</option>
                    <option value="Baixo peso ao nascer">Baixo peso ao nascer</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
                  <input type="text" name="link" value={formData.link} onChange={handleChange} placeholder="https://" className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Referência do material</label>
                  <input type="text" name="referenciaMaterial" value={formData.referenciaMaterial} onChange={handleChange} placeholder="Ex: Ministério da Saúde, 2023" className="w-full p-2 border border-gray-300 rounded-md" />
                </div>
              </div>
            </div>
          </div>

          {/* Conteúdo */}
          <div>
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Conteúdo</h3>
            <p className="text-xs text-gray-400 mb-4">Use / para adicionar blocos: cabeçalho, lista, citação, aviso, separador.</p>
            <BlockEditor 
              initialContent={isEditing ? formData.blocos : undefined} 
              onChange={handleBlocksChange}
            />
          </div>

        </div>
        )}
      </div>
    </div>
  );
}
