import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserProvider";

function ErrorPage() {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(true);
    const { usuario } = useContext(UserContext);
    
    useEffect(() => {
        const timer = setTimeout(() => {
           //navigate('/QuienesSomos');
           if (usuario && Object.keys(usuario).length > 0) {
            navigate('/turnos');
          } else {
            navigate('/login');
          }
        }, 1000);

        return () => clearTimeout(timer);
    }, [navigate, usuario]);

    return (
        <div>
            {visible && (
                <>
                    <h1>Page Not Found</h1>
                    <h1>The page you are looking for does not exist.</h1>
                </>
            )}
        </div>
    );
}

export default ErrorPage;
