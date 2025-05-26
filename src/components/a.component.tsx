import { useAdmin } from "@/hooks/useAdmin";

export const A = () => {
	const { admin, adminLogin } = useAdmin();
	return (
		<div>
			<button
				onClick={() => {
					adminLogin({
						...admin,
						adminId: Date.now().toString(),
					});
				}}
			>
				Update Admin
			</button>

			{admin.adminId}
		</div>
	);
};
