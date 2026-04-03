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
      className="w-full border-b border-white/60"
    >
      <header>
        <Navbar />
      </header>

      <section className="mx-auto w-full max-w-[1700px] px-[60px] pt-[70px] pb-[120px]">
        <div className="grid items-center gap-[70px] lg:grid-cols-[1.05fr_0.95fr] xl:gap-[90px]">
          <Reveal>
            <div className="text-white">
              <h1 className="max-w-[680px] font-['Poppins'] text-[64px] font-bold leading-[1.04]">
                Vamos conversar!
              </h1>

              <p className="mt-[24px] max-w-[680px] text-[24px] leading-[1.7] text-white/80">
                Entre em contato com nossa equipe. Estamos aqui para tirar
                dúvidas, ouvir sugestões e melhorar cada vez mais a experiência
                de aprendizado em Libras.
              </p>

              <div className="mt-[46px] flex max-w-[760px] flex-col gap-[18px]">
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
            <div className="mx-auto w-full max-w-[760px] rounded-[34px] bg-[#f4f4f4] px-[40px] py-[42px] shadow-[0_20px_45px_rgba(0,0,0,0.22)]">
              <h2 className="mb-[24px] font-['Poppins'] text-[44px] font-bold text-[#1d1d1d]">
                Envie sua mensagem
              </h2>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-[16px]"
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

                <div className="grid gap-[16px] md:grid-cols-2">
                  <Field label="Nome" id="name" error={errors.name}>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Digite seu nome completo"
                      className="h-[58px] w-full rounded-[12px] border border-[#b6b6d0] bg-transparent px-[16px] text-[18px] text-[#222] outline-none placeholder:text-[#8a8aa3]"
                    />
                  </Field>

                  <Field label="E-mail" id="email" error={errors.email}>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Digite seu melhor e-mail"
                      className="h-[58px] w-full rounded-[12px] border border-[#b6b6d0] bg-transparent px-[16px] text-[18px] text-[#222] outline-none placeholder:text-[#8a8aa3]"
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
                    className="h-[58px] w-full rounded-[12px] border border-[#b6b6d0] bg-transparent px-[16px] text-[18px] text-[#222] outline-none placeholder:text-[#8a8aa3]"
                  />
                </Field>

                <Field label="Mensagem" id="message" error={errors.message}>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Escreva sua mensagem com o máximo de detalhes possível."
                    className="min-h-[220px] w-full resize-none rounded-[12px] border border-[#b6b6d0] bg-transparent px-[16px] py-[14px] text-[18px] text-[#222] outline-none placeholder:text-[#8a8aa3]"
                  />
                </Field>

                {feedback ? (
                  <div
                    className={`rounded-[14px] px-4 py-3 text-[15px] ${
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
                  className="mt-[6px] h-[62px] rounded-[12px] bg-[#4338ca] text-[18px] font-semibold text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
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
    <div className="flex items-center gap-[18px] rounded-[20px] border border-white/10 bg-white/5 px-[20px] py-[18px] backdrop-blur-[6px]">
      <div className="flex h-[56px] w-[56px] items-center justify-center rounded-[14px] bg-white/18 text-white">
        {icon}
      </div>

      <div>
        <h3 className="text-[18px] font-semibold text-white md:text-[20px]">
          {title}
        </h3>
        <p className="text-[14px] leading-[1.6] text-white/72 md:text-[15px]">
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