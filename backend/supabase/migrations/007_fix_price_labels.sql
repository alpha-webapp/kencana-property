-- Fix: Add price_label to rental properties
-- Run this in Supabase SQL Editor

UPDATE properties 
SET price_label = '/bulan' 
WHERE transaction_type = 'disewa' AND price_label IS NULL;
