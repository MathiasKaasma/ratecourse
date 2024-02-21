import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styles from "./Contact.module.css";

async function postContact({ data }) {
  const { first_name, last_name, email, message } = data;

  // Post contact form
  const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
    method: "POST",
    body: JSON.stringify({
      first_name,
      last_name,
      email,
      message,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return response;
}

function Contact() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await postContact({ data });
      if (response.status === 200) {
        navigate("/esitatud");
      } else {
        setError("root", {
          message: "Sõnumi saatmisel tekkis viga",
        });
      }
    } catch (err) {
      setError("root", {
        message: "Sõnumi saatmisel tekkis viga",
      });
    }
  };

  return (
    <>
      <div className="more-info">
        <h1>Võta ühendust</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={styles["form-container"]}
        >
          <div className={styles["name-form"]}>
            <div>
              <textarea
                type="text"
                placeholder="Eesnimi *"
                {...register("first_name", {
                  required: "Eesnimi on nõutav",
                  maxLength: {
                    value: 50,
                    message:
                      "Eesnimi ei tohi olla rohkem kui 50 tähemärki pikk",
                  },
                })}
                autoComplete="given-name"
              />
              {errors.first_name && (
                <div className={styles["error-message"]}>
                  {errors.first_name.message}
                </div>
              )}
            </div>
            <div>
              <textarea
                type="text"
                placeholder="Perekonnanimi *"
                {...register("last_name", {
                  required: "Perekonnanimi on nõutav",
                  maxLength: {
                    value: 50,
                    message:
                      "Perekonnanimi ei tohi olla rohkem kui 50 tähemärki pikk",
                  },
                })}
                autoComplete="family-name"
              />

              {errors.last_name && (
                <div className={styles["error-message"]}>
                  {errors.last_name.message}
                </div>
              )}
            </div>
          </div>

          <div className={styles["email-form"]}>
            <textarea
              type="text"
              placeholder="Email *"
              {...register("email", {
                required: "E-posti aadress on nõutav",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "E-posti aadress oli ebakorrektne",
                },
              })}
              autoComplete="email"
            />
            {errors.email && (
              <div className={styles["error-message"]}>
                {errors.email.message}
              </div>
            )}
          </div>
          <div className={styles["message-form"]}>
            <textarea
              type="text"
              placeholder="Sõnum *"
              {...register("message", {
                required: "Sõnum on nõutav",
                maxLength: {
                  value: 1000,
                  message: "Sõnum ei tohi olla rohkem kui 1000 tähemärki pikk",
                },
              })}
            />
            {errors.message && (
              <div className={styles["error-message"]}>
                {errors.message.message}
              </div>
            )}
          </div>
          <button className="blue-button" disabled={isSubmitting} type="submit">
            {isSubmitting ? "Laeb..." : "Esita"}
          </button>
          {errors.root && (
            <div className={styles["error-message"]}>{errors.root.message}</div>
          )}
        </form>
      </div>
    </>
  );
}

export default Contact;
