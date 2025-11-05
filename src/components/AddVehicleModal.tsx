import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Button } from './Button';
import { Input } from './Input';
import { X } from 'lucide-react';
import { colors } from '../styles/design-tokens';

interface AddVehicleModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

const vehicleTypes = [
  { value: 'two_wheeler', label: 'Two Wheeler' },
  { value: 'car', label: 'Car' },
  { value: 'commercial', label: 'Commercial Vehicle' },
];

export function AddVehicleModal({ onClose, onSuccess }: AddVehicleModalProps) {
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('car');
  const [fastagId, setFastagId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error: insertError } = await supabase.from('vehicles').insert({
        user_id: user.id,
        vehicle_number: vehicleNumber.toUpperCase(),
        vehicle_type: vehicleType,
        fastag_id: fastagId,
        balance: 0,
      });

      if (insertError) throw insertError;
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="max-w-md w-full rounded-xl p-6 animate-fadeSlideUp" style={{ backgroundColor: colors.surface.main }}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold" style={{ color: colors.text.high }}>
            Add Vehicle
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" style={{ color: colors.text.medium }} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Vehicle Number"
            placeholder="e.g., DL01AB1234"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            required
          />

          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: colors.text.high }}>
              Vehicle Type
            </label>
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                borderColor: colors.outline.main,
                backgroundColor: colors.surface.main,
                color: colors.text.high,
              }}
            >
              {vehicleTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <Input
            label="FASTag ID"
            placeholder="Enter FASTag ID"
            value={fastagId}
            onChange={(e) => setFastagId(e.target.value)}
            required
          />

          {error && (
            <div className="p-3 rounded-lg" style={{ backgroundColor: '#FFEBEE', color: colors.error.main }}>
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <Button type="button" variant="outline" fullWidth onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="accent" fullWidth loading={loading}>
              Add Vehicle
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
