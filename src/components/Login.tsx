import "./Login.css";
import netlifyIdentity from "netlify-identity-widget";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { islandCountries } from "../data/islandCountries";

type FormValues = {
  url: string;
  countryAlpha2: string;
  subCountry?: string;
};

export default function Login() {
  const handleLogin = () => {
    if (netlifyIdentity.currentUser()) {
      netlifyIdentity.logout();
    } else {
      netlifyIdentity.open();
    }
  };

  netlifyIdentity.on("login", () => window.location.reload());
  netlifyIdentity.on("logout", () => window.location.reload());

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = (data: FormValues, e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();
    handleCreatePost(data);
  };

  const handleCreatePost = async (data: FormValues) => {
    toast.promise(createPost(data), {
      pending: "Creating post...",
      success: "Post created!",
      error: "Error in creating post.",
    });
  };

  const createPost = async (data: FormValues) => {
    return await fetch("/.netlify/functions/create_post", {
      method: "POST",
      body: JSON.stringify(data),
    });
  };

  const countryAlpha2 = Object.keys(islandCountries);

  return (
    <div className="login-page">
      {netlifyIdentity.currentUser() && (
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

            <select {...register("countryAlpha2", { required: true })}>
              {countryAlpha2.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
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
        <button onClick={handleLogin}>
          {netlifyIdentity.currentUser() ? "Log Out" : "Login"}
        </button>
      </div>
    </div>
  );
}
