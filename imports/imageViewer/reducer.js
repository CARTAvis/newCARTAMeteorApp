import { Actions } from './actions';

const image = (state = { imageURL: '' }, action) => {
  console.log('image action:', action);
  switch (action.type) {
    case Actions.RECEIVE_IMAGE_CHANGE:
      return { ...state, ...action.payload.imageData };
    default:
      return state;
  }
};

const imageReducer = {
  image,
};

export default imageReducer;
