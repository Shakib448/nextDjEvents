import axiosConfig from "../../config";
import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const { username, email, password } = req.body;

      const { data, statusText } = await axiosConfig.post(
        "/auth/local/register",
        { username, email, password }
      );
      if (statusText) {
        // Set cookie
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
      }
    } catch (error) {
      res
        .status(error.response.data.statusCode)
        .json({ message: error.response.data.message[0].messages[0].message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
