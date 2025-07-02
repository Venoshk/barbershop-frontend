import { Form } from "../../Components/form";
import { Input } from "../../Components/input";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useForm } from "../../Hooks/useForm";
import { useNotification } from "../../Hooks/useNotification";
import { NotificationAlert } from "../../Components/NotificationAlert";

export function Login() {
  const { values, handleChange } = useForm({
    login: "",
    senha: "",
  });

  const { notification, showNotification, hideNotification } =
    useNotification();


  const navigate = useNavigate();

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await api.post("/auth/login", values);

      if (response) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        showNotification(
          "success",
          "Cadastro Realizado!",
          "Você será redirecionado para a tela de login."
        );
        setTimeout(() => {
          navigate("/");
        }, 6000);
      }
    } catch (error: any) {
      const errorMessage = "Login inválido";
      showNotification("danger", "Usuário ou Senha incorretos", errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full md:max-w-md p-8  md:border-2 border-black rounded-4xl">
        <div className="text-2xl font-bold mb-2 text-[#1e0e4b] text-center">
          Bem vindo ao <span className="text-[#7747ff]">BarbeShop</span>
        </div>
        <div className="text-sm font-normal mb-4 text-center text-[#1e0e4b]">
          Entre na sua conta
        </div>
        <Form onSubmit={handleLoginSubmit}>
          <Input
            id="login"
            name="login"
            label="Usuário:"
            type="text"
            placeholder="Usuário"
            required
            value={values.login}
            onChange={handleChange}
          />
          <Input
            id="senha"
            label="Senha"
            type="password"
            name="senha"
            placeholder="Sua senha"
            required
            value={values.senha}
            onChange={handleChange}
          />

          <div className="flex justify-end">
            <a className="text-sm text-[#7747ff]" href="#">
              Esqueceu sua senha?
            </a>
          </div>

          <button
            type="submit"
            className="bg-[#7747ff] w-full mt-4 px-6 py-2 rounded text-white text-sm font-normal"
          >
            Entrar
          </button>
        </Form>
        <div className="text-sm text-center mt-[1.6rem] text-black">
          Ainda não tem uma conta?{" "}
          <Link to={"/cadastro"} className="text-sm text-[#7747ff]">
            Cadastre-se gratuitamente!{" "}
          </Link>
        </div>
      </div>
      <div>
        <NotificationAlert
          open={notification.open}
          onClose={hideNotification}
          severity={notification.severity}
          title={notification.title}
          message={notification.message}
        />
      </div>
    </div>
  );
}
