import CountdownTimer from '@/components/CountdownTimer';
import RegistrationForm from '@/components/RegistrationForm';
import SocialProof from '@/components/SocialProof';
import ChatBot from '@/components/ChatBot';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Calendar, Users, Music } from 'lucide-react';
import logoImage from '@/assets/logo-african-delta.jpg';
import bannerImage from '@/assets/festival-banner.jpg';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header avec compte à rebours */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-festival-orange/20 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <CountdownTimer />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-hero overflow-hidden">
        {/* Motifs africains animés en arrière-plan */}
        <div className="absolute inset-0 opacity-10">
          <div className="animate-african-pattern text-3xl md:text-6xl">🎭 🥁 🎵 🌍 ✨</div>
        </div>
        
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
          {/* Contenu principal */}
          <div className="text-center lg:text-left text-white">
            {/* Logo */}
            <div className="mb-6 md:mb-8 flex justify-center lg:justify-start">
              <img 
                src={logoImage} 
                alt="African Delta Festival Logo" 
                className="w-32 md:w-48 h-auto animate-pulse-slow shadow-glow rounded-2xl"
              />
            </div>
            
            {/* Titre principal */}
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 animate-bounce-gentle">
              🔥🎶 Le compte à rebours est lancé !
            </h1>
            
            <h2 className="text-xl md:text-2xl lg:text-4xl font-bold mb-4 md:mb-6">
              AFRICAN DELTA FESTIVAL débarque à Bouaké !
            </h2>
            
            {/* Sous-titre */}
            <p className="text-base md:text-xl lg:text-2xl mb-6 md:mb-8 opacity-90 leading-relaxed">
              Trois jours de musique, danse, culture et ambiance légendaire 🌍✨
            </p>
            
            {/* Informations clés */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8 text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 md:p-4">
                <Calendar className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-2" />
                <div className="font-bold text-sm md:text-base">26-28 DÉC</div>
                <div className="text-xs md:text-sm opacity-80">2025</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 md:p-4">
                <MapPin className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-2" />
                <div className="font-bold text-sm md:text-base">BOUAKÉ</div>
                <div className="text-xs md:text-sm opacity-80">Ancien Stade</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 md:p-4">
                <Users className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-2" />
                <div className="font-bold text-sm md:text-base">GRATUIT</div>
                <div className="text-xs md:text-sm opacity-80">Inscription</div>
              </div>
            </div>

            {/* CTA Principal */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 hover:scale-105 transition-bounce font-bold text-sm md:text-lg px-6 md:px-8 py-3 md:py-4 shadow-glow"
                onClick={() => document.getElementById('inscription')?.scrollIntoView({ behavior: 'smooth' })}
              >
                🎟 Je m'inscris gratuitement
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary transition-bounce font-bold text-sm md:text-lg px-6 md:px-8 py-3 md:py-4"
                onClick={() => document.getElementById('infos')?.scrollIntoView({ behavior: 'smooth' })}
              >
                📋 Plus d'infos
              </Button>
            </div>
          </div>

          {/* Image du festival */}
          <div className="flex justify-center mt-8 lg:mt-0">
            <img 
              src={bannerImage} 
              alt="African Delta Festival 2025" 
              className="w-full max-w-xs md:max-w-md rounded-3xl shadow-festival hover:scale-105 transition-bounce"
            />
          </div>
        </div>
      </section>

      {/* Section Inscription */}
      <section id="inscription" className="py-12 md:py-20 bg-gradient-to-br from-background to-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-4 text-gradient-festival">
              🎟️ Inscription Gratuite
            </h2>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Ne rate pas le plus grand festival culturel de Côte d'Ivoire ! 
              Inscris-toi maintenant et reçois ton ticket gratuit par email.
            </p>
          </div>
          
          <div className="flex justify-center">
            <RegistrationForm />
          </div>
        </div>
      </section>

      {/* Section Preuves Sociales */}
      <SocialProof />

      {/* Section Informations */}
      <section id="infos" className="py-12 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-gradient-festival">
            📋 Informations Pratiques
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <Card className="hover:scale-105 transition-bounce shadow-festival">
              <CardContent className="p-4 md:p-6 text-center">
                <MapPin className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 text-primary" />
                <h3 className="text-lg md:text-xl font-bold mb-2 text-foreground">Lieu</h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  📍 Ancien Stade de Bouaké<br />
                  Bouaké, Côte d'Ivoire
                </p>
              </CardContent>
            </Card>

            <Card className="hover:scale-105 transition-bounce shadow-festival">
              <CardContent className="p-4 md:p-6 text-center">
                <Calendar className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 text-primary" />
                <h3 className="text-lg md:text-xl font-bold mb-2 text-foreground">Dates</h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  📅 Du 26 au 28 décembre 2025<br />
                  3 jours non-stop !
                </p>
              </CardContent>
            </Card>

            <Card className="hover:scale-105 transition-bounce shadow-festival">
              <CardContent className="p-4 md:p-6 text-center">
                <Music className="w-8 h-8 md:w-12 md:h-12 mx-auto mb-3 md:mb-4 text-primary" />
                <h3 className="text-lg md:text-xl font-bold mb-2 text-foreground">Programme</h3>
                <p className="text-muted-foreground text-sm md:text-base">
                  🎵 Artistes locaux & internationaux<br />
                  Annonces bientôt !
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Contact</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm md:text-base">
                  <Phone className="w-4 h-4" />
                  <span>+225 0703728301</span>
                </div>
                <div className="flex items-center gap-2 text-sm md:text-base">
                  <Mail className="w-4 h-4" />
                  <span>africandeltafestival@gmail.com</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Réseaux Sociaux</h3>
              <div className="space-y-2">
                <a href="https://facebook.com/african_deltafestival" className="block hover:text-secondary transition-colors text-sm md:text-base">
                  🌍 Facebook
                </a>
                <a href="#" className="block hover:text-secondary transition-colors text-sm md:text-base">
                  📸 Instagram
                </a>
                <a href="#" className="block hover:text-secondary transition-colors text-sm md:text-base">
                  🎵 TikTok
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Festival</h3>
              <div className="space-y-2 text-sm md:text-base">
                <div>📅 26-28 Décembre 2025</div>
                <div>📍 Ancien Stade de Bouaké</div>
                <div>🎟️ Entrée gratuite</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">À propos</h3>
              <p className="text-xs md:text-sm opacity-90">
                Le plus grand festival culturel d'Afrique de l'Ouest revient pour une édition exceptionnelle !
              </p>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-6 md:mt-8 pt-6 md:pt-8 text-center">
            <p className="text-sm md:text-base">&copy; 2025 African Delta Festival. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <ChatBot />
    </div>
  );
};

export default Index;
