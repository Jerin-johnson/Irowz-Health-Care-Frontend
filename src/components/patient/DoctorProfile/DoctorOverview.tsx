interface Props {
  name: string;
  about: string;
}

const DoctorOverview: React.FC<Props> = ({ name, about }) => {
  return (
    <div>
      <h3 className="text-xl font-bold mb-4">About {name}</h3>
      <p className="text-gray-600 leading-relaxed">{about}</p>
    </div>
  );
};

export default DoctorOverview;
