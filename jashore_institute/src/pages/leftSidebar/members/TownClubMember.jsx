import MemberTable from "../../../components/shared/MemberTable";

export default function TownClubMember() {
  const data = [
    {
      voterNo: "701",
      memberNo: "11001",
      name: "টাউন ক্লাব সদস্য ১",
      date: "2022",
      type: "টাউন ক্লাব সদস্য",
    },
  ];

  return (
    <MemberTable
      title="টাউন ক্লাব সদস্য তালিকা"
      data={data}
    />
  );
}