import "./Login.css";
import netlifyIdentity from "netlify-identity-widget";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

type FormValues = {
  url: string;
  countryAlpha2: string;
  subCountry?: string;
};

export default function Login() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (netlifyIdentity.currentUser()) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    if (loggedIn) {
      netlifyIdentity.logout();
    } else {
      netlifyIdentity.open();
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues, e?: React.BaseSyntheticEvent) => {
    console.log(data);
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
      <button className="login-button" onClick={handleLogin}>
        {loggedIn ? "Log Out" : "Login"}
      </button>
      {loggedIn && (
        <div>
          <form id="createPostForm" onSubmit={handleSubmit(onSubmit)}>
            <label>
              URL:
              <input type="text" {...register("url", { required: true })} />
              {errors.url && <span>This field is required</span>}
            </label>
            <label>
              CountryAlpha2:
              <input
                type="text"
                {...register("countryAlpha2", { required: true })}
              />
              {errors.countryAlpha2 && <span>This field is required</span>}
            </label>
            <label>
              Subcountry:
              <input type="text" {...register("subCountry")} />
            </label>
            <input
              type="submit"
              value="Submit"
              form="createPostForm"
              onSubmit={handleSubmit(onSubmit)}
            />
          </form>
        </div>
      )}
    </div>
  );
}
