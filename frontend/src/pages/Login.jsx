import React from 'react'

const Login = () => {
    const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      fetch(
        `${import.meta.env.VITE_SERVER_URL}/auth/login`,

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify,
        }
      );

      const data = await res.json()

      if(res.ok){
        localStorage.setItem("token",data.token)
        localStorage.setItem("user",JSON.stringify(data.user))
        navigate('/')
      }else{
        alert(data.message || 'signup failed')
      }


    } catch (error) {
        alert('something went wrong in signup')
        console.log('signup error',error.message)
    }
    finally {
        setLoading(false)
    }
  };
  return (
    <div>Login</div>
  )
}

export default Login