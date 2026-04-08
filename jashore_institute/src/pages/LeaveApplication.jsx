export default function LeaveApplication() {
  return (
    <div className="max-w-[1100px] mx-auto h-[90vh]">

      <div className="bg-white border shadow-sm h-full">

        {/* Header */}
        <div className="bg-[#e9e9e9] border-b px-4 py-2 font-semibold">
          ছুটির আবেদন ফরম
        </div>

        {/* PDF */}
        <iframe
          src="/pdfs/leave-form.pdf"
          title="Leave Application Form"
          className="w-full h-full"
        ></iframe>

      </div>

    </div>
  );
}