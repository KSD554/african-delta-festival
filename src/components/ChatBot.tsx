import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '🎉 Salut ! Je suis l\'assistant du Festival African Delta ! Comment puis-je t\'aider aujourd\'hui ?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const predefinedResponses: Record<string, string> = {
    'lieu': '📍 Le festival se déroule à l\'Ancien Stade de Bouaké, Côte d\'Ivoire !',
    'date': '📅 Du 26 au 28 décembre 2025 - 3 jours de pur bonheur !',
    'programme': '🎵 Programme complet avec artistes locaux et internationaux ! Plus d\'infos bientôt.',
    'ticket': '🎟️ Les tickets sont GRATUITS ! Inscris-toi avec le formulaire sur cette page.',
    'contact': '📞 +225 0703728301 ou africandeltafestival@gmail.com',
    'transport': '🚌 Des navettes seront organisées depuis Abidjan. Détails à venir !',
    'hébergement': '🏨 Liste d\'hôtels partenaires disponible sur notre page Facebook.',
    'facebook': '📱 Suis-nous sur facebook.com/african_deltafestival',
    'artistes': '🎤 Lineup incroyable en préparation ! Annonces officielles sur nos réseaux.',
    'whatsapp': '💬 Rejoins notre groupe WhatsApp pour les dernières infos ! Lien après inscription.',
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simuler une réponse du bot
    setTimeout(() => {
      let botResponse = '🤔 Je ne suis pas sûr de comprendre. Peux-tu reformuler ta question ?';
      
      const lowerInput = inputMessage.toLowerCase();
      for (const [key, response] of Object.entries(predefinedResponses)) {
        if (lowerInput.includes(key)) {
          botResponse = response;
          break;
        }
      }

      // Toujours pousser vers l'inscription
      if (!lowerInput.includes('ticket') && !lowerInput.includes('inscri')) {
        botResponse += '\n\n🎟️ N\'oublie pas de t\'inscrire gratuitement pour ton ticket !';
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);

    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Bouton flottant */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 rounded-full p-4 bg-gradient-festival hover:scale-110 transition-bounce shadow-glow z-50 ${isOpen ? 'hidden' : 'block'}`}
      >
        <MessageCircle className="w-6 h-6" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 h-96 z-50 shadow-xl border-2 border-festival-orange/20">
          <CardHeader className="bg-gradient-festival text-white rounded-t-lg p-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">🎭 Assistant Festival</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-1"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex flex-col h-full">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg text-sm ${
                        message.isUser
                          ? 'bg-festival-orange text-white'
                          : 'bg-muted text-foreground'
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Pose ta question..."
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-festival-orange hover:bg-festival-coral"
                  size="sm"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChatBot;