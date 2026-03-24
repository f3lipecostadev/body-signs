import { useState } from "react";
import { Reveal } from "@/components/common/Reveal";

type FormState = {
  name: string;
  email: string;
  message: string;
  website: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT;

const initialState: FormState = {
  name: "",
  email: "",
  message: "",
  website: "",
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function ContactForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: undefined,
    }));

    setFeedback("");
    setIsSuccess(false);
  }

  function validate(values: FormState) {
    const nextErrors: FormErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = "Digite seu nome.";
    } else if (values.name.trim().length < 2) {
      nextErrors.name = "Seu nome deve ter pelo menos 2 caracteres.";
    }

    if (!values.email.trim()) {
      nextErrors.email = "Digite seu email.";
    } else if (!isValidEmail(values.email.trim())) {
      nextErrors.email = "Digite um email válido.";
    }

    if (!values.message.trim()) {
      nextErrors.message = "Digite sua mensagem.";
    } else if (values.message.trim().length < 10) {
      nextErrors.message = "Sua mensagem deve ter pelo menos 10 caracteres.";
    }

    return nextErrors;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setFeedback("Revise os campos antes de enviar.");
      setIsSuccess(false);
      return;
    }

    setIsSubmitting(true);
    setFeedback("");
    setIsSuccess(false);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          _subject: "Nova mensagem pelo formulário de contato - Body Signs",
          _gotcha: form.website,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const errorMessage =
          data?.errors?.[0]?.message ||
          "Não foi possível enviar sua mensagem agora.";
        throw new Error(errorMessage);
      }

      setForm(initialState);
      setErrors({});
      setFeedback("Mensagem enviada com sucesso! Vamos responder em breve.");
      setIsSuccess(true);
    } catch (error) {
      setFeedback(
        error instanceof Error
          ? error.message
          : "Ocorreu um erro ao enviar sua mensagem.",
      );
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="flex min-h-[85vh] flex-col items-center justify-center text-center">
      <Reveal>
        <h1 className="mb-[14px] font-['Poppins'] text-[44px] font-bold text-[#4a42e8] md:text-[50px] lg:text-[58px]">
          Entre em Contato
        </h1>
      </Reveal>

      <Reveal delay={0.06}>
        <p className="mb-[50px] max-w-[950px] text-[20px] leading-[1.55] text-[#555555] md:text-[22px] lg:text-[24px]">
          Tem dúvidas ou sugestões? Adoraríamos ouvir você!{" "}
          <br className="hidden md:block" />
          Envie uma mensagem e retornaremos em breve.
        </p>
      </Reveal>

      <Reveal delay={0.12} className="w-full max-w-[1050px]">
        <div className="w-full rounded-[28px] border-2 border-[#4a4a4a] bg-[#f1f1f1] px-[28px] py-[34px] md:px-[38px] md:py-[40px] lg:px-[48px] lg:pt-[50px] lg:pb-[40px]">
          <form className="flex flex-col gap-7" onSubmit={handleSubmit} noValidate>
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={handleChange}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <div className="flex flex-col items-start text-left">
              <label
                htmlFor="name"
                className="mb-3 text-[22px] font-medium text-[#2b2b2b] md:text-[24px] lg:text-[28px]"
              >
                Nome
              </label>

              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Seu nome completo"
                className="w-full rounded-[12px] border-none bg-[#e7e7e7] px-[20px] py-[18px] text-[18px] text-[#333333] outline-none placeholder:text-[#8a8a8a] md:text-[19px] lg:text-[21px]"
              />

              {errors.name ? (
                <span className="mt-3 text-[15px] text-[#d03b3b] md:text-[16px]">
                  {errors.name}
                </span>
              ) : null}
            </div>

            <div className="flex flex-col items-start text-left">
              <label
                htmlFor="email"
                className="mb-3 text-[22px] font-medium text-[#2b2b2b] md:text-[24px] lg:text-[28px]"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="seu@email.com"
                className="w-full rounded-[12px] border-none bg-[#e7e7e7] px-[20px] py-[18px] text-[18px] text-[#333333] outline-none placeholder:text-[#8a8a8a] md:text-[19px] lg:text-[21px]"
              />

              {errors.email ? (
                <span className="mt-3 text-[15px] text-[#d03b3b] md:text-[16px]">
                  {errors.email}
                </span>
              ) : null}
            </div>

            <div className="flex flex-col items-start text-left">
              <label
                htmlFor="message"
                className="mb-3 text-[22px] font-medium text-[#2b2b2b] md:text-[24px] lg:text-[28px]"
              >
                Mensagem
              </label>

              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Escreva sua mensagem aqui"
                className="min-h-[150px] w-full resize-none rounded-[12px] border-none bg-[#e7e7e7] px-[20px] py-[18px] text-[18px] text-[#333333] outline-none placeholder:text-[#8a8a8a] md:text-[19px] lg:text-[21px]"
              />

              {errors.message ? (
                <span className="mt-3 text-[15px] text-[#d03b3b] md:text-[16px]">
                  {errors.message}
                </span>
              ) : null}
            </div>

            {feedback ? (
              <div
                className={`rounded-[12px] px-5 py-4 text-left text-[16px] md:text-[17px] ${
                  isSuccess
                    ? "bg-[#e8f8ec] text-[#1f7a37]"
                    : "bg-[#fdeaea] text-[#b42318]"
                }`}
              >
                {feedback}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-[10px] h-[66px] w-full rounded-[12px] border-none bg-gradient-to-r from-[#5f4cf7] to-[#4a42e8] text-[20px] font-medium text-white transition duration-200 hover:scale-[1.01] hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70 md:text-[22px] lg:text-[24px]"
            >
              {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
            </button>
          </form>
        </div>
      </Reveal>
    </section>
  );
}