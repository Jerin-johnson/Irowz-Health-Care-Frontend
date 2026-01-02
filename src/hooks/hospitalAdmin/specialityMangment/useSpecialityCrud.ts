// import {
//   blockOrUnBlockSpecialty,
//   createSpecialityApi,
//   editSpecialityApi,
// } from "../../../api/apiService/hospitalAdmin/specialitymangement";
// import { confirmAction } from "../../../shared/notification/confirm";
// import { notify } from "../../../shared/notification/toast";

// export function useSpecialityCrud() {
//   async function blockSpeciality(id: string) {
//     const confirmed = await confirmAction({
//       title: "Block the specialty?",
//       description: "This permanently blocks the specialty",
//       confirmText: "Block",
//       type: "warning",
//     });

//     if (!confirmed) return false;

//     await blockOrUnBlockSpecialty({ specailtyId: id, status: false });
//     notify.error("Specialty blocked successfully");
//     return true;
//   }

//   async function unblockSpeciality(id: string) {
//     const confirmed = await confirmAction({
//       title: "Unblock the specialty?",
//       description: "This unblocks the specialty",
//       confirmText: "Unblock",
//       type: "warning",
//     });

//     if (!confirmed) return false;

//     await blockOrUnBlockSpecialty({ specailtyId: id, status: true });
//     notify.success("Specialty unblocked successfully");
//     return true;
//   }

//   async function createSpeciality(name: string, description: string) {
//     await createSpecialityApi(name, description);
//     notify.success("Specialty created successfully");
//   }

//   async function editSpeciality(id: string, name: string, description: string) {
//     await editSpecialityApi(id, name, description);
//     notify.success("Specialty updated successfully");
//   }

//   return {
//     blockSpeciality,
//     unblockSpeciality,
//     createSpeciality,
//     editSpeciality,
//   };
// }
