
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import Navbar from "../components/Navbar";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { useToast } from "../hooks/use-toast";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  budget: string;
  neighborhood: string;
  message: string;
}

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    // Simular envio do formulário
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Dados do formulário:', data);
    
    toast({
      title: "Mensagem enviada com sucesso!",
      description: "Entraremos em contato em breve.",
    });
    
    reset();
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-graphite-900 mb-4">
              Entre em Contato
            </h1>
            <p className="text-xl text-graphite-600 max-w-2xl mx-auto">
              Estamos prontos para ajudar você a encontrar o imóvel dos seus sonhos
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Informações de Contato */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-graphite-900">Informações de Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-golden-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-graphite-900">Endereço</h3>
                    <p className="text-graphite-600">
                      Rua das Flores, 123<br />
                      Jardins, São Paulo - SP<br />
                      CEP: 01234-567
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-golden-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-graphite-900">Telefone</h3>
                    <p className="text-graphite-600">
                      (11) 3456-7890<br />
                      (11) 98765-4321
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-golden-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-graphite-900">E-mail</h3>
                    <p className="text-graphite-600">
                      contato@casadourada.com.br<br />
                      vendas@casadourada.com.br
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-golden-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-graphite-900">Horário de Funcionamento</h3>
                    <p className="text-graphite-600">
                      Segunda à Sexta: 8h às 18h<br />
                      Sábado: 8h às 14h<br />
                      Domingo: Fechado
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Formulário de Contato */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-graphite-900">Envie sua Mensagem</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        {...register("name", { required: "Nome é obrigatório" })}
                        placeholder="Seu nome completo"
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500">{errors.name.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email", { 
                          required: "E-mail é obrigatório",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "E-mail inválido"
                          }
                        })}
                        placeholder="seu@email.com"
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email.message}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefone *</Label>
                      <Input
                        id="phone"
                        {...register("phone", { required: "Telefone é obrigatório" })}
                        placeholder="(11) 99999-9999"
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-500">{errors.phone.message}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="propertyType">Tipo de Imóvel</Label>
                      <select
                        id="propertyType"
                        {...register("propertyType")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-golden-500 focus:border-transparent"
                      >
                        <option value="">Selecione</option>
                        <option value="apartamento">Apartamento</option>
                        <option value="casa">Casa</option>
                        <option value="sobrado">Sobrado</option>
                        <option value="cobertura">Cobertura</option>
                        <option value="terreno">Terreno</option>
                        <option value="comercial">Comercial</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget">Faixa de Orçamento</Label>
                      <select
                        id="budget"
                        {...register("budget")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-golden-500 focus:border-transparent"
                      >
                        <option value="">Selecione</option>
                        <option value="ate-300k">Até R$ 300.000</option>
                        <option value="300k-500k">R$ 300.000 - R$ 500.000</option>
                        <option value="500k-800k">R$ 500.000 - R$ 800.000</option>
                        <option value="800k-1M">R$ 800.000 - R$ 1.000.000</option>
                        <option value="acima-1M">Acima de R$ 1.000.000</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="neighborhood">Bairro de Interesse</Label>
                      <Input
                        id="neighborhood"
                        {...register("neighborhood")}
                        placeholder="Ex: Vila Madalena"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem *</Label>
                    <Textarea
                      id="message"
                      {...register("message", { required: "Mensagem é obrigatória" })}
                      placeholder="Conte-nos mais sobre o que você está procurando..."
                      rows={5}
                      className={errors.message ? "border-red-500" : ""}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-500">{errors.message.message}</p>
                    )}
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-golden-500 hover:bg-golden-600 text-white"
                  >
                    {isSubmitting ? (
                      "Enviando..."
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2" />
                        Enviar Mensagem
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
