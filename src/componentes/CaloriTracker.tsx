import { useMemo } from "react"
import  type { activity } from "../type"
import CalorieDisplay from "./CaloriDisplay"

type CaloriTrackerProts={
    activities: activity[]
 }
  
 
 export default function CaloriTracker({activities}:CaloriTrackerProts) {
  //contadores
  const  CaloriesConsumed= useMemo(() => activities.reduce(( total,activity)=>
    activity.category===1 ? total+activity.calories :total, 0 ),[activities])

  const  CaloriresEnergi= useMemo(() => activities.reduce(( total,activity)=>
    activity.category===2 ? total+activity.calories :total, 0 ),[activities])

  const netCalories=  useMemo(()=> CaloriesConsumed-CaloriresEnergi,[activities])

  return (
    <>
    <h2 className=" text-center text-white font-black text-4xl ">Resumen de Calorias</h2>
    <div className=" gap-5 mt-10 flex flex-col items-center md:flex-row md:justify-between ">
<CalorieDisplay
calories={CaloriesConsumed}
text="Consumidas"
/>
<CalorieDisplay
calories={CaloriresEnergi}
text="Ejercicios"
/>
<CalorieDisplay
calories={-netCalories}
text="Diferencia"
/>
   </div> 
    </>
  )
}
