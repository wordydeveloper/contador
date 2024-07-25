import { activity } from "../type"

export type ActivityAcction=
{type:'save-activity',paylon:{newactivity:activity}}|
{type:'set-activeId',paylon:{id:activity['id']}}|
{type:'dele-activeId',paylon:{id:activity['id']}}|
{type:'reset-app'}



 export type activityState={
    activities:activity[],
    activeId:activity['id']
}
//funcion que se conecta con el localstorage para verificar si tiene datos
const localstorageActivities = () :activity[]=>{
    const activities= localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

export const initialState:activityState={
    //lo carga en el state hace que se muestre
    activities:localstorageActivities(),
    activeId:'' 
}

 export const activityReducer= (
    state:activityState=initialState,
    accion:ActivityAcction
)=>{
    if(accion.type==='save-activity'){
        //este codigo maneja la logica para actualiza el state
   if(accion.type==='save-activity'){

    let updatedActivities:activity[]=[]
    if(state.activeId){
        updatedActivities=state.activities.map( activity=>activity.id===state.activeId?accion.paylon.newactivity:activity)
    }else{
        updatedActivities= [...state.activities,accion.paylon.newactivity]
    }
        return{
            ...state,
            activities:updatedActivities,
            activeId:''
        }
    }}
    if(accion.type=== 'set-activeId'){
        return{
            ...state,
            activeId: accion.paylon.id
        }
    }
        if(accion.type==='dele-activeId'){
            return{
                ...state,
                activities:state.activities.filter(activity=>activity.id !==accion.paylon.id)
            }
        
    }
    // reiniciar el state
if(accion.type==='reset-app'){
    return{
      activities:[],
      activeId:''
    }
}

    return state
}