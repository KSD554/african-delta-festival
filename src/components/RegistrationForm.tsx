import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useIsMobile } from '@/hooks/use-mobile';
import { Download } from 'lucide-react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationResult, setRegistrationResult] = useState<any>(null);
  const { toast } = useToast();
  const isMobile = useIsMobile();

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

    try {
      const { data, error } = await supabase.functions.invoke('register-participant', {
        body: {
          nom: formData.nom,
          email: formData.email,
          telephone: formData.telephone
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      const result = data;

      if (!result.success) {
        toast({
          title: "❌ Erreur",
          description: result.error,
          variant: "destructive"
        });
        return;
      }

      // Inscription réussie
      setRegistrationResult(result);
      toast({
        title: "🎉 Inscription réussie !",
        description: `Merci ${formData.nom} ! ${result.message}`,
      });
      
      // Réinitialiser le formulaire
      setFormData({ nom: '', email: '', telephone: '' });

    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: "❌ Erreur",
        description: error.message || "Une erreur s'est produite lors de l'inscription",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadTicket = async () => {
    if (!registrationResult?.participant) {
      toast({
        title: "❌ Erreur",
        description: "Données du participant non disponibles",
        variant: "destructive"
      });
      return;
    }

    try {
      // Call the ticket PDF generation function
      const { data, error } = await supabase.functions.invoke('generate-ticket-pdf', {
        body: {
          participant: registrationResult.participant
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (!data.success) {
        throw new Error(data.error);
      }

      if (isMobile) {
        // Sur mobile, créer un lien de téléchargement direct
        const blob = new Blob([data.ticketHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        // Créer un lien de téléchargement temporaire
        const link = document.createElement('a');
        link.href = url;
        link.download = `ticket-${data.participantName.replace(/\s+/g, '-')}.html`;
        
        // Ajouter le lien au DOM, cliquer, puis le supprimer
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Libérer l'URL objet
        URL.revokeObjectURL(url);
        
        toast({
          title: "🎟️ Ticket téléchargé",
          description: `Ticket pour ${data.participantName} téléchargé !`,
        });
      } else {
        // Sur desktop, utiliser la méthode d'impression
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(data.ticketHTML);
          printWindow.document.close();
          
          // Wait a moment for content to load then print
          setTimeout(() => {
            printWindow.print();
            printWindow.close();
          }, 1000);
          
          toast({
            title: "🎟️ Ticket généré",
            description: `Ticket pour ${data.participantName} prêt à imprimer !`,
          });
        } else {
          throw new Error("Impossible d'ouvrir la fenêtre d'impression");
        }
      }
    } catch (error: any) {
      console.error('Ticket generation error:', error);
      toast({
        title: "❌ Erreur",
        description: error.message || "Erreur lors de la génération du ticket",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-festival border-2 border-primary/20">
      <CardHeader className="text-center bg-gradient-hero text-white rounded-t-lg">
        <CardTitle className="text-lg md:text-xl font-bold">
          🎟️ Inscription Gratuite
        </CardTitle>
        <p className="text-xs md:text-sm opacity-90">Obtenez votre ticket maintenant !</p>
      </CardHeader>
      <CardContent className="p-4 md:p-6 space-y-4">
        {registrationResult ? (
          <div className="text-center space-y-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-800 mb-2">
                ✅ Inscription confirmée !
              </h3>
              <p className="text-green-700 mb-4">
                Bonjour {registrationResult.participant.nom}, votre inscription est confirmée.
              </p>
              {registrationResult.participant.eventbrite_ticket_id && (
                <p className="text-sm text-green-600 mb-4">
                  ID Ticket: {registrationResult.participant.eventbrite_ticket_id}
                </p>
              )}
            </div>
            
            <Button
              onClick={downloadTicket}
              className="w-full bg-gradient-cta hover:scale-105 transition-bounce text-white font-bold py-2 md:py-3 text-sm md:text-lg shadow-glow"
            >
              <Download className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Télécharger mon ticket
            </Button>
            
            <Button
              onClick={() => setRegistrationResult(null)}
              variant="outline"
              className="w-full"
            >
              Nouvelle inscription
            </Button>
          </div>
        ) : (
          <>
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
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default RegistrationForm;