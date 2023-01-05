import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import CreateModal from "../components/CreateModal";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const logger = (val: string) => console.log(val)
  const [createModalOpen, setCreateModalOpen] = useState(false)



  return (
    <>
      <Head>
        <title>NG Flowers</title>
        <meta name="description" content="Aplikace pro zprávu květin v NG" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Správa <span className="text-[hsl(280,100%,70%)]">KVĚTIN</span>
          </h1>
          <button className="btn btn-md" onClick={() => setCreateModalOpen(true)}>Přidat květinu</button>
          <CreateModal open={createModalOpen} openSetter={(value) => setCreateModalOpen(value)}/>
          REEEEEEEEEE
        </div>
      </main>
    </>
  );
};

export default Home;
