import { useState, ChangeEvent,FormEvent, Dispatch,useEffect } from "react"
import{v4 as uuidv4} from "uuid"
import { categories } from "../data/categories"
import { activity } from "../type"
import { ActivityAcction, activityState } from "../reducers/ActivityReducer"
//importaciones

type FontProts={
  dispatch:Dispatch<ActivityAcction>,
  state:activityState
}
const initialstate :activity={
    id:uuidv4(),
    category: 1,
    name:'',
    calories: 0
  
}
export default function Font({dispatch,state}:FontProts) {
  
  const [activity,setActivity]= useState<activity>(initialstate)
  useEffect(()=>{
    if(state.activeId){
      const selectActivity=state.activities.filter(stateActivity=>stateActivity.id===state.activeId)[0]
      setActivity(selectActivity)
    }
  }, [state.activeId])

  const handlechange=(e:ChangeEvent<HTMLSelectElement>| ChangeEvent<HTMLInputElement>)=>{
    const isNumberfield=['category','calories'].includes(e.target.id)
    setActivity({
      ...activity,
[e.target.id]:isNumberfield ? +e.target.value:e.target.value
    })
   }
  const isValueactivity =()=>{
const {name, calories}=activity
return name.trim() != '' && calories>0
    }

    const handleSumit=(e: FormEvent<HTMLFormElement> )=>{
   e.preventDefault()
   dispatch({type:'save-activity', paylon:{newactivity:activity}})
   setActivity({
    ...initialstate,
    id:uuidv4()


   })
    }
  return (
    <form
    className=" space-y-5 bg-white shadow p-10 my-0   rounded-lg"
    onSubmit={handleSumit }
    >
        <p>Formularios</p>
    <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className=" font-bold">Categoria:</label>
        <select className=" border border-slate-300 rounded-lg p-2 w-full bg-white"
         id="category"
         
           onChange={handlechange }
           value={activity.category}
         >
            {categories.map(category=>(
                <option 
                key={category.id}
                value={category.id}
                >
              {category.name}
                 
                </option>
            ))}
        </select>
    </div>
    <div className="grid grid-cols-1 gap-3">
    <label htmlFor="name" className=" font-bold">Actividad:</label>
            <input
            id="name"
            type="text"
            className="border border-slate-300 p-2 rounded-lg"
            placeholder=" Ej. comida , jugo , ejercicio , pesas"
            value={activity.name}
            onChange={handlechange}

            />
    </div>

    <div className="grid grid-cols-1 gap-3">
    <label htmlFor="calories" className=" font-bold">Calorias:</label>
            <input
            id="calories"
            type="number"
            className="border border-slate-300 p-2 rounded-lg"
            placeholder="Calorias  ej. 200 , 300 , 500 "
            value={activity.calories===0 ?'': activity.calories}
            onChange={handlechange}

            />
    </div>
    <input 
    type="submit"
    className=" bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
    value={activity.category==1? 'Guardar comida':'Guardar ejercicio'}//cambiar el boton a elegir en base a la eleccion
    disabled={!isValueactivity()}
    />
    </form>
  )
}

!HTMLAllCollection