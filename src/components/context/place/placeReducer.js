export default (state, action) => {
	switch (action.type) {
		case "SET_PLACE":
			return {
				...state,
				place: action.payload,
			};
		case "SET_LOADING":
			return {
				...state,
				loading: true,
			};
		case "REMOVE_LOADING":
			return {
				...state,
				loading: false,
			};
		case "SET_ALERT":
			return {
				...state,
				alert: { message: action.payload },
			};
		case "REMOVE_ALERT":
			return {
				...state,
				alert: null,
			};
		case "UPDATE_PLACE":
			return {
				...state,
				place: action.payload,
			};
		case "SET_USER":
			return {
				...state,
				user: action.payload,
			};
		case "REMOVE_USER":
			return {
				...state,
				user: false,
			};
		case "SET_LIVE":
			return {
				...state,
				live: action.payload,
			};

		default:
			return {
				state,
			};
	}
};
