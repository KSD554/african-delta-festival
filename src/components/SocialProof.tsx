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
    <section className="py-12 md:py-16 bg-gradient-to-br from-background to-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4 text-gradient-festival">
          🌟 Ce que disent nos participants
        </h2>
        <p className="text-center text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto text-sm md:text-base">
          Rejoins une communauté passionnée qui vit déjà l'expérience African Delta !
        </p>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center hover:scale-105 transition-bounce shadow-festival">
              <CardContent className="p-4 md:p-6">
                <stat.icon className="w-6 h-6 md:w-8 md:h-8 mx-auto mb-2 md:mb-3 text-primary" />
                <div className="text-xl md:text-2xl font-bold text-foreground">{stat.count}</div>
                <div className="text-xs md:text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Témoignages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:scale-105 transition-bounce shadow-festival border-l-4 border-primary">
              <CardContent className="p-4 md:p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-hero flex items-center justify-center text-white font-bold text-sm md:text-base">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm md:text-base">{testimonial.name}</div>
                    <div className="text-xs md:text-sm text-muted-foreground">
                      {testimonial.platform} • {testimonial.followers} followers
                    </div>
                  </div>
                </div>
                <p className="text-xs md:text-sm italic">"{testimonial.text}"</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-8 md:mt-12">
          <p className="text-base md:text-lg font-semibold text-foreground mb-4">
            Rejoins-nous sur les réseaux sociaux ! 📱
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
            <a 
              href="https://facebook.com/african_deltafestival" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-4 md:px-6 py-2 rounded-full hover:scale-105 transition-bounce flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <Facebook className="w-4 h-4" />
              Facebook
            </a>
            <a 
              href="#" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 md:px-6 py-2 rounded-full hover:scale-105 transition-bounce flex items-center justify-center gap-2 text-sm md:text-base"
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