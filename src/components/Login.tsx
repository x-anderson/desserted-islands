import "./Login.css";
import netlifyIdentity from "netlify-identity-widget";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  url: string;
  countryAlpha2: string;
  subCountry?: string;
};

export default function Login() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    if (loggedIn) {
      netlifyIdentity.logout();
    } else {
      netlifyIdentity.open();
    }
  };

  netlifyIdentity.on("login", () => setLoggedIn(true));
  netlifyIdentity.on("logout", () => setLoggedIn(false));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues, e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();
    createPost(data);
  };

  const createPost = async (data: FormValues) => {
    const postRequest = await fetch("/.netlify/functions/create_post", {
      method: "POST",
      body: JSON.stringify(data),
    });
    console.log("POST request status code", postRequest.status);
  };

  return (
    <div className="login-page">
      {loggedIn && (
        <>
          <h4>Create new post</h4>
          <form className="form-group" onSubmit={handleSubmit(onSubmit)}>
            <input
              placeholder="URL"
              type="text"
              autoComplete="off"
              {...register("url", { required: true })}
            />
            {errors.url && <span>This field is required</span>}
            <input
              placeholder="COUNTRYALPHA2"
              type="text"
              autoComplete="off"
              {...register("countryAlpha2", { required: true })}
            />
            {errors.countryAlpha2 && <span>This field is required</span>}
            <input
              placeholder="SUBCOUNTRY"
              type="text"
              autoComplete="off"
              {...register("subCountry")}
            />
            <input type="submit" value="Submit" />
          </form>
        </>
      )}
      <div className="form-group">
        <button onClick={handleLogin}>{loggedIn ? "Log Out" : "Login"}</button>
      </div>
    </div>
  );
}
