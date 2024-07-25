import Font from "./componentes/Font"
import { useReducer , useEffect, useMemo} from "react"
import { activityReducer,initialState } from "./reducers/ActivityReducer"
import Activitylist from "./componentes/Activitylist"
import CaloriTracker from "./componentes/CaloriTracker"
function App() {

  const[state,dispatch]=useReducer(activityReducer,initialState)
  //funcion para el localstorage
  useEffect(()=>{
    localStorage.setItem('activities',JSON.stringify(state.activities))
  },[state.activities])

  const canRestarApp= ()=> useMemo(()=>state.activities.length>0,[state.activities])

  return (
    <>
    <header className=" bg-lime-600 py-3">
    <div className=" max-w-4xl mx-auto flex justify-between items-center">
      <h1 className=" text-center text-3xl  font-bold text-white uppercase">
        Contador de calorias
      </h1>

      <button className=" bg-gray-800 hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer
       rounded-lg text-sm disabled:opacity-10"
       //para negar la condision de canRestarApp
       disabled={!canRestarApp()}
       //usar cuando damos clik para que resetee el state
       onClick={ ()=>dispatch({type:'reset-app'})}
        >Reset</button>
    
    </div>
    </header>
    <section className=" bg-lime-500 py-20 px-5 ">
    <div className=" max-w-4xl mx-auto">
      <Font
      dispatch={dispatch}
      state={state}
      />
      </div>
      </section>

      <section className=" bg-gray-800 py-10">
      <div className=" max-w-4xl mx-auto ">
        <CaloriTracker
        activities={state.activities}
        />
      </div>
      </section>
      <section className=" p-10 mx-auto max-w-4xl">
        <Activitylist
        activities={state.activities}
        dispatch={dispatch}

        />
      </section>
    </>
    )
}


export default App
