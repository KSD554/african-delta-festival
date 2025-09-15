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

    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
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

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        max_tokens: 200,
        temperature: 0.8
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const botResponse = data.choices[0]?.message?.content || 
      "🤖 Désolé, je rencontre un petit problème technique. Réessaie dans quelques secondes !";

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
    const fallbackResponse = "🎭 Salut ! Je suis temporairement indisponible, mais tu peux me poser des questions sur les dates (26-28 déc 2025), le lieu (Bouaké), l'inscription gratuite ou nous contacter au +225 0703728301 ! 🎟️";
    
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