import CommitteeHistory from "../components/shared/CommitteeHistory";

export default function LibraryOld() {
  return (
    <CommitteeHistory
      title="লাইব্রেরি বিভাগ – প্রাক্তন"
      data={[
        { year: "2020-2023", file: "/pdfs/lib1.pdf" },
        { year: "2023-2026", file: "/pdfs/lib2.pdf" },
      ]}
    />
  );
}