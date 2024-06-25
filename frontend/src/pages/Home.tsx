import {useNavigate} from "react-router-dom";
import Button from "../components/Button.tsx";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <h1 className="block text-2xl font-bold sm:text-4xl text-center">Meiro Frontend Task</h1>
      <div className="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
        <Button onClick={() => {navigate('attributes')}} className={'block'}>Go to attributes page &gt;</Button>
      </div>
    </>
  );
}
