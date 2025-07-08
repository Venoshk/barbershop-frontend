import { Form } from "../../Components/form";
import { Input } from "../../Components/input";
import { Link, useNavigate } from "react-router-dom";
import { NotificationAlert } from "../../Components/notificationAlert";
import api from "../../services/api";
import { useNotification } from "../../Hooks/useNotification";
import { useForm } from "../../Hooks/useForm";
import { AboutSection } from "../../Components/aboutSection";
// ... outros imports

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
      // ...
      const { token } = response.data;
      localStorage.setItem("token", token);

      setTimeout(() => {
        navigate("/dashboard"); 
      }, 2000);
    } catch (error: any) {
      const errorMessage = "Login ou senha inválidos.";
      showNotification("danger", "Falha na Autenticação", errorMessage);
    }
  };

  return (
    <>

      <main className=" grid grid-cols-1 md:grid-cols-2 min-h-screen w-full ">
        <div className="bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center p-8">
          <NotificationAlert
            open={notification.open}
            onClose={hideNotification}
            severity={notification.severity}
            title={notification.title}
            message={notification.message}
          />

          <div className="w-full max-w-md">
            <div className="text-2xl font-bold mb-2 text-center text-gray-800 dark:text-gray-100">
              Bem vindo ao <span className="text-[#7747ff]">BarberShop</span>
            </div>
            <div className="text-sm font-normal mb-8 text-center text-gray-500 dark:text-gray-400">
              Entre na sua conta
            </div>

            <Form onSubmit={handleLoginSubmit}>
              <div className="flex flex-col gap-4">
                <Input
                  id="login"
                  name="login"
                  label="Usuário:"
                  type="text"
                  placeholder="seu.usuario"
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
              </div>

              <div className="flex justify-end mt-4">
                <a className="text-sm text-[#7747ff] hover:underline" href="#">
                  Esqueceu sua senha?
                </a>
              </div>

              <button
                type="submit"
                className="bg-[#7747ff] hover:bg-[#6a3de5] w-full mt-6 py-3 rounded-lg text-white font-semibold transition-colors"
              >
                Entrar
              </button>
            </Form>

            <div className="text-sm text-center mt-6 text-gray-600 dark:text-gray-400">
              Ainda não tem uma conta?{" "}
              <Link
                to={"/cadastro"}
                className="font-semibold text-[#7747ff] hover:underline"
              >
                Cadastre-se gratuitamente!
              </Link>
            </div>
          </div>
        </div>

        <AboutSection
          title="Acesse sua Conta"
          subTitle="Gerencie seus agendamentos, veja seu histórico e prepare-se para seu próximo visual."
          description=""
          imgSrc="src/assets/img-sing.jpg"
        />
      </main>
    </>
  );
}
