import { Card, CardContent } from '@/components/ui/card';
import { Instagram, Facebook, Music } from 'lucide-react';

const SocialProof = () => {
  const testimonials = [
    {
      name: "Aminata K.",
      text: "Incroyable ! L'ambiance était magique l'année dernière. J'ai hâte de revivre ça ! 🔥",
      platform: "Instagram",
      followers: "12K"
    },
    {
      name: "Koffi D.",
      text: "Le meilleur festival d'Afrique de l'Ouest ! La musique, la danse, tout était parfait ! 🎵",
      platform: "Facebook",
      followers: "8K"
    },
    {
      name: "Fatoumata S.",
      text: "Mes enfants ont adoré ! Un événement familial exceptionnel à Bouaké ! 🌟",
      platform: "TikTok",
      followers: "25K"
    }
  ];

  const stats = [
    { icon: Instagram, label: "Followers Instagram", count: "15K+" },
    { icon: Facebook, label: "Fans Facebook", count: "22K+" },
    { icon: Music, label: "Participants 2024", count: "5000+" }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-festival-yellow/10 to-festival-coral/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 text-gradient-festival">
          🌟 Ce que disent nos participants
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Rejoins une communauté passionnée qui vit déjà l'expérience African Delta !
        </p>

        {/* Statistiques */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:scale-105 transition-bounce shadow-festival">
              <CardContent className="p-6">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-festival-orange" />
                <div className="text-2xl font-bold text-festival-brown">{stat.count}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Témoignages */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:scale-105 transition-bounce shadow-festival border-l-4 border-festival-orange">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-festival flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-festival-brown">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.platform} • {testimonial.followers} followers
                    </div>
                  </div>
                </div>
                <p className="text-sm italic">"{testimonial.text}"</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <p className="text-lg font-semibold text-festival-brown mb-4">
            Rejoins-nous sur les réseaux sociaux ! 📱
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="https://facebook.com/african_deltafestival" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:scale-105 transition-bounce flex items-center gap-2"
            >
              <Facebook className="w-4 h-4" />
              Facebook
            </a>
            <a 
              href="#" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:scale-105 transition-bounce flex items-center gap-2"
            >
              <Instagram className="w-4 h-4" />
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;