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

    const openrouterKey = Deno.env.get('OPENROUTER_API_KEY');
    if (!openrouterKey) {
      throw new Error('OpenRouter API key not configured');
    }

    const systemPrompt = `Tu es l'assistant virtuel du Festival African Delta, un festival culturel gratuit qui se déroule du 26 au 28 décembre 2025 à Bouaké (Côte d'Ivoire).

    INFORMATIONS CLÉS DU FESTIVAL :
    - Dates : 26-28 décembre 2025
    - Lieu : Ancien Stade de Bouaké, Côte d'Ivoire  
    - Entrée : GRATUITE avec inscription obligatoire
    - Contact : +225 0703728301 ou africandeltafestival@gmail.com

    INSTRUCTIONS :
    - Réponds de manière chaleureuse et enthousiaste avec des émojis
    - Encourage toujours l'inscription gratuite 
    - Utilise un ton amical et accessible
    - Sois informatif sur le programme, la logistique, les artistes
    - Pousse les gens à suivre les réseaux sociaux pour les mises à jour (sans partager d'URL)
    - Réponds en français
    - Garde tes réponses courtes et engageantes (max 100 mots)

    Si tu ne connais pas une info spécifique, dis que plus de détails seront annoncés sur nos réseaux sociaux ou par email après inscription.`;

    // Appel OpenRouter pour une réponse fiable
    const callOpenRouter = async (): Promise<string | null> => {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openrouterKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://africandelta.lovable.app',
          'X-Title': 'African Delta Chatbot'
        },
        body: JSON.stringify({
          model: 'openrouter/auto',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message }
          ],
          max_tokens: 220,
          temperature: 0.8
        })
      });

      if (!res.ok) {
        const body = await res.text().catch(() => '');
        console.error('OpenRouter error:', res.status, body);
        return null;
      }

      const data = await res.json();
      const content = data?.choices?.[0]?.message?.content;
      return content ? String(content).trim() : null;
    };

    let botResponse = await callOpenRouter();

    if (!botResponse || botResponse.length < 10) {
      const defaults = [
        `🎭 Salut ! Le Festival African Delta arrive du 26 au 28 déc. 2025 à Bouaké. Entrée GRATUITE avec inscription obligatoire. Pose-moi ta question ! 🎉`,
        `✨ Hey ! Hâte de te voir au Festival African Delta (26–28 déc. 2025, Bouaké). Inscription gratuite obligatoire. Comment puis-je t'aider ? 🎟️`,
        `👋 Bienvenue ! Dis-m’en plus sur ce que tu veux savoir (programme, horaires, accès). Je réponds en quelques secondes !`
      ];
      botResponse = defaults[Math.floor(Math.random() * defaults.length)];
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
    
    // Fallback response en cas d'erreur (sans partager d'URLs)
    const fallbackResponse = "🎭 Oups, petit souci technique. Réessaie dans un instant ! Festival African Delta (26–28 déc. 2025, Bouaké). Inscription GRATUITE obligatoire. 🎟️";
    
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