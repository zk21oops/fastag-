import { Vehicle } from '../lib/supabase';
import { Button } from './Button';
import { Car, Truck, Bike } from 'lucide-react';
import { colors } from '../styles/design-tokens';

interface VehicleListProps {
  vehicles: Vehicle[];
  onRecharge: (vehicle: Vehicle) => void;
  onUpdate: () => void;
}

const vehicleIcons = {
  car: Car,
  truck: Truck,
  bike: Bike,
  two_wheeler: Bike,
  four_wheeler: Car,
  commercial: Truck,
};

export function VehicleList({ vehicles, onRecharge }: VehicleListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {vehicles.map((vehicle) => {
        const IconComponent = vehicleIcons[vehicle.vehicle_type.toLowerCase() as keyof typeof vehicleIcons] || Car;

        return (
          <div
            key={vehicle.id}
            className="p-5 rounded-lg border-2 transition-all duration-300 hover:shadow-lg"
            style={{ borderColor: colors.outline.light, backgroundColor: colors.surface.main }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg" style={{ backgroundColor: colors.background.secondary }}>
                  <IconComponent className="w-6 h-6" style={{ color: colors.primary.main }} />
                </div>
                <div>
                  <h3 className="font-bold text-lg" style={{ color: colors.text.high }}>
                    {vehicle.vehicle_number}
                  </h3>
                  <p className="text-sm capitalize" style={{ color: colors.text.medium }}>
                    {vehicle.vehicle_type.replace('_', ' ')}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span style={{ color: colors.text.medium }}>FASTag ID</span>
                <span className="font-mono" style={{ color: colors.text.high }}>{vehicle.fastag_id}</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: colors.text.medium }}>Balance</span>
                <span className="font-bold text-lg" style={{ color: colors.success.main }}>
                  ₹{vehicle.balance.toFixed(2)}
                </span>
              </div>
            </div>

            <Button
              variant="accent"
              fullWidth
              onClick={() => onRecharge(vehicle)}
            >
              Recharge Now
            </Button>
          </div>
        );
      })}
    </div>
  );
}
