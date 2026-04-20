import MemberTable from "../../../components/shared/MemberTable";

export default function LifeMember() {
  const data = [
    {
      voterNo: "90",
      memberNo: "1205",
      name: `মোঃ রজব আলী আহমেদ
পিতা: মৃত বদরুদ্দিন আহমেদ
ঢাকা`,
      date: "21-08-68",
      type: "জীবন সদস্য",
      mobile: "",
      image: "",
    },
  ];

  return (
    <MemberTable
      title="দাতা সদস্য তালিকা"
      data={data}
    />
  );
}