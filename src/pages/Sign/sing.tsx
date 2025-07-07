import { Form } from "../../Components/form";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../Hooks/useForm";
import { Button, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { MaskedInput } from "../../Components/maskedInput";
import api from "../../services/api";
import { useEffect } from "react";
import { useNotification } from "../../Hooks/useNotification";
import { NotificationAlert } from "../../Components/NotificationAlert";
import { AboutSection } from "../../Components/aboutSection";
import { Haeder } from "../../Components/header";

export function Sing() {
  const navigate = useNavigate();

  const navigationLinks = [
    { label: "Serviços", path: "/servicos" },
    { label: "Planos", path: "/planos" },
    { label: "Sobre", path: "/sobre" },
    { label: "Login", path: "/login" },
  ];
  const { values, handleChange, setFieldValue } = useForm({
    login: "",
    senha: "",
    confirmarSenha: "",
    nome: "",
    dataNascimento: null as Dayjs | null,
    cpf: null,
    telefone: null,
    email: "",
    role: "USER",
  });

  const { notification, showNotification, hideNotification } =
    useNotification();

  useEffect(() => {
    const nomeCompleto = values.nome || "";

    const partesDoNome = nomeCompleto
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .split(" ");

    let loginGerado = "";

    if (partesDoNome.length > 1 && partesDoNome[1] !== "") {
      loginGerado = `${partesDoNome[0]}.${partesDoNome[1]}`;
    } else {
      loginGerado = partesDoNome[0];
    }

    if (values.login !== loginGerado) {
      setFieldValue("login", loginGerado);
    }
  }, [values.nome, setFieldValue]);

  const handleRegisterSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      const dataToSend = {
        login: values.login,
        senha: values.senha,
        nome: values.nome,
        email: values.email,
        dataNascimento: values.dataNascimento,
        role: values.role,
        cpf: Number(String(values.cpf).replace(/\D/g, "")),
        telefone: Number(String(values.telefone).replace(/\D/g, "")),
      };

      const response = await api.post("/clientes/cadastrar", dataToSend);

      if (response) {
        showNotification(
          "success",
          "Cadastro Realizado!",
          "Você será redirecionado para a tela de login."
        );
        setTimeout(() => {
          navigate("/login");
        }, 6000);
      }
    } catch (error: any) {
      const errorMessage = "Tente realizar seu novamente mais tarde.";
      showNotification("danger", "Falha no Cadastro", errorMessage);
    }
  };

  return (
    <>
      <Haeder navLinks={navigationLinks} />{" "}
      <NotificationAlert {...notification} onClose={hideNotification} />
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen font-sans">
        {/* Coluna 1: Formulário */}
        <div className="bg-gray-50 dark:bg-gray-950 flex flex-col justify-center items-center p-6 sm:p-8">
          <div className="w-full max-w-2xl">
            {/* Cabeçalho */}
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
                Bem vindo ao <span className="text-[#7747ff]">BarberShop</span>
              </h1>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                Crie sua conta para agendar seu próximo corte.
              </p>
            </div>

            {/* Formulário */}
            <Form onSubmit={handleRegisterSubmit}>
              {/* As classes de layout do grid continuam aqui, perfeitas! */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                {/* REMOVEMOS as 'className' e confiamos nas props do MUI */}
                <TextField
                  name="nome"
                  label="Nome Completo"
                  value={values.nome}
                  onChange={handleChange}
                  required
                  fullWidth
                  variant="outlined"
                  className="  border-gray-300 dark:border-gray-600 h-full rounded-sm dark:bg-gray-700 text-sm w-full font-normal leading-[18px] text-gray-900 dark:text-white tracking-[0px] appearance-none block  m-0 p-[11px] focus:ring-2 ring-offset-2 ring-violet-500 dark:ring-offset-gray-900"
                />
                <TextField
                  name="login"
                  label="Login de acesso"
                  value={values.login}
                  onChange={handleChange}
                  required
                  fullWidth
                  variant="outlined"
                  className="  border-gray-300 dark:border-gray-600 h-full rounded-sm dark:bg-gray-700 text-sm w-full font-normal leading-[18px] text-gray-900 dark:text-white tracking-[0px] appearance-none block  m-0 p-[11px] focus:ring-2 ring-offset-2 ring-violet-500 dark:ring-offset-gray-900"
                />
                <TextField
                  name="email"
                  label="Email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  required
                  fullWidth
                  variant="outlined"
                  // A classe de layout do grid continua, pois ela se aplica ao container do TextField
                  className="  border-gray-300 dark:border-gray-600 h-full rounded-sm dark:bg-gray-700 text-sm w-full font-normal leading-[18px] text-gray-900 dark:text-white tracking-[0px] appearance-none block  m-0 p-[11px] focus:ring-2 ring-offset-2 ring-violet-500 dark:ring-offset-gray-900"
                />
                <DatePicker
                  label="Data de Nascimento"
                  value={values.dataNascimento}
                  onChange={(newDate) =>
                    setFieldValue("dataNascimento", newDate)
                  }
                  format="DD/MM/YYYY"
                  // O slotProps já passa as props corretas para o TextField interno
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      required: true,
                      variant: "outlined",
                    },
                  }}
                  className="  border-gray-300 dark:border-gray-600 h-full rounded-sm dark:bg-gray-700 text-sm w-full font-normal leading-[18px] text-gray-900 dark:text-white tracking-[0px] appearance-none block  m-0 p-[11px] focus:ring-2 ring-offset-2 ring-violet-500 dark:ring-offset-gray-900"
                />
                <MaskedInput
                  name="cpf"
                  label="CPF"
                  value={values.cpf}
                  onChange={handleChange}
                  required
                  fullWidth
                  variant="outlined"
                  mask="000.000.000-00"
                  className="  border-gray-300 dark:border-gray-600 h-full rounded-sm dark:bg-gray-700 text-sm w-full font-normal leading-[18px] text-gray-900 dark:text-white tracking-[0px] appearance-none block  m-0 p-[11px] focus:ring-2 ring-offset-2 ring-violet-500 dark:ring-offset-gray-900"
                />
                <MaskedInput
                  name="telefone"
                  label="Telefone"
                  value={values.telefone}
                  onChange={handleChange}
                  required
                  fullWidth
                  variant="outlined"
                  mask="(00) 00000-0000"
                  className="  border-gray-300 dark:border-gray-600 h-full rounded-sm dark:bg-gray-700 text-sm w-full font-normal leading-[18px] text-gray-900 dark:text-white tracking-[0px] appearance-none block  m-0 p-[11px] focus:ring-2 ring-offset-2 ring-violet-500 dark:ring-offset-gray-900"
                />
                <TextField
                  name="senha"
                  label="Senha"
                  type="password"
                  value={values.senha}
                  onChange={handleChange}
                  required
                  fullWidth
                  variant="outlined"
                  className="  border-gray-300 dark:border-gray-600 h-full rounded-sm dark:bg-gray-700 text-sm w-full font-normal leading-[18px] text-gray-900 dark:text-white tracking-[0px] appearance-none block  m-0 p-[11px] focus:ring-2 ring-offset-2 ring-violet-500 dark:ring-offset-gray-900"
                />
                <TextField
                  name="confirmarSenha"
                  label="Confirmar Senha"
                  type="password"
                  value={values.confirmarSenha}
                  onChange={handleChange}
                  required
                  fullWidth
                  variant="outlined"
                  className="  border-gray-300 dark:border-gray-600 h-full rounded-sm dark:bg-gray-700 text-sm w-full font-normal leading-[18px] text-gray-900 dark:text-white tracking-[0px] appearance-none block  m-0 p-[11px] focus:ring-2 ring-offset-2 ring-violet-500 dark:ring-offset-gray-900"
                />
              </div>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                sx={{
                  mt: 4, // margin-top
                  py: 1.5, // padding vertical
                  fontSize: "1rem",
                  fontWeight: "600",
                  bgcolor: "#7747ff", // Cor de fundo principal
                  "&:hover": { bgcolor: "#5d3dcc" }, // Cor no hover
                }}
              >
                Cadastrar
              </Button>

              <div className="text-sm text-center mt-6 text-gray-600 dark:text-gray-400">
                Já possui uma conta?{" "}
                <Link
                  to={"/login"}
                  className="font-semibold text-[#7747ff] hover:underline"
                >
                  Faça seu login!
                </Link>
              </div>
            </Form>
          </div>
        </div>

        <AboutSection
          title="Comece sua Jornada de Estilo"
          subTitle="Mais que uma Barbearia, uma Experiência."
          description="Fundada em 2015, a BarberShop nasceu da paixão pela barbearia clássica e o desejo de criar um espaço onde homens pudessem não apenas cuidar do visual, mas também relaxar, conversar e se desconectar da rotina. Combinamos técnicas tradicionais com as últimas tendências para entregar um serviço de excelência."
          imgSrc="src/assets/img-login.jpg"
        />
      </div>
    </>
  );
}
