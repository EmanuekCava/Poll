import {
    ALLPOLLS,
    MYPOLLS,
    GETPOLL,
    CREATE_POLL,
    REMOVE_POLL,
    OPTION_ONE,
    OPTION_TWO
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
                getPoll: {
                    optionOne: {
                        option: action.payload.pollData.optionOne.option,
                        votes: [...state.getPoll.optionOne.votes, action.payload.user._id]
                    },
                    optionTwo: {
                        option: action.payload.pollData.optionTwo.option,
                        votes: action.payload.pollData.optionTwo.votes,
                    },
                    nickId: {
                        nick: action.payload.pollData.nickId.nick
                    }
                }
            }

        case OPTION_TWO:
            return {
                ...state,
                getPoll: {
                    optionOne: {
                        option: action.payload.pollData.optionOne.option,
                        votes: action.payload.pollData.optionOne.votes,
                    },
                    optionTwo: {
                        option: action.payload.pollData.optionTwo.option,
                        votes: [...state.getPoll.optionTwo.votes, action.payload.user._id]
                    },
                    nickId: {
                        nick: action.payload.pollData.nickId.nick
                    }
                }
            }

        default:
            return state;
    }

}

export default pollReducer