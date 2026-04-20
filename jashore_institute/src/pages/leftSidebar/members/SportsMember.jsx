import MemberTable from "../../../components/shared/MemberTable";

export default function SportsMember() {
  const data = [
    {
      voterNo: "501",
      memberNo: "9001",
      name: "ক্রীড়া সদস্য ১",
      date: "12-10-2026",
      type: "ক্রীড়া সদস্য",
    },
  ];

  return (
    <MemberTable
      title="ক্রীড়া সদস্য তালিকা"
      data={data}
    />
  );
}