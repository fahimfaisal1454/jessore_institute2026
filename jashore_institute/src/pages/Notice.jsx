export default function Notice() {
  const notices = [
    {
      id: 1,
      title: "মাঠ বরাদ্ধের আবেদন ফরম",
      type: "pdf",
      file: "/pdfs/field-form.pdf",
      date: "10 Apr 2026",
    },
    {
      id: 2,
      title: "ছুটির আবেদন ফরম",
      type: "pdf",
      file: "/pdfs/leave-form.pdf",
      date: "08 Apr 2026",
    },
    {
      id: 3,
      title: "বার্ষিক সভার নোটিশ",
      type: "image",
      file: "/notices/notice1.jpg",
      date: "05 Apr 2026",
    },
    {
      id: 4,
      title: "সাধারণ বিজ্ঞপ্তি",
      type: "text",
      content: "আগামী শুক্রবার অফিস বন্ধ থাকবে।",
      date: "01 Apr 2026",
    },
  ];

  return (
    <div className="max-w-[1100px] mx-auto">

      <div className="bg-white border shadow-sm">

        {/* Header */}
        <div className="bg-[#e9e9e9] border-b px-4 py-2 font-semibold">
          নোটিশ
        </div>

        {/* Notice List */}
        <div className="p-4 space-y-3">

          {notices.map((notice) => (
            <div
              key={notice.id}
              className="flex justify-between items-center border p-3 hover:bg-gray-50"
            >

              <div>
                <p className="font-medium">{notice.title}</p>
                <p className="text-xs text-gray-500">{notice.date}</p>
              </div>

              {/* Action */}
              <div>
                {notice.type === "pdf" && (
                  <a
                    href={notice.file}
                    target="_blank"
                    className="text-blue-600 underline"
                  >
                    দেখুন
                  </a>
                )}

                {notice.type === "image" && (
                  <a
                    href={notice.file}
                    target="_blank"
                    className="text-green-600 underline"
                  >
                    ছবি দেখুন
                  </a>
                )}

                {notice.type === "text" && (
                  <span className="text-gray-700 text-sm">
                    {notice.content}
                  </span>
                )}
              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}