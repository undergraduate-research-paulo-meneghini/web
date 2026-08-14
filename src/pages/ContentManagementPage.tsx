import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Eye, EyeOff, Edit, Trash2, FileText, Layers, File } from 'lucide-react';
import axios from 'axios';

interface Conteudo {
  id: string;
  titulo: string;
  categoria: string;
  status: string;
  criadoEm: string;
}

export default function ContentManagementPage() {
  const navigate = useNavigate();
  const [conteudos, setConteudos] = useState<Conteudo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConteudos();
  }, []);

  const fetchConteudos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/conteudos');
      setConteudos(response.data);
    } catch (error) {
      console.error('Error fetching conteudos', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async (conteudo: Conteudo) => {
    const newStatus = conteudo.status === 'Publicado' ? 'Rascunho' : 'Publicado';
    try {
      await axios.patch(`http://localhost:3000/conteudos/${conteudo.id}`, { status: newStatus });
      setConteudos(conteudos.map(c => c.id === conteudo.id ? { ...c, status: newStatus } : c));
    } catch (error) {
      console.error('Error updating status', error);
    }
  };

  const handleDelete = async (id: string, titulo: string) => {
    if (window.confirm(`Deseja excluir permanentemente "${titulo}"?`)) {
      try {
        await axios.delete(`http://localhost:3000/conteudos/${id}`);
        setConteudos(conteudos.filter(c => c.id !== id));
      } catch (error) {
        console.error('Error deleting conteudo', error);
      }
    }
  };

  const total = conteudos.length;
  const publicados = conteudos.filter(c => c.status === 'Publicado').length;
  const rascunhos = conteudos.filter(c => c.status === 'Rascunho').length;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <div className="max-w-6xl mx-auto p-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-primary-600 mb-1">
              <Layers size={24} className="text-purple-600" />
              <h1 className="text-2xl font-bold">Gerenciamento de Conteúdo</h1>
            </div>
            <p className="text-gray-500 text-sm">Crie e gerencie artigos e recomendações</p>
          </div>
          <button 
            onClick={() => navigate('/gerenciar-conteudo/novo')}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            <Plus size={20} />
            Novo Conteúdo
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4 border-l-4 border-l-blue-500">
            <div className="p-3 bg-blue-50 rounded-full text-blue-600">
              <FileText size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold">{total}</p>
              <p className="text-gray-500 text-sm font-medium">Total</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4 border-l-4 border-l-green-500">
            <div className="p-3 bg-green-50 rounded-full text-green-600">
              <Eye size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold">{publicados}</p>
              <p className="text-gray-500 text-sm font-medium">Publicados</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4 border-l-4 border-l-yellow-500">
            <div className="p-3 bg-yellow-50 rounded-full text-yellow-600">
              <File size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold">{rascunhos}</p>
              <p className="text-gray-500 text-sm font-medium">Rascunhos</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center gap-4 border-l-4 border-l-purple-500">
            <div className="p-3 bg-purple-50 rounded-full text-purple-600">
              <Layers size={24} />
            </div>
            <div>
              <p className="text-2xl font-bold">1</p>
              <p className="text-gray-500 text-sm font-medium">Categorias</p>
            </div>
          </div>
        </div>

        {/* Content List */}
        <div className="space-y-4">
          {loading ? (
            <p className="text-center text-gray-500 py-8">Carregando...</p>
          ) : conteudos.length === 0 ? (
            <p className="text-center text-gray-500 py-8 bg-white rounded-lg shadow-sm">Nenhum conteúdo encontrado.</p>
          ) : (
            conteudos.map(conteudo => (
              <div key={conteudo.id} className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${conteudo.status === 'Publicado' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {conteudo.status === 'Publicado' ? 'Publicado' : 'Rascunho'}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-semibold bg-pink-100 text-pink-700">
                      {conteudo.categoria}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{conteudo.titulo}</h3>
                  <p className="text-sm text-gray-500 mt-1">1 blocos • {conteudo.criadoEm} • desconhecido</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleStatusToggle(conteudo)}
                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    title={conteudo.status === 'Publicado' ? 'Despublicar' : 'Publicar'}
                  >
                    {conteudo.status === 'Publicado' ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  <button 
                    onClick={() => navigate(`/gerenciar-conteudo/${conteudo.id}/editar`)}
                    className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
                    title="Editar"
                  >
                    <Edit size={20} />
                  </button>
                  <button 
                    onClick={() => handleDelete(conteudo.id, conteudo.titulo)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    title="Excluir"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
