import DisplayCard from "../../components/task-components/DisplayCard";

export default function TaskManagement() {
  return (
    <div className="w-full  p-5 flex flex-col gap-4">
        <div>
            <h1 className='text-2xl'>WELCOME MINAL!</h1>
        </div>
        <div className='flex gap-3 p-2 flex-wrap'>
            <DisplayCard/>
            <DisplayCard/>
            <DisplayCard/>
            <DisplayCard/>
        </div>
        
      
    </div>
  )
}
