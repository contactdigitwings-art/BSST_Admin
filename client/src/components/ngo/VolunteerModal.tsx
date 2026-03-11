import VolunteerForm from './VolunteerForm';
export default function VolunteerModal({ onClose }: { onClose: () => void }) {
  return (
    <VolunteerForm onSuccess={onClose} />
  );
}