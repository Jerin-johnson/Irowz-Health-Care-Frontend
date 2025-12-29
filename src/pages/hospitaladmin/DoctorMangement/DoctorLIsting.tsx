import { Pagination } from "../../../components/common/Pagination";
import type { HospitalRequest } from "../../superadmin/HosptialVerfication/HosptialVerficationRequest";

const DoctorLIsting = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cityFilter, setCityFilter] = useState("All Cities");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [currentPage, setCurrentPage] = useState(1);

  const naviage = useNavigate();

  const [hospitalRequests, setHospitalRequests] = useState<HospitalRequest[]>(
    []
  );
  const [totalPages, setTotalPages] = useState(1);

  const [stats, setStats] = useState({
    pending: 0,
    approvedToday: 0,
    rejected: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetch() {
      const res = await getHospitalStats();
      setStats(res);
    }

    fetch();
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);

      async function fetch() {
        const res = await getHospitalRequests({
          page: currentPage,
          limit: 10,
          search: searchTerm || undefined,
          city: cityFilter !== "All Cities" ? cityFilter : undefined,
          status:
            statusFilter !== "All Status"
              ? statusFilter.toUpperCase()
              : undefined,
        });

        setHospitalRequests(res.data);
        setTotalPages(res.pagination.totalPages);
        setLoading(false);
      }

      fetch();
    };

    fetchRequests();
  }, [searchTerm, cityFilter, statusFilter, currentPage]);

  const handleReview = (request: HospitalRequest) => {
    console.log("Review:", request);
    naviage(`/super-admin/verfication-request/${request._id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Hospital Approval Requests
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Review and approve hospital onboarding requests
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending Requests</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {stats.pending}
                </p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Approved Today</p>
                <p className="text-3xl font-bold text-green-600">
                  {stats.approvedToday}
                </p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-5 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Rejected Requests</p>
                <p className="text-3xl font-bold text-red-600">
                  {stats.rejected}
                </p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg border border-gray-200">
          {/* Filters Section */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Hospital Requests
              </h2>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search requests..."
                  className="pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />

                <select
                  value={cityFilter}
                  onChange={(e) => setCityFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option>All Cities</option>
                  <option>anganmaly</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option>All Status</option>
                  <option>Pending</option>
                  <option>Approved</option>
                  <option>Rejected</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Hospital Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    City
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Registration #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-6">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  hospitalRequests.map((request) => (
                    <tr key={request._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {request.hospitalName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {request.hospitalAddress}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm">{request.city}</td>
                      <td className="px-6 py-4 text-sm">
                        {request.officialEmail}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {request.registrationNumber}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {new Date(request.submittedAt).toDateString()}
                      </td>
                      <td className="px-6 py-4">
                        {request.status === "PENDING" && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            {request.status}
                          </span>
                        )}
                        {request.status === "APPROVED" && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {request.status}
                          </span>
                        )}

                        {request.status === "REJECTED" && (
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            {request.status}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleReview(request)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </p>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorLIsting;
