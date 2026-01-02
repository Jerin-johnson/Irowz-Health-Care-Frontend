import { useCallback, useEffect, useState } from "react";
import { getHospitalSpeicalityApi } from "../../../api/apiService/hospitalAdmin/specialitymangement";

export interface HospitalSpeciality {
  _id: string;
  hosptialId: string;
  name: string;
  description: string;
  isActive: boolean;
  createdAt: Date;
}

interface Params {
  page: number;
  search?: string;
  isActive?: boolean | null;
}

export function useHospitalSpeciality(params: Params) {
  const [specialitys, setspecialitys] = useState<HospitalSpeciality[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalSpecialityCount, setTotalSpecialityCount] = useState(0);
  const [activeSpecialityCount, setActiveSpecialityCount] = useState(0);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getHospitalSpeicalityApi({
        page: params.page,
        limit: 5,
        search: params.search,
        isActive: params.isActive,
      });

      setspecialitys(res.data);
      setTotalSpecialityCount(res.totalSpecialityCount);
      setActiveSpecialityCount(res.activeSpecialityCount);
      setTotalPages(res.pagination.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [params.page, params.search, params.isActive]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return {
    specialitys,
    setspecialitys,
    loading,
    totalPages,
    totalSpecialityCount,
    activeSpecialityCount,
    setActiveSpecialityCount,
    refetch: fetch,
  };
}
