import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword  } from "firebase/auth";
import { auth } from "../../firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleSenhaChange = (event) => setSenha(event.target.value);

  const redefinirSenha = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("E-mail de redefinição de senha enviado com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao enviar e-mail de redefinição:", error.code, error.message);
        alert("Erro ao enviar e-mail de redefinição. Verifique o e-mail informado.");
      });
  };

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        setIsSubmitted(true);
        console.log("Usuário cadastrado:", userCredential.user);
        setTimeout(() => {
          window.location.href = "http://localhost:5173";
        }, 2500);
      })
      .catch((error) => {
        console.error("Erro ao cadastrar:", error.code, error.message);
      });
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsSubmitted(true);
        console.log("Usuário Logado:", userCredential.user);
        setTimeout(() => {
          window.location.href = "http://localhost:5173";
        }, 2500);
      })
      .catch((error) => {
        console.error("Erro ao fazer login:", error.code, error.message);
      });
  };

  useEffect(() => {
    const button = document.querySelector(`.${styles.img__btn}`);
    const container = document.querySelector(`.${styles.cont}`);

    if (button && container) {
      const toggleSignup = () => container.classList.toggle(styles.sSignup);
      button.addEventListener("click", toggleSignup);

      return () => button.removeEventListener("click", toggleSignup);
    }
  }, []);

  return (
    <>
      <div className={styles.loginBody}>
        <div className={styles.cont}>
          <div className={`${styles.form} ${styles.signIn}`}>
            <h2 className={styles.textDarker}>Bem-vindo de volta!</h2>
            <label className={styles.textDarker}>
              <span>Email</span>
              <input type="email" onChange={handleEmailChange} />
            </label>
            <label className={styles.textDarker}>
              <span>Senha</span>
              <input type="password" onChange={handleSenhaChange} />
            </label>
            <p className={`${styles.forgotPass} ${styles.textDarker}`} onClick={redefinirSenha}>
              Esqueceu a senha?
            </p>
            {!isSubmitted ? (
            <button type="button" className={styles.submit} onClick={handleSignIn}>
              Entrar
            </button>
            ) : (
                <svg
                  className={styles.checkmark}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 52 52"
                >
                  <circle
                    className={styles.checkmark__circle}
                    cx="26"
                    cy="26"
                    r="25"
                    fill="none"
                  />
                  <path
                    className={styles.checkmark__check}
                    fill="none"
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  />
                </svg>
              )}
          </div>

          <div className={styles.subCont}>
            <div className={styles.img}>
              <div className={`${styles.imgText} ${styles.mUp}`}>
                <h2 className={styles.textDarker}>Novo por aqui?</h2>
                <p className={styles.textDarker}>
                  Cadastre-se e descubra um mundo de novas receitas!
                </p>
              </div>
              <div className={`${styles.imgText} ${styles.mIn}`}>
                <h2 className={styles.textDarker}>Já é um de nós?</h2>
                <p className={styles.textDarker}>
                  Se você já tem uma conta, é só fazer login!
                </p>
              </div>
              <div className={styles.img__btn}>
                <span className={styles.mUp}>Cadastrar</span>
                <span className={styles.mIn}>Entrar</span>
              </div>
            </div>
            <div className={`${styles.form} ${styles.signUp}`}>
              <h2 className={styles.textDarker}>
                Prepare-se para saborear o melhor!
              </h2>
              <label className={styles.textDarker}>
                <span>Nome</span>
                <input type="text" />
              </label>
              <label className={styles.textDarker}>
                <span>Email</span>
                <input type="email" onChange={handleEmailChange} />
              </label>
              <label className={styles.textDarker}>
                <span>Senha</span>
                <input type="password" onChange={handleSenhaChange} />
              </label>
              {!isSubmitted ? (
                <button
                  type="button"
                  className={styles.submit}
                  onClick={handleSignUp}
                >
                  Cadastrar
                </button>
              ) : (
                <svg
                  className={styles.checkmark}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 52 52"
                >
                  <circle
                    className={styles.checkmark__circle}
                    cx="26"
                    cy="26"
                    r="25"
                    fill="none"
                  />
                  <path
                    className={styles.checkmark__check}
                    fill="none"
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
