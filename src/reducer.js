export const initialState = {
  basket: [],
  tempBasket: [],
  user: null,
};

// Selector / alternative way for For loop
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.id} as its not in basket)`
        );
      }

      return {
        ...state,
        basket: newBasket,
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    case "ADD_TO_TEMPBASKET":
      return {
        ...state,
        tempBasket: [...state.tempBasket, action.item],
      };

    case "REMOVE_FROM_TEMPBASKET":
      const i = state.tempBasket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newTempBasket = [...state.tempBasket];

      if (i >= 0) {
        newTempBasket.splice(i, 1);
      } else {
        console.warn(
          `Can't remove product (id: ${action.id} as its not in basket)`
        );
      }

      return {
        ...state,
        tempBasket: newTempBasket,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
