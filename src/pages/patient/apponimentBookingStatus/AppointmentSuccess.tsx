import { useQuery } from "@tanstack/react-query";
import {
  CheckCircle,
  Calendar,
  Clock,
  User,
  CreditCard,
  FileText,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { successAppoinmentBooking } from "../../../api/apiService/patient/doctorBooking";

export default function AppointmentSuccess() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { data: appointmentData, isPending } = useQuery({
    queryKey: ["booking:success", id],
    queryFn: () => successAppoinmentBooking(id as string),
    enabled: !!id,
  });

  if (isPending) return <div>Loading</div>;

  console.log("The appoiment data is", appointmentData);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Success Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-20 h-20 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Appointment Booked Successfully!
          </h1>
          <p className="text-gray-600">
            Your appointment has been confirmed. We've sent the details to your
            email.
          </p>
        </div>

        {/* Appointment Details */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Appointment Details
          </h2>

          <div className="space-y-4">
            {/* Doctor Info */}
            <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
              <User className="w-5 h-5 text-blue-600 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Doctor</p>
                <p className="text-base font-semibold text-gray-800">
                  {appointmentData.doctorName}
                </p>
                <p className="text-sm text-gray-500">
                  {appointmentData.specialtyName}
                </p>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
              <Calendar className="w-5 h-5 text-blue-600 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Date</p>
                <p className="text-base font-semibold text-gray-800">
                  {appointmentData.date}
                </p>
              </div>
            </div>

            {/* Time */}
            <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
              <Clock className="w-5 h-5 text-blue-600 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Time</p>
                <p className="text-base font-semibold text-gray-800">
                  {appointmentData.startTime}
                </p>
              </div>
            </div>

            {/* Booking ID */}
            <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
              <FileText className="w-5 h-5 text-blue-600 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Booking ID</p>
                <p className="text-base font-semibold text-gray-800">
                  {appointmentData._id}
                </p>
              </div>
            </div>

            {/* Mode */}
            {/* <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
              {appointmentData.mode === "Online" ? (
                <Video className="w-5 h-5 text-blue-600 mt-1" />
              ) : (
                <MapPin className="w-5 h-5 text-blue-600 mt-1" />
              )}
              <div className="flex-1">
                <p className="text-sm text-gray-600">Consultation Mode</p>
                <p className="text-base font-semibold text-gray-800">
                  {appointmentData.visitType}
                </p>
              </div>
            </div> */}

            {/* Patient Name */}
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-blue-600 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Patient Name</p>
                <p className="text-base font-semibold text-gray-800">
                  {appointmentData.patientSnapshot?.firstName}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6">
            Payment Details
          </h2>

          <div className="space-y-4">
            {/* Amount */}
            <div className="flex justify-between items-center pb-4 border-b border-gray-200">
              <span className="text-gray-600">Amount Paid</span>
              <span className="text-lg font-bold text-gray-800">
                {appointmentData.totalAmount}
              </span>
            </div>

            {/* Payment Method */}
            <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
              <CreditCard className="w-5 h-5 text-blue-600 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Payment Method</p>
                <p className="text-base font-semibold text-gray-800">
                  {appointmentData.paymentMethod}
                </p>
              </div>
            </div>

            {/* Transaction ID */}
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-blue-600 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-600">Transaction ID</p>
                <p className="text-base font-semibold text-gray-800">
                  {appointmentData.transactionId}
                </p>
              </div>
            </div>

            {/* Payment Status Badge */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-800 font-semibold">
                  Payment Successful
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate("/patient/appointments")}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            View My Appointments
          </button>
          <button
            onClick={() => navigate("/patient/doctors")}
            className="flex-1 bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-6 rounded-lg border-2 border-gray-300 transition-colors duration-200"
          >
            Go to Home
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Please join the consultation 5 minutes before
            the scheduled time.
            {/* {appointmentData.mode === "Online" &&
              " You will receive a meeting link via email and SMS."} */}
          </p>
        </div>
      </div>
    </div>
  );
}
