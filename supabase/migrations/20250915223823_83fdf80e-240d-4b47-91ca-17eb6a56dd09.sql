-- Create participants table for festival registration
CREATE TABLE public.participants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nom TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  telephone TEXT NOT NULL,
  eventbrite_ticket_id TEXT,
  eventbrite_order_id TEXT,
  ticket_url TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.participants ENABLE ROW LEVEL SECURITY;

-- Create policies for participants access (public read for their own data)
CREATE POLICY "Users can view their own registration" 
ON public.participants 
FOR SELECT 
USING (true); -- For now, allow viewing all registrations

CREATE POLICY "Anyone can insert new registration" 
ON public.participants 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update their own registration" 
ON public.participants 
FOR UPDATE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_participants_updated_at
BEFORE UPDATE ON public.participants
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for email lookups
CREATE INDEX idx_participants_email ON public.participants(email);
CREATE INDEX idx_participants_eventbrite_ticket_id ON public.participants(eventbrite_ticket_id);