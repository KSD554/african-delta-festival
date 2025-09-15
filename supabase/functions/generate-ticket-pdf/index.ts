import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface TicketRequest {
  participant: {
    id: string;
    nom: string;
    email: string;
    eventbrite_ticket_id?: string;
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { participant }: TicketRequest = await req.json();

    // Generate ticket HTML content
    const ticketHTML = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Ticket African Delta Festival</title>
        <style>
            body { 
                font-family: Arial, sans-serif; 
                margin: 0; 
                padding: 20px;
                background: linear-gradient(135deg, #ff6b35 0%, #f9ca24 100%);
            }
            .ticket {
                background: white;
                border-radius: 20px;
                padding: 30px;
                max-width: 400px;
                margin: 0 auto;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                border: 3px solid #ff6b35;
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
            }
            .title {
                color: #ff6b35;
                font-size: 24px;
                font-weight: bold;
                margin: 10px 0;
            }
            .subtitle {
                color: #333;
                font-size: 16px;
                margin-bottom: 20px;
            }
            .info {
                margin: 15px 0;
                padding: 10px;
                background: #f8f9fa;
                border-radius: 10px;
            }
            .label {
                font-weight: bold;
                color: #333;
            }
            .value {
                color: #666;
                margin-left: 10px;
            }
            .qr-section {
                text-align: center;
                margin: 20px 0;
                padding: 20px;
                background: #f0f0f0;
                border-radius: 15px;
            }
            .ticket-id {
                font-family: monospace;
                background: #333;
                color: white;
                padding: 10px;
                border-radius: 5px;
                display: inline-block;
                margin: 10px 0;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                font-size: 12px;
                color: #666;
            }
        </style>
    </head>
    <body>
        <div class="ticket">
            <div class="header">
                <h1 class="title">🎵 AFRICAN DELTA FESTIVAL</h1>
                <p class="subtitle">TICKET GRATUIT - ENTRÉE LIBRE</p>
            </div>
            
            <div class="info">
                <span class="label">👤 Participant:</span>
                <span class="value">${participant.nom}</span>
            </div>
            
            <div class="info">
                <span class="label">📧 Email:</span>
                <span class="value">${participant.email}</span>
            </div>
            
            <div class="info">
                <span class="label">📅 Dates:</span>
                <span class="value">26-28 Décembre 2025</span>
            </div>
            
            <div class="info">
                <span class="label">📍 Lieu:</span>
                <span class="value">Ancien Stade de Bouaké</span>
            </div>
            
            <div class="qr-section">
                <div style="font-size: 48px; margin: 10px 0;">🎟️</div>
                <div class="ticket-id">ID: ${participant.eventbrite_ticket_id || participant.id}</div>
                <p style="margin: 10px 0; font-size: 12px;">Présentez ce ticket à l'entrée</p>
            </div>
            
            <div class="footer">
                <p>🌍 Le plus grand festival culturel d'Afrique de l'Ouest</p>
                <p>Gardez ce ticket précieusement • Entrée gratuite</p>
                <p>Info: +225 0703728301</p>
            </div>
        </div>
    </body>
    </html>`;

    // Return the HTML content that can be converted to PDF by the client
    return new Response(
      JSON.stringify({
        success: true,
        ticketHTML: ticketHTML,
        participantName: participant.nom
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );

  } catch (error: any) {
    console.error("Error in generate-ticket-pdf function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Erreur lors de la génération du ticket" 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);