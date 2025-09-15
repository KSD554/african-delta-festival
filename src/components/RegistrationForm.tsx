import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation d'inscription (remplacé par l'API Eventbrite + Supabase une fois connecté)
    setTimeout(() => {
      toast({
        title: "🎉 Inscription réussie !",
        description: `Merci ${formData.nom} ! Votre ticket gratuit vous sera envoyé par email.`,
      });
      
      // Réinitialiser le formulaire
      setFormData({ nom: '', email: '', telephone: '' });
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-festival border-2 border-festival-orange/20">
      <CardHeader className="text-center bg-gradient-festival text-white rounded-t-lg">
        <CardTitle className="text-xl font-bold">
          🎟️ Inscription Gratuite
        </CardTitle>
        <p className="text-sm opacity-90">Obtenez votre ticket maintenant !</p>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              name="nom"
              placeholder="Votre nom complet *"
              value={formData.nom}
              onChange={handleInputChange}
              required
              className="border-festival-orange/30 focus:border-festival-orange"
            />
          </div>
          <div>
            <Input
              type="email"
              name="email"
              placeholder="Votre email *"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="border-festival-orange/30 focus:border-festival-orange"
            />
          </div>
          <div>
            <Input
              type="tel"
              name="telephone"
              placeholder="Votre téléphone *"
              value={formData.telephone}
              onChange={handleInputChange}
              required
              className="border-festival-orange/30 focus:border-festival-orange"
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-cta hover:scale-105 transition-bounce text-white font-bold py-3 text-lg shadow-glow"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                Inscription en cours...
              </span>
            ) : (
              "🎟 Je m'inscris gratuitement"
            )}
          </Button>
        </form>
        <p className="text-xs text-muted-foreground text-center">
          * Tous les champs sont obligatoires
        </p>
      </CardContent>
    </Card>
  );
};

export default RegistrationForm;