import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  created_at: string;
  updated_at: string;
};

export type Vehicle = {
  id: string;
  user_id: string;
  vehicle_number: string;
  vehicle_type: string;
  fastag_id: string;
  balance: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type RechargeTransaction = {
  id: string;
  user_id: string;
  vehicle_id: string;
  amount: number;
  status: string;
  payment_method: string;
  transaction_ref: string;
  created_at: string;
};
