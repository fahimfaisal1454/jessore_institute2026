import MemberTable from "../../../components/shared/MemberTable";

export default function DramaMember() {
  const data = [
    {
      voterNo: "601",
      memberNo: "10001",
      name: "নাট্য সদস্য ১",
      date: "2022",
      type: "নাট্য সদস্য",
    },
  ];

  return (
    <MemberTable
      title="নাট্যকলা সদস্য তালিকা"
      data={data}
    />
  );
}