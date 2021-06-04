import events from "./data.json";

export default (req, res) => {
  res.status(200).json(events);
};
