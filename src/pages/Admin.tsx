import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import Navbar from '@/components/Navbar';

const Admin = () => {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('imoveis')
        .select('id, title, price, corretores(name), bairros(name)')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar imóveis:', error);
      } else {
        setProperties(data);
      }
      setLoading(false);
    };
    fetchProperties();
  }, []);

  const handleDelete = async (propertyId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este imóvel? Esta ação não pode ser desfeita.')) {
      const { error } = await supabase.from('imoveis').delete().eq('id', propertyId);

      if (error) {
        console.error('Erro ao excluir imóvel:', error);
        alert('Falha ao excluir o imóvel.');
      } else {
        setProperties(properties.filter(p => p.id !== propertyId));
        alert('Imóvel excluído com sucesso!');
      }
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-graphite-900">Painel Administrativo</h1>
          <div className="flex gap-4">
            <Button variant="outline" asChild>
              <Link to="/painel-secreto-ff-imoveis/bairros">
                Gerenciar Bairros
              </Link>
            </Button>
            <Button asChild>
              <Link to="/painel-secreto-ff-imoveis/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Adicionar Imóvel
              </Link>
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Bairro</TableHead>
                <TableHead>Preço</TableHead>
                <TableHead>Corretor</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10">
                    Carregando imóveis...
                  </TableCell>
                </TableRow>
              ) : properties.length > 0 ? (
                properties.map(property => (
                  <TableRow key={property.id}>
                    <TableCell className="font-medium">{property.title}</TableCell>
                    <TableCell>{property.bairros?.name || 'N/A'}</TableCell>
                    <TableCell>{formatCurrency(property.price)}</TableCell>
                    <TableCell>{property.corretores?.name || 'N/A'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end items-center gap-2">
                         <Button variant="outline" size="sm" asChild>
                          <Link to={`/painel-secreto-ff-imoveis/edit/${property.id}`}>
                            <Edit className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(property.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10">
                    Nenhum imóvel cadastrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default Admin; 