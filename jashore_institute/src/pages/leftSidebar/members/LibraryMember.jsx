import MemberTable from "../../../components/shared/MemberTable";

export default function LibraryMember() {
  const data = [
    {
      voterNo: "401",
      memberNo: "8001",
      name: "লাইব্রেরি সদস্য ১",
      date: "2020",
      type: "লাইব্রেরি সদস্য",
    },
  ];

  return (
    <MemberTable
      title="লাইব্রেরি সদস্য তালিকা"
      data={data}
    />
  );
}