import { useState } from "react";
import { Mail, Lightbulb, Handshake } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";
import { HeaderBackground } from "@/components/layout/HeaderBackground";
import { Navbar } from "@/components/layout/Navbar";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
};

type FormErrors = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xnjojlkq";

const initialState: FormState = {
  name: "",
  email: "",
  subject: "",
  message: "",
  website: "",
};

// Mantém fonte >= 16px para o iOS não dar zoom automático ao focar o campo.
const inputClassName =
  "h-[52px] w-full rounded-[12px] border border-[#b6b6d0] bg-transparent px-[14px] text-[16px] text-[#222] outline-none text-ellipsis placeholder:text-[#8a8aa3] focus:border-[#4338ca] sm:px-[16px] lg:h-[58px] lg:text-[18px]";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function ContactHero() {
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
      nextErrors.name = "Digite seu nome completo.";
    } else if (values.name.trim().length < 2) {
      nextErrors.name = "Seu nome deve ter pelo menos 2 caracteres.";
    }

    if (!values.email.trim()) {
      nextErrors.email = "Digite seu e-mail.";
    } else if (!isValidEmail(values.email.trim())) {
      nextErrors.email = "Digite um e-mail válido.";
    }

    if (!values.subject.trim()) {
      nextErrors.subject = "Digite o assunto da mensagem.";
    } else if (values.subject.trim().length < 3) {
      nextErrors.subject = "O assunto deve ter pelo menos 3 caracteres.";
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
          subject: form.subject.trim(),
          message: form.message.trim(),
          _subject: `Contato Body Signs - ${form.subject.trim()}`,
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
    <HeaderBackground
      rounded={false}
      className="w-full border-b border-white/60 max-md:pb-6"
    >
      <header>
        <Navbar />
      </header>

      <section className="mx-auto w-full max-w-[1700px] px-4 pt-8 pb-10 sm:px-8 sm:pt-12 sm:pb-16 lg:px-[60px] lg:pt-[70px] lg:pb-[120px]">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-[70px] xl:gap-[90px]">
          <Reveal>
            <div className="text-white">
              <h1 className="max-w-[680px] font-['Poppins'] text-[38px] font-bold leading-[1.08] sm:text-[52px] lg:text-[64px] lg:leading-[1.04]">
                Vamos conversar!
              </h1>

              <p className="mt-4 max-w-[680px] text-[16px] leading-[1.65] text-white/80 sm:text-[20px] lg:mt-[24px] lg:text-[24px] lg:leading-[1.7]">
                Entre em contato com nossa equipe. Estamos aqui para tirar
                dúvidas, ouvir sugestões e melhorar cada vez mais a experiência
                de aprendizado em Libras.
              </p>

              <div className="mt-8 flex max-w-[760px] flex-col gap-3 lg:mt-[46px] lg:gap-[18px]">
                <InfoCard
                  icon={<Mail size={24} />}
                  title="E-mail"
                  description="bodysigns.ifma@gmail.com"
                />

                <InfoCard
                  icon={<Lightbulb size={24} />}
                  title="Sugestões"
                  description="Ideias para novos conteúdos e melhorias da plataforma."
                />

                <InfoCard
                  icon={<Handshake size={24} />}
                  title="Colaboração"
                  description="Quer contribuir com o projeto? Vamos conversar."
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mx-auto w-full max-w-[760px] rounded-[24px] bg-[#f4f4f4] px-5 py-6 shadow-[0_20px_45px_rgba(0,0,0,0.22)] sm:rounded-[34px] sm:px-8 sm:py-9 lg:px-[40px] lg:py-[42px]">
              <h2 className="mb-4 font-['Poppins'] text-[28px] font-bold leading-tight text-[#1d1d1d] sm:mb-5 sm:text-[36px] lg:mb-[24px] lg:text-[44px]">
                Envie sua mensagem
              </h2>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-3 sm:gap-[16px]"
              >
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

                <div className="grid gap-3 sm:gap-[16px] md:grid-cols-2">
                  <Field label="Nome" id="name" error={errors.name}>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Digite seu nome completo"
                      className={inputClassName}
                    />
                  </Field>

                  <Field label="E-mail" id="email" error={errors.email}>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Digite seu melhor e-mail"
                      className={inputClassName}
                    />
                  </Field>
                </div>

                <Field label="Assunto" id="subject" error={errors.subject}>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Ex.: Dúvida sobre o projeto Body Signs"
                    className={inputClassName}
                  />
                </Field>

                <Field label="Mensagem" id="message" error={errors.message}>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Escreva sua mensagem com o máximo de detalhes possível."
                    rows={5}
                    className="min-h-[150px] w-full resize-none rounded-[12px] border border-[#b6b6d0] bg-transparent px-[14px] py-[12px] text-[16px] text-[#222] outline-none placeholder:text-[#8a8aa3] focus:border-[#4338ca] sm:min-h-[200px] sm:px-[16px] sm:py-[14px] lg:min-h-[220px] lg:text-[18px]"
                  />
                </Field>

                {feedback ? (
                  <div
                    role={isSuccess ? "status" : "alert"}
                    className={`rounded-[14px] px-4 py-3 text-[14px] sm:text-[15px] ${
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
                  className="mt-[6px] h-[54px] rounded-[12px] bg-[#4338ca] text-[16px] font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70 sm:text-[18px] lg:h-[62px]"
                >
                  {isSubmitting ? "Enviando..." : "Enviar mensagem"}
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </HeaderBackground>
  );
}

function InfoCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-[16px] border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-[6px] sm:gap-[18px] sm:rounded-[20px] sm:px-[20px] sm:py-[18px]">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-white/18 text-white sm:h-[56px] sm:w-[56px]">
        {icon}
      </div>

      <div className="min-w-0">
        <h3 className="text-[16px] font-semibold text-white sm:text-[18px] md:text-[20px]">
          {title}
        </h3>
        <p className="break-words text-[14px] leading-[1.5] text-white/72 sm:leading-[1.6] md:text-[15px]">
          {description}
        </p>
      </div>
    </div>
  );
}

function Field({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col text-left">
      <label
        htmlFor={id}
        className="mb-[7px] text-[14px] font-medium text-[#25255a] md:text-[15px]"
      >
        {label}
      </label>

      {children}

      {error ? (
        <span className="mt-[6px] text-[12px] text-[#d03b3b] md:text-[13px]">
          {error}
        </span>
      ) : null}
    </div>
  );
}