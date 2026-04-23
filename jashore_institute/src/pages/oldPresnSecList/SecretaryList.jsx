import { useEffect, useState } from "react";
import AxiosInstance from "../../api/AxiosInstance";
import DataTable from "../../components/shared/DataTable";

export default function SecretaryList() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    AxiosInstance.get("oldcommittee/secretary/")
      .then((res) => {
        setData(res.data.data);
        setTitle(res.data.title);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <DataTable
      title={title}
      data={data}
    />
  );
}