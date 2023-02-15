import {
  EmojiHappyIcon,
  ChartSquareBarIcon,
  CursorClickIcon,
  DeviceMobileIcon,
  AdjustmentsIcon,
  SunIcon,
} from "@heroicons/react/outline";

import benefitOneImg from "../../../public/img/benefit-one.png";
import benefitTwoImg from "../../../public/img/benefit-two.png";

const benefitOne = {
  title: "Manage your flowers",
  desc: "By managing your fauna you can greatly decrease the ammount of CO2 without opening the windows.",
  image: benefitOneImg,
  bullets: [
    {
      title: "Understand your fauna",
      desc: "flow can help you get in touch with the type of flowers you own",
      icon: <EmojiHappyIcon />,
    },
    {
      title: "Get updates",
      desc: "We will keep you updated to save your flowers from dying.",
      icon: <ChartSquareBarIcon />,
    },
  ],
};

const benefitTwo = {
  title: "Build with",
  desc: "The tools we used to craft this application are trully edge-cutting",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Mobile Responsive Design",
      desc: "Flow is designed as a mobile second responsive application.",
      icon: <DeviceMobileIcon />,
    },
    {
      title: "Powered by Next.js & TailwindCSS",
      desc: "Flow is powered by latest technologies and tools.",
      icon: <AdjustmentsIcon />,
    },
  ],
};

export { benefitOne, benefitTwo };
