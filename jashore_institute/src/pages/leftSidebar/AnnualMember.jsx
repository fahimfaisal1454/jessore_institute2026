export default function AnnualMember() {
  return (
    <div className="max-w-5xl mx-auto p-4 bg-white">
      <h1 className="text-xl font-bold mb-4 text-center">
        আজীবন সদস্য তালিকা
      </h1>

      <iframe
        src="/pdfs/annual-member.pdf"
        className="w-full h-[80vh]"
        title="Annual Member PDF"
      />
    </div>
  );
}