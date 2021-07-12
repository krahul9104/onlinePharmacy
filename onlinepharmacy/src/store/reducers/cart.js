import * as actionTypes from "../actions/actionTypes";

const intialState = {
  loading: true,
  error:false,
  orderObj : {
      CompanyName: "Apollo Pharmacy",
      "Store Address": "JNTU",
      "Store City": "Hyderabad",
      "Distance of Store": "2.68  Km",
      "Total Price": 100,
      discount: 0,
      promocode: "",
    medicines: [
      {
        medicineId: "6e0570e31bcdb010060965b3b24bcb04",
        medicineDescription:
          " It is used to treat type 2 diabetes mellitus in adults, when it cannot be controlled by diet or exercise.",
        "mediicneComposition ": "vildagliptin",
        price: 75,
        discount: 10,
        selectedUnit:1,
        AvilableUnits: 234,
      },
      {
        medicineId: "25c7b8271bcdb010060965b3b24bcb1c",
        medicineDescription:
          "reduces the amount of acid produced in your stomach",
        "mediicneComposition ": "pantoprazole",
        price: 95,
        discount: 10,
        selectedUnit:1,
        AvilableUnits: 20,
      },
      {
        medicineId: "25c7b8271bcdb010060965b3b24bcb1c",
        medicineDescription:
          "reduces the amount of acid produced in your stomach",
        "mediicneComposition ": "pantoprazole",
        CompanyName: "Apollo Pharmacy",
        price: 95,
        discount: 10,
        selectedUnit:1,
        AvilableUnits: 20,
      },
    ],
  }
};

const search_reducer = (state = intialState, action) => {

  switch (action.type) {
    case actionTypes.ADD_QTY:
      return {
        ...state,
      };

    case actionTypes.MINUS_QTY:
      return {
        ...state,
      };

    default: {
      return state;
    }
  }
};
export default search_reducer;