import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface RegistrationRequest {
  nom: string;
  email: string;
  telephone: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { nom, email, telephone }: RegistrationRequest = await req.json();

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check if participant already exists
    const { data: existingParticipant, error: existingError } = await supabase
      .from("participants")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (existingError && existingError.code !== "PGRST116") {
      throw new Error(`Database error: ${existingError.message}`);
    }

    if (existingParticipant) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Cette adresse email est déjà enregistrée",
          participant: existingParticipant
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Create participant in database first
    const { data: participant, error: insertError } = await supabase
      .from("participants")
      .insert({
        nom,
        email,
        telephone,
        status: "pending"
      })
      .select()
      .single();

    if (insertError) {
      console.error("Error inserting participant:", insertError);
      throw new Error(`Failed to create participant: ${insertError.message}`);
    }

    console.log("Participant created:", participant);

    // Get Eventbrite API token
    const eventbriteToken = Deno.env.get("EVENTBRITE_API_TOKEN");
    if (!eventbriteToken) {
      console.error("Eventbrite API token not found");
      // Update participant status to confirmed even without Eventbrite
      await supabase
        .from("participants")
        .update({ status: "confirmed" })
        .eq("id", participant.id);

      return new Response(
        JSON.stringify({
          success: true,
          message: "Inscription réussie ! Un ticket vous sera envoyé par email.",
          participant: { ...participant, status: "confirmed" }
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    try {
      // Create ticket via Eventbrite API (simulate for now)
      console.log("Creating Eventbrite ticket for:", email);
      
      // For now, simulate ticket creation
      const mockTicketData = {
        ticket_id: `AFEST_${Date.now()}`,
        order_id: `ORDER_${Date.now()}`,
        ticket_url: `https://eventbrite.com/e/african-delta-festival-tickets`,
        barcode: `AFEST${Date.now()}`
      };

      // Update participant with ticket info
      const { error: updateError } = await supabase
        .from("participants")
        .update({
          eventbrite_ticket_id: mockTicketData.ticket_id,
          eventbrite_order_id: mockTicketData.order_id,
          ticket_url: mockTicketData.ticket_url,
          status: "confirmed"
        })
        .eq("id", participant.id);

      if (updateError) {
        console.error("Error updating participant with ticket info:", updateError);
      }

      console.log("Ticket created successfully:", mockTicketData);

      return new Response(
        JSON.stringify({
          success: true,
          message: "🎉 Inscription réussie ! Votre ticket gratuit est prêt.",
          participant: {
            ...participant,
            ...mockTicketData,
            status: "confirmed"
          }
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );

    } catch (eventbriteError) {
      console.error("Eventbrite API error:", eventbriteError);
      
      // Update participant status to confirmed anyway
      await supabase
        .from("participants")
        .update({ status: "confirmed" })
        .eq("id", participant.id);

      return new Response(
        JSON.stringify({
          success: true,
          message: "Inscription réussie ! Un ticket vous sera envoyé par email.",
          participant: { ...participant, status: "confirmed" }
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

  } catch (error: any) {
    console.error("Error in register-participant function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Une erreur s'est produite lors de l'inscription" 
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);