import RegisterForm from './RegisterForm';

export default function RegisterModal({ onClose }: { onClose: () => void }) {
  return (
    <RegisterForm onSuccess={onClose} />
  );
}