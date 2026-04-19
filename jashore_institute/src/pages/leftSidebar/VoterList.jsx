export default function VoterList() {
  const data = [
    {
      year: "২০২২-২৩",
      donor: "/pdfs/2022-donor.pdf",
      life: "/pdfs/2022-life.pdf",
      general: "/pdfs/2022-general.pdf",
    },
    {
      year: "২০২১-২২",
      donor: "/pdfs/2021-donor.pdf",
      life: "/pdfs/2021-life.pdf",
      general: "/pdfs/2021-general.pdf",
    },
    {
      year: "২০২০-২১",
      donor: "/pdfs/2020-donor.pdf",
      life: "/pdfs/2020-life.pdf",
      general: "/pdfs/2020-general.pdf",
    },
    {
      year: "২০১৯-২০",
      donor: "/pdfs/2019-donor.pdf",
      life: "/pdfs/2019-life.pdf",
      general: "/pdfs/2019-general.pdf",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 bg-white">

      {/* Title */}
      <h1 className="text-3xl font-bold text-pink-500 text-center mb-6">
        বিগত বছরের ভোটার তালিকা
      </h1>

      {/* Table */}
      <div className="space-y-4">
        {data.map((item, i) => (
          <div
            key={i}
            className="flex flex-col md:flex-row md:items-center gap-3"
          >
            {/* Year Box */}
            <div className="border px-4 py-2 rounded-md w-full md:w-1/3 font-semibold">
              ভোটার তালিকা {item.year} খ্রি.
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-2">
              
              <a
                href={item.donor}
                target="_blank"
                className="border px-4 py-1 rounded-md hover:bg-gray-100"
              >
                দাতা সদস্য
              </a>

              <a
                href={item.life}
                target="_blank"
                className="border px-4 py-1 rounded-md hover:bg-gray-100"
              >
                আজীবন সদস্য
              </a>

              <a
                href={item.general}
                target="_blank"
                className="border px-4 py-1 rounded-md hover:bg-gray-100"
              >
                সাধারণ সদস্য
              </a>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
}