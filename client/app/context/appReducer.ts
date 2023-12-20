import { appReducerActions } from "../utils/appReducerActions"

interface ReducerAction {
    type: string
    payload?: any
}

export default function appReducer (
    state: AppState,
    action: ReducerAction
): AppState {

  switch ( action.type ) {
    case appReducerActions.setActiveYear:
      return {
        ...state,
        activeYear: action.payload
      }

    case appReducerActions.setActiveMonth:
      return {
        ...state,
        activeMonth: action.payload
      }

    case appReducerActions.setActiveConsolidateYear:
      return {
        ...state,
        activeConsolidateYear: action.payload
      }

    case appReducerActions.setActiveConsolidateMonth:
      return {
        ...state,
        activeConsolidateMonth: action.payload
      }

    // case menuReducerActions.setMenuData:
    //   return {
    //     ...state,
    //     menusData: action.payload
    //   }

    default:
      return state
  }
}


