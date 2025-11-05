import { useState } from 'react';
import { supabase, Vehicle } from '../lib/supabase';
import { Button } from './Button';
import { Input } from './Input';
import { X, CheckCircle } from 'lucide-react';
import { colors } from '../styles/design-tokens';

interface RechargeModalProps {
  vehicle: Vehicle;
  onClose: () => void;
  onSuccess: () => void;
}

const rechargeAmounts = [100, 200, 500, 1000, 2000, 5000];
const paymentMethods = [
  { value: 'upi', label: 'UPI' },
  { value: 'card', label: 'Credit/Debit Card' },
  { value: 'netbanking', label: 'Net Banking' },
];

export function RechargeModal({ vehicle, onClose, onSuccess }: RechargeModalProps) {
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleAmountSelect = (value: number) => {
    setAmount(value.toString());
    setCustomAmount('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const rechargeAmount = parseFloat(customAmount || amount);
    if (rechargeAmount < 100) {
      setError('Minimum recharge amount is ₹100');
      setLoading(false);
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const transactionRef = `TXN${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      const { error: txError } = await supabase.from('recharge_transactions').insert({
        user_id: user.id,
        vehicle_id: vehicle.id,
        amount: rechargeAmount,
        status: 'completed',
        payment_method: paymentMethod,
        transaction_ref: transactionRef,
      });

      if (txError) throw txError;

      const { error: updateError } = await supabase
        .from('vehicles')
        .update({
          balance: vehicle.balance + rechargeAmount,
          updated_at: new Date().toISOString(),
        })
        .eq('id', vehicle.id);

      if (updateError) throw updateError;

      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="max-w-md w-full rounded-xl p-8 text-center animate-fadeSlideUp" style={{ backgroundColor: colors.surface.main }}>
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: '#E8F5E9' }}>
            <CheckCircle className="w-10 h-10" style={{ color: colors.success.main }} />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: colors.text.high }}>
            Recharge Successful!
          </h2>
          <p style={{ color: colors.text.medium }}>
            ₹{customAmount || amount} has been added to your FASTag account
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="max-w-md w-full rounded-xl p-6 animate-fadeSlideUp" style={{ backgroundColor: colors.surface.main }}>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: colors.text.high }}>
              Recharge FASTag
            </h2>
            <p className="text-sm" style={{ color: colors.text.medium }}>
              {vehicle.vehicle_number}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" style={{ color: colors.text.medium }} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-3" style={{ color: colors.text.high }}>
              Select Amount
            </label>
            <div className="grid grid-cols-3 gap-2">
              {rechargeAmounts.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleAmountSelect(value)}
                  className={`
                    py-3 px-4 rounded-lg border-2 font-semibold transition-all duration-200
                    ${amount === value.toString() ? 'scale-105' : ''}
                  `}
                  style={{
                    borderColor: amount === value.toString() ? colors.accent.main : colors.outline.main,
                    backgroundColor: amount === value.toString() ? colors.accent.main : colors.surface.main,
                    color: amount === value.toString() ? colors.text.inverse : colors.text.high,
                  }}
                >
                  ₹{value}
                </button>
              ))}
            </div>
          </div>

          <Input
            label="Or Enter Custom Amount"
            type="number"
            placeholder="Enter amount"
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setAmount('');
            }}
            min="100"
          />

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.text.high }}>
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                borderColor: colors.outline.main,
                backgroundColor: colors.surface.main,
                color: colors.text.high,
              }}
            >
              {paymentMethods.map((method) => (
                <option key={method.value} value={method.value}>
                  {method.label}
                </option>
              ))}
            </select>
          </div>

          {error && (
            <div className="p-3 rounded-lg" style={{ backgroundColor: '#FFEBEE', color: colors.error.main }}>
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <Button type="button" variant="outline" fullWidth onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="accent"
              fullWidth
              loading={loading}
              disabled={!amount && !customAmount}
            >
              Pay ₹{customAmount || amount || 0}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
