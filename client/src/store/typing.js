// ACTIONS

const IS_TYPING = "IS_TYPING";
const NOT_TYPING = "NOT_TYPING";

// ACTION CREATORS

export const isTyping = (data) => {
    return {
        type: IS_TYPING,
        payload: {
            ...data,
        },
    };
};

export const notTyping = (data) => {
    return {
        type: NOT_TYPING,
        payload: {
            ...data,
        },
    };
};

// REDUCER

const reducer = (state = [], action) => {
    switch (action.type) {
        case IS_TYPING:
            return {
                ...state,
                typist: action.payload.typist,
            };
        case NOT_TYPING:
            return {
                ...state,
                typist: null,
            };
        default:
            return state;
    }
};

export default reducer;