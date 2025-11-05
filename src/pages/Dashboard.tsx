import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, Vehicle, RechargeTransaction } from '../lib/supabase';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Container } from '../components/Container';
import { VehicleList } from '../components/VehicleList';
import { AddVehicleModal } from '../components/AddVehicleModal';
import { RechargeModal } from '../components/RechargeModal';
import { LogOut, Plus, History } from 'lucide-react';
import { colors } from '../styles/design-tokens';

export function Dashboard() {
  const { signOut, profile } = useAuth();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [transactions, setTransactions] = useState<RechargeTransaction[]>([]);
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [showRecharge, setShowRecharge] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    loadVehicles();
    loadTransactions();
  }, []);

  const loadVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVehicles(data || []);
    } catch (error) {
      console.error('Error loading vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('recharge_transactions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      console.error('Error loading transactions:', error);
    }
  };

  const handleRecharge = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setShowRecharge(true);
  };

  const handleRechargeSuccess = () => {
    loadVehicles();
    loadTransactions();
    setShowRecharge(false);
  };

  return (
    <div className="min-h-screen animate-fadeSlideUp" style={{ backgroundColor: colors.background.primary }}>
      <div className="border-b" style={{ backgroundColor: colors.surface.main, borderColor: colors.outline.main }}>
        <Container>
          <div className="py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold" style={{ color: colors.text.high }}>
                FASTag Dashboard
              </h1>
              <p className="text-sm" style={{ color: colors.text.medium }}>
                Welcome back, {profile?.full_name}
              </p>
            </div>
            <Button variant="outline" onClick={() => signOut()} size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </Container>
      </div>

      <Container className="py-8">
        <div className="grid gap-6 mb-8">
          <Card>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold" style={{ color: colors.text.high }}>
                My Vehicles
              </h2>
              <Button
                variant="accent"
                size="sm"
                onClick={() => setShowAddVehicle(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Vehicle
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-8" style={{ color: colors.text.medium }}>
                Loading vehicles...
              </div>
            ) : vehicles.length === 0 ? (
              <div className="text-center py-8">
                <p className="mb-4" style={{ color: colors.text.medium }}>
                  No vehicles added yet
                </p>
                <Button variant="primary" onClick={() => setShowAddVehicle(true)}>
                  Add Your First Vehicle
                </Button>
              </div>
            ) : (
              <VehicleList vehicles={vehicles} onRecharge={handleRecharge} onUpdate={loadVehicles} />
            )}
          </Card>

          <Card>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold" style={{ color: colors.text.high }}>
                Recent Transactions
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowHistory(!showHistory)}
              >
                <History className="w-4 h-4 mr-2" />
                {showHistory ? 'Hide' : 'View All'}
              </Button>
            </div>

            {transactions.length === 0 ? (
              <div className="text-center py-8" style={{ color: colors.text.medium }}>
                No transactions yet
              </div>
            ) : (
              <div className="space-y-3">
                {transactions.slice(0, showHistory ? undefined : 5).map((transaction) => {
                  const vehicle = vehicles.find(v => v.id === transaction.vehicle_id);
                  return (
                    <div
                      key={transaction.id}
                      className="flex justify-between items-center p-4 rounded-lg border"
                      style={{ borderColor: colors.outline.light }}
                    >
                      <div>
                        <p className="font-medium" style={{ color: colors.text.high }}>
                          {vehicle?.vehicle_number || 'Unknown Vehicle'}
                        </p>
                        <p className="text-sm" style={{ color: colors.text.medium }}>
                          {new Date(transaction.created_at).toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg" style={{ color: colors.success.main }}>
                          ₹{transaction.amount.toFixed(2)}
                        </p>
                        <p className="text-sm capitalize" style={{ color: colors.text.medium }}>
                          {transaction.status}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>
      </Container>

      {showAddVehicle && (
        <AddVehicleModal
          onClose={() => setShowAddVehicle(false)}
          onSuccess={() => {
            setShowAddVehicle(false);
            loadVehicles();
          }}
        />
      )}

      {showRecharge && selectedVehicle && (
        <RechargeModal
          vehicle={selectedVehicle}
          onClose={() => setShowRecharge(false)}
          onSuccess={handleRechargeSuccess}
        />
      )}
    </div>
  );
}
