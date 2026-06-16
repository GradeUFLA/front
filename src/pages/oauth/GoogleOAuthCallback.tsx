import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export function GoogleOAuthCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = params.get("code");

    if (code) {
      localStorage.setItem("google_auth_code", code);
      navigate("/grade-curricular");
    }
  }, []);

  return <p>Conectando Google Agenda...</p>;
}