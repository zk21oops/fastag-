import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { Container } from '../components/Container';
import { CreditCard } from 'lucide-react';
import { colors } from '../styles/design-tokens';

export function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        if (!fullName || !phone) {
          setError('Please fill in all fields');
          setLoading(false);
          return;
        }
        await signUp(email, password, fullName, phone);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center animate-fadeSlideUp" style={{ backgroundColor: colors.background.primary }}>
      <Container>
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: colors.primary.main }}>
              <CreditCard className="w-8 h-8" style={{ color: colors.text.inverse }} />
            </div>
            <h1 className="text-4xl font-bold mb-2" style={{ color: colors.text.high }}>
              FASTag Recharge
            </h1>
            <p className="text-lg" style={{ color: colors.text.medium }}>
              Quick and secure recharge
            </p>
          </div>

          <Card>
            <div className="mb-6">
              <div className="flex gap-2">
                <Button
                  variant={isLogin ? 'primary' : 'outline'}
                  fullWidth
                  onClick={() => setIsLogin(true)}
                  type="button"
                >
                  Login
                </Button>
                <Button
                  variant={!isLogin ? 'primary' : 'outline'}
                  fullWidth
                  onClick={() => setIsLogin(false)}
                  type="button"
                >
                  Sign Up
                </Button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <>
                  <Input
                    label="Full Name"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </>
              )}

              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {error && (
                <div className="p-3 rounded-lg" style={{ backgroundColor: '#FFEBEE', color: colors.error.main }}>
                  {error}
                </div>
              )}

              <Button type="submit" variant="accent" fullWidth loading={loading}>
                {isLogin ? 'Login' : 'Create Account'}
              </Button>
            </form>
          </Card>
        </div>
      </Container>
    </div>
  );
}
