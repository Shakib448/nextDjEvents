import axiosConfig from "../../config";
import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "GET") {
    try {
      if (!req.headers.cookie) {
        res.status(403).json({ message: "Not Authorized" });
        return;
      }
      const { token } = cookie.parse(req.headers.cookie);

      const { data, statusText } = await axiosConfig.get(`/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (statusText) {
        res.status(200).json(data);
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(403).json({ message: "User forbidden" });
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
