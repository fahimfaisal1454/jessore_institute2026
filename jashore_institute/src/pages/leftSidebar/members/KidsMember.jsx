import MemberTable from "../../../components/shared/MemberTable";

export default function KidsMember() {
  const data = [
    {
      voterNo: "801",
      memberNo: "12001",
      name: "শিশু সদস্য ১",
      date: "2023",
      type: "শিশু সদস্য",
    },
  ];

  return (
    <MemberTable
      title="শিশু চিত্তবিনোদন কেন্দ্র সদস্য তালিকা"
      data={data}
    />
  );
}