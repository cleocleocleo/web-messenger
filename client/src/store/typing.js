// ACTIONS

const IS_TYPING = "IS_TYPING";
const NOT_TYPING = "NOT_TYPING";

// ACTION CREATORS

export const isTyping = (username) => {
    return {
        type: IS_TYPING,
        username,
    };
};

export const notTyping = (username) => {
    return {
        type: NOT_TYPING,
        username,
    };
};

// REDUCER

const reducer = (state = [], action) => {
    switch (action.type) {
        case IS_TYPING: {
            return action.username;
        }
        case NOT_TYPING: {
            return action.username;
        }
        default:
            return state;
    }
};

export default reducer;