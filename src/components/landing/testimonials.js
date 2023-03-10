import Image from "next/image";
import React from "react";
import Container from "./container";

import userOneImg from "../../../public/img/user1.jpg";
import userTwoImg from "../../../public/img/user2.jpg";
import userThreeImg from "../../../public/img/user3.jpg";

export default function Testimonials() {
  return (
    <Container>
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="">
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14">
            <p className="text-2xl leading-normal ">
              I can finally know when the flower <Mark>next to me</Mark> is dying.

            </p>

            <Avatar
              image={userOneImg}
              name="David Závada"
              title="Most favoured designer"
            />
          </div>
        </div>
        <div className="">
          <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14">
            <p className="text-2xl leading-normal ">
              I didn't know how often to <Mark>water</Mark> these flowers, now <Mark> I do!</Mark>
            </p>

            <Avatar
              image={userTwoImg}
              name="Petr Jílek"
              title=""
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

function Avatar(props) {
  return (
    <div className="flex items-center mt-8 space-x-3">
      <div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
        <Image
          src={props.image}
          width="40"
          height="40"
          alt="Avatar"
          layout="responsive"
          placeholder="blur"
        />
      </div>
      <div>
        <div className="text-lg font-medium">{props.name}</div>
        <div className="text-gray-600">{props.title}</div>
      </div>
    </div>
  );
}

function Mark(props) {
  return (
    <>
      {" "}
      <mark className="text-indigo-800 bg-indigo-100 rounded-md ring-indigo-100 ring-4">
        {props.children}
      </mark>{" "}
    </>
  );
}
