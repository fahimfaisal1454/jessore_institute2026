import MemberTable from "../../../components/shared/MemberTable";

export default function AnnualMember() {
  const data = [
    {
      voterNo: "101",
      memberNo: "5001",
      name: `মোঃ আব্দুল করিম
পিতা: আব্দুল হক
যশোর`,
      date: "12-05-90",
      type: "আজীবন সদস্য",
      mobile: "",
      image: "",
    },
  ];

  return (
    <MemberTable
      title="আজীবন সদস্য তালিকা"
      data={data}
    />
  );
}