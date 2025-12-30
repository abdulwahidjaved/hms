export default function PatientRegistration() {
  return (
    <div className="patientRegistration border dark:border-white rounded-md p-6 w-full">

      <h2 className="text-3xl font-bold mb-6">Patient Registration</h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Patient ID */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Patient ID</label>
          <input
            type="text"
            placeholder="P021"
            className="border-2 dark:border-white p-2 rounded-md"
          />
        </div>

        {/* Gender */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Gender</label>
          <select className="border-2 dark:border-white p-2 rounded-md">
            <option>Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        {/* First Name */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">First Name</label>
          <input
            type="text"
            placeholder="John"
            className="border-2 dark:border-white p-2 rounded-md"
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Last Name</label>
          <input
            type="text"
            placeholder="Doe"
            className="border-2 dark:border-white p-2 rounded-md"
          />
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Date of Birth</label>
          <input
            type="date"
            className="border-2 dark:border-white p-2 rounded-md"
          />
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Phone</label>
          <input
            type="tel"
            placeholder="+91 9876543210"
            className="border-2 dark:border-white p-2 rounded-md"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Email</label>
          <input
            type="email"
            placeholder="example@email.com"
            className="border-2 dark:border-white p-2 rounded-md"
          />
        </div>

        {/* Insurance Provider */}
        <div className="flex flex-col">
          <label className="font-medium mb-1">Insurance Provider</label>
          <input
            type="text"
            placeholder="ABC Insurance"
            className="border-2 dark:border-white p-2 rounded-md"
          />
        </div>

        <div className="flex flex-col md:col-span-2">
          <label className="font-medium mb-1">Address</label>
          <input
            type="text"
            placeholder="Walfram Street"
            className="border-2 dark:border-white p-2 rounded-md"
            />
        </div>
            {/* Insurance Number */}

        <div className="flex flex-col md:col-span-2">
          <label className="font-medium mb-1">Insurance Number</label>
          <input
            type="text"
            placeholder="INS-123456789"
            className="border-2 dark:border-white p-2 rounded-md"
          />
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 flex justify-center w-full px-6">
          <button className="bg-gray-600 text-white px-6 py-2 rounded-md  transition w-full">
            Register Patient
          </button>
        </div>
      </form>
    </div>
  );
}
