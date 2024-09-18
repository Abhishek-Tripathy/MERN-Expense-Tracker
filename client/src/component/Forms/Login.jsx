import { useContext, useState } from "react";
import { authContext } from "../context/AuthContext/AuthContext.jsx";


const Login = () => {
  const {userLoginAction, userAuth} = useContext(authContext)

  const [formData, setFormData] = useState({email: '', password: ''})
  const {email, password} = formData

  const handleInput = (e) => {
    setFormData({...formData, [e.target.name] : e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    userLoginAction(formData)
   
  }
  // console.log("here ==> ",userAuth);

  return (
    <>
      <section className="py-24 md:py-32 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-sm mx-auto">
            <div className="mb-6 text-center">
              <h3 className="mb-4 text-2xl md:text-3xl font-bold">
                Sign in to your account
              </h3>
              <p className="text-red-600">
                {userAuth.error}
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  className="block mb-2 text-coolGray-800 font-medium"
                  // htmlFor
                >
                  Email
                </label>
                <input
                  value={email}
                  onChange={handleInput}
                  name="email"
                  className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lgshadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  type="email"
                  placeholder="i-novotek@gmail.com"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-coolGray-800 font-medium"
                  //htmlFor
                >
                  Password
                </label>
                <input
                  value={password}
                  onChange={handleInput}
                  name="password"
                  className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lgshadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  type="password"
                  placeholder="************"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between mb-6">
                <div className="w-full md:w-1/2">
                  <label className="relative inline-flex items-center">
                    <input
                      className="form-checkbox appearance-none"
                      type="checkbox"
                    />
                  </label>
                </div>
              </div>
              <button
                className="inline-block py-3 px-7 mb-6 w-full text-base text-green-50 font-medium text-center leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
                type="submit"
              >
                Sign In
              </button>
              <p className="text-center">
                <span className="text-xs font-medium">
                  Don’t have an account? <a href="#">Sign up</a>
                </span>
                <button
                  className="inline-block text-xs font-medium text-green-500 hover:text-green-600 hover:underline"
                  type="submit"
                >
                  Sign up
                </button>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
