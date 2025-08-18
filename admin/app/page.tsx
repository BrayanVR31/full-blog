import Image from "next/image";

export default function Home() {
  console.log("get data: ", process.env.POSTGRES_USER);
  return "hello";
}
