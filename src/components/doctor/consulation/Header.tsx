// import { User, Clock } from "lucide-react";
// import type { Patient } from "../../../types/doctor/doctor.consulation.types";

// interface Props {
//   patient: Patient;
// }

// const Header = ({ patient }: Props) => (
//   <Card className="p-6 mb-6">
//     <div className="flex justify-between items-start">
//       <div className="flex items-start gap-4">
//         <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
//           <User className="w-6 h-6 text-blue-600" />
//         </div>
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">
//             {patient.fullName}
//           </h1>
//           <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
//             <span>
//               {patient.age} Years / {patient.gender}
//             </span>
//             <span className="flex items-center gap-1">
//               <span className="w-1 h-1 bg-red-500 rounded-full"></span>
//               {patient.bloodGroup}
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="text-right">
//         <div className="flex items-center justify-end gap-2 mb-2">
//           <Clock className="w-4 h-4 text-gray-400" />
//           <span className="text-sm text-gray-600">{patient.visitTime}</span>
//         </div>
//         <div className="flex items-center justify-end gap-3">
//           <Badge variant="blue">{patient.visitType}</Badge>
//           <Badge variant="gray">Queue {patient.queue}</Badge>
//           <Badge variant="green">{patient.status}</Badge>
//         </div>
//       </div>
//     </div>
//   </Card>
// );

// export default Header;
