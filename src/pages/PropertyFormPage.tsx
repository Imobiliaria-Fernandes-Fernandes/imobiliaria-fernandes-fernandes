import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Navbar from '@/components/Navbar';

interface Corretor {
  id: string;
  name: string;
}

interface Bairro {
  id: string;
  name: string;
}

const PropertyFormPage = () => {
  const { id } = useParams(); // Pega o ID da URL se estiver editando
  const navigate = useNavigate();
  const [property, setProperty] = useState<any>({
    title: '',
    price: 0,
    condominium_fee: 0,
    iptu: 0,
    area_useful: 0,
    area_total: 0,
    bedrooms: 0,
    bathrooms: 0,
    parking_spaces: 0,
    description: '',
    amenities: [],
    condominium_features: [],
    images: [],
    corretor_id: null,
    bairro_id: null,
  });
  const [corretores, setCorretores] = useState<Corretor[]>([]);
  const [bairros, setBairros] = useState<Bairro[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Busca corretores e bairros em paralelo
    const fetchData = async () => {
      const [corretoresRes, bairrosRes] = await Promise.all([
        supabase.from('corretores').select('id, name'),
        supabase.from('bairros').select('id, name')
      ]);

      if (corretoresRes.error) console.error('Erro ao buscar corretores:', corretoresRes.error);
      else setCorretores(corretoresRes.data);

      if (bairrosRes.error) console.error('Erro ao buscar bairros:', bairrosRes.error);
      else setBairros(bairrosRes.data);
    };

    fetchData();

    // Se houver um ID, busca os dados do imóvel para edição
    if (id) {
      const fetchProperty = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('imoveis').select('*').eq('id', id).single();
        if (error) {
          console.error('Erro ao buscar imóvel:', error);
          navigate('/painel-secreto-ff-imoveis');
        } else {
          setProperty(data);
        }
        setLoading(false);
      };
      fetchProperty();
    }
  }, [id, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isNumber = type === 'number' || name === 'price' || name.includes('area') || name.includes('fee');
    setProperty({ ...property, [name]: isNumber ? parseFloat(value) || 0 : value });
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setProperty({ ...property, [name]: value });
  };
  
  // Função para lidar com campos de array (como amenities)
  const handleArrayChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProperty({ ...property, [name]: value.split('\n') });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Remove campos que não existem mais na tabela 'imoveis' antes de salvar
    const { neighborhood, city, state, ...dataToSave } = property;

    let error;

    if (id) {
      // Modo de Edição
      ({ error } = await supabase.from('imoveis').update(dataToSave).eq('id', id));
    } else {
      // Modo de Criação
      ({ error } = await supabase.from('imoveis').insert([dataToSave]));
    }

    if (error) {
      console.error('Erro ao salvar imóvel:', error);
      alert(`Erro: ${error.message}`);
    } else {
      alert(`Imóvel ${id ? 'atualizado' : 'criado'} com sucesso!`);
      navigate('/painel-secreto-ff-imoveis');
    }
    setLoading(false);
  };

  if (loading && id) return <p>Carregando imóvel...</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-graphite-900 mb-6">
          {id ? 'Editar Imóvel' : 'Adicionar Novo Imóvel'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-lg shadow-md">
          {/* Informações Básicas */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Título do Anúncio</Label>
              <Input id="title" name="title" value={property.title} onChange={handleChange} required />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="corretor_id">Corretor Responsável</Label>
                  <Select name="corretor_id" value={property.corretor_id} onValueChange={(value) => handleSelectChange('corretor_id', value)}>
                    <SelectTrigger><SelectValue placeholder="Selecione um corretor" /></SelectTrigger>
                    <SelectContent>{corretores.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="bairro_id">Bairro</Label>
                   <Select name="bairro_id" value={property.bairro_id} onValueChange={(value) => handleSelectChange('bairro_id', value)} required>
                    <SelectTrigger><SelectValue placeholder="Selecione um bairro" /></SelectTrigger>
                    <SelectContent>{bairros.map(b => <SelectItem key={b.id} value={b.id}>{b.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
            </div>
          </div>

          {/* Valores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="price">Preço (R$)</Label>
              <Input id="price" name="price" type="number" value={property.price} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="condominium_fee">Condomínio (R$)</Label>
              <Input id="condominium_fee" name="condominium_fee" type="number" value={property.condominium_fee} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="iptu">IPTU (R$)</Label>
              <Input id="iptu" name="iptu" type="number" value={property.iptu} onChange={handleChange} />
            </div>
          </div>

          {/* Detalhes do Imóvel */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="area_useful">Área Útil (m²)</Label>
              <Input id="area_useful" name="area_useful" type="number" value={property.area_useful} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="bedrooms">Quartos</Label>
              <Input id="bedrooms" name="bedrooms" type="number" value={property.bedrooms} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="bathrooms">Banheiros</Label>
              <Input id="bathrooms" name="bathrooms" type="number" value={property.bathrooms} onChange={handleChange} required />
            </div>
            <div>
              <Label htmlFor="parking_spaces">Vagas</Label>
              <Input id="parking_spaces" name="parking_spaces" type="number" value={property.parking_spaces} onChange={handleChange} />
            </div>
          </div>
          
          {/* Descrição e Listas */}
          <div className="space-y-4">
            <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea id="description" name="description" value={property.description} onChange={handleChange} rows={6} />
            </div>
             <div>
                <Label htmlFor="amenities">Diferenciais (um por linha)</Label>
                <Textarea id="amenities" name="amenities" value={property.amenities?.join('\n')} onChange={handleArrayChange} rows={4} />
            </div>
             <div>
                <Label htmlFor="condominium_features">Estrutura do Condomínio (um por linha)</Label>
                <Textarea id="condominium_features" name="condominium_features" value={property.condominium_features?.join('\n')} onChange={handleArrayChange} rows={4} />
            </div>
             <div>
                <Label htmlFor="images">Imagens (URLs, uma por linha)</Label>
                <Textarea id="images" name="images" value={property.images?.join('\n')} onChange={handleArrayChange} rows={6} />
                <p className="text-sm text-gray-500 mt-1">A primeira imagem da lista será a imagem principal.</p>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => navigate('/painel-secreto-ff-imoveis')}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar Imóvel'}
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default PropertyFormPage; 