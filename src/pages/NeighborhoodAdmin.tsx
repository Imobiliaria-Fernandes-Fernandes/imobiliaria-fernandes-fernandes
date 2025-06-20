import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Link } from 'react-router-dom';

interface Bairro {
  id: string;
  name: string;
  city: string;
  state: string;
}

const NeighborhoodAdmin = () => {
  const [bairros, setBairros] = useState<Bairro[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentBairro, setCurrentBairro] = useState<Partial<Bairro> | null>(null);

  useEffect(() => {
    fetchBairros();
  }, []);

  const fetchBairros = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('bairros').select('*').order('name');
    if (error) {
      console.error('Erro ao buscar bairros:', error);
    } else {
      setBairros(data);
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!currentBairro || !currentBairro.name) {
      alert('O nome do bairro é obrigatório.');
      return;
    }

    const { id, ...dataToSave } = currentBairro;

    let error;
    if (id) {
      // Editar
      ({ error } = await supabase.from('bairros').update(dataToSave).eq('id', id));
    } else {
      // Criar
      ({ error } = await supabase.from('bairros').insert([dataToSave]));
    }

    if (error) {
      alert(`Erro ao salvar bairro: ${error.message}`);
    } else {
      setIsDialogOpen(false);
      setCurrentBairro(null);
      fetchBairros(); // Re-fetch a lista
    }
  };
  
  const handleDelete = async (bairroId: string) => {
      if (window.confirm('Tem certeza? Excluir um bairro pode causar erros em imóveis associados a ele.')) {
        const { error } = await supabase.from('bairros').delete().eq('id', bairroId);
        if (error) {
             alert(`Erro ao excluir bairro: ${error.message}`);
        } else {
            fetchBairros();
        }
      }
  }

  const openDialog = (bairro: Partial<Bairro> | null = null) => {
    setCurrentBairro(bairro ? { ...bairro } : { name: '', city: 'Guarulhos', state: 'SP' });
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-4xl mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-graphite-900">Gerenciar Bairros</h1>
           <div className="flex gap-4">
            <Button variant="outline" asChild>
                <Link to="/painel-secreto-ff-imoveis">Voltar ao Painel</Link>
            </Button>
            <Button onClick={() => openDialog()}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Adicionar Bairro
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Cidade</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={4} className="text-center py-10">Carregando...</TableCell></TableRow>
              ) : (
                bairros.map(bairro => (
                  <TableRow key={bairro.id}>
                    <TableCell className="font-medium">{bairro.name}</TableCell>
                    <TableCell>{bairro.city}</TableCell>
                    <TableCell>{bairro.state}</TableCell>
                    <TableCell className="text-right flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => openDialog(bairro)}><Edit className="h-4 w-4" /></Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(bairro.id)}><Trash2 className="h-4 w-4" /></Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </main>
      
      {/* Modal para Adicionar/Editar */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentBairro?.id ? 'Editar' : 'Adicionar'} Bairro</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="name">Nome do Bairro</Label>
              <Input id="name" value={currentBairro?.name || ''} onChange={(e) => setCurrentBairro(prev => ({...prev, name: e.target.value}))} />
            </div>
             <div>
              <Label htmlFor="city">Cidade</Label>
              <Input id="city" value={currentBairro?.city || ''} onChange={(e) => setCurrentBairro(prev => ({...prev, city: e.target.value}))} />
            </div>
             <div>
              <Label htmlFor="state">Estado (UF)</Label>
              <Input id="state" value={currentBairro?.state || ''} onChange={(e) => setCurrentBairro(prev => ({...prev, state: e.target.value}))} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button type="button" variant="outline">Cancelar</Button></DialogClose>
            <Button onClick={handleSave}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default NeighborhoodAdmin; 