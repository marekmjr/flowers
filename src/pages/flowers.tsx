import { type NextPage } from "next";

import { useState } from "react";

import EditModal from "../components/EditModal";
import FlowerTable from "../components/FlowerTable";

const Flowers: NextPage = () => {
  //const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <div className="h-[100vh] bg-gradient-to-r p-16">
        <FlowerTable />
        <EditModal />
      </div>
    </>
  );
};

export default Flowers;
