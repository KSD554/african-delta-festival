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
          <div className="animate-african-pattern text-6xl">🎭 🥁 🎵 🌍 ✨</div>
        </div>
        
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center relative z-10">
          {/* Contenu principal */}
          <div className="text-center lg:text-left text-white">
            {/* Logo */}
            <div className="mb-8 flex justify-center lg:justify-start">
              <img 
                src={logoImage} 
                alt="African Delta Festival Logo" 
                className="w-48 h-auto animate-pulse-slow shadow-glow rounded-2xl"
              />
            </div>
            
            {/* Titre principal */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-bounce-gentle">
              🔥🎶 Le compte à rebours est lancé !
            </h1>
            
            <h2 className="text-2xl md:text-4xl font-bold mb-6">
              AFRICAN DELTA FESTIVAL débarque à Bouaké !
            </h2>
            
            {/* Sous-titre */}
            <p className="text-xl md:text-2xl mb-8 opacity-90 leading-relaxed">
              Trois jours de musique, danse, culture et ambiance légendaire 🌍✨
            </p>
            
            {/* Informations clés */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <Calendar className="w-6 h-6 mx-auto mb-2" />
                <div className="font-bold">26-28 DÉC</div>
                <div className="text-sm opacity-80">2025</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <MapPin className="w-6 h-6 mx-auto mb-2" />
                <div className="font-bold">BOUAKÉ</div>
                <div className="text-sm opacity-80">Ancien Stade</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <Users className="w-6 h-6 mx-auto mb-2" />
                <div className="font-bold">GRATUIT</div>
                <div className="text-sm opacity-80">Inscription</div>
              </div>
            </div>

            {/* CTA Principal */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-white text-festival-brown hover:bg-white/90 hover:scale-105 transition-bounce font-bold text-lg px-8 py-4 shadow-glow"
                onClick={() => document.getElementById('inscription')?.scrollIntoView({ behavior: 'smooth' })}
              >
                🎟 Je m'inscris gratuitement
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-festival-brown transition-bounce font-bold text-lg px-8 py-4"
                onClick={() => document.getElementById('infos')?.scrollIntoView({ behavior: 'smooth' })}
              >
                📋 Plus d'infos
              </Button>
            </div>
          </div>

          {/* Image du festival */}
          <div className="flex justify-center">
            <img 
              src={bannerImage} 
              alt="African Delta Festival 2025" 
              className="w-full max-w-md rounded-3xl shadow-festival hover:scale-105 transition-bounce"
            />
          </div>
        </div>
      </section>

      {/* Section Inscription */}
      <section id="inscription" className="py-20 bg-gradient-to-br from-background to-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gradient-festival">
              🎟️ Inscription Gratuite
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
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
      <section id="infos" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gradient-festival">
            📋 Informations Pratiques
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:scale-105 transition-bounce shadow-festival">
              <CardContent className="p-6 text-center">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-festival-orange" />
                <h3 className="text-xl font-bold mb-2 text-festival-brown">Lieu</h3>
                <p className="text-muted-foreground">
                  📍 Ancien Stade de Bouaké<br />
                  Bouaké, Côte d'Ivoire
                </p>
              </CardContent>
            </Card>

            <Card className="hover:scale-105 transition-bounce shadow-festival">
              <CardContent className="p-6 text-center">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-festival-orange" />
                <h3 className="text-xl font-bold mb-2 text-festival-brown">Dates</h3>
                <p className="text-muted-foreground">
                  📅 Du 26 au 28 décembre 2025<br />
                  3 jours non-stop !
                </p>
              </CardContent>
            </Card>

            <Card className="hover:scale-105 transition-bounce shadow-festival">
              <CardContent className="p-6 text-center">
                <Music className="w-12 h-12 mx-auto mb-4 text-festival-orange" />
                <h3 className="text-xl font-bold mb-2 text-festival-brown">Programme</h3>
                <p className="text-muted-foreground">
                  🎵 Artistes locaux & internationaux<br />
                  Annonces bientôt !
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-festival-brown text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+225 0703728301</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>africandeltafestival@gmail.com</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Réseaux Sociaux</h3>
              <div className="space-y-2">
                <a href="https://facebook.com/african_deltafestival" className="block hover:text-festival-yellow transition-colors">
                  🌍 Facebook
                </a>
                <a href="#" className="block hover:text-festival-yellow transition-colors">
                  📸 Instagram
                </a>
                <a href="#" className="block hover:text-festival-yellow transition-colors">
                  🎵 TikTok
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Festival</h3>
              <div className="space-y-2">
                <div>📅 26-28 Décembre 2025</div>
                <div>📍 Ancien Stade de Bouaké</div>
                <div>🎟️ Entrée gratuite</div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">À propos</h3>
              <p className="text-sm opacity-90">
                Le plus grand festival culturel d'Afrique de l'Ouest revient pour une édition exceptionnelle !
              </p>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p>&copy; 2025 African Delta Festival. Tous droits réservés.</p>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      <ChatBot />
    </div>
  );
};

export default Index;
