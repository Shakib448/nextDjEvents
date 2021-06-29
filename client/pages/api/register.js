// import axiosConfig from "../../config";
// import cookie from "cookie";

// export default async (req, res) => {
//   if (req.method === "POST") {
//     try {
//       const { username, email, password } = req.body;
//       console.log(req.body);
//       const { data, statusText } = await axiosConfig.post(
//         "/auth/local/register",
//         {
//           username,
//           email,
//           password,
//         }
//       );
//       if (statusText) {
//         // Set cookie
//         res.setHeader(
//           "Set-Cookie",
//           cookie.serialize("token", data.jwt, {
//             httpOnly: true,
//             secure: process.env.NODE_ENV !== "development",
//             maxAge: 60 * 60 * 24 * 7, // 1 week
//             sameSite: "strict",
//             path: "/",
//           })
//         );
//         res.status(200).json({ user: data.user });
//       }
//     } catch (error) {
//       res
//         .status(error.response.data.statusCode)
//         .json({ message: error.response.data.message[0].messages[0].message });
//     }
//   } else {
//     res.setHeader("Allow", ["POST"]);
//     res.status(405).json({ message: `Method ${req.method} not allowed` });
//   }
// };

import cookie from "cookie";
import { API_URL } from "@/config/index";

export default async (req, res) => {
  if (req.method === "POST") {
    const { username, email, password } = req.body;

    const strapiRes = await fetch(`http://localhost:1337/auth/local/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data = await strapiRes.json();

    if (strapiRes.ok) {
      // Set Cookie
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: "strict",
          path: "/",
        })
      );

      res.status(200).json({ user: data.user });
    } else {
      res
        .status(data.statusCode)
        .json({ message: data.message[0].messages[0].message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
