interface Props {
  onCancel: () => void;
}

const DoctorWaitingForPatient = ({ onCancel }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <p className="text-lg font-semibold mb-4">Calling patient…</p>

      <button
        onClick={onCancel}
        className="px-4 py-2 bg-red-500 text-white rounded-lg"
      >
        Cancel Call
      </button>
    </div>
  );
};

export default DoctorWaitingForPatient;
