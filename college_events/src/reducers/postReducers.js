import { CREATE , FETCH_ALL ,LIKE,DELETE, UPDATE} from "../actions/actionTypes"

const postReducer =  (posts= [] , action) => { //posts=state
  switch(action.type){
    case FETCH_ALL :
      return action.payload
    case CREATE :
      return [...posts,action.payload]
    case LIKE :
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    case DELETE :
      return posts.filter((post) => post._id !== action.payload);
    case UPDATE :
      return posts.map((post) => (post._id === action.payload.id ? action.payload : post));
    default :
      return posts
  }
}

export default postReducer