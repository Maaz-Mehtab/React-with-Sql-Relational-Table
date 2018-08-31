// import uuid from 'uuid';
const INITIAL_STATE = {
    manufacturer: [],
    loading:false,
    list:[]
}
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_ITEMS":
        return {
            ...state,
            manufacturer:action.payload,
            loading:false
        
        }
        case "GET_ITEMS_LIST":
        return {
            ...state,
            list:action.payload,
            loading:false
        
        }
        
       case "ADD_ITEM":
        return {
            ...state,
            manufacturer:[action.payload,...state.manufacturer]
        }

       case "ADD_ITEM_LIST":
        return {
            list:action.payload
        }

        case "DELETE_ITEM":
        return {
            ...state,
            manufacturer:[...state.manufacturer.filter(i=> i.id!=action.payload)]
        }

        case "DELETE_ITEM_LIST":
        return {
            ...state,
            list:[...state.list.filter(i=> i.item_id!=action.payload)]
        }
        case "EDIT_ITEM":
        return {
            ...state
       }
        case "EDIT_ITEM_LIST":
        return {
            ...state
       }

       default:
            return state;
    }

}