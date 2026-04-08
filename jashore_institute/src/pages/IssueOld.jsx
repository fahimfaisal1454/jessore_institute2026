import CommitteeHistory from "../components/shared/CommitteeHistory";

export default function IssueOld() {
  return (
    <CommitteeHistory
      title="ইস্যু বিভাগ – প্রাক্তন"
      data={[
        { year: "2018-2021", file: "/pdfs/issue1.pdf" },
        { year: "2021-2024", file: "/pdfs/issue2.pdf" },
      ]}
    />
  );
}