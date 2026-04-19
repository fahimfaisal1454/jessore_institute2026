export default function LifeMember() {
  return (
    <div className="max-w-5xl mx-auto p-4 bg-white">
      <h1 className="text-xl font-bold mb-4 text-center">
        দাতা সদস্য তালিকা
      </h1>

      <iframe
        src="/pdfs/life-member.pdf"
        className="w-full h-[80vh]"
        title="Life Member PDF"
      />
    </div>
  );
}