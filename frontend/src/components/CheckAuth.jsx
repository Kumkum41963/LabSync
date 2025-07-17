// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function CheckAuth({ children, protectedRoute }) {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (protectedRoute) {
//       if (!token) {
//         navigate("/login");
//       } else {
//         setLoading(false);
//       }
//     } else {
//       if (token) {
//         navigate("/");
//       } else {
//         setLoading(false);
//       }
//     }
//   }, [navigate, protectedRoute]);

//   if (loading) {
//     return <div>loading...</div>;
//   }


//   return children;
// }


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckAuth({ children, protected: protectedRoute }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("CheckAuth token:", token);

    if (protectedRoute) {
      if (!token) {
        setLoading(false); // ✅ stop loading BEFORE navigating
        navigate("/login");
      } else {
        setLoading(false); // ✅ allow children to render
      }
    } else {
      if (token) {
        setLoading(false); // ✅ stop loading BEFORE navigating
        navigate("/");
      } else {
        setLoading(false); // ✅ allow public page to render
      }
    }
  }, [navigate, protectedRoute]);

  if (loading) {
    return <div>Loading auth check...</div>;
  }

  return <>{children}</>;
}
