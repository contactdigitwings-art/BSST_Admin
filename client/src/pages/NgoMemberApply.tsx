import VolunteerForm from '../components/VolunteerForm';

// Just drop the form in the middle of the page
export default function MemberApply() { 
  return (
<div className="max-w-4xl mx-auto p-10 bg-white shadow-xl">
    <VolunteerForm onSuccess={() => alert("Success!")} />
</div>
  );
}