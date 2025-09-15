import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ChatRequest {
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message }: ChatRequest = await req.json();

    const hfToken = Deno.env.get('HUGGING_FACE_ACCESS_TOKEN');
    if (!hfToken) {
      throw new Error('Hugging Face API key not configured');
    }

    const systemPrompt = `Tu es l'assistant virtuel du Festival African Delta, un festival culturel gratuit qui se déroule du 26 au 28 décembre 2025 à Bouaké (Côte d'Ivoire).

INFORMATIONS CLÉS DU FESTIVAL :
- Dates : 26-28 décembre 2025
- Lieu : Ancien Stade de Bouaké, Côte d'Ivoire  
- Entrée : GRATUITE avec inscription obligatoire
- Contact : +225 0703728301 ou africandeltafestival@gmail.com
- Facebook : facebook.com/african_deltafestival

INSTRUCTIONS :
- Réponds de manière chaleureuse et enthousiaste avec des émojis
- Encourage toujours l'inscription gratuite 
- Utilise un ton amical et accessible
- Sois informatif sur le programme, la logistique, les artistes
- Pousse les gens à suivre les réseaux sociaux pour les mises à jour
- Réponds en français
- Garde tes réponses courtes et engageantes (max 100 mots)

Si tu ne connais pas une info spécifique, dis que plus de détails seront annoncés sur Facebook ou par email après inscription.`;

    const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${hfToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: `${systemPrompt}\n\nUtilisateur: ${message}\nAssistant:`,
        parameters: {
          max_new_tokens: 200,
          temperature: 0.8,
          return_full_text: false
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Hugging Face API error: ${response.status}`);
    }

    const data = await response.json();
    let botResponse = "🤖 Désolé, je rencontre un petit problème technique. Réessaie dans quelques secondes !";
    
    if (Array.isArray(data) && data.length > 0 && data[0].generated_text) {
      botResponse = data[0].generated_text.trim();
    }
    
    // Si la réponse est vide ou trop courte, utiliser une réponse par défaut
    if (!botResponse || botResponse.length < 10) {
      botResponse = `🎭 Salut ! Merci de me contacter concernant le Festival African Delta ! 🎉 
      
Le festival se déroule du 26 au 28 décembre 2025 à l'Ancien Stade de Bouaké. L'entrée est GRATUITE mais l'inscription est obligatoire ! 

Que puis-je t'aider à savoir sur cet événement culturel exceptionnel ? 🎟️✨`;
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        response: botResponse 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error: any) {
    console.error('Error in chatbot-response function:', error);
    
    // Fallback response en cas d'erreur
    const fallbackResponse = "🎭 Salut ! Je suis l'assistant du Festival African Delta ! 🎉 Le festival se déroule du 26 au 28 décembre 2025 à Bouaké. L'entrée est gratuite avec inscription obligatoire ! Contacte-nous au +225 0703728301 pour plus d'infos ! 🎟️";
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        response: fallbackResponse 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
};

serve(handler);