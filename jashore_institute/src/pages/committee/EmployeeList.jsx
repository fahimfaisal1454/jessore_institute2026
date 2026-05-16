import React, { useEffect, useState } from "react";
import AxiosInstance from "../../api/AxiosInstance";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH EMPLOYEES
  // =========================
  useEffect(() => {
    AxiosInstance.get("admin/committee/employees/")
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((err) => {
        console.error("Failed to load employees:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // =========================
  // GROUP EMPLOYEES BY DEPARTMENT
  // =========================
  const groupedEmployees = employees.reduce((acc, employee) => {
    if (!acc[employee.department]) {
      acc[employee.department] = [];
    }

    acc[employee.department].push(employee);

    return acc;
  }, {});

  // =========================
  // DEPARTMENT TITLES
  // =========================
  const departmentTitles = {
    general: "সাধারণ বিভাগ",
    library: "লাইব্রেরি বিভাগ",
    sports: "ক্রীড়া সংসদ",
    drama: "নাট্যকলা সংসদ",
  };

  // =========================
  // FIXED DISPLAY ORDER
  // =========================
  const departmentOrder = [
    "general",
    "library",
    "sports",
    "drama",
  ];

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="text-center py-12 text-gray-600 text-lg">
        Loading employee list...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md border border-gray-300 p-3 md:p-4">

      {/* PAGE TITLE */}
      <div className="text-center mb-6 border-b border-gray-300 pb-2">
        <h1 className="text-xl md:text-xl font-bold text-gray-800">
          কর্মকর্তা/কর্মচারী তালিকা
        </h1>
      </div>

      {/* ALL DEPARTMENTS */}
      {departmentOrder
        .filter((departmentKey) => groupedEmployees[departmentKey])
        .map((departmentKey) => (
          <div key={departmentKey} className="mb-8">

            {/* DEPARTMENT HEADER */}
            <div className="bg-green-700 text-white text-center text-sm md:text-base font-bold px-3 py-2 mb-3">
              {departmentTitles[departmentKey]}
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full table-fixed border-collapse border border-gray-400 text-xs md:text-sm">

                {/* TABLE HEADER */}
                <thead>
                  <tr className="bg-gray-200 h-12">
                    <th className="border border-gray-400 w-12 min-w-[48px] max-w-[48px] px-1 py-1 text-center align-middle">
                      ক্রমঃ
                    </th>

                    <th className="border border-gray-400 w-48 min-w-[192px] max-w-[192px] px-2 py-1 text-center align-middle">
                      নাম
                    </th>

                    <th className="border border-gray-400 w-56 min-w-[224px] max-w-[224px] px-2 py-1 text-center align-middle">
                      পদবী
                    </th>

                    <th className="border border-gray-400 w-40 min-w-[160px] max-w-[160px] px-2 py-1 text-center align-middle">
                      বিভাগ
                    </th>

                    <th className="border border-gray-400 w-24 min-w-[96px] max-w-[96px] px-1 py-1 text-center align-middle">
                      ছবি
                    </th>
                  </tr>
                </thead>

                {/* TABLE BODY */}
                <tbody>
                  {groupedEmployees[departmentKey]
                    .sort((a, b) => a.serial - b.serial)
                    .map((employee, index) => (
                      <tr
                        key={employee.id}
                        className={`h-16 ${
                          index % 2 === 0
                            ? "bg-white"
                            : "bg-gray-50"
                        } hover:bg-green-50 transition`}
                      >
                        {/* SERIAL */}
                        <td className="border border-gray-400 w-12 min-w-[48px] max-w-[48px] px-1 py-1 text-center align-middle overflow-hidden">
                          <div className="truncate">
                            {employee.serial}
                          </div>
                        </td>

                        {/* NAME */}
                        <td className="border border-gray-400 w-48 min-w-[192px] max-w-[192px] px-2 py-1 align-middle overflow-hidden">
                          <div className="line-clamp-2 break-words font-semibold text-gray-800">
                            {employee.name}
                          </div>
                        </td>

                        {/* POSITION */}
                        <td className="border border-gray-400 w-56 min-w-[224px] max-w-[224px] px-2 py-1 align-middle overflow-hidden">
                          <div className="line-clamp-2 break-words text-gray-700">
                            {employee.position}
                          </div>
                        </td>

                        {/* DEPARTMENT */}
                        <td className="border border-gray-400 w-40 min-w-[160px] max-w-[160px] px-2 py-1 align-middle overflow-hidden">
                          <div className="line-clamp-2 break-words text-gray-700">
                            {departmentTitles[employee.department]}
                          </div>
                        </td>

                        {/* IMAGE */}
                        <td className="border border-gray-400 w-24 min-w-[96px] max-w-[96px] px-1 py-1 text-center align-middle">
                          {employee.image ? (
                            <img
                              src={employee.image}
                              alt={employee.name}
                              className="w-12 h-12 object-cover mx-auto rounded border"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gray-200 flex items-center justify-center mx-auto text-[9px] text-gray-500 rounded border">
                              No Image
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>

              </table>
            </div>
          </div>
        ))}

      {/* NO DATA */}
      {employees.length === 0 && (
        <div className="text-center py-8 text-gray-500 text-sm">
          No employees found.
        </div>
      )}
    </div>
  );
}