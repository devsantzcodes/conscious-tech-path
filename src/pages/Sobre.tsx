import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Linkedin, Mail, Send } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { toast } from 'sonner';

const Sobre = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const teamMembers = [
    {
      name: 'Ana Paula Vieira',
      linkedin: 'https://www.linkedin.com/in/ana-paula-vieira',
    },
    {
      name: 'Gabriel Hasshimoto',
      linkedin: 'https://www.linkedin.com/in/gabriel-hasshimoto',
    },
    {
      name: 'Gustavo Freire',
      linkedin: 'https://www.linkedin.com/in/gustavo-freire',
    },
    {
      name: 'Jonathan Nascimento',
      linkedin: 'https://www.linkedin.com/in/jonathan-nascimento',
    },
    {
      name: 'Roni Santos',
      linkedin: 'https://www.linkedin.com/in/roni-santos',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Preencha todos os campos');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error('Email inválido');
      return;
    }

    toast.success('Mensagem enviada com sucesso!', {
      description: 'Entraremos em contato em breve.',
    });
    
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Sobre o Projeto
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Escalas Delete - Detox Digital é baseado no livro homônimo e tem como missão
              promover o uso consciente de tecnologias, ajudando pessoas a equilibrar sua
              vida digital e melhorar sua saúde mental, produtividade e relacionamentos.
            </p>
          </div>

          <Card className="gradient-feature border-none shadow-medium mb-16 animate-slide-up">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl font-bold mb-6 text-center">Nossa Missão</h2>
              <div className="space-y-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                <p>
                  Vivemos em uma era de conexão constante, onde a tecnologia oferece infinitas
                  possibilidades, mas também pode gerar dependência e impactar negativamente
                  nossa qualidade de vida.
                </p>
                <p>
                  Este projeto oferece ferramentas científicas para avaliar seus hábitos
                  digitais, compreender os impactos da dependência tecnológica e descobrir
                  práticas que promovem um equilíbrio saudável.
                </p>
                <p>
                  Acreditamos que a tecnologia deve servir o ser humano, não o contrário.
                  Nosso objetivo é capacitar você a retomar o controle da sua vida digital.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center animate-fade-in">
              Nossa Equipe
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member, index) => (
                <Card
                  key={index}
                  className="gradient-card border-none shadow-soft hover:shadow-medium transition-smooth animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 gradient-hero rounded-full mx-auto mb-4 flex items-center justify-center shadow-soft">
                      <span className="text-3xl font-bold text-white">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{member.name}</h3>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary hover:text-primary/80 transition-smooth"
                    >
                      <Linkedin className="h-5 w-5 mr-2" />
                      LinkedIn
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="gradient-card border-none shadow-medium animate-slide-up">
            <CardContent className="p-8 md:p-12">
              <div className="max-w-2xl mx-auto">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 gradient-hero rounded-full mx-auto mb-4 flex items-center justify-center shadow-soft">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold mb-2">Entre em Contato</h2>
                  <p className="text-muted-foreground">
                    Tem dúvidas ou sugestões? Envie-nos uma mensagem!
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      placeholder="Seu nome completo"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensagem</Label>
                    <Textarea
                      id="message"
                      placeholder="Escreva sua mensagem aqui..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="min-h-[150px] resize-none"
                    />
                  </div>

                  <Button type="submit" variant="default" size="lg" className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Mensagem
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Sobre;
