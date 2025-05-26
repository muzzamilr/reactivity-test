import { useLocalStorage } from "./useLocalStorage";

interface AdminState {
	rbac: Record<string, any>;
	isLoggedIn: boolean;
	adminId: string;
	firstName: string;
	lastName: string;
	email: string;
	loginType: string;
	sessionId: string;
	userSetting: Record<string, any>;
}

export const adminInitialState: AdminState = {
	rbac: {},
	userSetting: {},
	isLoggedIn: false,
	adminId: "",
	firstName: "",
	lastName: "",
	email: "",
	loginType: "",
	sessionId: "",
};

export const useAdmin = () => {
	const [admin, setAdmin] = useLocalStorage<AdminState>(
		"admin",
		adminInitialState,
	);

	const adminLogin = (payload: Omit<AdminState, "isLoggedIn">) => {
		setAdmin({
			...payload,
			isLoggedIn: true,
		});
	};

	const adminLogout = () => {
		setAdmin({
			...adminInitialState,
			isLoggedIn: false,
		});
	};

	return {
		admin,
		adminLogin,
		adminLogout,
	};
};
