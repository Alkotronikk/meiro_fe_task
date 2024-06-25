import Header from "../components/Header.tsx";
import {Outlet} from "react-router-dom";

const Page = () => {
  return (
    <>
      <Header/>

      <main className="max-w-screen-2xl flex flex-col mx-auto size-full grow">
        <div className="py-10 px-4">
          <Outlet/>
        </div>
      </main>
    </>
  )
}

export default Page;