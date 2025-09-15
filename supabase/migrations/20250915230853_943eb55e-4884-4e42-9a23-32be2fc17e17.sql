-- Fix security vulnerability in participants table RLS policies
-- Remove overly permissive policies that allow unrestricted access

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Anyone can insert new registration" ON public.participants;
DROP POLICY IF EXISTS "Users can view their own registration" ON public.participants;
DROP POLICY IF EXISTS "Users can update their own registration" ON public.participants;

-- Create secure policies for public registration system
-- Allow public registration (no authentication required for INSERT)
CREATE POLICY "Allow public registration" 
ON public.participants 
FOR INSERT 
TO public 
WITH CHECK (true);

-- No SELECT policy - participants data should not be directly accessible
-- Data retrieval should only happen through secure edge functions

-- No UPDATE policy - participants should not modify their registration directly
-- Updates should only happen through secure edge functions if needed

-- No DELETE policy - maintain data integrity