import { Form } from "../../Components/form";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "../../Hooks/useForm";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Dayjs } from "dayjs";
import { MaskedInput } from "../../Components/maskedInput";
import api from "../../services/api";
import { useEffect } from "react";
import { useNotification } from "../../Hooks/useNotification";
import { NotificationAlert } from "../../Components/NotificationAlert";

export function Sing() {
  const navigate = useNavigate();

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

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
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
    <div className="flex items-center justify-center min-h-screen">
      <div className="md:bg-white w-full max-w-md p-8 md:min-w-full">
        <div className="md:text-4xl text-2xl font-bold mb-2 text-[#1e0e4b] text-center">
          Bem vindo ao <span className="text-[#7747ff]">BarbeShop</span>
        </div>
        <div className="md:text-2xl text-sm font-normal mb-4 text-center text-[#1e0e4b]">
          Faça seu cadastro
        </div>
        <Form onSubmit={handleLoginSubmit}>
          <div className="flex flex-col gap-4 md:flex-row ">
            <TextField
              name="nome"
              label="Nome Completo"
              variant="outlined"
              fullWidth
              value={values.nome}
              onChange={handleChange}
              required
            />
            <TextField
              name="login"
              label="Login de acesso"
              variant="outlined"
              fullWidth
              value={values.login}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <TextField
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              value={values.email}
              onChange={handleChange}
              required
            />
           
            <DatePicker
              label="Data de Nascimento"
              value={values.dataNascimento}
              onChange={(newDate) => setFieldValue("dataNascimento", newDate)}
              format="DD/MM/YYYY"
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: "outlined",
                  required: true,
                },
              }}
            />
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <MaskedInput
              name="cpf"
              label="CPF"
              variant="outlined"
              fullWidth
              value={values.cpf}
              onChange={handleChange}
              required
              mask="000.000.000-00"
            />
            <MaskedInput
              name="telefone"
              label="Telefone"
              variant="outlined"
              fullWidth
              value={values.telefone}
              onChange={handleChange}
              required
              mask="(00) 00000-0000"
            />
          </div>

          <div className="flex flex-col gap-4 md:flex-row">
            <TextField
              name="senha"
              label="Senha"
              type="password"
              variant="outlined"
              fullWidth
              value={values.senha}
              onChange={handleChange}
              required
            />
            <TextField
              name="confirmarSenha"
              label="Confirmar Senha"
              type="password"
              variant="outlined"
              fullWidth
              value={values.confirmarSenha}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-end">
            <a className="md:text-lg  text-sm text-[#7747ff]" href="#">
              Esqueceu sua senha?
            </a>
          </div>

          <button
            type="submit"
            className="md:text-lg  md:font-bold bg-[#7747ff] w-full md:w-1/12 mt-4 px-6 py-2 rounded text-white text-sm font-normal"
          >
            Cadastrar
          </button>
        </Form>
        <div className="md:text-lg text-sm text-center mt-[1.6rem] text-black">
          Já possui uma conta?{" "}
          <Link to={"/login"} className="md:text-base text-sm text-[#7747ff]">
            Faça seu login!{" "}
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
