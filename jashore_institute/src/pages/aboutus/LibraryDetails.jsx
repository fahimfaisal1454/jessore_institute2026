import { useEffect, useState } from "react";
import AxiosInstance from "../../api/AxiosInstance";

export default function LibraryDetails() {
  const [libraries, setLibraries] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    AxiosInstance.get("aboutus/libraries/")
      .then((res) => {
        let data = res.data;

        if (data?.results) {
          setLibraries(data.results);
          setTitle("দেশ বিদেশের বিভিন্ন লাইব্রেরির ঠিকানা/ওয়েবসাইট");
        } else if (data?.libraries) {
          setLibraries(data.libraries);
          setTitle(data.title || "");
        } else if (Array.isArray(data)) {
          setLibraries(data);
          setTitle("দেশ বিদেশের বিভিন্ন লাইব্রেরির ঠিকানা/ওয়েবসাইট");
        } else {
          setLibraries([]);
        }
      })
      .catch((err) =>
        console.error("Library fetch error:", err)
      );
  }, []);

  return (
  <div className="max-w-[1100px] mx-auto bg-white border border-gray-300">
    
    {/* PAGE TITLE */}
    <div className="bg-[#e9e9e9] border-b border-gray-400 px-3 sm:px-5 py-3 text-center">
      <h2 className="text-sm sm:text-[15px] font-bold text-black break-words">
        {title}
      </h2>
    </div>

    {/* TABLE */}
    <div className="p-2 sm:p-4 overflow-x-auto">
      <table className="w-full min-w-[800px] border-collapse border border-black text-xs sm:text-sm">
        
        {/* HEADER */}
        <thead>
          <tr className="bg-[#f1f1f1] text-center font-bold">
            <th className="border border-black px-2 py-3 min-w-[50px] align-middle">
              ক্রম.
            </th>

            <th className="border border-black px-3 py-3 min-w-[150px] text-center align-middle">
              লাইব্রেরির নাম
            </th>

            <th className="border border-black px-3 py-3 min-w-[180px] text-center align-middle">
              ঠিকানা/ওয়েবসাইট
            </th>

            <th className="border border-black px-3 py-3 min-w-[300px] align-middle">
              বিস্তারিত
            </th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {libraries.length > 0 ? (
            libraries.map((library, index) => (
              <tr key={library.id} className="align-middle">
                
                {/* SERIAL */}
                <td className="border border-black px-2 py-4 text-center font-bold align-middle">
                  {index + 1}.
                </td>

                {/* LIBRARY NAME */}
                <td className="border border-black px-3 py-4 text-left font-semibold whitespace-pre-line break-words align-middle">
                  {library.library_name}
                </td>

                {/* ADDRESS */}
                <td className="border border-black px-3 py-4 text-left whitespace-pre-line break-words align-middle">
                  {library.library_address}
                </td>

                {/* DETAILS */}
                <td className="border border-black px-3 sm:px-4 py-4 text-justify whitespace-pre-line break-words leading-relaxed align-middle">
                  {library.library_details}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="4"
                className="border border-black text-center py-8 text-gray-500"
              >
                কোনো লাইব্রেরি তথ্য পাওয়া যায়নি
              </td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  </div>
);
}