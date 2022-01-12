import {
    ALLPOLLS,
    MYPOLLS,
    GETPOLL,
    CREATE_POLL,
    REMOVE_POLL,
    OPTION_ONE
} from "../constants/poll.const";

const initialState = {
    allPolls: [],
    myPolls: [],
    getPoll: {
        optionOne: {
            option: "",
            votes: []
        },
        optionTwo: {
            option: "",
            votes: []
        },
        nickId: {
            nick: ""
        }
    }
}

const pollReducer = (state = initialState, action) => {

    switch (action.type) {

        case ALLPOLLS:
            return {
                ...state,
                allPolls: action.payload,
                myPolls: [],
                getPoll: {
                    optionOne: {
                        option: "",
                        votes: []
                    },
                    optionTwo: {
                        option: "",
                        votes: []
                    },
                    nickId: {
                        nick: ""
                    }
                }
            }

        case MYPOLLS:
            return {
                ...state,
                allPolls: [],
                myPolls: action.payload,
                getPoll: {
                    optionOne: {
                        option: "",
                        votes: []
                    },
                    optionTwo: {
                        option: "",
                        votes: []
                    },
                    nickId: {
                        nick: ""
                    }
                }
            }

        case GETPOLL:
            return {
                ...state,
                allPolls: action.payload.all,
                myPolls: [],
                getPoll: action.payload.get
            }

        case CREATE_POLL:
            return {
                ...state,
                allPolls: [],
                myPolls: [...state.myPolls, action.payload],
                getPoll: {
                    optionOne: {
                        option: "",
                        votes: []
                    },
                    optionTwo: {
                        option: "",
                        votes: []
                    },
                    nickId: {
                        nick: ""
                    }
                }
            }

        case REMOVE_POLL:
            return {
                ...state,
                allPolls: [],
                myPolls: state.myPolls.filter(poll => poll._id !== action.payload),
                getPoll: {
                    optionOne: {
                        option: "",
                        votes: []
                    },
                    optionTwo: {
                        option: "",
                        votes: []
                    },
                    nickId: {
                        nick: ""
                    }
                }
            }

        case OPTION_ONE:
            return {
                ...state,
                allPolls: [],
                myPolls: [],
                getPoll: {
                    optionOne: {
                        option: "",
                        votes: state.getPoll.optionOne.votes.map(poll => poll._id === action.payload.id ? action.payload : poll)
                    },
                    optionTwo: {
                        option: "",
                        votes: []
                    },
                    nickId: {
                        nick: ""
                    }
                }
            }

        default:
            return state;
    }

}

export default pollReducer