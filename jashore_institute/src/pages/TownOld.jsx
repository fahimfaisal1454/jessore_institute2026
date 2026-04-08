import CommitteeHistory from "../components/shared/CommitteeHistory";

export default function TownOld() {
  return (
    <CommitteeHistory
      title="টাউন ক্লাব – প্রাক্তন"
      data={[
        { year: "2017-2020", file: "/pdfs/town1.pdf" },
        { year: "2020-2023", file: "/pdfs/town2.pdf" },
      ]}
    />
  );
}