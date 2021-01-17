import {useContext} from "react";
import {AuthContext} from "_context";

const useRoutes = () => {
    const validateRoutes = (src, dst) => {
        const {
            auth: {agent},
        } = useContext(AuthContext);
        const routes = agent ? agent.routes : [];
        routes.forEach(
            ({
                sourceCountryCode: src_code,
                destinationCountryCode: dst_code,
            }) => {
                if (src === src_code && dst === dst_code) return true;
            }
        );
        return false;
    };
    return [validateRoutes];
};
export default useRoutes;
